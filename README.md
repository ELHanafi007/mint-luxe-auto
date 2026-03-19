# MINT. LUXE. AUTO.

A bespoke automotive concierge and boutique showroom experience. Curating the world's most exceptional vehicles with an editorial, high-motion aesthetic.

## Architecture

Built with a "Subliminal Motion" philosophy, prioritizing restraint and refined pacing to evoke a sense of luxury.

### Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: Vanilla CSS Modules with a custom Architectural Grid system
- **Motion**: [Framer Motion](https://www.framer.com/motion/) with custom `MINT_EASE`
- **Typography**: Inter (Sans) & Playfair Display (Serif)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)

## Core Components

- **Preloader**: 2.5s introduction sequence to set the editorial tone.
- **Architectural Grid**: Standardized `Section`, `Container`, and `Grid` primitives for consistent spatial rhythm.
- **Motion Primitives**: Reusable entrance and hover animations defined in `src/lib/motion-primitives.ts`.

## Layout Structure

- **Hero**: Staggered line-reveal title with cinematic background.
- **Collection**: High-contrast grid featuring current vehicle inventory.
- **Services**: Multi-column breakdown of concierge offerings.
- **Philosophy**: Asymmetrical editorial section with parallax imagery.
- **Inquiry**: Minimalist consultation form for high-intent leads.

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the experience.
\n<!-- Redeploy triggered at Thu Mar 19 03:50:38 AM +00 2026 -->
