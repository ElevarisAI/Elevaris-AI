import GrainOverlay from "@/components/GrainOverlay";
import CursorSpotlight from "@/components/CursorSpotlight";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const AIAgents = lazy(() => import("./pages/AIAgents"));
const WebsitesSEO = lazy(() => import("./pages/WebsitesSEO"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    if (timerRef.current) clearTimeout(timerRef.current);
    // exit 220ms + enter 600ms + 80ms buffer
    timerRef.current = setTimeout(() => {
      document.documentElement.style.overflowY = '';
    }, 900);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [location.key]);

  return (
    <>
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 1.012 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, scale: 0.988, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
      >
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Index />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/websites-seo" element={<WebsitesSEO />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GrainOverlay />
      <CursorSpotlight />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
