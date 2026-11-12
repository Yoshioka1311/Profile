import test from "node:test";
import assert from "node:assert/strict";
import { getTransitionDestination } from "../lib/navigation.ts";

const current = "https://profile.example/work?sort=recent";

test("a separate internal page keeps its query and fragment", () => {
  assert.equal(getTransitionDestination("/about?view=story#experience", current), "/about?view=story#experience");
});

test("same-page, query-only and anchor links retain native navigation", () => {
  for (const href of ["/work", "/work/", "/work?sort=oldest", "#top", "?sort=oldest"]) assert.equal(getTransitionDestination(href, current), null);
});

test("external destinations and non-web protocols never enter the router", () => {
  for (const href of ["https://elsewhere.example/about", "//elsewhere.example/about", "mailto:hello@example.com", "javascript:alert(1)", "data:text/html,test"]) assert.equal(getTransitionDestination(href, current), null);
});

test("credentials and malformed destinations are rejected", () => {
  assert.equal(getTransitionDestination("https://user:secret@profile.example/about", current), null);
  assert.equal(getTransitionDestination("http://[", current), null);
});

test("relative and same-origin absolute routes become local paths", () => {
  assert.equal(getTransitionDestination("../about", current), "/about");
  assert.equal(getTransitionDestination("https://profile.example/work/project-one", current), "/work/project-one");
});
