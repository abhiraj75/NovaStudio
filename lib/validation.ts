export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: {
  name?: string;
  email?: string;
  message?: string;
}): FieldErrors {
  const errs: FieldErrors = {};
  if (!data.name?.trim()) errs.name = "Name is required";
  else if (data.name.length > 100) errs.name = "Name must be 100 characters or less";

  if (!data.email?.trim()) errs.email = "Email is required";
  else if (!EMAIL_RE.test(data.email)) errs.email = "Invalid email format";

  if (!data.message?.trim()) errs.message = "Message is required";
  else if (data.message.length > 1000) errs.message = "Message must be 1000 characters or less";

  return errs;
}

export function validateProject(data: {
  title?: string;
  category?: string;
  imageUrl?: string;
}): FieldErrors {
  const errs: FieldErrors = {};
  if (!data.title?.trim()) errs.title = "Title is required";
  else if (data.title.length > 120) errs.title = "Title must be 120 characters or less";

  if (!data.category?.trim()) errs.category = "Category is required";
  else if (data.category.length > 120) errs.category = "Category must be 120 characters or less";

  if (!data.imageUrl?.trim()) errs.imageUrl = "Image URL is required";
  else if (!/^(\/|https?:\/\/)/.test(data.imageUrl))
    errs.imageUrl = "Must be a path or http(s) URL";

  return errs;
}

export function validateAnalytics(data: {
  type?: string;
  path?: string;
}): FieldErrors {
  const errs: FieldErrors = {};
  if (!["cta_click", "page_visit"].includes(data.type || ""))
    errs.type = "Type must be cta_click or page_visit";
  if (!data.path?.trim()) errs.path = "Path is required";
  return errs;
}

export function hasErrors(errs: FieldErrors): boolean {
  return Object.keys(errs).length > 0;
}
