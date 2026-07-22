import { HeroZoom } from "@/components/HeroZoom";
import { PortfolioScroll } from "@/components/PortfolioScroll";
import { TeamSection } from "@/components/TeamSection";
import { InteractiveSection } from "@/components/InteractiveSection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingNav } from "@/components/FloatingNav";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main className="landing-shell text-[#14181e]">
        <HeroZoom />
        <PortfolioScroll />
        <InteractiveSection />
        <TeamSection />
        <ContactSection />
      </main>
      <FloatingNav />
    </>
  );
}
