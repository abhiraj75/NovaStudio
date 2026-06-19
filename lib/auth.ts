import { cookies } from "next/headers";
import { hmacSign, hmacVerify } from "@/lib/hmac";

const SECRET = process.env.SESSION_SECRET!;
const COOKIE = "nova_session";
const TTL = 60 * 60 * 24;

export async function createSession(username: string) {
  const payload = JSON.stringify({ user: username, exp: Date.now() + TTL * 1000 });
  const token = await hmacSign(payload, SECRET);
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
  return hmacVerify(token, SECRET);
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
