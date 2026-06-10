const items = [
  "More Bookings",
  "Never Miss a Call",
  "Rank on Google",
  "Leads That Convert",
  "Always Available",
];

const Marquee = () => (
  <div className="marquee-mask overflow-hidden border-y border-[hsl(var(--hairline))] py-4 bg-background">
    <div className="marquee-track flex whitespace-nowrap w-max">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="micro-label px-8">{item}</span>
          <span className="text-primary/50 text-[10px]">—</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
