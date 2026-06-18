import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateContact, hasErrors } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const errs = validateContact(body);
    if (hasErrors(errs)) return NextResponse.json({ errors: errs }, { status: 400 });

    const contact = await prisma.contact.create({
      data: { name: body.name.trim(), email: body.email.trim(), message: body.message.trim() },
    });
    return NextResponse.json({ id: contact.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
