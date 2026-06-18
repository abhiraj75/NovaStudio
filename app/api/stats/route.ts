import { NextResponse } from "next/server";
import { getStats } from "@/lib/data";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
