import test from "node:test";
import assert from "node:assert/strict";
import { getNextProject, getProjectUrl } from "../lib/projects.ts";

test("next project follows the archive order and wraps at the end", () => {
  const items = [{ slug: "one" }, { slug: "two" }, { slug: "three" }];
  assert.equal(getNextProject(items, "one"), items[1]);
  assert.equal(getNextProject(items, "three"), items[0]);
  assert.equal(getNextProject(items, "missing"), null);
  assert.equal(getNextProject(items.slice(0, 1), "one"), null);
  assert.equal(getNextProject([], "one"), null);
});

test("project links accept web URLs and leave placeholders or unsafe protocols unlinked", () => {
  assert.equal(getProjectUrl("https://example.com/project?ref=work#demo"), "https://example.com/project?ref=work#demo");
  assert.equal(getProjectUrl("http://localhost:3000/demo"), "http://localhost:3000/demo");
  for (const value of ["[LINKS]", "", "/work", "//example.com", "javascript:alert(1)", "data:text/html,test", "mailto:owner@example.com", "https://name:secret@example.com"]) assert.equal(getProjectUrl(value), null);
});
