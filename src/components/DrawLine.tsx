import { motion } from "framer-motion";

interface DrawLineProps {
  className?: string;
  delay?: number;
}

const DrawLine = ({ className = "", delay }: DrawLineProps) => {
  const animationProps =
    delay !== undefined
      ? {
          animate: { scaleX: 1 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {
          whileInView: { scaleX: 1 } as const,
          viewport: { once: true },
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <motion.div
      className={`h-px bg-[hsl(var(--hairline))] ${className}`}
      initial={{ scaleX: 0 }}
      style={{ transformOrigin: "left" }}
      {...animationProps}
    />
  );
};

export default DrawLine;
