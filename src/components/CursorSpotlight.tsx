import { useEffect, useRef } from "react";

// The glow is a small fixed-size layer moved with a GPU transform and direct
// DOM writes — no React re-renders and no full-viewport repaints per mouse move.
// The wrapper clips it at the viewport edges, matching the previous
// full-screen-gradient rendering exactly.
const CursorSpotlight = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${e.clientX - 80}px, ${e.clientY - 80}px, 0)`;
        }
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = "1";
        }
        rafRef.current = undefined;
      });
    };
    const onLeave = () => {
      if (wrapperRef.current) wrapperRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden transition-opacity duration-500"
      style={{ opacity: 0 }}
    >
      <div
        ref={dotRef}
        style={{
          width: 160,
          height: 160,
          transform: "translate3d(-1000px, -1000px, 0)",
          willChange: "transform",
          background: "radial-gradient(circle 80px at center, rgba(47,168,184,0.55), transparent 100%)",
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
