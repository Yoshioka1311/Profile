"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { checkContactMessage } from "@/app/actions";
import type { copy } from "@/data/content";
import { contactFields, contactLimits, type ContactField, type ContactResult } from "@/lib/contact";

const emptyFields = { name: "", email: "", message: "" };
const initialResult: ContactResult = { status: "idle" };

export function ContactForm({ labels }: { labels: (typeof copy)["en"]["contact"] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const [values, setValues] = useState(emptyFields);
  const [edited, setEdited] = useState<Partial<Record<ContactField, boolean>>>({});
  const [result, submit, pending] = useActionState(async (_previous: ContactResult, formData: FormData): Promise<ContactResult> => {
    setEdited({});
    try {
      const next = await checkContactMessage(formData);
      if (next.status === "success") setValues(emptyFields);
      return next;
    } catch {
      return { status: "unavailable" };
    }
  }, initialResult);

  useEffect(() => {
    if (pending) return;
    if (result.status === "invalid") {
      const first = contactFields.find((field) => result.errors[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
    }
    if (result.status === "success") successRef.current?.focus();
  }, [pending, result]);

  return (
    <form ref={formRef} action={submit} noValidate aria-describedby="contact-preview-note" aria-busy={pending} className="contact-form">
      {contactFields.map((field) => {
        const id = `contact-${field}`;
        const error = !edited[field] && result.status === "invalid" ? result.errors[field] : undefined;
        const controlProps = {
          id,
          name: field,
          value: values[field],
          placeholder: " ",
          maxLength: contactLimits[field],
          readOnly: pending,
          required: true,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.currentTarget.value;
            setValues((current) => ({ ...current, [field]: value }));
            if (error) setEdited((current) => ({ ...current, [field]: true }));
          },
        };

        return (
          <div className="contact-field" key={field}>
            <div className="contact-control">
              {field === "message"
                ? <textarea {...controlProps} rows={4} />
                : <input {...controlProps} type={field === "email" ? "email" : "text"} autoComplete={field} />}
              <label htmlFor={id}>{labels[field]}</label>
            </div>
            {error && <p id={`${id}-error`} className="contact-field-error">{labels[error]}</p>}
          </div>
        );
      })}

      <button className="wipe-button contact-submit" type="submit" disabled={pending}>
        <span>{pending ? labels.sending : labels.submit}</span>
        {pending
          ? <span className="contact-spinner" aria-hidden="true" />
          : <span aria-hidden="true">↗</span>}
      </button>

      <div role="status">
        {!pending && result.status === "success" && (
          <p ref={successRef} tabIndex={-1} className="contact-success">
            <span aria-hidden="true">✓</span> {labels.success}
          </p>
        )}
      </div>
      {!pending && result.status === "unavailable" && <p role="alert" className="contact-field-error">{labels.error}</p>}
    </form>
  );
}
