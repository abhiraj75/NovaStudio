import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    return new NextResponse(null, { status: 204 });
  } catch (e: unknown) {
    const code = (e as { code?: string }).code;
    if (code === "P2025") return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
