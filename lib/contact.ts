export const contactLimits = { name: 120, email: 254, message: 3000 } as const;
export type ContactField = keyof typeof contactLimits;
export type ContactError = "required" | "invalidEmail" | "tooLong";
export const contactFields = ["name", "email", "message"] as const;

export type ContactResult =
  | { status: "idle" | "success" | "unavailable" }
  | { status: "invalid"; errors: Partial<Record<ContactField, ContactError>> };

export function isContactEmail(value: string): boolean {
  return value.length <= contactLimits.email
    && /^[a-z0-9.!$&'*+\-/=_^`{|}~%]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(value)
    && !value.includes("..")
    && !value.startsWith(".")
    && !value.includes(".@");
}

export function validateContact(formData: FormData): ContactResult {
  const errors: Partial<Record<ContactField, ContactError>> = {};
  for (const field of contactFields) {
    const entry = formData.get(field);
    const value = typeof entry === "string" ? entry.trim() : "";
    if (!value) errors[field] = "required";
    else if (value.length > contactLimits[field]) errors[field] = "tooLong";
    else if (field === "email" && !isContactEmail(value)) errors[field] = "invalidEmail";
  }

  return Object.keys(errors).length ? { status: "invalid", errors } : { status: "success" };
}
