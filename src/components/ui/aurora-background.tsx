import { cn } from "@/lib/utils";
import React from "react";

interface AuroraBackgroundProps {
  className?: string;
  position?: "top" | "bottom";
}

export const AuroraBackground = ({
  className,
  position = "bottom",
}: AuroraBackgroundProps) => {
  const mask =
    position === "top"
      ? "[mask-image:radial-gradient(ellipse_120%_65%_at_50%_0%,black_40%,transparent_85%)]"
      : "[mask-image:radial-gradient(ellipse_at_50%_75%,black_10%,transparent_70%)]";

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className={cn(
          `[--aurora:repeating-linear-gradient(100deg,#1e7a85_10%,#2fa8b8_15%,#40c4d0_20%,#1a6b75_25%,#2fa8b8_30%)]
          [--dark-gradient:repeating-linear-gradient(100deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.85)_7%,transparent_10%,transparent_12%,rgba(0,0,0,0.85)_16%)]
          [background-image:var(--dark-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          after:content-[''] after:absolute after:inset-0
          after:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:md:animate-aurora after:mix-blend-difference
          absolute -inset-[10px] opacity-50 will-change-transform`,
          mask
        )}
      />
    </div>
  );
};
