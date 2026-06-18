import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET!;
const COOKIE = "nova_session";
const TTL = 60 * 60 * 24; // 24h

function sign(payload: string): string {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  return payload + "." + hmac.digest("hex");
}

function verify(token: string): string | null {
  const idx = token.lastIndexOf(".");
  if (idx === -1) return null;
  const payload = token.slice(0, idx);
  if (sign(payload) !== token) return null;
  const data = JSON.parse(payload);
  if (Date.now() > data.exp) return null;
  return data.user;
}

export async function createSession(username: string) {
  const payload = JSON.stringify({ user: username, exp: Date.now() + TTL * 1000 });
  const token = sign(payload);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL,
  });
}

export async function getSession(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return verify(token);
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
