import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

export const TransitionOverlay = () => {
  const { phase } = usePageTransition();

  return (
    <motion.div
      className="fixed inset-0 z-[10000] origin-top"
      style={{ backgroundColor: "hsl(240 14% 4%)" }}
      animate={{ scaleY: phase === "covering" ? 1 : 0 }}
      transition={{
        duration: phase === "covering" ? 0.38 : 0.52,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Teal leading edge — visible as curtain sweeps down */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary opacity-70" />
    </motion.div>
  );
};
