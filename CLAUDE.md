# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # start dev server (localhost:5173)
bun build        # production build
bun lint         # ESLint
bun test         # run tests once (Vitest)
bun test:watch   # run tests in watch mode
```

Run a single test file:
```bash
bunx vitest run src/test/example.test.ts
```

---

## Project purpose

This is the Elevaris AI website — a portfolio and lead-generation site for an Australian studio that builds AI receptionists, websites, and local SEO for local businesses. Its primary job is to impress potential clients visually and convert them into demo bookings.

The site is a React 18 + TypeScript SPA (Vite). Routing via react-router-dom v6. Entry: `src/main.tsx` → `src/App.tsx` → `src/pages/`.

**Routing note:** `/` redirects to `/home`. Homepage is `src/pages/Index.tsx`. Other routes: `/ai-agents`, `/websites-seo`, `/contact`.

Pages assemble self-contained section components from `src/components/`. `src/components/ui/` is shadcn/ui — don't edit those files directly.

---

## Brand & design philosophy

**The aesthetic:** Dark, premium, minimal, editorial. Think high-end studio or agency portfolio — not a generic AI SaaS template.

**What this site must never look like:**
- A glowing-gradient AI startup page (no neon blobs, no animated orbs, no purple-to-cyan sweeps)
- A cluttered feature grid with icon cards and buzzwords
- Anything that feels templated, offshore, or mass-produced

**What to preserve and strengthen:**
- The editorial typographic rhythm: large display headings, tight tracking, Instrument Serif italic accents for emphasis
- The dark palette: near-black background (`--background: 240 14% 5%`), teal primary (`--primary: 184 56% 42%`), warm off-white foreground
- Generous whitespace and slow, deliberate section pacing
- Hairline dividers as structural devices — not decorative noise
- The voice: direct, confident, human ("Every client works directly with me, Harley")

---

## Design rules — follow these before every edit

**Before making any significant visual change, state the design rationale in one sentence.** ("Increasing the hero padding gives the headline room to breathe and signals premium positioning.")

**Typography hierarchy:**
- Display headings: `clamp()` fluid sizing, Space Grotesk, tight tracking (`-0.03em` to `-0.02em`), line-height ≤ 1.05
- `.accent-italic`: Instrument Serif italic in `--primary` color — use sparingly on 1–3 key words per heading, not whole phrases
- Body/sub-copy: Inter, 14–16px, `leading-[1.6]` to `leading-[1.75]`, `text-muted-foreground`
- `.micro-label`: 11px uppercase Inter, `tracking-[0.22em]` — used as section eyebrows and metadata labels only

**Spacing rhythm:**
- Section vertical padding: `py-24 md:py-32` minimum. Hero gets more: `pt-40 pb-28 lg:pt-48 lg:pb-36`
- Internal section breathing room before headlines: `mb-16` to `mb-24`
- Don't compress spacing to fit more content — cut content instead

**Animations:**
- Framer Motion, `whileInView`, `viewport: { once: true }` — animations fire once only
- `fadeUp` pattern: `opacity: 0 → 1`, `y: 24 → 0`, `duration: 0.7`, easing `[0.22, 1, 0.36, 1]`
- Stagger delays: `0.05–0.1s` between items. Never exceed `0.3s` delay on any single element
- No bounce, no scale-pop, no rotation effects. Entrances only — nothing loops or pulses except deliberate micro-interactions

**Interactions:**
- Hover states: color transitions `duration-200` to `duration-300`, never transforms except subtle `translate` on arrows
- CTAs: pill-shaped (`rounded-full`), filled primary on hover, always include an icon (ArrowUpRight)
- No shadows — elevation is communicated through border opacity (`--hairline`, `--hairline-strong`), not box-shadow

**What to avoid at all costs:**
- `bg-gradient-to-*` on large surfaces
- Glowing `box-shadow` or `drop-shadow` effects
- Animated background blobs, particles, or mesh gradients
- Cards with rounded corners > `4px` (`--radius: 0.25rem`) on structural elements
- Copy that uses: "cutting-edge", "revolutionary", "game-changing", "AI-powered", "next-gen", "seamlessly"
- Icon grids with 6+ items all the same size and weight
- Centering body copy paragraphs (only center display-level headings in manifesto/statement sections)

---

## Styling system

All design tokens are CSS custom properties in `src/index.css` (HSL format). Tailwind consumes them via `hsl(var(--token))`. Change a color site-wide by editing the variable, not individual class instances.

Key custom classes:
- `.container-narrow` — max-width 1240px centered. Use this, not Tailwind's `container`
- `.section-alt` — slightly lighter bg for alternating sections
- `.hairline` — 1px rule at `--hairline` opacity. The structural workhorse
- `.accent-italic` — Instrument Serif italic in primary color
- `.micro-label` — section eyebrow label
- `.surface` / `.glass-card` — same flat dark card surface (glass was removed; both are identical legacy aliases)
- `.pill-badge` — small bordered label pill
- `.link-underline` — underline link with hover color transition

Font families in Tailwind: `font-heading` (Space Grotesk), `font-body` (Inter), `font-serif` (Instrument Serif).

---

## Copy and messaging

**Do not change copy unless explicitly asked.** When improving a section visually, keep existing text exactly. The messaging, tone, and factual claims ("under 2 weeks", "Australian", "No lock-ins", Harley's name) are intentional and client-approved.

The brand voice is: confident, direct, human, no fluff. It speaks to small business owners who are skeptical of tech promises.

---

## Contact form

`src/components/ContactSection.tsx` posts to Formspree (`FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdyljdw"`). Validation and state (`idle | loading | success | error`) are managed in local React state — no form library. The `action` attribute is kept as a no-JS fallback.

---

## Known dead code (intentional — do not remove)

- `.micro-label-line { display: none }` — the `<span>` elements remain in markup as structural placeholders for a possible future accent line
- `.glow-blob`, `.dot-grid` — hidden; legacy from a previous design iteration
- Many `src/components/ui/` components are unused — scaffolded by the project generator, harmless
