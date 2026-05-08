# Cyrillic Display Bold-Render Fix — Spec

**Date:** 2026-05-08
**Status:** Draft

## Problem

Hero h1 («ВОДИ УВЕРЕННО») on `https://pride-next.vercel.app` renders cyrillic glyphs in **Arial Regular** (thin) instead of the heavy condensed look the design intends. Multiple fix attempts (font-weight tweaks, self-hosting Bebas Cyrillic, adding Oswald to fallback chain) had no visual effect.

## Root Cause

Two compounding issues:

1. **Inline `fontWeight: 400` on Desktop Hero h1** overrides the class-rule `.pr-site h1 { font-weight: 700 }` set in `globals.css`. The h1 always renders at weight 400 regardless of any CSS-rule changes.

2. **next/font/google's auto-injected `Bebas Neue Fallback`** breaks the cascade. The `var(--font-bebas)` resolves to `"Bebas Neue", "Bebas Neue Fallback"`. The Fallback is defined as `@font-face { font-family: "Bebas Neue Fallback"; src: local(Arial); }` — i.e. local Arial Regular. When cyrillic glyphs are missing from Bebas Neue, the browser uses this Fallback (thin Arial) and never reaches `'Arial Black'` later in the cascade. The `adjustFontFallback: false` option does NOT remove this Fallback declaration — only its size-adjust metrics.

## Goal

Cyrillic display text in Hero h1 (and any other `.pr-site h1-h4` element) renders heavy/condensed across all platforms (Windows, Mac, iOS, Android, Linux) without depending on user-installed system fonts.

## Solution (Option B: self-hosted heavy cyrillic display)

Re-route cyrillic glyphs to **Oswald 700** (already self-hosted via `next/font/google` as part of the existing project — supports cyrillic + latin, weights 500/600/700, served from the Vercel CDN) rather than relying on whatever Bebas Neue's internal Fallback wraps to.

### Concrete changes

1. **`src/components/desktop/Hero.tsx`** — remove inline `fontWeight: 400` on the h1. Let the class rule's `font-weight: 700` apply.

2. **`src/app/globals.css`** — change `--pr-display` cascade from
   ```css
   var(--font-bebas), 'Bebas Neue', 'Arial Black', var(--font-oswald), 'Oswald', sans-serif
   ```
   to
   ```css
   'Bebas Neue', 'Oswald', 'Arial Black', sans-serif
   ```
   - Drops `var(--font-bebas)` so the Fallback wrapper is bypassed.
   - Literal `'Bebas Neue'` still resolves to the next/font-loaded Bebas Neue (registered as that font-family by next/font itself), but without the Fallback wrapper.
   - Cyrillic glyphs cleanly fall through Bebas Neue (no cyrillic in unicode-range) → Oswald 700 (has cyrillic + heavy at the requested 700 weight) → Arial Black if present (Windows/Mac extra reliability) → sans-serif.

3. **No new font assets needed.** Oswald is already loaded by `src/app/layout.tsx` via `next/font/google`, weights `["500", "600", "700"]`, subsets `["latin", "cyrillic"]`.

### Per-script rendering after the fix

| Element | Latin | Cyrillic |
|---|---|---|
| Hero h1 (weight 700 from class) | Bebas Neue (browser may faux-bold the 400-only file) | **Oswald 700** ← the bold heavy condensed look |
| Other h2/h3/h4 (weight 700) | same | same |
| Body text (weight 400, font-text Manrope) | Manrope 400 | Manrope 400 cyrillic (already loaded) |

## Trade-offs

- Latin Hero h1 will be Bebas Neue at faux-bold (since only weight 400 is loaded). On most modern browsers this synthetic bold is acceptable; on a few it may look slightly chunky.
- An alternative would be to load Bebas Neue at multiple weights — but Bebas Neue ships only weight 400 from Google Fonts, so this isn't possible without sourcing a different cut.
- For cyrillic text we get a guaranteed Oswald 700 render — heavy condensed, design-faithful.

## Acceptance

- Heading «ВОДИ УВЕРЕННО» on the live site visibly matches the design's heavy condensed look.
- Build passes, lint clean, no regressions on other sections.
