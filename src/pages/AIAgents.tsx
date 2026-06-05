import { useEffect } from "react";
import LiveConversation from "@/components/LiveConversation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const AIAgents = () => {
  useEffect(() => {
    document.title = "Elevaris AI";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />

        <section className="bg-background overflow-hidden">
          <ContainerScroll
            titleComponent={
              <div className="mb-4">
                <span className="micro-label block mb-6">In Action</span>
                <h2
                  className="font-heading font-medium text-foreground"
                  style={{ fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
                >
                  Never miss a call.<br />
                  Never <span className="accent-italic">lose</span> a lead.
                </h2>
              </div>
            }
          >
            <LiveConversation />
          </ContainerScroll>
        </section>

        <HowItWorksSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default AIAgents;
