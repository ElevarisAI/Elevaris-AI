import { useState } from "react";
import { motion } from "framer-motion";
import DrawLine from "@/components/DrawLine";

const serviceOptions = ["Agents", "SEO", "Other"];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdyljdw";

type FormState = {
  name: string;
  email: string;
  phone: string;
  business_name: string;
  service_interest: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  business_name: "",
  service_interest: "",
  message: "",
};

const heroEnter = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const ContactSection = ({ hero = false }: { hero?: boolean }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please enter your name.";
    if (form.name.length > 100) return "Name is too long.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email.trim())) return "Please enter a valid email address.";
    if (!form.service_interest) return "Please select a service interest.";
    if (form.phone && form.phone.length > 20) return "Phone number is too long.";
    if (form.message.length > 2000) return "Message is too long.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        const data = await response.json().catch(() => null);
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const isLoading = status === "loading";
  const enter = hero ? heroEnter : fadeUp;

  return (
    <section
      id="contact"
      className={hero
        ? "relative"
        : "bg-background border-t border-[hsl(var(--hairline))] border-b border-[hsl(var(--hairline))] relative overflow-hidden"
      }
    >
      {!hero && (
        <div className="py-5 flex justify-center">
          <p
            className="font-heading text-foreground text-center"
            style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            {(['Elevate', '·', 'Adapt', '·', 'Automate'] as const).map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                className={word === '·' ? 'text-muted-foreground mx-3' : undefined}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      )}
      <div className={`container-narrow px-6 sm:px-8 lg:px-12 ${hero ? "pt-40 pb-28 lg:pt-48 lg:pb-36" : "py-24 md:py-32"}`}>

        {/* Meta row */}
        <motion.div
          {...enter(0)}
          className="flex items-center justify-between mb-20 lg:mb-28"
        >
          <div className="flex items-center gap-3">
            <span className="micro-label-line" />
            <span className="micro-label">Contact</span>
          </div>
          {hero && <span className="hidden sm:block micro-label">Australia</span>}
        </motion.div>

        <div className="grid grid-cols-12 gap-12 items-start">
          {/* Left col — heading + copy */}
          <motion.div
            {...enter(hero ? 0.08 : 0)}
            className="col-span-12 md:col-span-5"
          >
            <h2
              className="font-heading font-medium text-foreground mb-8"
              style={{
                fontSize: hero ? 'clamp(44px, 6vw, 96px)' : 'clamp(32px, 5vw, 64px)',
                letterSpacing: '-0.035em',
                lineHeight: hero ? 0.95 : 1.05,
                maxWidth: hero ? '10ch' : '14ch',
              }}
            >
              Let's build something{" "}
              <span className="accent-italic">that works</span>.
            </h2>

            <motion.p
              {...enter(hero ? 0.18 : 0.05)}
              className="text-muted-foreground mb-10"
              style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '42ch' }}
            >
              Tell us about your business and the calls or enquiries you're missing. We'll respond within 24 hours.
            </motion.p>

            <motion.a
              {...enter(hero ? 0.26 : 0.1)}
              href="mailto:harley@elevarisai.agency"
              className="link-underline text-sm"
            >
              harley@elevarisai.agency
            </motion.a>

            {hero && (
              <motion.div {...heroEnter(0.34)} className="mt-16">
                <DrawLine delay={0.38} />
                <div className="mt-8 flex flex-col gap-3">
                  {["No lock-in contracts", "Live in under 2 weeks", "Australian-based"].map((item, i) => (
                    <motion.p
                      key={item}
                      {...heroEnter(0.44 + i * 0.08)}
                      className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      — {item}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right col — form */}
          <div className="col-span-12 md:col-span-7">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-primary p-12 text-center flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-foreground" style={{ letterSpacing: '-0.02em' }}>You're booked in.</h3>
                <p className="text-muted-foreground" style={{ fontSize: 15, maxWidth: '40ch' }}>
                  Thanks for reaching out. We'll be in touch within 24 hours to confirm your demo time.
                </p>
              </motion.div>
            ) : (
              <motion.form
                {...enter(hero ? 0.14 : 0.05)}
                action={FORMSPREE_ENDPOINT}
                method="POST"
                onSubmit={handleSubmit}
                noValidate
                className="p-8 md:p-10 space-y-5 border border-primary bg-[hsl(240_14%_7%/0.6)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="micro-label block mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      disabled={isLoading}
                      className="w-full bg-[hsl(0_0%_100%/0.04)] border border-[hsl(0_0%_100%/0.08)] rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      value={form.business_name}
                      onChange={handleChange}
                      maxLength={100}
                      disabled={isLoading}
                      className="w-full bg-[hsl(0_0%_100%/0.04)] border border-[hsl(0_0%_100%/0.08)] rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                      placeholder="Company"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="micro-label block mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      disabled={isLoading}
                      className="w-full bg-[hsl(0_0%_100%/0.04)] border border-[hsl(0_0%_100%/0.08)] rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={20}
                      disabled={isLoading}
                      className="w-full bg-[hsl(0_0%_100%/0.04)] border border-[hsl(0_0%_100%/0.08)] rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                      placeholder="0400 000 000"
                    />
                  </div>
                </div>
                <div>
                  <label className="micro-label block mb-2">Service Interest *</label>
                  <select
                    name="service_interest"
                    value={form.service_interest}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-[hsl(0_0%_100%/0.04)] border border-[hsl(0_0%_100%/0.08)] rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none disabled:opacity-60"
                  >
                    <option value="" className="bg-card">Select an option</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-card">{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="micro-label block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    maxLength={2000}
                    rows={4}
                    disabled={isLoading}
                    className="w-full bg-[hsl(0_0%_100%/0.04)] border border-[hsl(0_0%_100%/0.08)] rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-60"
                    placeholder="Tell us a little about your business (optional)"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p role="alert" className="text-sm text-red-400">{errorMsg}</p>
                )}

                <DrawLine className="mb-1" />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.2em] font-medium text-background bg-foreground py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending…" : "Book a Free Demo"}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
