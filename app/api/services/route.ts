import { NextResponse } from "next/server";
import { getServices } from "@/lib/data";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
