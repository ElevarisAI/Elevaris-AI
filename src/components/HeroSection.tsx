import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Mark from "./Mark";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ShaderBackground from "@/components/ui/shader-background";
import DrawLine from "@/components/DrawLine";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 44 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden bg-background">
      <AuroraBackground position="top" />
      <ShaderBackground className="absolute inset-0 w-full h-full z-[1]" />
      <img
        src="/favicon-512.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-20 -bottom-28 w-[640px] h-[640px] opacity-[0.09] hidden md:block z-10"
      />

      <div className="container-narrow px-6 sm:px-8 lg:px-12 pt-40 pb-28 lg:pt-48 lg:pb-36 relative z-10">
        <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-20 lg:mb-28">
          <div className="flex items-center gap-3">
            <span className="micro-label">AI Receptionist</span>
          </div>
          <span className="hidden sm:block micro-label">For local businesses</span>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-10 gap-x-6">
          <div className="col-span-12">
            <h1
              className="font-heading font-medium text-foreground"
              style={{
                fontSize: 'clamp(44px, 7vw, 110px)',
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
              }}
            >
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Never <span className="accent-italic" style={{ fontSize: '0.95em' }}>miss</span> a call.
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  Never <span className="accent-italic" style={{ fontSize: '0.95em' }}>lose</span> a lead.
                </motion.span>
              </div>
            </h1>
          </div>

          <motion.div {...fadeUp(0.15)} className="col-span-12 lg:col-span-5">
            <p className="text-[15px] text-muted-foreground leading-[1.6]" style={{ maxWidth: 420 }}>
              An AI receptionist that answers every call, captures every lead, and books appointments around the clock. Built for clinics, trades, hospitality, real estate, gyms, and any business where a missed call costs money.
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.25)} className="mt-20 lg:mt-28 relative z-10">
          <DrawLine delay={0.35} className="mb-8" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-[14px] uppercase tracking-[0.2em] font-medium text-background bg-foreground px-7 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Book a Free Demo
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#features"
                className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                See How It Works →
              </a>
            </div>
            <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="accent-italic normal-case tracking-normal text-base mr-2">delivered in</span>
              Under 2 weeks
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
