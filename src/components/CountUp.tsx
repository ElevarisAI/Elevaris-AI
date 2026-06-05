import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
}

const CountUp = ({ value, duration = 1400 }: CountUpProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const rafRef = useRef<number>(0);

  const getInitial = () => {
    const match = value.match(/\d+/);
    if (!match) return value;
    const prefix = value.slice(0, value.indexOf(match[0]));
    const suffix = value.slice(value.indexOf(match[0]) + match[0].length);
    return `${prefix}0${suffix}`;
  };

  const [display, setDisplay] = useState(getInitial);

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/\d+/);
    if (!match) { setDisplay(value); return; }

    const target = parseInt(match[0]);
    const prefix = value.slice(0, value.indexOf(match[0]));
    const suffix = value.slice(value.indexOf(match[0]) + match[0].length);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

export default CountUp;
