import { useEffect, useState } from "react";
import DrawLine from "@/components/DrawLine";
import CountUp from "@/components/CountUp";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Mark from "@/components/Mark";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ShaderBackground from "@/components/ui/shader-background";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const problems = [
  {
    num: "01",
    title: "Your website looks like it was built in 2014.",
    description:
      "Slow loads, dated design, and a layout that falls apart on a phone. Visitors decide in under three seconds whether to trust you. Most leave before they read a word.",
    pill: "75% judge on design",
  },
  {
    num: "02",
    title: "You don't show up when locals search Google.",
    description:
      "Your competitors appear in the map pack. You don't. Without a properly optimised Google Business Profile and local SEO, you're invisible to people who are already ready to book.",
    pill: "46% of searches are local",
  },
  {
    num: "03",
    title: "Your Google Business Profile is barely set up.",
    description:
      "No photos. Missing services. No reviews strategy. Your Google Business Profile is the first thing a local sees before they even visit your website. Right now it's costing you bookings.",
    pill: "Top 3 listings = 75% of clicks",
  },
];

const services = [
  {
    num: "01",
    title: "Modern, conversion-focused websites",
    description:
      "Custom-built websites for local businesses. Fast, mobile-first, and structured around the things that actually drive results. Clear services, easy contact, real photos, and social proof that turns visitors into customers.",
    bullets: ["Built on a modern, fast stack", "Mobile-first design", "Booking and enquiry flows that convert", "Copy written for your business"],
  },
  {
    num: "02",
    title: "Local SEO",
    description:
      "We get your business found by people nearby who are ready to act. On-page SEO, local keyword targeting, technical fixes, and ongoing visibility work. Not a generic monthly package. A system built around your actual location and services.",
    bullets: ["Local keyword research", "On-page and technical SEO", "Suburb and service-area pages", "Monthly performance reports"],
  },
  {
    num: "03",
    title: "Google Business Profile",
    description:
      "Your Google Business Profile is often the first thing a local sees before they ever visit your website. We optimise every field, add the right categories and services, set up a post strategy, and build a system for generating reviews from real customers.",
    bullets: ["Full profile optimisation", "Services, categories, attributes", "Photo and post strategy", "Review generation system"],
  },
];

const steps = [
  { num: "01", title: "Discovery call", description: "30 minutes. We learn your business, your customers, and what you actually need. No upsells. No jargon. Just a clear picture of where you are and where you want to be." },
  { num: "02", title: "Strategy & scope", description: "We map out the website structure, SEO targets, and Google Business work. You see exactly what is being built, why it's being built, and what it will cost before anything starts." },
  { num: "03", title: "Build & optimise", description: "We design and build the site, write the copy, set up tracking, and optimise your Google Business Profile at the same time. You review before anything goes live." },
  { num: "04", title: "Launch & grow", description: "Your site goes live. Local SEO work continues monthly. Every month you get a plain-English report covering rankings, traffic, and leads. No fluff, no vanity metrics." },
];

const metrics = [
  { value: "< 2 Weeks", label: "Delivered in under 2 weeks, start to launch" },
  { value: "100%", label: "Custom-built, no templates, no page builders" },
  { value: "Local", label: "Australian-based team, no offshore handoffs" },
  { value: "Monthly", label: "Reporting on rankings, traffic, and enquiries" },
];

const WebsitesSEO = () => {
  useEffect(() => { document.title = "Elevaris AI"; }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-background">
          <AuroraBackground position="top" />
          <ShaderBackground className="absolute inset-0 w-full h-full z-[1]" />
          <img
            src="/favicon-512.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-20 -bottom-28 w-[640px] h-[640px] opacity-[0.09] hidden md:block z-10"
          />
          <div className="container-narrow px-6 sm:px-8 lg:px-12 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-36 relative z-10">
            <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-10 sm:mb-14 lg:mb-28">
              <div className="flex items-center gap-3">
                <span className="micro-label-line" />
                <span className="micro-label">Websites & SEO</span>
              </div>
              <span className="hidden sm:block micro-label">For Local Businesses</span>
            </motion.div>

            <div className="grid grid-cols-12 gap-y-10 gap-x-6">
              <div className="col-span-12">
                <h1
                  className="font-heading font-medium text-foreground"
                  style={{ fontSize: 'clamp(38px, 7vw, 110px)', lineHeight: 0.95, letterSpacing: '-0.035em' }}
                >
                  <div className="overflow-hidden pb-[0.12em]">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Get <span className="accent-italic" style={{ fontSize: '0.95em' }}>found</span>.
                    </motion.span>
                  </div>
                  <div className="overflow-hidden pb-[0.12em]">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Win the <span className="accent-italic" style={{ fontSize: '0.95em' }}>booking</span>.
                    </motion.span>
                  </div>
                </h1>
              </div>
              <motion.div {...fadeUp(0.15)} className="col-span-12 lg:col-span-5">
                <p className="text-[15px] text-muted-foreground leading-[1.6]" style={{ maxWidth: 420 }}>
                  Modern websites, local SEO, and Google Business Profile that works for Australian businesses.
                </p>
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.25)} className="mt-10 sm:mt-14 lg:mt-28">
              <DrawLine delay={0.35} className="mb-8" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                  <a href="#contact" className="inline-flex items-center gap-3 text-[14px] uppercase tracking-[0.2em] font-medium text-background bg-foreground px-7 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                    Book a Free Demo
                    <ArrowUpRight size={16} />
                  </a>
                  <a href="#services" className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                    See What's Included →
                  </a>
                </div>
                <p className="relative z-10 text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="accent-italic normal-case tracking-normal text-base mr-2">delivered in</span>
                  Under 2 weeks
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="section-alt border-y border-[hsl(var(--hairline))] relative overflow-hidden">
          <AnimatedShaderBackground className="opacity-75" />
          <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10">
            <motion.div {...fadeUp(0)} className="mb-16 flex items-center gap-3">
              <span className="micro-label">The Problem</span>
            </motion.div>
            <div className="mb-16 md:mb-20 flex justify-center">
              <h2
                className="font-heading font-medium text-foreground text-center"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch' }}
              >
                {([
                  ["If", false], ["locals", false], ["can't", false], ["find", false],
                  ["you", false], ["online,", false], ["or", false], ["don't", false],
                  ["trust", false], ["your", false], ["site", false], ["when", false],
                  ["they", false], ["do,", false], ["they", false], ["go", true],
                  ["somewhere", true], ["else.", true],
                ] as [string, boolean][]).map(([word, italic], i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i <= 5 ? 0.5 + i * 0.10 : i <= 13 ? 1.55 + (i - 6) * 0.10 : 2.80 + (i - 14) * 0.10, ease: [0.22, 1, 0.36, 1] as const }}
                    className={italic ? "accent-italic" : undefined}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h2>
            </div>

            <DrawLine className="mb-0" />

            <div className="flex flex-col">
              {problems.map((row, i) => (
                <motion.div key={row.num} {...fadeUp(i === 0 ? 3.85 : i === 1 ? 4.00 : 4.15)} viewport={{ once: true, margin: '200px' }} className="border-t border-[hsl(var(--hairline))] last:border-b">
                  <div className="problem-row">
                    <div><span className="index-numeral" style={{ fontSize: 16 }}>— {row.num}</span></div>
                    <div>
                      <h3 className="font-heading text-foreground mb-3" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                        {row.title}
                      </h3>
                      <p className="text-muted-foreground" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '60ch' }}>{row.description}</p>
                    </div>
                    <div className="stat-pill">
                      <span className="inline-block text-primary" style={{ border: '1px solid hsl(var(--primary) / 0.4)', padding: '7px 14px', borderRadius: 999, fontSize: 12, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                        {row.pill}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES — editorial list */}
        <section id="services" className="bg-background border-b border-[hsl(var(--hairline))]">
          <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32">
            <motion.div {...fadeUp(0)} className="mb-16 flex items-center gap-3">
              <span className="micro-label">What's Included</span>
            </motion.div>
            <div className="mb-16 md:mb-20 flex justify-center">
              <motion.h2
                className="font-heading font-medium text-foreground text-center"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '22ch' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                Everything a local business needs to <span className="accent-italic">win online</span>.
              </motion.h2>
            </div>

            <DrawLine className="mb-0" />

            <ul className="flex flex-col">
              {services.map((s, i) => (
                <motion.li key={s.title} {...fadeUp(i * 0.15)} viewport={{ once: true, margin: '200px' }} className="border-b border-[hsl(var(--hairline))]">
                  <div className="grid grid-cols-12 gap-6 py-10 md:py-14">
                    <div className="col-span-2 md:col-span-1">
                      <span className="index-numeral" style={{ fontSize: 16 }}>— {s.num}</span>
                    </div>
                    <div className="col-span-10 md:col-span-4">
                      <h3 className="font-heading font-medium text-foreground" style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        {s.title}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <p className="text-muted-foreground" style={{ fontSize: 15, lineHeight: 1.7 }}>{s.description}</p>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <ul className="flex flex-col gap-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-foreground/80" style={{ fontSize: 13.5 }}>
                            <Check size={14} className="text-primary mt-1 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section-alt border-b border-[hsl(var(--hairline))]">
          <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32">
            <motion.div {...fadeUp(0)} className="mb-16 flex items-center gap-3">
              <span className="micro-label">The Process</span>
            </motion.div>
            <div className="mb-16 md:mb-20 flex justify-center">
              <motion.h2
                className="font-heading font-medium text-foreground text-center"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '22ch' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                A <span className="accent-italic">clear path</span> from first call to launch.
              </motion.h2>
            </div>

            <DrawLine className="mb-0" />

            <div className="grid grid-cols-12 gap-y-12 gap-x-0 lg:gap-16">
              <ol className="col-span-12 lg:col-span-7 flex flex-col">
                {steps.map((step, i) => (
                  <motion.li key={step.num} {...fadeUp(i * 0.1)} className="border-t border-[hsl(var(--hairline))] last:border-b">
                    <div className="grid grid-cols-12 gap-4 py-8">
                      <div className="col-span-2"><span className="index-numeral">— {step.num}</span></div>
                      <div className="col-span-10">
                        <h3 className="font-heading text-foreground mb-2" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}>{step.title}</h3>
                        <p className="text-muted-foreground" style={{ fontSize: 14.5, lineHeight: 1.7, maxWidth: '52ch' }}>{step.description}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <div className="col-span-12 lg:col-span-5 lg:self-center">
                <div className="grid grid-cols-2 gap-px bg-[hsl(var(--hairline))] border border-[hsl(var(--hairline))]">
                  {metrics.map((m, i) => (
                    <motion.div key={m.value} {...fadeUp(i * 0.05)} className="bg-background p-6 md:p-8">
                      <p className="font-heading text-foreground mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>
                        <CountUp value={m.value} />
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: 13, lineHeight: 1.55 }}>{m.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default WebsitesSEO;
