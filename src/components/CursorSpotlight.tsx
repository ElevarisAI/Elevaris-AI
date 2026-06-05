import { useState, useEffect, useRef } from "react";

const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
        rafRef.current = undefined;
      });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
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
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(circle 80px at ${pos.x}px ${pos.y}px, rgba(47,168,184,0.55), transparent 100%)`,
      }}
    />
  );
};

export default CursorSpotlight;
