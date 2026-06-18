export function track(type: "cta_click" | "page_visit", path: string) {
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, path }),
  }).catch(() => {});
}
