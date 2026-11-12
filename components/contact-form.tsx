"use client";

import { useEffect, useRef, useState } from "react";
import type { copy } from "@/data/content";
import { contactFields, contactLimits, validateContact, type ContactField, type ContactResult } from "@/lib/contact";

const emptyFields = { name: "", email: "", message: "" };
export function ContactForm({ labels }: { labels: (typeof copy)["en"]["contact"] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const [values, setValues] = useState(emptyFields);
  const [edited, setEdited] = useState<Partial<Record<ContactField, boolean>>>({});
  const [result, setResult] = useState<ContactResult>({ status: "idle" });

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEdited({});
    const next = validateContact(new FormData(event.currentTarget));
    setResult(next);
    if (next.status === "success") setValues(emptyFields);
  }

  useEffect(() => {
    if (result.status === "invalid") {
      const first = contactFields.find((field) => result.errors[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
    }
    if (result.status === "success") successRef.current?.focus();
  }, [result]);

  return (
    <form ref={formRef} onSubmit={submit} noValidate aria-describedby="contact-preview-note" className="contact-form">
      {contactFields.map((field) => {
        const id = `contact-${field}`;
        const error = !edited[field] && result.status === "invalid" ? result.errors[field] : undefined;
        const controlProps = {
          id,
          name: field,
          value: values[field],
          placeholder: " ",
          maxLength: contactLimits[field],
          readOnly: false,
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

      <button className="wipe-button contact-submit" type="submit">
        <span>{labels.submit}</span>
        <span aria-hidden="true">↗</span>
      </button>

      <div role="status">
        {result.status === "success" && (
          <p ref={successRef} tabIndex={-1} className="contact-success">
            <span aria-hidden="true">✓</span> {labels.success}
          </p>
        )}
      </div>
    </form>
  );
}
