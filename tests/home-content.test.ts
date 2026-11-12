import test from "node:test";
import assert from "node:assert/strict";
import { splitText } from "../lib/split-text.ts";
import { isLocalImagePath } from "../lib/media.ts";

test("text splitting preserves English punctuation and whitespace", () => {
  const text = "A name,  a role.\nAnother line.";
  assert.equal(splitText(text, "en").join(""), text);
});

test("Thai words keep every glyph and expose natural wrapping points", () => {
  const text = "ฉันเขียนโปรแกรมและเรียนรู้ข้อมูล";
  const pieces = splitText(text, "th");
  assert.equal(pieces.join(""), text);
  assert.ok(pieces.length > 1);
});

test("placeholder and remote image paths do not create image requests", () => {
  for (const path of ["[IMAGE PATH]", "", "/", "//example.com/image.jpg", "https://example.com/image.jpg", "/[IMAGE PATH]"]) assert.equal(isLocalImagePath(path), false);
  assert.equal(isLocalImagePath("/images/my portrait.webp"), true);
});
