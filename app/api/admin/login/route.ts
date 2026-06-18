import { NextRequest, NextResponse } from "next/server";
import { createSession, destroySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
    }
    await createSession(username);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
