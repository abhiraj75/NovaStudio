const encoder = new TextEncoder();

async function getKey(secret: string) {
  return globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

export async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await getKey(secret);
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return payload + "." + hex;
}

export async function hmacVerify(token: string, secret: string): Promise<string | null> {
  const idx = token.lastIndexOf(".");
  if (idx === -1) return null;
  const payload = token.slice(0, idx);
  const expected = await hmacSign(payload, secret);
  if (expected !== token) return null;
  try {
    const data = JSON.parse(payload);
    if (Date.now() > data.exp) return null;
    return data.user;
  } catch {
    return null;
  }
}
