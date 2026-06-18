import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongo";
import { validateAnalytics, hasErrors } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const errs = validateAnalytics(body);
    if (hasErrors(errs)) return NextResponse.json({ errors: errs }, { status: 400 });

    await db.collection("events").insertOne({
      type: body.type,
      path: body.path,
      createdAt: new Date(),
      meta: body.meta || null,
    });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
