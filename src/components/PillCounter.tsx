import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const PillCounter = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    // Find the first number >= 10 (skip small numbers like "1 in 3")
    const matches = Array.from(text.matchAll(/(\d[\d,]*)/g));
    const match = matches.find((m) => parseInt(m[1].replace(/,/g, "")) >= 10);
    if (!match || match.index === undefined) return;

    const target = parseInt(match[1].replace(/,/g, ""));
    const hasComma = match[1].includes(",");
    const prefix = text.slice(0, match.index);
    const suffix = text.slice(match.index + match[1].length);
    const duration = Math.min(1400, 700 + target * 0.4);
    const start = performance.now();

    const fmt = (n: number) =>
      hasComma ? n.toLocaleString() : String(n);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${fmt(Math.round(eased * target))}${suffix}`);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, text]);

  return <span ref={ref}>{display}</span>;
};

export default PillCounter;
