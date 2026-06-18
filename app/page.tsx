import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <ContactForm />
    </main>
  );
}
