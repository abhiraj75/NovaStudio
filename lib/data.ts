import prisma from "@/lib/db";

export async function getServices() {
  const rows = await prisma.service.findMany();
  return rows.map((r: { title: string; description: string }) => ({
    title: r.title,
    description: r.description,
  }));
}

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getStats() {
  const rows = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  return rows.map((r: { label: string; value: number; suffix: string }) => ({
    label: r.label,
    value: r.value,
    suffix: r.suffix,
  }));
}
