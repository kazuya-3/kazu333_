import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { DemoGenerator } from "@/components/DemoGenerator";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhyItMatters } from "@/components/WhyItMatters";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DemoGenerator />
        <BeforeAfter />
        <WhyItMatters />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
