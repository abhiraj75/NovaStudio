import { NextRequest, NextResponse } from "next/server";
import { hmacVerify } from "@/lib/hmac";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const secret = process.env.SESSION_SECRET!;
  const token = req.cookies.get("nova_session")?.value;
  const authed = token ? !!(await hmacVerify(token, secret)) : false;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginPage = pathname === "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/contacts") ||
    pathname.startsWith("/api/admin") ||
    (pathname.startsWith("/api/projects") && req.method !== "GET");
  const isLoginApi = pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) return NextResponse.next();

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
