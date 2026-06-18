"use client";

import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { validateContact, hasErrors, FieldErrors } from "@/lib/validation";
import s from "@/styles/ContactForm.module.css";

const blank = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(blank);
  const [errs, setErrs] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrs((e) => {
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateContact(form);
    if (hasErrors(v)) {
      setErrs(v);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm(blank);
        setErrs({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section className={s.section} id="contact">
        <div className={s.success}>
          <div className={s.successTitle}>Message sent</div>
          <p className={s.successText}>
            Thanks for reaching out. We will get back to you soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={s.section} id="contact">
      <Typography variant="h2" className={s.title}>
        Get in Touch
      </Typography>
      <p className={s.sub}>
        Have a project in mind? Drop us a line and we will be in touch within 24
        hours.
      </p>
      {status === "error" && (
        <div className={s.errBanner}>
          Something went wrong. Please try again.
        </div>
      )}
      <form onSubmit={submit} className={s.form} noValidate>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          error={!!errs.name}
          helperText={errs.name}
          fullWidth
          id="contact-name"
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          error={!!errs.email}
          helperText={errs.email}
          fullWidth
          id="contact-email"
        />
        <TextField
          label="Message"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          error={!!errs.message}
          helperText={errs.message}
          multiline
          rows={5}
          fullWidth
          id="contact-message"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={s.submit}
          disabled={status === "sending"}
          id="contact-submit"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </section>
  );
}
