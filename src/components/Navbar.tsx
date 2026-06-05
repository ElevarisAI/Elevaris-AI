import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "AI Receptionist", to: "/ai-agents" },
  { label: "Websites & SEO", to: "/websites-seo" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(240_14%_5%/0.85)] backdrop-blur-xl border-b border-[hsl(var(--hairline))]"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-16 md:h-20 px-6 sm:px-8 lg:px-12">
        <Link to="/home" className="flex items-center gap-2.5 group" aria-label="Elevaris AI">
          <img src="/favicon-512.png" alt="" className="w-5 h-5" />
          <span className="font-heading font-semibold text-[15px] tracking-[0.18em] uppercase text-foreground">
            Elevaris AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] uppercase tracking-[0.18em] font-medium border border-[hsl(var(--hairline-strong))] text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
        >
          Book a Free Demo
        </Link>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[hsl(240_14%_5%/0.97)] backdrop-blur-xl border-b border-[hsl(var(--hairline))]"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground py-3 px-4 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center px-5 py-3 text-[12px] uppercase tracking-[0.18em] font-medium border border-[hsl(var(--hairline-strong))] text-foreground rounded-full"
              >
                Book a Free Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
