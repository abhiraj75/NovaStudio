import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getProjects } from "@/lib/data";
import { validateProject, hasErrors } from "@/lib/validation";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const errs = validateProject(body);
    if (hasErrors(errs)) return NextResponse.json({ errors: errs }, { status: 400 });

    const project = await prisma.project.create({
      data: { title: body.title.trim(), category: body.category.trim(), imageUrl: body.imageUrl.trim() },
    });
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
