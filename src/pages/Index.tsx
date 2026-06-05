import { useEffect, useRef, useState } from "react";
import DrawLine from "@/components/DrawLine";
import CountUp from "@/components/CountUp";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Globe, Search, ArrowUpRight } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ShaderBackground from "@/components/ui/shader-background";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Mark from "@/components/Mark";
import ContactSection from "@/components/ContactSection";
import AboutUsSection from "@/components/AboutUsSection";
import Footer from "@/components/Footer";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const services = [
  {
    idx: "01",
    icon: Phone,
    title: "AI Receptionists",
    lede: "A custom voice agent that answers every call, books, and confirms — 24/7.",
    to: "/ai-agents",
  },
  {
    idx: "02",
    icon: Globe,
    title: "Websites",
    lede: "Fast, editorial websites for local businesses. Built to feel credible and convert.",
    to: "/websites-seo",
  },
  {
    idx: "03",
    icon: Search,
    title: "Local SEO",
    lede: "Get found when locals search. Profile, on-page, and ongoing visibility — handled.",
    to: "/websites-seo",
  },
];

const heroEnter = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Index = () => {
  useEffect(() => {
    document.title = "Elevaris AI";
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const markY     = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* HERO */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-background"
        >

          <AuroraBackground position="top" />
          <ShaderBackground className="absolute inset-0 w-full h-full z-[1]" />

          {/* Oversized brand mark — parallax layer */}
          <motion.img
            src="/favicon-512.png"
            alt=""
            aria-hidden="true"
            style={{ y: markY, scale: markScale }}
            className="pointer-events-none select-none absolute -right-20 -bottom-28 w-[640px] h-[640px] opacity-[0.09] hidden md:block z-10"
          />

          <div className="container-narrow px-6 sm:px-8 lg:px-12 pt-40 pb-28 lg:pt-48 lg:pb-36 relative z-10">

            {/* Top meta row */}
            <motion.div
              {...heroEnter(0)}
              className="flex items-center justify-between mb-20 lg:mb-28"
            >
              <div className="flex items-center gap-3">
                <span className="micro-label-line" />
                <span className="micro-label">Elevaris AI — Australia</span>
              </div>
              <span className="hidden sm:block micro-label">A Digital Studio</span>
            </motion.div>

            {/* Headline grid */}
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
                      Quiet systems
                    </motion.span>
                  </div>
                  <div className="overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      that{" "}
                      <span className="accent-italic text-primary" style={{ fontSize: '0.95em' }}>win</span>{" "}
                      <span className="accent-italic" style={{ fontSize: '0.95em' }}>more</span>{" "}
                      bookings.
                    </motion.span>
                  </div>
                </h1>
              </div>

              <motion.div
                {...heroEnter(0.28)}
                className="col-span-12 lg:col-span-5"
              >
                <p className="text-[15px] text-muted-foreground leading-[1.6]" style={{ maxWidth: 420 }}>
                  An Australian studio building AI receptionists, websites, and local SEO for businesses that care how they look — and how they run.
                </p>
              </motion.div>
            </div>

            {/* CTA row */}
            <motion.div {...heroEnter(0.42)} className="mt-20 lg:mt-28 relative z-10">
              <DrawLine delay={0.42} className="mb-8" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 text-[14px] uppercase tracking-[0.2em] font-medium text-background bg-foreground px-7 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Book a Free Demo
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                  <a
                    href="#work"
                    className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    See what we do →
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

        <Marquee />

        {/* PRACTICE / SERVICES — editorial list */}
        <section id="work" className="bg-background border-t border-[hsl(var(--hairline))] relative overflow-hidden">
          <AnimatedShaderBackground className="opacity-75" />
          <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10">
            <motion.div {...fadeUp(0)} className="mb-16 flex items-center gap-3">
              <span className="micro-label">Services</span>
            </motion.div>
            <div className="mb-16 md:mb-24 flex justify-center">
              <h2
                className="font-heading font-medium text-foreground text-center"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch' }}
              >
                {([
                  ["Three", false], ["services.", true], ["One", false], ["outcome.", true],
                  ["Your", false], ["business", false], ["never", false], ["misses", false],
                  ["an", false], ["opportunity.", true],
                ] as [string, boolean][]).map(([word, italic], i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i < 4 ? 0.5 + i * 0.16 : 1.18 + (i - 4) * 0.10, ease: [0.22, 1, 0.36, 1] as const }}
                    className={italic ? "accent-italic" : undefined}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h2>
            </div>

            <DrawLine className="mb-0" />

            <ul className="flex flex-col">
              {services.map((s, i) => (
                <motion.li
                  key={s.title}
                  {...fadeUp(2.3 + i * 0.15)} viewport={{ once: true, margin: '200px' }}
                  className="border-b border-[hsl(var(--hairline))] group relative"
                >
                  {/* Hover accent bar */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 origin-top"
                    style={{ height: '100%', transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <Link
                    to={s.to}
                    className="grid grid-cols-12 gap-4 md:gap-6 items-center py-10 md:py-14 transition-colors"
                  >
                    <div className="col-span-2 md:col-span-1">
                      <span className="index-numeral">— {s.idx}</span>
                    </div>
                    <div className="col-span-10 md:col-span-4">
                      <h3
                        className="font-heading font-medium text-foreground group-hover:text-primary transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(28px, 4.2vw, 56px)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1,
                        }}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <p className="text-[15px] md:text-base text-muted-foreground leading-[1.65]" style={{ maxWidth: '46ch' }}>
                        {s.lede}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-2 flex md:justify-end">
                      <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                        View
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* MANIFESTO — single editorial paragraph */}
        <section className="section-alt border-y border-[hsl(var(--hairline))]">
          <div className="container-narrow px-6 sm:px-8 lg:px-12 py-28 md:py-36">
            <motion.div {...fadeUp(0)} className="mb-16 flex items-center gap-3">
              <span className="micro-label">What We Do</span>
            </motion.div>
            <div className="flex flex-col items-center text-center">
              <div
                className="font-heading font-light text-foreground"
                style={{
                  fontSize: 'clamp(22px, 2.6vw, 36px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.015em',
                  maxWidth: '32ch',
                }}
              >
                <motion.div {...fadeUp(0)}>
                  We build small, considered systems for local businesses.
                </motion.div>
                <motion.div {...fadeUp(0.12)} className="mt-[0.4em]">
                  <span className="accent-italic">No templates.</span>{" "}
                  <span className="accent-italic">No offshore handoffs.</span>{" "}
                  <span className="accent-italic">No recycled chatbots.</span>
                </motion.div>
                <motion.div {...fadeUp(0.22)} className="text-muted-foreground mt-[0.4em]">
                  Every client works directly with me, Harley — from first conversation to launch day.
                </motion.div>
              </div>

              <DrawLine className="mt-16 mb-8 w-full max-w-3xl" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-10 w-full max-w-3xl">
                {[
                  { k: "Australian", v: "Based locally. No offshore handoffs." },
                  { k: "< 2 Weeks", v: "Delivered in under 2 weeks, guaranteed." },
                  { k: "No Lock-ins", v: "Month-to-month. Cancel any time." },
                ].map((item, i) => (
                  <motion.div key={item.k} {...fadeUp(1.3 + i * 0.07)}>
                    <p className="font-heading text-foreground text-2xl mb-2" style={{ letterSpacing: '-0.01em' }}>
                      <CountUp value={item.k} />
                    </p>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{item.v}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AboutUsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
