import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const messages = [
  { from: "caller", text: "Hi there — I need to book my Hilux in for a service. It's due for its 60k." },
  { from: "ai",     text: "Sure thing. What day were you thinking?" },
  { from: "caller", text: "Is Tuesday any good?" },
  { from: "ai",     text: "Tuesday works. We have 7:30am, 10am, or 2pm available — what time suits?" },
  { from: "caller", text: "10am please. Name's Dave." },
  { from: "ai",     text: "Perfect, Dave — you're booked in for Tuesday at 10am for your 60k service. Confirmation text coming through now. Anything else?" },
  { from: "caller", text: "Yeah — the brakes have felt a bit spongy lately. Can you flag that for the tech?" },
  { from: "ai",     text: "Absolutely — noted. The technician will check the brakes during your service. See you Tuesday, Dave." },
];

// [type, delay ms] — caller: ~0.14s/word, AI: ~0.07s/word
const timeline: ["msg" | "wave" | "footer", number][] = [
  ["msg",    600],    // caller 1: 17w → finishes ~2980ms
  ["wave",   3250],
  ["msg",    4150],   // AI 1: 7w → finishes ~4640ms
  ["msg",    5000],   // caller 2: 4w → finishes ~5560ms
  ["wave",   5900],
  ["msg",    6800],   // AI 2: 12w → finishes ~7640ms
  ["msg",    8000],   // caller 3: 4w → finishes ~8560ms
  ["wave",   8900],
  ["msg",    9800],   // AI 3: 20w → finishes ~11200ms
  ["msg",    11700],  // caller 4: 16w → finishes ~13940ms
  ["wave",   14300],
  ["msg",    15200],  // AI 4: 15w → finishes ~16250ms
  ["footer", 17500],
];

const Waveform = () => (
  <div className="flex items-center gap-[3px]" style={{ height: 16 }}>
    {[0.5, 1.0, 0.7, 0.9, 0.4, 0.8, 0.6].map((amp, i) => (
      <motion.span
        key={i}
        className="w-[2px] bg-primary rounded-full block"
        style={{ height: "100%", transformOrigin: "center" }}
        animate={{ scaleY: [0.2, amp, 0.2] }}
        transition={{ duration: 0.7 + i * 0.05, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const WordReveal = ({ text, slow = false }: { text: string; slow?: boolean }) => {
  const words = text.split(" ");
  const interval = slow ? 0.14 : 0.07;
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * interval, ease: "easeOut" }}
        >
          {word}{i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
};

const LiveConversation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [showWave, setShowWave] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timeline.forEach(([type, delay]) => {
      timers.push(setTimeout(() => {
        if (type === "wave")   setShowWave(true);
        else if (type === "footer") setShowFooter(true);
        else { setShowWave(false); setVisibleCount(c => c + 1); }
      }, delay));
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleCount, showWave]);

  return (
    <div ref={ref} className="w-full h-full bg-[hsl(240_14%_7%)] rounded-xl flex flex-col font-body overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[hsl(var(--hairline))] px-8 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Live Call — Ridge Auto Workshop</span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-primary">● Connected</span>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-0">
        <AnimatePresence>
          {messages.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid py-3"
              style={{ gridTemplateColumns: "72px 1fr", gap: "16px" }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium pt-0.5 shrink-0"
                style={{ color: msg.from === "ai" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
              >
                {msg.from === "ai" ? "AI" : "Caller"}
              </span>
              <p className="text-sm text-foreground leading-relaxed">
                <WordReveal text={msg.text} slow={msg.from === "caller"} />
              </p>
            </motion.div>
          ))}

          {showWave && (
            <motion.div
              key="wave"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid py-3"
              style={{ gridTemplateColumns: "72px 1fr", gap: "16px" }}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-primary pt-0.5">AI</span>
              <div className="pt-1"><Waveform /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-t border-[hsl(var(--hairline))] px-8 py-4 flex items-center justify-between shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Booking confirmed — Tuesday 10:00am</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary">Synced to calendar ✓</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveConversation;
