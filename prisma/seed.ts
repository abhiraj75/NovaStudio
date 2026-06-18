import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.stat.deleteMany();
  await prisma.service.deleteMany();
  await prisma.project.deleteMany();

  await prisma.stat.createMany({
    data: [
      { label: "Projects Completed", value: 150, suffix: "+", order: 1 },
      { label: "Clients Worldwide", value: 50, suffix: "+", order: 2 },
      { label: "Years Experience", value: 5, suffix: "", order: 3 },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        title: "Web Design",
        description:
          "Wireframes to high-fidelity UI, grounded in user research and built to ship.",
      },
      {
        title: "Front-End Development",
        description:
          "Production React and Next.js builds — responsive, accessible, fast.",
      },
      {
        title: "Branding",
        description:
          "Identity systems: logo, type, colour, and the guidelines to hold them together.",
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Harbor Logistics Dashboard",
        category: "Web App",
        imageUrl: "/portfolio/harbor.jpg",
      },
      {
        title: "Maedfield Coffee",
        category: "Branding",
        imageUrl: "/portfolio/maedfield.jpg",
      },
      {
        title: "Tier Finance",
        category: "Web Design",
        imageUrl: "/portfolio/tier.jpg",
      },
      {
        title: "Pulse Fitness",
        category: "Front-End",
        imageUrl: "/portfolio/pulse.jpg",
      },
      {
        title: "Greenline Marketplace",
        category: "Web App",
        imageUrl: "/portfolio/greenline.jpg",
      },
      {
        title: "Atlas Travel Guide",
        category: "Web Design",
        imageUrl: "/portfolio/atlas.jpg",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
