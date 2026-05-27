import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { DemoGenerator } from "@/components/DemoGenerator";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhyItMatters } from "@/components/WhyItMatters";
import { BuiltFor } from "@/components/BuiltFor";
import { FreeRescue } from "@/components/FreeRescue";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <DemoGenerator />
        <BeforeAfter />
        <WhyItMatters />
        <BuiltFor />
        <FreeRescue />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
