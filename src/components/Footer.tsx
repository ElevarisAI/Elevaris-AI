import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Mark from "./Mark";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-[hsl(var(--hairline))] bg-background">
      {/* Oversized wordmark — editorial backdrop, clipped by the footer edge */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -bottom-[0.22em] font-heading font-semibold uppercase whitespace-nowrap text-foreground/[0.035] leading-none"
        style={{ fontSize: "clamp(110px, 18vw, 280px)", letterSpacing: "-0.04em" }}
      >
        Elevaris
      </motion.span>

      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-12 gap-y-10 gap-x-0 sm:gap-10 mb-16">
          <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-10">
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <Mark className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold text-[15px] tracking-[0.18em] uppercase text-foreground">
                  Elevaris<span className="text-muted-foreground">/AI</span>
                </span>
              </Link>
              <p className="mt-6 text-muted-foreground" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 380 }}>
                A small Australian studio building AI receptionists, websites, and local SEO for businesses that care how they look — and how they run.
              </p>
            </div>
            <p className="font-serif italic text-primary text-2xl" style={{ letterSpacing: '-0.01em' }}>
              Elevate · Adapt · Automate.
            </p>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <p className="micro-label mb-5">Practice</p>
            <ul className="flex flex-col gap-3">
              <li><Link to="/ai-agents" className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors">AI Receptionist</Link></li>
              <li><Link to="/websites-seo" className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors">Websites &amp; SEO</Link></li>
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <p className="micro-label mb-5">Studio</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:harley@elevarisai.agency" className="nav-link text-sm text-foreground hover:text-primary transition-colors">
                  harley@elevarisai.agency
                </a>
              </li>
              <li><a href="/#contact" className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors">Book a Free Demo →</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--hairline))] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">© 2026 Elevaris AI · Built locally in Australia</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex items-center justify-center w-9 h-9 rounded-full border border-[hsl(var(--hairline-strong))] text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
