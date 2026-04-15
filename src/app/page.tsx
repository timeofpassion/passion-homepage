import BackgroundEffects from "@/components/BackgroundEffects";
import SystemLabels from "@/components/SystemLabels";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiagnosticsSection from "@/components/DiagnosticsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FixedCTA from "@/components/FixedCTA";

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <SystemLabels />

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <DiagnosticsSection />
        <ArchitectureSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </div>

      <FixedCTA />
    </>
  );
}
