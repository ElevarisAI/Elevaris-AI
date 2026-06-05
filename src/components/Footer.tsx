import { Link } from "react-router-dom";
import Mark from "./Mark";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[hsl(var(--hairline))] bg-background">
      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-20">
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
              <li><Link to="/ai-agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Receptionist</Link></li>
              <li><Link to="/websites-seo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Websites &amp; SEO</Link></li>
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <p className="micro-label mb-5">Studio</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:harley@elevarisai.agency" className="text-sm text-foreground hover:text-primary transition-colors">
                  harley@elevarisai.agency
                </a>
              </li>
              <li><a href="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Book a Free Demo →</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--hairline))] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">© 2026 Elevaris AI · Built locally in Australia</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
