import { motion } from "framer-motion";
import DrawLine from "./DrawLine";
import AnimatedShaderBackground from "./ui/animated-shader-background";

const rows = [
  {
    num: "01",
    title: "You're with a customer. Your phone is ringing.",
    description:
      "Whether you're on a job site, mid-treatment, or with a client across the desk, the phone keeps ringing. Most callers won't leave a voicemail. They call the next business on the list.",
    pill: "62% never call back",
  },
  {
    num: "02",
    title: "Every missed call is a lead going to your competitor.",
    description:
      "Enquiries come in after hours, on weekends, and during your busiest moments. Without someone to answer, those leads quietly walk to whoever picks up first.",
    pill: "1 in 3 calls unanswered",
  },
  {
    num: "03",
    title: "No-shows and forgotten follow-ups quietly drain revenue.",
    description:
      "Unconfirmed bookings, unqualified enquiries, and follow-ups that never happen. Each one costs less than a sale. Together they add up to thousands every month.",
    pill: "$1,000+ lost per month",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-alt border-y border-[hsl(var(--hairline))] relative overflow-hidden">
      <AnimatedShaderBackground className="opacity-75" />
      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-center gap-3"
        >
          <span className="micro-label">The Problem</span>
        </motion.div>

        <div className="mb-16 md:mb-20 flex justify-center">
          <h2
            className="font-heading font-medium text-foreground text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch' }}
          >
            {([
              ["Every", true], ["day", true], ["you're", false], ["open,", false],
              ["you're", false], ["losing", true], ["leads", true], ["you", false],
              ["don't", false], ["even", false], ["know", false], ["about.", false],
            ] as [string, boolean][]).map(([word, italic], i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i <= 3 ? 0.5 + i * 0.12 : 1.31 + (i - 4) * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
                className={italic ? "accent-italic" : undefined}
              >
                {word}{" "}
              </motion.span>
            ))}
          </h2>
        </div>

        <DrawLine className="mb-0" />

        <div className="flex flex-col">
          {rows.map((row, i) => (
            <motion.div
              key={row.num}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.65, delay: i === 0 ? 2.9 : i === 1 ? 3.92 : 3.99, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[hsl(var(--hairline))] last:border-b"
            >
              <div className="problem-row">
                <div>
                  <span className="index-numeral" style={{ fontSize: 16 }}>— {row.num}</span>
                </div>
                <div>
                  <h3
                    className="font-heading text-foreground mb-3"
                    style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}
                  >
                    {row.title}
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '60ch' }}>
                    {row.description}
                  </p>
                </div>
                <div className="stat-pill">
                  <span
                    className="inline-block text-primary"
                    style={{ border: '1px solid hsl(var(--primary) / 0.4)', padding: '7px 14px', borderRadius: 999, fontSize: 12, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
                  >
                    {row.pill}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
