import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
