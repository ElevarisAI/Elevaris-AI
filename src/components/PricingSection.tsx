import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Mark from "./Mark";

const features = [
  "Custom AI phone agent built for your business",
  "Answers every inbound call, 24/7",
  "Books appointments and captures leads",
  "Handles FAQs and qualifies enquiries",
  "Escalates urgent calls to your team",
  "SMS confirmations and reminders",
  "Ongoing monitoring and optimisation",
  "Australian-based support",
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-background border-b border-[hsl(var(--hairline))]">
      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-3"
        >
          <span className="micro-label">Investment</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 flex flex-col items-center text-center"
        >
          <h2
            className="font-heading font-medium text-foreground"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '24ch' }}
          >
            One simple price. <span className="accent-italic">Unlimited</span> calls.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl" style={{ fontSize: 15, lineHeight: 1.7 }}>
            No per-minute fees. No complicated tiers. A fixed monthly cost that pays for itself with a single recovered booking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative border border-primary bg-background"
        >
          <Mark className="absolute right-8 top-8 w-8 h-8 text-primary" />

          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[hsl(var(--hairline))]">
              <p className="micro-label mb-4">AI Receptionist</p>
              <h3
                className="font-heading text-foreground mb-10"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}
              >
                Complete setup &amp; monthly service
              </h3>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="micro-label mb-3">Setup</p>
                  <p className="font-heading text-foreground" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    $599
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 tracking-wide">one-time AUD</p>
                </div>
                <div>
                  <p className="micro-label mb-3">Service</p>
                  <p className="font-heading text-foreground" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    $999
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 tracking-wide">per month AUD</p>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.2em] font-medium text-background bg-foreground px-7 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Book a Free Demo
              </a>
              <p className="text-xs text-muted-foreground mt-5 tracking-wide">
                No lock-in contract. Cancel with 30 days notice.
              </p>
            </div>

            <div className="col-span-12 md:col-span-5 p-8 md:p-12">
              <p className="micro-label mb-6">Included</p>
              <ul className="flex flex-col">
                {features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 py-3 border-t border-[hsl(var(--hairline))] first:border-t-0 text-foreground"
                    style={{ fontSize: 14 }}
                  >
                    <Check size={15} className="text-primary mt-1 shrink-0" />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Multiple locations or a custom setup?{" "}
          <a href="#contact" className="text-foreground underline underline-offset-4 decoration-[hsl(var(--hairline-strong))] hover:decoration-primary hover:text-primary transition-colors">
            Book a Free Demo →
          </a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
