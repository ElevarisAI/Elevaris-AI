import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import DrawLine from "@/components/DrawLine";
import { AuroraBackground } from "@/components/ui/aurora-background";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AuroraBackground position="top" />
      <Navbar />
      <main className="relative z-10 flex min-h-screen items-center">
        <div className="container-narrow w-full px-6 sm:px-8 lg:px-12 py-32">
          <motion.div {...enter(0)} className="flex items-center gap-3 mb-12">
            <span className="micro-label">404</span>
          </motion.div>

          <h1
            className="font-heading font-medium text-foreground"
            style={{ fontSize: "clamp(80px, 16vw, 240px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
          >
            <span className="overflow-hidden inline-block pb-[0.1em]">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                4<span className="accent-italic" style={{ fontSize: "0.92em" }}>0</span>4
              </motion.span>
            </span>
          </h1>

          <motion.div {...enter(0.3)} className="mt-10">
            <DrawLine delay={0.35} className="mb-8 max-w-xl" />
            <p className="text-muted-foreground mb-10" style={{ fontSize: 16, lineHeight: 1.7 }}>
              Oops! Page not found
            </p>
            <a
              href="/"
              className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.2em] font-medium text-background bg-foreground px-7 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              Return to Home
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
