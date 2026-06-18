import prisma from "@/lib/db";

export async function getServices() {
  const rows = await prisma.service.findMany();
  return rows.map(({ title, description }) => ({ title, description }));
}

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getStats() {
  const rows = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  return rows.map(({ label, value, suffix }) => ({ label, value, suffix }));
}
