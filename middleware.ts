import { NextRequest, NextResponse } from "next/server";

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const idx = token.lastIndexOf(".");
  if (idx === -1) return false;
  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await globalThis.crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const expected = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (expected !== sig) return false;
  try {
    const data = JSON.parse(payload);
    return Date.now() <= data.exp;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const secret = process.env.SESSION_SECRET!;
  const token = req.cookies.get("nova_session")?.value;
  const authed = token ? await verifyToken(token, secret) : false;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginPage = pathname === "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/contacts") ||
    pathname.startsWith("/api/admin") ||
    (pathname.startsWith("/api/projects") && req.method !== "GET");

  if (isLoginPage) return NextResponse.next();

  if (isAdminPage && !authed) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isAdminApi && !authed) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/contacts", "/api/projects/:path*", "/api/admin/:path*"],
};
