import assert from "node:assert/strict";
import test from "node:test";
import { contactLimits, validateContact } from "../lib/contact.ts";

test("server validation rejects malformed and oversized values that bypass the form controls", () => {
  const form = new FormData();
  form.set("name", "   ");
  form.set("email", "visitor@example");
  form.set("message", "x".repeat(contactLimits.message + 1));
  assert.deepEqual(validateContact(form), {
    status: "invalid",
    errors: { name: "required", email: "invalidEmail", message: "tooLong" },
  });
});

test("server validation accepts Thai content and returns only a status", () => {
  const form = new FormData();
  form.set("name", "  ผู้ทดสอบ ");
  form.set("email", " visitor+preview@example.com ");
  form.set("message", "ทดสอบแบบฟอร์ม");
  assert.deepEqual(validateContact(form), { status: "success" });
});
