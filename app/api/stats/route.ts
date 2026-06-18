import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(stats.map(({ label, value, suffix }) => ({ label, value, suffix })));
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
