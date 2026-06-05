import { motion } from "framer-motion";
import DrawLine from "./DrawLine";

const services = [
  {
    num: "01",
    title: "Answers every call, instantly",
    description:
      "Your AI phone agent picks up the moment your line rings. It greets callers in your business name, answers questions about services, pricing, hours, and availability, and handles the conversation like a trained team member.",
  },
  {
    num: "02",
    title: "Captures leads and books appointments",
    description:
      "It qualifies new enquiries, takes the details that matter, and books straight into your calendar or CRM. SMS confirmations and reminders go out automatically. Fewer no-shows. Fewer dropped leads.",
  },
  {
    num: "03",
    title: "Routes urgent calls to the right person",
    description:
      "Complaints, urgent jobs, and high-value callers get transferred straight through to the right team member. Everything else is logged with a clean summary, ready for follow-up.",
  },
];

const ServicesSection = () => {
  return (
    <section id="features" className="bg-background border-b border-[hsl(var(--hairline))]">
      <div className="container-narrow px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-center gap-3"
        >
          <span className="micro-label">Capabilities</span>
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
            <span className="accent-italic">Always</span> on. <span className="accent-italic">Always</span> professional. <span className="accent-italic">Always</span> capturing the opportunity.
          </motion.h2>
        </div>

        <DrawLine className="mb-0" />

        <ul className="flex flex-col">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-[hsl(var(--hairline))]"
            >
              <div className="grid grid-cols-12 gap-6 py-10 md:py-14">
                <div className="col-span-2 md:col-span-1">
                  <span className="index-numeral" style={{ fontSize: 16 }}>— {s.num}</span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3
                    className="font-heading font-medium text-foreground"
                    style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-muted-foreground" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '52ch' }}>
                    {s.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;
