import { motion } from "framer-motion";
import DrawLine from "./DrawLine";
import CountUp from "./CountUp";

const metrics = [
  { value: "24/7", label: "Answers calls day and night, including weekends" },
  { value: "2 Weeks", label: "From kickoff call to your phone agent going live" },
  { value: "0", label: "Calls sent to voicemail once you're live" },
  { value: "100%", label: "Custom-built for how your business actually runs" },
];

const steps = [
  { num: "01", title: "We learn your business", description: "A 30-minute call to map out your services, pricing, hours, common questions, and how you want urgent calls handled." },
  { num: "02", title: "We build your AI phone agent", description: "Voice, script, and call flows tuned to how you actually operate. Not a generic template dropped on top of your number." },
  { num: "03", title: "We connect it to your existing tools", description: "Plugged into your phone number, booking system or CRM, and SMS. No new software for you or your team to learn." },
  { num: "04", title: "You go live. We keep it sharp.", description: "Your phone agent starts taking calls. We monitor performance, refine the script, and adapt as your business evolves." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-alt border-b border-[hsl(var(--hairline))]">
      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-center gap-3"
        >
          <span className="micro-label">The Process</span>
        </motion.div>

        <div className="mb-16 md:mb-20 flex justify-center">
          <motion.h2
            className="font-heading font-medium text-foreground text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Live in under <span className="accent-italic">two weeks</span>. No tech skills required.
          </motion.h2>
        </div>

        <DrawLine className="mb-0" />

        <div className="grid grid-cols-12 gap-y-12 gap-x-0 lg:gap-16">
          <ol className="col-span-12 lg:col-span-7 flex flex-col">
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-[hsl(var(--hairline))] last:border-b"
              >
                <div className="grid grid-cols-12 gap-4 py-8">
                  <div className="col-span-2">
                    <span className="index-numeral">— {step.num}</span>
                  </div>
                  <div className="col-span-10">
                    <h3
                      className="font-heading text-foreground mb-2"
                      style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: 14.5, lineHeight: 1.7, maxWidth: '52ch' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="col-span-12 lg:col-span-5 lg:self-center">
            <div className="grid grid-cols-2 gap-px bg-[hsl(var(--hairline))] border border-[hsl(var(--hairline))]">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.value}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-background p-6 md:p-8"
                >
                  <p
                    className="font-heading text-foreground mb-3"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}
                  >
                    <CountUp value={m.value} />
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 13, lineHeight: 1.55 }}>
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
