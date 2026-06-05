import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Mark from "./Mark";
import DrawLine from "./DrawLine";

const trustPoints = [
  "No lock-in contracts — cancel anytime",
  "Australian-based setup and support",
  "Live in under 2 weeks, guaranteed",
];

const values = [
  { label: "Mission", text: "Make modern digital tools — AI agents, websites, and local SEO — available and affordable for Australian businesses that don't have a tech team." },
  { label: "Approach", text: "Custom-built, not templated. I learn how your business actually works before designing anything around it." },
  { label: "Promise", text: "Clear timelines. No lock-ins. No surprises. If I don't deliver what we agreed, you don't pay." },
];

const AboutUsSection = () => {
  return (
    <section id="why-elevaris" className="bg-background">
      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="micro-label">Who We Are</span>
        </motion.div>

        <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <h2
              className="font-heading font-medium text-foreground mb-10"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: '16ch' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                We don't just build tools.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                We build <span className="accent-italic">your business</span> online.
              </motion.div>
            </h2>

            <DrawLine className="mb-8" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-foreground/85 mb-5"
              style={{ fontSize: 16, lineHeight: 1.75, maxWidth: '60ch' }}
            >
              Elevaris AI started in London, where I'm from. It's now based in Sydney, built around one idea: that local businesses deserve the same quality of digital infrastructure as the big ones. Every AI agent, every website, every SEO system is hand-built by me, Harley. No templates. No offshore handoffs. No junior staff.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground mb-10"
              style={{ fontSize: 16, lineHeight: 1.75, maxWidth: '60ch' }}
            >
              Whether it's a voice agent that answers every call, a website that earns trust in seconds, or being the first name locals find on Google. Every piece is built specifically for your business, and built to perform.
            </motion.p>

            <ul className="flex flex-col">
              {trustPoints.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 py-3 border-t border-[hsl(var(--hairline))] last:border-b text-foreground/80"
                  style={{ fontSize: 14.5 }}
                >
                  <Check size={15} className="text-primary shrink-0" />
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="border border-[hsl(var(--hairline))]">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[hsl(var(--hairline))]">
                <span className="micro-label">Principles</span>
                <Mark className="w-4 h-4 text-primary" />
              </div>
              {values.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`p-6 md:p-8 ${i > 0 ? 'border-t border-[hsl(var(--hairline))]' : ''}`}
                >
                  <p className="font-serif italic text-primary mb-3" style={{ fontSize: 18 }}>
                    — {item.label}
                  </p>
                  <p className="text-foreground/85" style={{ fontSize: 15.5, lineHeight: 1.65 }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
