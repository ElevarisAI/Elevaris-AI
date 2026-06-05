import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const scrambleText = (text: string) =>
  text.split("").map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)])).join("");

export const useScramble = (text: string, startDelay = 0, duration = 500) => {
  const [output, setOutput] = useState(() => scrambleText(text));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const resolved = Math.floor(progress * text.length);
        setOutput(
          text.split("").map((c, i) => {
            if (c === " ") return " ";
            if (i < resolved) return c;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, startDelay, duration]);

  return output;
};
