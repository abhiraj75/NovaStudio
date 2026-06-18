import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import ContactForm from "@/components/ContactForm";
import { getServices, getProjects, getStats } from "@/lib/data";

export default async function Home() {
  const [services, projects, stats] = await Promise.all([
    getServices(),
    getProjects(),
    getStats(),
  ]);

  return (
    <main>
      <Nav />
      <Hero />
      <Services services={services} />
      <Portfolio projects={projects} />
      <Stats stats={stats} />
      <ContactForm />
    </main>
  );
}
