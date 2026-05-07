# Pride · Next.js Redesign — Design Specification

> **For agentic workers:** This is the design spec, not the implementation plan. After this spec is approved, the next step is `writing-plans` skill which produces a step-by-step task list.

**Date:** 2026-05-08
**Status:** Draft (awaiting user review)

## Problem

The current Pride driving-school landing runs on in-browser Babel + JSX (legacy stack). Two prior modernization attempts (Vite SPA, Astro 5) hit issues:
- **Astro attempt** (commit `61d2507` on `astro-archive` branch): `@astrojs/tailwind` v6 silently failed to scan `.astro` files, no responsive utilities reached the CSS bundle. Mobile completely broken on production. Rolled back.
- **Mobile design problem**: every previous responsive-only attempt failed because the marketing layout was inline-styled at desktop sizes (`fontSize: 220`, `padding: 80px`) without a corresponding mobile-design pass.

A fresh design bundle from claude.ai/design (`Pride Redesign.html` + `mobile-site.jsx` + `mobile-menu.jsx` + `mobile.jsx`) provides the **finalized mobile design** as a separate component tree at 390px width, parallel to the desktop tree at 1920px. This is the inflection — instead of forcing one responsive layout, we port two distinct trees and switch via CSS visibility.

## Goal

Build a production-quality Next.js 15 site that:
1. **Pixel-matches** the design bundle for both desktop (`site.jsx`) and mobile (`mobile-site.jsx`) trees.
2. **Preserves legacy interactivity**: enroll modal with multi-step form, mobile burger overlay, mobile instructor detail screen.
3. **Submits enrollments to existing `bot.js`** (Telegram admin chat with status-toggle inline buttons) via a new HTTP endpoint added to that bot.
4. **Modern stack**: Next.js 15 App Router + RSC + TypeScript + Tailwind 4, deployed to Vercel.
5. **Adaptive split** (not responsive): two component trees, hidden via CSS visibility.

## Non-Goals

- Unify desktop and mobile into one responsive layout. Tried twice, painful both times.
- Replace `bot.js` or change Telegram-based admin flow.
- Add a CMS, blog, or i18n.
- Lighthouse perfect scores; target ≥ 90 mobile.
- Replace gh-pages legacy deployment in this iteration. Both run in parallel until Vercel version is approved by the user; gh-pages stays on legacy.

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC = 0 JS for static sections, mature ecosystem, Vercel auto-deploy |
| Language | TypeScript | Standard |
| Styling | Tailwind CSS 4 (Oxide engine) + CSS-vars | Tailwind 4 is 5–10× faster than v3, modern `@import "tailwindcss"` syntax |
| React | React 19 | Bundled with Next.js 15 |
| Fonts | `next/font/google` (Bebas Neue, Manrope, JetBrains Mono) | Self-hosted, FOUT-friendly, preload critical |
| Images | `next/image` | Auto WebP, responsive sizes, lazy below-fold |
| Form | Server Action → POST to `bot.js` HTTP endpoint | Auth via shared secret in header |
| Bot | Existing `bot.js` + Express HTTP endpoint (~30 lines added) | Zero rewrite of working logic |
| Deploy | Vercel (Next.js) + user's existing server (`bot.js`) | Free tier sufficient |

## File Structure (target)

```
C:/Users/david/Documents/Pride/
├── pride-driving-school/    # LEGACY — only bot.js gets touched
│   └── bot.js               # Existing + new POST /api/enroll endpoint
└── pride-next/              # NEW Next.js project, separate git repo
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── postcss.config.mjs   # Tailwind 4 via @tailwindcss/postcss
    ├── public/
    │   └── assets/          # logo.svg, instructor_*.jpg, student_*.jpg (copied from legacy public/assets/)
    └── src/
        ├── app/
        │   ├── layout.tsx           # html shell, fonts, globals.css
        │   ├── page.tsx             # renders <DesktopLanding> + <MobileLanding> with CSS visibility
        │   ├── globals.css          # CSS variables, primitives, keyframes (port from Pride Redesign.html <style>) + @import "tailwindcss"
        │   └── actions.ts           # 'use server' submitEnrollment fn
        ├── components/
        │   ├── desktop/             # port from design/site.jsx
        │   │   ├── Landing.tsx      # composes all sections
        │   │   ├── Header.tsx
        │   │   ├── Hero.tsx
        │   │   ├── Marquee.tsx
        │   │   ├── Courses.tsx
        │   │   ├── Instructors.tsx
        │   │   ├── Trust.tsx
        │   │   ├── Reviews.tsx
        │   │   ├── Faq.tsx
        │   │   └── Footer.tsx
        │   ├── mobile/              # port from design/mobile-site.jsx
        │   │   ├── Landing.tsx
        │   │   ├── Header.tsx
        │   │   ├── Hero.tsx
        │   │   ├── Marquee.tsx
        │   │   ├── Courses.tsx
        │   │   ├── Instructors.tsx
        │   │   ├── Trust.tsx
        │   │   ├── Reviews.tsx
        │   │   ├── Faq.tsx
        │   │   ├── EnrollSection.tsx
        │   │   └── Footer.tsx
        │   ├── shared/
        │   │   └── PrLion.tsx       # SVG logo wrapper
        │   └── islands/
        │       ├── EnrollModal.tsx       # 'use client', multi-step form
        │       ├── BurgerMenu.tsx        # 'use client', mobile overlay
        │       └── InstructorDetail.tsx  # 'use client', mobile-only detail screen
        ├── data/
        │   ├── reviews.json (55 entries)
        │   ├── courses.json (3 plans)
        │   ├── instructors.json (3 people)
        │   └── faq.json (5 Q&A)
        └── lib/
            ├── enroll.ts            # FormData type, validation
            └── env.ts               # Typed env vars
```

## Architecture: Adaptive Split

```tsx
// app/page.tsx — Server Component
import DesktopLanding from '@/components/desktop/Landing';
import MobileLanding from '@/components/mobile/Landing';

export default function Page() {
  return (
    <>
      <div className="hidden md:block"><DesktopLanding /></div>
      <div className="md:hidden"><MobileLanding /></div>
    </>
  );
}
```

Both trees render server-side (RSC), CSS hides one based on viewport. **0 JS for static content.** No UA detection, no hydration mismatch, no flash-of-wrong-version.

Trade-off: HTML payload is ~2× one variant alone (~200 KB total). Acceptable for marketing landing; gzip compresses well due to repetition.

## Component Port: Source Mapping

Visual source = design bundle (`/tmp/design-extract/pride/project/site.jsx` + `mobile-site.jsx`).
Interactive logic source = legacy `pride-driving-school/public/site.jsx` + `mobile-site.jsx` (which extends design with state hooks).

Port strategy: **Inline `style={{...}}` from JSX is ported as-is, no Tailwind rewriting.** This guarantees pixel fidelity and removes the responsive-rewriting risk that broke previous attempts. Tailwind is used only for breakpoint switching (`hidden md:block`) and incidental utility needs.

| Component | Visual src | Interactive src |
|---|---|---|
| `desktop/Header` | `design/site.jsx PrHeader` | + `data-pr-enroll-trigger` + `data-pr-burger` |
| `desktop/Hero` | `design/site.jsx PrHero` | + `data-pr-enroll-trigger` on CTA |
| `desktop/Marquee` | `design/site.jsx PrMarquee` | static |
| `desktop/Courses` | `design/site.jsx PrCourses` | + `data-pr-enroll-trigger data-course="..."` per card |
| `desktop/Instructors` | `design/site.jsx PrInstructors` | static (no detail on desktop) |
| `desktop/Trust` | `design/site.jsx PrTrust` | static |
| `desktop/Reviews` | `design/site.jsx PrReviews` | static (CSS-only marquee + masonry) |
| `desktop/Faq` | `design/site.jsx PrFaq` | native `<details>` (no React state) |
| `desktop/Footer` | `design/site.jsx PrFooter` | static |
| `mobile/Header` | `design/mobile-site.jsx PrMSHeader` | + `data-pr-burger` |
| `mobile/Hero` | `design/mobile-site.jsx PrMSHero` | + `data-pr-enroll-trigger` |
| `mobile/Marquee` | `design/mobile-site.jsx PrMSMarquee` | static |
| `mobile/Courses` | `design/mobile-site.jsx PrMSCourses` | + `data-pr-enroll-trigger data-course="..."` |
| `mobile/Instructors` | `design/mobile-site.jsx PrMSInstructors` | + `data-pr-instructor-card data-idx="N"` |
| `mobile/Trust` | `design/mobile-site.jsx PrMSTrust` | static |
| `mobile/Reviews` | `design/mobile-site.jsx PrMSReviews` | static |
| `mobile/Faq` | `design/mobile-site.jsx PrMSFaq` | native `<details>` |
| `mobile/EnrollSection` | `design/mobile-site.jsx PrMSEnroll` | + `data-pr-enroll-trigger` |
| `mobile/Footer` | `design/mobile-site.jsx PrMSFooter` | static |
| `islands/EnrollModal` | port from `legacy PrEnrollCard + PrEnrollModal` | client, listens `[data-pr-enroll-trigger]` |
| `islands/BurgerMenu` | `design/mobile-menu.jsx PrMobileMenu` | client, listens `[data-pr-burger]` |
| `islands/InstructorDetail` | `legacy mobile-site.jsx PrMSInstructorDetail` | client, mobile-only listener on `[data-pr-instructor-card]` |

## Data Flow

### Static data (build-time RSC)
JSON files in `src/data/` imported directly in Server Components. Reviews, courses, instructors, FAQ all serialized into RSC payload. Zero client JS for this data. Same content as legacy.

### Interactive triggers (data attributes)

Server-rendered buttons emit data attributes; client islands attach document-level listeners. This is the only way to bridge from server-rendered triggers to client-only modal state without prop-drilling through the server boundary.

| Attribute | Listener |
|---|---|
| `data-pr-enroll-trigger` | `EnrollModal` (open) |
| `data-course="СТАРТ\|ПРЕМИУМ\|VIP"` (in addition) | `EnrollModal` (preselect, jump to step 2) |
| `data-pr-burger` | `BurgerMenu` (open) |
| `data-pr-instructor-card` + `data-idx` | `InstructorDetail` (open at idx, mobile only) |

### Form submission

```
User submits step 3 of EnrollModal (name + phone)
↓ Server Action submitEnrollment({course, category, transmission, name, phone})
↓ fetch(`${BOT_ENDPOINT_URL}/api/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Auth': BOT_SHARED_SECRET },
    body: JSON.stringify(payload)
  })
↓ bot.js validates X-Auth, calls bot.sendMessage(ADMIN_CHAT_ID, msg, inline_keyboard: [[{text:'⏳ Не звонили', callback_data:'status_not_called'}]])
↓ Telegram delivers to admin
↓ Server Action returns { ok: true }
↓ EnrollModal advances to step 4 (success screen)
```

`bot.js` `callback_query` handler (existing, unchanged) handles "Позвонили / Не звонили" toggle on the message.

### Env vars

```
# pride-next/.env.local (and Vercel project settings)
BOT_ENDPOINT_URL=https://your-server.com:3001
BOT_SHARED_SECRET=<32-char random>

# pride-driving-school/.env (existing + 3 new)
VITE_TELEGRAM_BOT_TOKEN=<existing>
ADMIN_CHAT_ID=<your telegram chat id>
BOT_SHARED_SECRET=<same as Next.js>
BOT_HTTP_PORT=3001
```

## bot.js v2 (delta only)

Add to existing `bot.js` (after current bot setup):

```js
import express from 'express';

const app = express();
app.use(express.json({ limit: '8kb' }));

app.post('/api/enroll', (req, res) => {
  if (req.headers['x-auth'] !== process.env.BOT_SHARED_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { course, category, transmission, name, phone } = req.body;
  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'name+phone required' });
  }
  const msg = `🚗 Новая заявка\n\nИмя: ${name}\nТелефон: ${phone}\nКурс: ${course}\nКатегория: ${category}\nКоробка: ${transmission}`;
  bot.sendMessage(process.env.ADMIN_CHAT_ID, msg, {
    reply_markup: { inline_keyboard: [[{ text: '⏳ Не звонили', callback_data: 'status_not_called' }]] },
  })
    .then(() => res.json({ ok: true }))
    .catch((err) => {
      console.error('Telegram send failed', err);
      res.status(500).json({ error: 'telegram_failed' });
    });
});

app.listen(process.env.BOT_HTTP_PORT || 3001, () => {
  console.log(`Bot HTTP endpoint on :${process.env.BOT_HTTP_PORT || 3001}`);
});
```

`package.json` adds `express` dependency. Polling and callback handlers are untouched.

## Hydration & SSR Safety

- All islands are `'use client'` components imported via `next/dynamic` with `ssr: false` — modals never SSR-render. Initial state `open=false`, `if(!open) return null`. No flash, no hydration diff.
- Document/window access only inside `useEffect`.
- No client-side data fetching. All data is RSC payload from JSON imports.

## Error Handling

| Failure | Surface | UX |
|---|---|---|
| Empty name/phone | Step 3 client validation | Red text, no advance |
| Invalid phone (< 10 digits) | Step 3 client validation | Red text |
| `bot.js` unreachable (network) | Server Action try/catch | Red error in modal: "Не удалось отправить, попробуйте через минуту или [WhatsApp link]" |
| `bot.js` returns 401 | Logged server-side, generic to user | Red error |
| Telegram API failure | `bot.js` returns 500 | Red error |
| Double-submit | UI: `disabled` button while pending | Spinner |
| Resize during burger open | matchMedia listener | Auto-close menu at ≥768px |
| Resize during instructor detail open | matchMedia listener | Auto-close detail at ≥768px |
| Tap card on desktop | Listener checks `matchMedia('(max-width:767px)')` | Ignored |

## Performance Targets

- Lighthouse Mobile Performance ≥ 90
- LCP < 2.5s on 4G
- CLS < 0.1
- TTI < 3.5s on 4G
- Total JS (after gzip): islands < 30 KB combined, framework + RSC runtime ~50 KB

Achieved by:
- RSC for static sections (no JS for Header / Hero / Marquee / Courses / Instructors / Trust / Reviews / Faq / Footer)
- `next/font/google` with `display: 'swap'` and preload for critical fonts
- `next/image` for raster images with WebP and responsive sizes
- Hero lion silhouette gets `priority`; below-fold images lazy
- Three islands lazy-loaded after first paint via `next/dynamic`
- Tailwind 4 produces minimal CSS (~10–20 KB after PurgeCSS / built-in tree-shaking)

## Browser Support

Modern only. Tailwind 4 requires Safari ≥ 16.4 / Chrome ≥ 111. iOS 16.4+ covers 95%+ of mobile traffic. No IE / legacy fallbacks.

## Testing Strategy

| Level | What | How |
|---|---|---|
| Build | `npm run build` green, no TS errors | CI on every push (GitHub Actions) |
| Lint | ESLint default Next.js config | CI on every push |
| Visual smoke | Both trees render at 360 / 390 / 414 / 768 / 1280 / 1920 | Manual on Vercel Preview before prod merge |
| Form smoke | Real submission to test Telegram chat | Manual on Vercel Preview after form changes |
| Interactive smoke | Burger / Instructor detail / Modal open-close | Manual on Vercel Preview |
| Performance | Lighthouse Mobile Performance ≥ 90 | Manual before prod merge |

No unit tests, E2E, visual regression, or a11y unit tests in v1. Marketing landing — change frequency low, manual smoke is sufficient.

## Deploy & Rollback

- New project at GitHub repo `pride-next`. Vercel auto-deploys from `main`.
- Production legacy at `davidsuxcess.github.io/pride-driving-school/` (gh-pages of `pride-driving-school` repo) **stays untouched** until user accepts the new Vercel version.
- After acceptance: either redirect gh-pages to Vercel URL, or point a custom domain at Vercel.
- Rollback: legacy is preserved. Astro attempt is on `astro-archive` branch. New attempt is its own repo. No mixing, no overwrites.

## Out of Scope (deferred)

- Custom domain config (user's call).
- Analytics (Vercel Analytics is one click but not required for v1).
- Sitemap.xml / robots.txt (auto-generation easy to add but not required for v1 if site already indexed).
- A11y audit beyond Lighthouse (semantic HTML + ARIA labels in islands enough for v1).
- Tailwind-rewriting components (port keeps inline styles).
- E2E / visual regression test infrastructure.
- Replacing the gh-pages legacy deployment.

## Acceptance Criteria

The build is acceptable when ALL of these are true:

1. `npm run build` in `pride-next/` is green with zero TS errors.
2. Vercel Preview at desktop 1920 visually matches `design/Pride Redesign.html` artboard at section 02 (full site).
3. Vercel Preview at mobile 390 (Chrome DevTools) visually matches `design/Pride Redesign.html` artboard at section 03 (mobile site).
4. All interactive flows work: enroll modal (4 steps + WhatsApp fallback), burger menu (open/close + nav-link scrolls), instructor detail mobile (open/close with scroll-restore + "Записаться к ИМЯ" trigger).
5. Real form submission delivers Telegram message to admin chat with status-toggle inline keyboard. Toggle works.
6. Lighthouse Mobile Performance ≥ 90 on the deployed Vercel URL.
7. No regression on legacy gh-pages site (it remains untouched).

---

## Self-Review Notes (filled at end of brainstorming)

- **Placeholders:** None.
- **Internal consistency:** Architecture (adaptive split) matches component-port table (`desktop/*` + `mobile/*`). Data-attr triggers consistent across server-rendered components and client islands. Form flow matches `bot.js` v2 delta.
- **Scope:** Fits one implementation plan. ~10 desktop components + 10 mobile components + 3 islands + 1 layout + 1 page + 1 server action + bot.js delta. ~3000-4000 LOC ported, mostly mechanical translation from JSX prototype to TSX.
- **Ambiguity:** None known. Inline-styles-as-is is explicit. Adaptive split is explicit. Form flow is explicit (URL + auth + payload + response).
