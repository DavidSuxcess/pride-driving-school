# Pride · Next.js Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Next.js 15 + TypeScript + Tailwind 4 marketing landing for Pride driving school in a new `pride-next/` project, deployed to Vercel, that pixel-faithfully renders the design bundle for both desktop and mobile via an adaptive split (separate component trees switched by CSS visibility), and submits enrollment forms through a new HTTP endpoint added to the existing `bot.js`.

**Architecture:** Adaptive split — `app/page.tsx` renders both `<DesktopLanding>` and `<MobileLanding>` server-side; CSS visibility (`hidden md:block` / `md:hidden`) shows the right one. Static sections are React Server Components (zero client JS). Three islands (`EnrollModal`, `BurgerMenu`, `InstructorDetail`) load lazily for interactivity. Form submission goes through a Server Action that POSTs to `bot.js`'s new `/api/enroll` endpoint, which forwards to a Telegram admin chat with status-toggle inline keyboard.

**Tech Stack:**
- Next.js 15 (App Router, RSC) + React 19 + TypeScript
- Tailwind CSS 4 (Oxide engine, `@tailwindcss/postcss`)
- `next/font/google` (Bebas Neue, Manrope, JetBrains Mono)
- `next/image` for raster images
- Vercel deploy + GitHub auto-deploy
- `bot.js` v2 = existing longpolling + new Express HTTP endpoint
- Source files stashed at `pride-driving-school/docs/superpowers/design-bundle/project/`

---

## Source files reference

These are the files the engineer ports FROM. They live at `pride-driving-school/docs/superpowers/design-bundle/project/`:

| File | Components | Lines |
|---|---|---|
| `Pride Redesign.html` | CSS variables + primitives + keyframes (the `<style>` block) | 1-265 |
| `site.jsx` | Desktop tree | full file |
| `mobile-site.jsx` | Mobile tree | full file |
| `mobile-menu.jsx` | `PrMobileMenu` (burger overlay) | full file |
| `mobile.jsx` | Detail screens (only `PrMobileInstructor` is used as reference for `InstructorDetail` island; others are conceptual) | full file |

Legacy `pride-driving-school/public/site.jsx` and `mobile-site.jsx` extend the design bundle with React `useState` + handlers for modal/burger/instructor-detail. Use legacy as reference for **interactive logic** when porting islands. The `pride-driving-school/public/` files exist only on git history at `2f17690` (pre-migration) — verify with `git show 2f17690:public/site.jsx`.

---

## File Structure (target)

```
C:/Users/david/Documents/Pride/
├── pride-driving-school/             # legacy, mostly untouched
│   └── bot.js                         # MODIFY: add Express HTTP endpoint
└── pride-next/                        # NEW
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── postcss.config.mjs
    ├── .gitignore
    ├── .env.local.example
    ├── public/
    │   └── assets/                    # logo.svg + 3 instructor jpgs + 5 student jpgs
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── globals.css
        │   └── actions.ts             # Server Action submitEnrollment
        ├── components/
        │   ├── desktop/
        │   │   ├── Landing.tsx
        │   │   ├── Header.tsx, Hero.tsx, Marquee.tsx, Courses.tsx,
        │   │   ├── Instructors.tsx, Trust.tsx, Reviews.tsx, Faq.tsx, Footer.tsx
        │   ├── mobile/
        │   │   ├── Landing.tsx
        │   │   ├── Header.tsx, Hero.tsx, Marquee.tsx, Courses.tsx,
        │   │   ├── Instructors.tsx, Trust.tsx, Reviews.tsx, Faq.tsx,
        │   │   ├── EnrollSection.tsx, Footer.tsx
        │   ├── shared/
        │   │   └── PrLion.tsx
        │   └── islands/
        │       ├── EnrollModal.tsx
        │       ├── BurgerMenu.tsx
        │       └── InstructorDetail.tsx
        ├── data/
        │   ├── reviews.json, courses.json, instructors.json, faq.json
        └── lib/
            ├── enroll.ts              # FormData type + validation helper
            └── env.ts                 # typed env vars accessor
```

---

## Pre-flight

- [ ] **Step P.1: Verify Node + npm versions**

```bash
node --version  # expect: v20.x or higher
npm --version   # expect: 10.x or higher
```

If lower, install Node 20 LTS first.

- [ ] **Step P.2: Verify design bundle is accessible**

```bash
ls "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/" | head -5
```

Expected: `Pride Redesign.html`, `site.jsx`, `mobile-site.jsx`, `mobile-menu.jsx`, `mobile.jsx` listed.

- [ ] **Step P.3: Verify legacy bot.js exists**

```bash
cat "C:/Users/david/Documents/Pride/pride-driving-school/bot.js" | head -5
```

Expected: imports `dotenv` and `node-telegram-bot-api`.

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `C:/Users/david/Documents/Pride/pride-next/` (entire project)

- [ ] **Step 1.1: Run create-next-app**

```bash
cd C:/Users/david/Documents/Pride
npx create-next-app@latest pride-next \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm \
  --turbopack \
  --no-experimental-https
```

Expected: project created at `pride-next/`, scaffold installed. (If prompts appear despite flags, accept all defaults that match: TS yes, ESLint yes, Tailwind yes, App Router yes, src/ yes, alias `@/*`, npm.)

- [ ] **Step 1.2: Verify scaffold builds**

```bash
cd C:/Users/david/Documents/Pride/pride-next
npm run build
```

Expected: build green, `1 page(s) built` in output. Error → fix before continuing.

- [ ] **Step 1.3: Initialize git repo**

```bash
cd C:/Users/david/Documents/Pride/pride-next
git init
git add -A
git commit -m "chore: bootstrap next.js 15 + ts + tailwind via create-next-app"
```

---

## Task 2: Configure Tailwind 4 properly + clean default scaffold

The `create-next-app --tailwind` flag installs a default config. We replace globals.css with the design tokens later (Task 5); first, ensure Tailwind v4 syntax works.

**Files:**
- Modify: `pride-next/postcss.config.mjs`
- Modify: `pride-next/src/app/globals.css`
- Verify: `pride-next/package.json` has `tailwindcss@^4` and `@tailwindcss/postcss`

- [ ] **Step 2.1: Verify Tailwind 4 installed**

```bash
cd C:/Users/david/Documents/Pride/pride-next
cat package.json | grep -E 'tailwind|@tailwindcss'
```

Expected: `"tailwindcss": "^4.x.x"` and `"@tailwindcss/postcss": "^4.x.x"`. If `tailwindcss@3` shown, run:

```bash
npm uninstall tailwindcss
npm install -D tailwindcss@latest @tailwindcss/postcss@latest
```

- [ ] **Step 2.2: Verify postcss.config.mjs uses @tailwindcss/postcss plugin**

Read current file. Expected content:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

If different, replace with above.

- [ ] **Step 2.3: Replace src/app/globals.css with minimal v4 baseline**

```css
@import "tailwindcss";
```

(One line. Design tokens go in here in Task 5; for now, just verify Tailwind is wired.)

- [ ] **Step 2.4: Replace src/app/page.tsx with minimal placeholder**

```tsx
export default function Page() {
  return (
    <main className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold">pride-next bootstrap OK</h1>
      <p className="mt-4 text-white/60">
        Tailwind 4 working. Replace this in later tasks.
      </p>
    </main>
  );
}
```

- [ ] **Step 2.5: Replace src/app/layout.tsx with minimal version (no fonts yet)**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ПРАЙД — Автошкола · Красноярск",
  description: "Автошкола «Прайд» в Красноярске.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2.6: Build and verify Tailwind utilities applied**

```bash
cd C:/Users/david/Documents/Pride/pride-next
npm run build
```

Expected: build green. Then:

```bash
ls .next/static/css/
```

Expected: at least one `.css` file with substantial size (> 5 KB).

```bash
grep -o 'min-width:768px' .next/static/css/*.css | wc -l
```

Expected: `1` or more — Tailwind responsive utilities are compiled. (If `0`, Tailwind is not scanning files; check `postcss.config.mjs` and that `globals.css` has `@import "tailwindcss"` line.)

- [ ] **Step 2.7: Smoke dev server**

```bash
npm run dev &
sleep 3
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: `200`.

```bash
# kill the bg dev server (use task manager / ctrl+c equivalent)
```

- [ ] **Step 2.8: Commit**

```bash
git add -A
git commit -m "chore: confirm tailwind 4 working with minimal page"
```

---

## Task 3: Copy assets from legacy to public/assets

**Files:**
- Create: `pride-next/public/assets/*.{svg,jpg}` (9 files)

- [ ] **Step 3.1: Copy assets**

```bash
cd C:/Users/david/Documents/Pride/pride-next
mkdir -p public/assets
cp ../pride-driving-school/public/assets/*.svg public/assets/
cp ../pride-driving-school/public/assets/*.jpg public/assets/
```

- [ ] **Step 3.2: Verify all 9 files copied**

```bash
ls public/assets/ | sort
```

Expected output exactly:
```
instructor_dmitry.jpg
instructor_dmitry_b.jpg
instructor_lev.jpg
logo.svg
student_1.jpg
student_2.jpg
student_3.jpg
student_4.jpg
student_5.jpg
```

If any missing, copy individually.

- [ ] **Step 3.3: Verify file sizes are non-zero**

```bash
ls -la public/assets/
```

Expected: every file has non-zero size.

- [ ] **Step 3.4: Commit**

```bash
git add public/assets/
git commit -m "chore: copy logo + instructor + student assets"
```

---

## Task 4: Port JSON data files

**Files:**
- Create: `pride-next/src/data/reviews.json` (55 entries from `pride-driving-school/public/reviews-data.js`)
- Create: `pride-next/src/data/courses.json` (3 entries)
- Create: `pride-next/src/data/instructors.json` (3 entries)
- Create: `pride-next/src/data/faq.json` (5 entries)

The JSON shapes are documented in the spec. Reviews must be parsed from the legacy JS file (which uses `window.PRIDE_REVIEWS = [...]` syntax).

- [ ] **Step 4.1: Create src/data directory**

```bash
cd C:/Users/david/Documents/Pride/pride-next
mkdir -p src/data
```

- [ ] **Step 4.2: Convert reviews-data.js to reviews.json**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('../pride-driving-school/public/reviews-data.js', 'utf8');
const sandbox = {};
const code = src.replace('window.PRIDE_REVIEWS', 'sandbox.PRIDE_REVIEWS');
new Function('sandbox', code)(sandbox);
fs.writeFileSync('src/data/reviews.json', JSON.stringify(sandbox.PRIDE_REVIEWS, null, 2) + '\n');
console.log('reviews:', sandbox.PRIDE_REVIEWS.length);
"
```

Expected: `reviews: 55`.

- [ ] **Step 4.3: Create src/data/courses.json**

```json
[
  {
    "tag": "БАЗОВЫЙ",
    "title": "СТАРТ",
    "price": "50 000",
    "pitch": "Идеальный старт для уверенного вождения.",
    "hours": "Категория B",
    "features": [
      "42 часа на автомат",
      "44 часа на механику"
    ],
    "accent": false,
    "vip": false
  },
  {
    "tag": "ХИТ · 70% ВЫБИРАЮТ",
    "title": "ПРЕМИУМ",
    "price": "65 000",
    "pitch": "Расширенная программа с поддержкой на каждом этапе.",
    "hours": "54 ч АКПП · 56 ч МКПП",
    "features": [
      "Бесплатный внутренний экзамен",
      "Неограниченное число занятий",
      "Индивидуальный график",
      "Забираем из дома",
      "Все походы на экзамен бесплатны (внутр., ГИБДД, вождение + теория)",
      "Сопровождение на всех этапах"
    ],
    "accent": true,
    "vip": false
  },
  {
    "tag": "VIP",
    "title": "VIP",
    "price": "110 000",
    "pitch": "Максимальный комфорт и гарантия результата.",
    "hours": "Без лимита часов",
    "features": [
      "Автомобиль премиум-класса",
      "Неограниченное число занятий",
      "Индивидуальный график",
      "Забираем из дома",
      "Все походы на экзамен бесплатны (внутр., ГИБДД, вождение + теория)",
      "Сопровождение на всех этапах"
    ],
    "accent": false,
    "vip": true
  }
]
```

- [ ] **Step 4.4: Create src/data/instructors.json**

```json
[
  {
    "name": "ЛЕВ",
    "surname": "СТАРШИЙ ИНСТРУКТОР",
    "img": "instructor_lev.jpg",
    "tag": "ПСИХОЛОГИЯ ВОЖДЕНИЯ",
    "quote": "Чтобы научиться водить, надо научиться расслабляться. Дальше — техника.",
    "statsShort": ["17 лет за рулём", "7+ лет преподавания"],
    "statsBig": [{"n": "17", "l": "ЛЕТ ЗА РУЛЁМ"}, {"n": "7+", "l": "ЛЕТ ПРЕПОДАЁТ"}],
    "approach": [
      "Использую знания психологии для индивидуального подхода к каждому ученику.",
      "Помогаю преодолеть страхи, выявить слабые стороны и превратить их в преимущества.",
      "Обучаю не только правилам, но и свободному, уверенному вождению."
    ]
  },
  {
    "name": "ДМИТРИЙ",
    "surname": "АНДРЕЕВИЧ БЕЛОНОГОВ",
    "img": "instructor_dmitry_b.jpg",
    "tag": "ГОРОДСКОЙ ПОТОК",
    "quote": "В пробке надо не нервничать, а думать на два хода вперёд.",
    "statsShort": ["10 лет за рулём", "Спокойствие в потоке"],
    "statsBig": [{"n": "10", "l": "ЛЕТ ЗА РУЛЁМ"}, {"n": "∞", "l": "ТЕРПЕНИЯ"}],
    "approach": [
      "Внимательный и обстоятельный подход к каждому занятию.",
      "Главные принципы: терпение, ответственность и стрессоустойчивость.",
      "Учу сохранять спокойствие при сложных манёврах и в плотном городском потоке."
    ]
  },
  {
    "name": "ДМИТРИЙ",
    "surname": "ИНСТРУКТОР МКПП / АКПП",
    "img": "instructor_dmitry.jpg",
    "tag": "БЕЗ КРИКОВ",
    "quote": "Объясняю чётко, без стресса. Учу для жизни, не для галочки.",
    "statsShort": ["МКПП / АКПП", "Индивидуальная программа"],
    "statsBig": [{"n": "AT/MT", "l": "ОБЕ КОРОБКИ"}, {"n": "1:1", "l": "ИНДИВИДУАЛЬНО"}],
    "approach": [
      "Обучаю на МКПП («механика») и АКПП («автомат»).",
      "Выстраиваю индивидуальную программу: отрабатываем сложные маршруты и уверенную езду.",
      "Объясняю всё чётко, без стресса и криков — создаю безопасную атмосферу.",
      "Учу не для галочки в ГАИ, а для уверенной и безопасной жизни за рулём."
    ]
  }
]
```

- [ ] **Step 4.5: Create src/data/faq.json**

```json
[
  {
    "q": "СКОЛЬКО ВРЕМЕНИ ЗАЙМЁТ ОБУЧЕНИЕ?",
    "a": "В среднем 3–4 месяца. Это включает теорию (по будням онлайн) и практику (когда удобно вам). Если торопитесь — есть ускоренная программа на 6 недель."
  },
  {
    "q": "А ЕСЛИ Я БОЮСЬ ЕЗДИТЬ?",
    "a": "Это нормально. Лев работает с курсантами после неудачных попыток в других школах, и психология вождения — его специальность. Никто не кричит, не давит на педаль, не паникует."
  },
  {
    "q": "МОЖНО ВЕРНУТЬ ДЕНЬГИ?",
    "a": "Да, в первые 7 дней без вопросов. После — пропорционально неотзанятым часам. Прозрачно, без штрафов и «мелкого шрифта»."
  },
  {
    "q": "ЕСТЬ ЛИ РАССРОЧКА?",
    "a": "Да, 0% на 6 месяцев — оформляем сами на месте, без банков и справок о доходе. Платите равными частями."
  },
  {
    "q": "ЕСЛИ НЕ СДАМ ГИБДД С ПЕРВОГО РАЗА?",
    "a": "На тарифе «Премиум» — все попытки бесплатны, мы вас сопровождаем. На «Базовом» — повторные сборы (350 ₽) и время инструктора (1 600 ₽/час)."
  }
]
```

- [ ] **Step 4.6: Validate all 4 JSON files parse and have expected counts**

```bash
node -e "
const r = require('./src/data/reviews.json');
const c = require('./src/data/courses.json');
const i = require('./src/data/instructors.json');
const f = require('./src/data/faq.json');
console.log('reviews:', r.length, '(expect 55)');
console.log('courses:', c.length, '(expect 3)');
console.log('instructors:', i.length, '(expect 3)');
console.log('faq:', f.length, '(expect 5)');
"
```

Expected:
```
reviews: 55 (expect 55)
courses: 3 (expect 3)
instructors: 3 (expect 3)
faq: 5 (expect 5)
```

- [ ] **Step 4.7: Commit**

```bash
git add src/data/
git commit -m "chore: port json data (reviews, courses, instructors, faq)"
```

---

## Task 5: Port global CSS (design tokens, primitives, keyframes)

**Files:**
- Modify: `pride-next/src/app/globals.css`

The source is `pride-driving-school/docs/superpowers/design-bundle/project/Pride Redesign.html` lines 11–238 (everything inside `<style>...</style>` excluding the closing tag). Tailwind 4 directive goes at the top.

- [ ] **Step 5.1: Replace src/app/globals.css**

```css
@import "tailwindcss";

:root {
  --pr-yellow: #E45400;
  --pr-yellow-deep: #A33C00;
  --pr-black: #0A0A0A;
  --pr-graphite: #141414;
  --pr-paper: #F2EFE6;
  --pr-paper-ink: #1A1A1A;

  --pr-display: 'Bebas Neue', 'Arial Black', sans-serif;
  --pr-text: 'Manrope', system-ui, sans-serif;
  --pr-mono: 'JetBrains Mono', ui-monospace, monospace;

  --pr-line: rgba(255, 255, 255, 0.08);
  --pr-line-strong: rgba(255, 255, 255, 0.18);
  --pr-mute: rgba(255, 255, 255, 0.5);
  --pr-mute-2: rgba(255, 255, 255, 0.65);

  --pr-r-sm: 8px;
  --pr-r-md: 14px;
  --pr-r-lg: 20px;
  --pr-r-xl: 28px;
}

html, body { margin: 0; padding: 0; overflow-x: hidden; scroll-behavior: smooth; }
body {
  font-family: var(--pr-text);
  background: #0A0A0A;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  max-width: 100vw;
}
* { box-sizing: border-box; }
a { color: inherit; text-decoration: none; }

.pr-site h1, .pr-site h2, .pr-site h3, .pr-site h4 {
  font-family: var(--pr-display); font-weight: 400;
  margin: 0; text-transform: uppercase;
  letter-spacing: -0.01em; line-height: 0.9;
}
.pr-site p { margin: 0; }

.pr-btn-yellow {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--pr-yellow); color: var(--pr-black);
  border: 0; border-radius: 999px;
  padding: 16px 28px; font-weight: 800; font-size: 13px;
  letter-spacing: 0.06em; text-transform: uppercase;
  cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease;
  font-family: var(--pr-text);
}
.pr-btn-yellow:hover { transform: translateY(-1px); box-shadow: 0 14px 30px rgba(228,84,0,0.3); }

.pr-btn-black {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--pr-black); color: #fff;
  border: 0; border-radius: 999px;
  padding: 16px 26px; font-weight: 800; font-size: 13px;
  letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
  font-family: var(--pr-text);
}

.pr-btn-ghost {
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; color: #fff;
  border: 1px solid var(--pr-line-strong); border-radius: 999px;
  padding: 14px 22px; font-weight: 600; font-size: 13px;
  cursor: pointer; font-family: var(--pr-text);
}
.pr-btn-ghost:hover { background: rgba(255,255,255,0.04); }

.pr-input {
  width: 100%; background: transparent; border: 0; border-bottom: 1px solid rgba(255,255,255,0.18);
  color: #fff; font-size: 22px; padding: 14px 0 12px; font-family: var(--pr-text);
  outline: none; transition: border-color 0.15s ease;
}
.pr-input:focus { border-bottom-color: var(--pr-yellow); }
.pr-input::placeholder { color: rgba(255,255,255,0.3); }

.pr-num {
  font-family: var(--pr-mono); font-size: 11px;
  letter-spacing: 0.16em; color: var(--pr-mute);
  text-transform: uppercase;
}

.pr-section-tag {
  font-family: var(--pr-mono); font-size: 11px; letter-spacing: 0.2em;
  color: var(--pr-mute-2); text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 12px;
}
.pr-section-tag::before {
  content: ''; width: 32px; height: 1px; background: var(--pr-yellow);
}

.pr-stamp {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--pr-mono); font-size: 10px; letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 5px 12px; border: 1px solid currentColor;
  border-radius: 999px;
}

.pr-mark {
  background: var(--pr-yellow); color: var(--pr-black);
  padding: 0 6px; border-radius: 2px;
}

.pr-link-u { position: relative; padding-bottom: 2px; transition: color 0.15s ease; }
.pr-link-u::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
  background: currentColor; transform: scaleX(0); transform-origin: left;
  transition: transform 0.25s ease;
}
.pr-link-u:hover::after { transform: scaleX(1); }

.pr-card {
  background: var(--pr-graphite); border: 1px solid var(--pr-line);
  border-radius: var(--pr-r-lg); transition: border-color 0.15s ease, transform 0.2s ease;
}
.pr-card:hover { border-color: var(--pr-line-strong); }

.pr-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.pr-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

.pr-grid-bg {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 56px 56px;
}
.pr-tape {
  background-image: repeating-linear-gradient(
    45deg, var(--pr-yellow) 0 16px, var(--pr-black) 16px 32px
  );
}
.pr-tape-thin {
  background-image: repeating-linear-gradient(
    45deg, var(--pr-yellow) 0 8px, var(--pr-black) 8px 16px
  );
}
.pr-road {
  background-image: linear-gradient(to right, var(--pr-yellow) 0 60%, transparent 60% 100%);
}

@keyframes pr-blink { 0%, 60% { opacity: 1; } 30% { opacity: 0.2; } }
.pr-blink { animation: pr-blink 1.6s ease-in-out infinite; display: inline-block; }

@keyframes pr-marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
@keyframes pr-marquee-rev { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
.pr-marquee-track { animation: pr-marquee 36s linear infinite; }
.pr-marquee-track-rev { animation: pr-marquee-rev 50s linear infinite; }
.pr-marquee-track-fast { animation: pr-marquee 24s linear infinite; }

.pr-ticker { font-family: var(--pr-display); }

.pr-loader {
  position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
  background: #0A0A0A; z-index: 9999; transition: opacity 0.4s ease;
}
.pr-loader.hidden { opacity: 0; pointer-events: none; }
.pr-loader-text {
  font-family: var(--pr-display); font-weight: 700; font-size: 56px; color: var(--pr-yellow);
  letter-spacing: 0.04em; text-transform: uppercase;
}

@keyframes pr-menu-bg {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pr-menu-item {
  from { opacity: 0; transform: translateX(-22px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pr-menu-fade {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pr-menu-tape {
  from { opacity: 0; transform: translateX(-60px) rotate(-8deg); }
  to   { opacity: 0.9; transform: translateX(0) rotate(-8deg); }
}
.pr-menu-root { animation: pr-menu-bg 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.pr-menu-item { animation: pr-menu-item 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.pr-menu-fade { animation: pr-menu-fade 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.pr-menu-tape { animation: pr-menu-tape 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

@keyframes pr-prof-photo {
  from { opacity: 0; transform: scale(1.08); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pr-prof-rise {
  from { opacity: 0; transform: translateY(20px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes pr-prof-num {
  from { opacity: 0; transform: translateY(-14px) scale(0.9); }
  to   { opacity: 0.95; transform: translateY(0) scale(1); }
}
.pr-prof-photo { animation: pr-prof-photo 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.pr-prof-rise  { animation: pr-prof-rise  0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.pr-prof-num   { animation: pr-prof-num   0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

@keyframes pr-modal-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes pr-modal-scale {
  from { opacity: 0; transform: scale(0.95) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.pr-modal-backdrop { animation: pr-modal-fade 0.22s ease-out both; }
.pr-modal-card     { animation: pr-modal-scale 0.32s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .pr-menu-root, .pr-menu-item, .pr-menu-fade, .pr-menu-tape,
  .pr-prof-photo, .pr-prof-rise, .pr-prof-num,
  .pr-modal-backdrop, .pr-modal-card {
    animation: none !important;
  }
}

.pr-site { width: 100%; }
```

- [ ] **Step 5.2: Build to verify CSS compiles**

```bash
cd C:/Users/david/Documents/Pride/pride-next
npm run build 2>&1 | tail -3
```

Expected: build green.

- [ ] **Step 5.3: Verify the variables and primitive classes are in the output**

```bash
grep -c '\-\-pr-yellow' .next/static/css/*.css
grep -c 'pr-btn-yellow' .next/static/css/*.css
```

Expected: both > 0.

- [ ] **Step 5.4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: port design tokens, primitives, keyframes to globals.css"
```

---

## Task 6: Set up next/font/google for Bebas Neue + Manrope + JetBrains Mono

**Files:**
- Modify: `pride-next/src/app/layout.tsx`
- Modify: `pride-next/src/app/globals.css` (binding `--pr-display` etc. to font CSS variables)

- [ ] **Step 6.1: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ПРАЙД — Автошкола · Красноярск",
  description:
    "Автошкола «Прайд» в Красноярске — обучение вождению на категории A и B. Опытные инструкторы, индивидуальный подход, поддержка на всех этапах сдачи экзамена.",
  themeColor: "#0A0A0A",
  openGraph: {
    title: "ПРАЙД — Автошкола · Красноярск",
    description:
      "Обучение вождению на категории A и B. Опытные инструкторы и поддержка до получения прав.",
    images: ["/assets/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${bebas.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6.2: Update globals.css to bind --pr-display etc. to next/font variables**

In `src/app/globals.css`, replace these three lines inside `:root`:

```css
  --pr-display: 'Bebas Neue', 'Arial Black', sans-serif;
  --pr-text: 'Manrope', system-ui, sans-serif;
  --pr-mono: 'JetBrains Mono', ui-monospace, monospace;
```

with:

```css
  --pr-display: var(--font-bebas), 'Bebas Neue', 'Arial Black', sans-serif;
  --pr-text: var(--font-manrope), 'Manrope', system-ui, sans-serif;
  --pr-mono: var(--font-jetbrains), 'JetBrains Mono', ui-monospace, monospace;
```

- [ ] **Step 6.3: Build**

```bash
cd C:/Users/david/Documents/Pride/pride-next
npm run build 2>&1 | tail -5
```

Expected: build green. May show font preload network requests in build log.

- [ ] **Step 6.4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: load bebas neue + manrope + jetbrains via next/font/google"
```

---

## Task 7: Create PrLion shared component

**Files:**
- Create: `pride-next/src/components/shared/PrLion.tsx`

The lion logo: orange version is just `<Image>`, non-orange uses CSS mask. Source: `design-bundle/project/site.jsx` lines 28–49.

- [ ] **Step 7.1: Create the directory**

```bash
cd C:/Users/david/Documents/Pride/pride-next
mkdir -p src/components/shared
```

- [ ] **Step 7.2: Create src/components/shared/PrLion.tsx**

```tsx
import Image from "next/image";

interface Props {
  size?: number;
  color?: string;
  priority?: boolean;
}

export default function PrLion({ size = 40, color = "#E45400", priority = false }: Props) {
  const isOrange = color.toLowerCase() === "#e45400";
  const url = "/assets/logo.svg";

  if (isOrange) {
    return (
      <Image
        src={url}
        alt="Pride"
        width={size}
        height={size}
        priority={priority}
        style={{ display: "block", width: size, height: size }}
        unoptimized
      />
    );
  }

  return (
    <div
      aria-label="Pride"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
```

(`unoptimized` on the SVG image because next/image's optimizer can mangle SVGs.)

- [ ] **Step 7.3: Build**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

- [ ] **Step 7.4: Commit**

```bash
git add src/components/shared/PrLion.tsx
git commit -m "feat: add PrLion shared logo component"
```

---

## Task 8: Create lib/enroll.ts (form types + validation) and lib/env.ts (typed env)

**Files:**
- Create: `pride-next/src/lib/enroll.ts`
- Create: `pride-next/src/lib/env.ts`

- [ ] **Step 8.1: Create src/lib directory**

```bash
mkdir -p src/lib
```

- [ ] **Step 8.2: Create src/lib/enroll.ts**

```ts
export interface EnrollFormData {
  course: string;
  category: "A" | "B";
  transmission: "AT" | "MT";
  name: string;
  phone: string;
}

export const initialEnrollData: EnrollFormData = {
  course: "Премиум",
  category: "B",
  transmission: "AT",
  name: "",
  phone: "",
};

export function validateEnroll(data: EnrollFormData): string | null {
  if (!data.name.trim()) return "Заполните имя";
  if (!data.phone.trim()) return "Заполните телефон";
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 10) return "Некорректный телефон";
  return null;
}
```

- [ ] **Step 8.3: Create src/lib/env.ts**

```ts
function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const env = {
  botEndpointUrl: () => required("BOT_ENDPOINT_URL"),
  botSharedSecret: () => required("BOT_SHARED_SECRET"),
};
```

(Lazy accessors so env errors only fire on first request, not at import time.)

- [ ] **Step 8.4: Build**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

- [ ] **Step 8.5: Commit**

```bash
git add src/lib/
git commit -m "feat: add enroll form types/validation and typed env accessor"
```

---

## Task 9: Write the failing test for validateEnroll

This is a real testable unit. Use `node:test` (built-in, no deps).

**Files:**
- Create: `pride-next/src/lib/enroll.test.ts`
- Modify: `pride-next/package.json` (add test script)

- [ ] **Step 9.1: Add `test` script to package.json**

In `package.json`, in the `"scripts"` block, add:

```json
"test": "node --test --import tsx 'src/**/*.test.ts'"
```

(After other entries. Comma-separate.)

- [ ] **Step 9.2: Install tsx for TypeScript test runner**

```bash
npm install -D tsx
```

- [ ] **Step 9.3: Create src/lib/enroll.test.ts**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateEnroll, initialEnrollData } from "./enroll.ts";

test("validateEnroll rejects empty name", () => {
  const result = validateEnroll({ ...initialEnrollData, phone: "+71234567890" });
  assert.equal(result, "Заполните имя");
});

test("validateEnroll rejects empty phone", () => {
  const result = validateEnroll({ ...initialEnrollData, name: "Иван" });
  assert.equal(result, "Заполните телефон");
});

test("validateEnroll rejects phone with fewer than 10 digits", () => {
  const result = validateEnroll({ ...initialEnrollData, name: "Иван", phone: "+712345" });
  assert.equal(result, "Некорректный телефон");
});

test("validateEnroll accepts valid input", () => {
  const result = validateEnroll({ ...initialEnrollData, name: "Иван", phone: "+7 (912) 345-67-89" });
  assert.equal(result, null);
});
```

- [ ] **Step 9.4: Run tests**

```bash
npm test
```

Expected: all 4 tests pass. If any fails, fix `validateEnroll` in `src/lib/enroll.ts` until they pass.

- [ ] **Step 9.5: Commit**

```bash
git add src/lib/enroll.test.ts package.json package-lock.json
git commit -m "test: add validateEnroll unit tests"
```

---

## Task 10: Create the Server Action src/app/actions.ts

**Files:**
- Create: `pride-next/src/app/actions.ts`

- [ ] **Step 10.1: Create src/app/actions.ts**

```ts
"use server";

import type { EnrollFormData } from "@/lib/enroll";
import { validateEnroll } from "@/lib/enroll";
import { env } from "@/lib/env";

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitEnrollment(data: EnrollFormData): Promise<SubmitResult> {
  const validationError = validateEnroll(data);
  if (validationError) return { ok: false, error: validationError };

  try {
    const res = await fetch(`${env.botEndpointUrl()}/api/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": env.botSharedSecret(),
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("submitEnrollment: bot.js returned", res.status);
      return { ok: false, error: "Не удалось отправить, попробуйте через минуту" };
    }
    return { ok: true };
  } catch (e) {
    console.error("submitEnrollment: fetch failed", e);
    return { ok: false, error: "Сервер недоступен, попробуйте через минуту" };
  }
}
```

- [ ] **Step 10.2: Build**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

- [ ] **Step 10.3: Commit**

```bash
git add src/app/actions.ts
git commit -m "feat: add submitEnrollment server action"
```

---

## Task 11: Create app/page.tsx skeleton with adaptive split

**Files:**
- Modify: `pride-next/src/app/page.tsx`

This wires the empty `desktop/Landing` and `mobile/Landing` placeholders. We'll fill them in later tasks.

- [ ] **Step 11.1: Create empty desktop/Landing.tsx placeholder**

```bash
mkdir -p src/components/desktop src/components/mobile
```

```tsx
// src/components/desktop/Landing.tsx
export default function DesktopLanding() {
  return (
    <main className="pr-site min-h-screen p-20 bg-[var(--pr-black)]">
      <h1 className="text-[120px] text-[var(--pr-yellow)] font-display">DESKTOP</h1>
    </main>
  );
}
```

```tsx
// src/components/mobile/Landing.tsx
export default function MobileLanding() {
  return (
    <main className="pr-site min-h-screen p-5 bg-[var(--pr-black)]">
      <h1 className="text-[60px] text-[var(--pr-yellow)] font-display">MOBILE</h1>
    </main>
  );
}
```

- [ ] **Step 11.2: Replace src/app/page.tsx**

```tsx
import DesktopLanding from "@/components/desktop/Landing";
import MobileLanding from "@/components/mobile/Landing";

export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopLanding />
      </div>
      <div className="md:hidden">
        <MobileLanding />
      </div>
    </>
  );
}
```

- [ ] **Step 11.3: Build + smoke**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

```bash
npm run dev &
sleep 3
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: `200`. Optionally view in browser at narrow window vs wide window — should swap content. Kill dev server after.

- [ ] **Step 11.4: Commit**

```bash
git add src/components/desktop/Landing.tsx src/components/mobile/Landing.tsx src/app/page.tsx
git commit -m "feat: scaffold adaptive split with desktop/mobile landing placeholders"
```

---

## Task 12: Port desktop/Header

**Files:**
- Create: `pride-next/src/components/desktop/Header.tsx`

**Source:** `docs/superpowers/design-bundle/project/site.jsx` lines 51–99 (`PrHeader`).

**Port rules:**
- Convert JSX `style={{ ... }}` (camelCase keys) to TSX `style={{ ... }}` directly — no conversion needed, both are React.
- Convert `className` to `className` — same.
- Replace `<PrLion size={56} color="#E45400" />` with `import PrLion from "@/components/shared/PrLion"` and same JSX.
- Add data attributes for interactivity:
  - On the "Записаться" CTA button: `data-pr-enroll-trigger`
  - The mobile burger button does NOT exist on desktop (legacy had it shown only at <768px). Skip mobile-only burger button in desktop header.

- [ ] **Step 12.1: Read the source for reference**

```bash
sed -n '51,99p' "docs/superpowers/design-bundle/project/site.jsx"
```

Note the exact JSX, copy structure.

Wait — that file is in the legacy repo, not pride-next. Run from pride-next:

```bash
sed -n '51,99p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/site.jsx"
```

- [ ] **Step 12.2: Create src/components/desktop/Header.tsx**

Port `PrHeader` literally. Keep ALL inline `style` objects exactly as in source. Add `id="top"` to the `<header>` (legacy has this). Add `data-pr-enroll-trigger` to the "Записаться" button. Other buttons (none).

The component should be a Server Component (no "use client"). Layout reference:

```tsx
import PrLion from "@/components/shared/PrLion";

export default function Header() {
  return (
    <header
      id="top"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--pr-line)",
      }}
    >
      <div
        style={{
          maxWidth: 1760,
          margin: "0 auto",
          padding: "24px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo block — port from source PrHeader */}
        {/* Nav block — port from source PrHeader */}
        {/* CTA block (right side) — port + add data-pr-enroll-trigger to "Записаться" */}
      </div>
    </header>
  );
}
```

Fill in the three commented blocks by porting from the source (lines 51–99) verbatim. Keep phone number, nav links, CTA text in Russian as in source.

- [ ] **Step 12.3: Use the new Header in DesktopLanding**

Replace `src/components/desktop/Landing.tsx`:

```tsx
import Header from "./Header";

export default function DesktopLanding() {
  return (
    <main className="pr-site bg-[var(--pr-black)]">
      <Header />
      <div className="p-20 text-white/60">More sections coming.</div>
    </main>
  );
}
```

- [ ] **Step 12.4: Build + smoke**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

- [ ] **Step 12.5: Commit**

```bash
git add src/components/desktop/Header.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Header"
```

---

## Task 13: Port desktop/Hero

**Files:**
- Create: `pride-next/src/components/desktop/Hero.tsx`

**Source:** `design-bundle/project/site.jsx` lines 101–175 (`PrHero`).

**Port rules:**
- Server component, no client JS.
- The CTA button "Записаться на курс" has `data-pr-enroll-trigger` attribute.
- The "▶ Как проходит занятие" button stays as-is (no functionality, decorative).
- The reviews count is hardcoded: import `reviews from "@/data/reviews.json"` and use `reviews.length` (= 55).
- `<PrLion size={780} color="#E45400" />` becomes `<PrLion size={780} color="#E45400" priority />` (it's above the fold, eager-load).

- [ ] **Step 13.1: Read source**

```bash
sed -n '101,175p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/site.jsx"
```

- [ ] **Step 13.2: Create src/components/desktop/Hero.tsx**

Port verbatim, with the modifications above. Structure:

```tsx
import PrLion from "@/components/shared/PrLion";
import reviews from "@/data/reviews.json";

const reviewsCount = reviews.length;

export default function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--pr-black)" }}>
      {/* Grid bg + tape decorations + lion silhouette + headline + CTA row + road line */}
      {/* Port verbatim from PrHero, lines 102-173 */}
    </section>
  );
}
```

Fill in section body from source. Replace the original "ОТЗЫВЫ НА АВИТО" `· N+ отзывов` placeholder dynamic count `{reviewsCount}+ отзывов`.

- [ ] **Step 13.3: Wire into desktop/Landing.tsx**

```tsx
import Header from "./Header";
import Hero from "./Hero";

export default function DesktopLanding() {
  return (
    <main className="pr-site bg-[var(--pr-black)]">
      <Header />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 13.4: Build**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

- [ ] **Step 13.5: Commit**

```bash
git add src/components/desktop/Hero.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Hero"
```

---

## Task 14: Port desktop/Marquee

**Files:**
- Create: `pride-next/src/components/desktop/Marquee.tsx`

**Source:** `design-bundle/project/site.jsx` lines 177–200 (`PrMarquee`).

- [ ] **Step 14.1: Create src/components/desktop/Marquee.tsx**

```tsx
const ITEMS = [
  "КАТ. B · АВТОМАТ",
  "КАТ. B · МЕХАНИКА",
  "ИНДИВИДУАЛЬНЫЙ ГРАФИК",
  "СОПРОВОЖДЕНИЕ В ГИБДД",
  "ЗАБИРАЕМ ИЗ ДОМА",
  "ПЛАТЁЖ В РАССРОЧКУ",
  "ЛИЦЕНЗИЯ № 7167-Л",
  "СВОЙ АВТОПАРК",
];

const TRACK = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div
      style={{
        background: "var(--pr-yellow)",
        color: "var(--pr-black)",
        borderTop: "1px solid var(--pr-black)",
        borderBottom: "1px solid var(--pr-black)",
        overflow: "hidden",
        padding: "18px 0",
      }}
    >
      <div
        className="pr-marquee-track"
        style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}
      >
        {TRACK.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 48,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "0.04em",
            }}
          >
            <span>{t}</span>
            <span style={{ fontSize: 14 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 14.2: Wire into Landing**

Add `<Marquee />` after `<Hero />` in `DesktopLanding`.

- [ ] **Step 14.3: Build**

```bash
npm run build 2>&1 | tail -3
```

- [ ] **Step 14.4: Commit**

```bash
git add src/components/desktop/Marquee.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Marquee"
```

---

## Task 15: Port desktop/Courses

**Files:**
- Create: `pride-next/src/components/desktop/Courses.tsx`

**Source:** `design-bundle/project/site.jsx` lines 244–380 (`PrCourses`).

**Port rules:**
- Use `import courses from "@/data/courses.json"` instead of inline data array.
- Each course's "Выбрать" button gets `data-pr-enroll-trigger` and `data-course={c.title}` attributes.
- Section root has `id="courses"`.

- [ ] **Step 15.1: Read source**

```bash
sed -n '244,380p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/site.jsx"
```

- [ ] **Step 15.2: Create src/components/desktop/Courses.tsx**

Port verbatim. Skeleton:

```tsx
import courses from "@/data/courses.json";

export default function Courses() {
  return (
    <section
      id="courses"
      style={{ padding: "160px 80px", background: "var(--pr-paper)", color: "var(--pr-paper-ink)" }}
    >
      <div style={{ maxWidth: 1760, margin: "0 auto" }}>
        {/* Header row (h2 + description) — port lines 295-305 */}
        {/* Cards grid — port lines 307-374 */}
        {/* In each card's CTA button, add data-pr-enroll-trigger + data-course={c.title} */}
      </div>
    </section>
  );
}
```

Fill in. Replace inline JSX `style={{ background: c.vip ? ..., color: c.vip ? ..., ...}}` exactly as source.

- [ ] **Step 15.3: Wire into Landing, build, commit**

```bash
npm run build 2>&1 | tail -3
```

Add `<Courses />` after `<Marquee />`.

```bash
git add src/components/desktop/Courses.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Courses"
```

---

## Task 16: Port desktop/Instructors

**Files:**
- Create: `pride-next/src/components/desktop/Instructors.tsx`

**Source:** `design-bundle/project/site.jsx` lines 382–497 (`PrInstructors`).

**Port rules:**
- Use `import instructors from "@/data/instructors.json"`.
- Each instructor's `img` field is filename only (`instructor_lev.jpg`); prepend `/assets/` for the `<img src>`.
- On desktop, no detail screen — cards are static. Do NOT add `data-pr-instructor-card`.
- Section has `id="instructors"`.

- [ ] **Step 16.1: Read source**

```bash
sed -n '382,497p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/site.jsx"
```

- [ ] **Step 16.2: Create src/components/desktop/Instructors.tsx**

Port verbatim. Replace `<img src={p.img}>` with `<img src={`/assets/${p.img}`}>`. JSON's `statsShort` array maps to display chips.

- [ ] **Step 16.3: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/desktop/Instructors.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Instructors"
```

---

## Task 17: Port desktop/Trust

**Files:**
- Create: `pride-next/src/components/desktop/Trust.tsx`

**Source:** `design-bundle/project/site.jsx` lines 499–519 (`PrTrust`).

- [ ] **Step 17.1: Create src/components/desktop/Trust.tsx**

```tsx
const ITEMS = ["ЛИЦЕНЗИЯ № 7167-Л", "РОСРЕЕСТР АВТОШКОЛ", "ГИБДД РОССИИ", "АВИТО · 5.0"];
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Trust() {
  return (
    <div
      style={{
        background: "var(--pr-black)",
        borderTop: "1px solid var(--pr-line-strong)",
        borderBottom: "1px solid var(--pr-line-strong)",
        overflow: "hidden",
        padding: "24px 0",
      }}
    >
      <div
        className="pr-marquee-track-rev"
        style={{
          display: "flex",
          gap: 80,
          whiteSpace: "nowrap",
          color: "var(--pr-mute-2)",
          width: "max-content",
        }}
      >
        {TRACK.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 80,
              fontFamily: "var(--pr-mono)",
              fontSize: 14,
              letterSpacing: "0.12em",
            }}
          >
            <span>{t}</span>
            <span style={{ color: "var(--pr-yellow)" }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 17.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/desktop/Trust.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Trust"
```

---

## Task 18: Port desktop/Reviews

**Files:**
- Create: `pride-next/src/components/desktop/Reviews.tsx`

**Source:** `design-bundle/project/site.jsx` lines 521–597 (`PrReviews`).

**Port rules:**
- `import reviews from "@/data/reviews.json"`.
- Photos array: `[1,2,3,4,5,1,2,3,4,5,1,2,3].map(n => `/assets/student_${((n-1)%5)+1}.jpg`)`.
- Photo strip uses `pr-marquee-track-fast` className.
- Reviews grid uses CSS `column-count: 4; column-gap: 16px` (masonry-ish), with each `<article>` having `breakInside: "avoid"`.
- Section has `id="reviews"`.

- [ ] **Step 18.1: Read source + create src/components/desktop/Reviews.tsx**

```bash
sed -n '521,597p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/site.jsx"
```

Port. Replace `(typeof window !== 'undefined' && window.PRIDE_REVIEWS) || []` with `reviews` (imported). Replace `assets/student_*.jpg` paths with `/assets/student_*.jpg`.

- [ ] **Step 18.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/desktop/Reviews.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Reviews"
```

---

## Task 19: Port desktop/Faq using native `<details>`

**Files:**
- Create: `pride-next/src/components/desktop/Faq.tsx`

**Source:** `design-bundle/project/site.jsx` lines 599–658 (`PrFaq`).

**Port rules:**
- The source uses React `useState`. Replace with native `<details>` to keep this as a Server Component (no client JS).
- Each FAQ item is a `<details>` element. The first one has `open` attribute (default expanded).
- Use `import faq from "@/data/faq.json"`.
- Section has `id="faq"`.

- [ ] **Step 19.1: Create src/components/desktop/Faq.tsx**

```tsx
import faq from "@/data/faq.json";

export default function Faq() {
  return (
    <section
      id="faq"
      style={{ padding: "160px 80px", background: "var(--pr-paper)", color: "var(--pr-paper-ink)" }}
    >
      <div
        style={{
          maxWidth: 1760,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 160,
        }}
      >
        <div>
          <div className="pr-section-tag" style={{ color: "#3a3a3a" }}>
            [05] ВОПРОСЫ
          </div>
          <h2 style={{ fontSize: 60, marginTop: 24, color: "#0A0A0A", lineHeight: 0.95 }}>
            ЧАСТО
            <br />
            СПРАШИВАЮТ.
          </h2>
          <p style={{ marginTop: 32, fontSize: 16, lineHeight: 1.5, color: "#3a3a3a" }}>
            Если вашего вопроса нет — напишите в Telegram, отвечаем в течение 15 минут в рабочее время.
          </p>
          <button type="button" className="pr-btn-black" style={{ marginTop: 32 }}>
            Написать в Telegram
          </button>
        </div>

        <div>
          {faq.map((it, i) => (
            <details
              key={i}
              className="pr-faq-item"
              open={i === 0}
              style={{
                borderTop: "1px solid rgba(0,0,0,0.12)",
                borderBottom: i === faq.length - 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
                padding: "28px 0",
              }}
            >
              <summary>
                <span style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
                  <span className="pr-num" style={{ color: "#7a7a7a" }}>
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--pr-display)",
                      fontSize: 22,
                      color: "#0A0A0A",
                      lineHeight: 1.1,
                    }}
                  >
                    {it.q}
                  </span>
                </span>
                <span className="pr-faq-toggle" />
              </summary>
              <p
                style={{
                  marginTop: 20,
                  marginLeft: 56,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "#3a3a3a",
                  maxWidth: 640,
                }}
              >
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 19.2: Add FAQ-specific CSS to globals.css**

Append at the end of `src/app/globals.css`:

```css
.pr-faq-item > summary {
  list-style: none; cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
}
.pr-faq-item > summary::-webkit-details-marker { display: none; }
.pr-faq-toggle {
  width: 42px; height: 42px; border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 22px; font-weight: 300;
  transition: background 0.2s, border-color 0.2s;
}
.pr-faq-toggle::before { content: '+'; line-height: 1; }
.pr-faq-item[open] .pr-faq-toggle {
  background: var(--pr-yellow); border-color: var(--pr-yellow);
}
.pr-faq-item[open] .pr-faq-toggle::before { content: '–'; }
```

- [ ] **Step 19.3: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/desktop/Faq.tsx src/components/desktop/Landing.tsx src/app/globals.css
git commit -m "feat: port desktop Faq with native details/summary"
```

---

## Task 20: Port desktop/Footer

**Files:**
- Create: `pride-next/src/components/desktop/Footer.tsx`

**Source:** `design-bundle/project/site.jsx` lines 831–910 (`PrFooter`).

- [ ] **Step 20.1: Read source + create src/components/desktop/Footer.tsx**

```bash
sed -n '831,910p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/site.jsx"
```

Port verbatim. The "ПРАЙД" wordmark, contact column, hours column, links column, socials column, legal row.

- [ ] **Step 20.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/desktop/Footer.tsx src/components/desktop/Landing.tsx
git commit -m "feat: port desktop Footer"
```

---

## Task 21: Update DesktopLanding to compose all sections in correct order

**Files:**
- Modify: `pride-next/src/components/desktop/Landing.tsx`

- [ ] **Step 21.1: Replace src/components/desktop/Landing.tsx**

```tsx
import Header from "./Header";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Courses from "./Courses";
import Instructors from "./Instructors";
import Trust from "./Trust";
import Reviews from "./Reviews";
import Faq from "./Faq";
import Footer from "./Footer";

export default function DesktopLanding() {
  return (
    <main className="pr-site bg-[var(--pr-black)]">
      <Header />
      <Hero />
      <Marquee />
      <Courses />
      <Instructors />
      <Trust />
      <Reviews />
      <Faq />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 21.2: Build + dev smoke**

```bash
npm run build 2>&1 | tail -3
```

Expected: green, all 9 sections compile.

```bash
npm run dev &
sleep 3
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: 200.

(Optional manual: open in browser at width ≥ 1024px, scroll through. Should see all 9 sections.)

Kill dev server after.

- [ ] **Step 21.3: Commit**

```bash
git add src/components/desktop/Landing.tsx
git commit -m "feat: compose desktop landing with all 9 sections"
```

---

## Task 22: Port mobile/Header

**Files:**
- Create: `pride-next/src/components/mobile/Header.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 11–38 (`PrMSHeader`).

**Port rules:**
- Server component.
- Burger button gets `data-pr-burger`.
- The mobile design uses `width: 390` on the root — REMOVE this; we want fluid mobile width.

- [ ] **Step 22.1: Read source**

```bash
sed -n '11,38p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

- [ ] **Step 22.2: Create src/components/mobile/Header.tsx**

Port verbatim from source, omitting any explicit `width: 390` on outer wrappers. Add `id="top"`, add `data-pr-burger` to the burger button.

- [ ] **Step 22.3: Wire into MobileLanding**

```tsx
// src/components/mobile/Landing.tsx
import Header from "./Header";

export default function MobileLanding() {
  return (
    <main className="pr-site bg-[var(--pr-black)]">
      <Header />
    </main>
  );
}
```

- [ ] **Step 22.4: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Header.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Header"
```

---

## Task 23: Port mobile/Hero

**Files:**
- Create: `pride-next/src/components/mobile/Hero.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 40–94 (`PrMSHero`).

**Port rules:**
- "Записаться на курс" CTA gets `data-pr-enroll-trigger`.
- "▶ Как проходит занятие" stays as decorative button.
- Reviews count `{reviewsCount}` from `import reviews from "@/data/reviews.json"`.
- `<PrLion size={360} color="#E45400" />` — no priority needed (decorative silhouette).
- Strip `width: 390` from any mobile-only fixed widths if they appear.

- [ ] **Step 23.1: Read + port**

```bash
sed -n '40,94p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

Create `src/components/mobile/Hero.tsx` faithful to source.

- [ ] **Step 23.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Hero.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Hero"
```

---

## Task 24: Port mobile/Marquee

**Files:**
- Create: `pride-next/src/components/mobile/Marquee.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 96–119 (`PrMSMarquee`).

- [ ] **Step 24.1: Create src/components/mobile/Marquee.tsx**

Port verbatim. The mobile marquee has 6 items (different from desktop's 8) and `pr-marquee-track-fast` class:

```tsx
const ITEMS = [
  "КАТ. B · АВТОМАТ",
  "КАТ. B · МЕХАНИКА",
  "ИНДИВ. ГРАФИК",
  "СОПРОВОЖДЕНИЕ В ГИБДД",
  "РАССРОЧКА 0%",
  "ЛИЦЕНЗИЯ № 7167-Л",
];
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div
      style={{
        background: "var(--pr-yellow)",
        color: "var(--pr-black)",
        borderTop: "1px solid var(--pr-black)",
        borderBottom: "1px solid var(--pr-black)",
        overflow: "hidden",
        padding: "12px 0",
      }}
    >
      <div
        className="pr-marquee-track-fast"
        style={{ display: "flex", gap: 24, whiteSpace: "nowrap", width: "max-content" }}
      >
        {TRACK.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.04em",
            }}
          >
            <span>{t}</span>
            <span style={{ fontSize: 11 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 24.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Marquee.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Marquee"
```

---

## Task 25: Port mobile/Courses

**Files:**
- Create: `pride-next/src/components/mobile/Courses.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 121–195 (`PrMSCourses`).

**Port rules:**
- `import courses from "@/data/courses.json"`.
- Each "Выбрать «{c.title}»" button gets `data-pr-enroll-trigger` + `data-course={c.title}`.
- Section has `id="ms-courses"` per source, but spec says use `id="courses"` to match desktop anchor. **Use `id="courses"`** for the same anchor.

- [ ] **Step 25.1: Read + port**

```bash
sed -n '121,195p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

Create `src/components/mobile/Courses.tsx`. Inline data array → import. Each card button: add data attrs.

- [ ] **Step 25.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Courses.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Courses"
```

---

## Task 26: Port mobile/Instructors

**Files:**
- Create: `pride-next/src/components/mobile/Instructors.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 197–275 (`PrMSInstructors`).

**Port rules:**
- `import instructors from "@/data/instructors.json"`.
- Each `<article>` gets `data-pr-instructor-card data-idx={i}` (interactive — InstructorDetail island will listen).
- Photo path: `/assets/${p.img}`.
- Section has `id="instructors"`.
- Make `<article>` cursor: pointer for visual hint that they're interactive.

- [ ] **Step 26.1: Read + port**

```bash
sed -n '197,275p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

- [ ] **Step 26.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Instructors.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Instructors with click-to-detail attrs"
```

---

## Task 27: Port mobile/Trust

**Files:**
- Create: `pride-next/src/components/mobile/Trust.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 277–297 (`PrMSTrust`).

- [ ] **Step 27.1: Create + wire + commit**

Port verbatim (uses `pr-marquee-track-rev`, mono 10px, gap 32). Same skeleton as desktop Trust but smaller dims.

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Trust.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Trust"
```

---

## Task 28: Port mobile/Reviews

**Files:**
- Create: `pride-next/src/components/mobile/Reviews.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 299–361 (`PrMSReviews`).

**Port rules:**
- `import reviews from "@/data/reviews.json"`.
- Display first 10 reviews via `reviews.slice(0, 10)`.
- Truncate text to 220 chars (helper function inline).
- Total count text uses `reviews.length`.
- Photos: 7 photos doubled = 14, paths `/assets/student_*.jpg`.
- Section has `id="reviews"`.

- [ ] **Step 28.1: Read + port**

```bash
sed -n '299,361p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

- [ ] **Step 28.2: Build, wire, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Reviews.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Reviews"
```

---

## Task 29: Port mobile/Faq

**Files:**
- Create: `pride-next/src/components/mobile/Faq.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 363–417 (`PrMSFaq`).

**Port rules:**
- Source uses React state. Replace with native `<details>`, same approach as desktop Faq.
- `import faq from "@/data/faq.json"`.
- First item open by default.
- Section has `id="faq"`.

- [ ] **Step 29.1: Create src/components/mobile/Faq.tsx**

Same `pr-faq-item` + `pr-faq-toggle` classes as desktop (CSS already in globals.css from Task 19). The mobile Faq is a single column (no 420px+1fr grid like desktop), so the structure is just title block on top, list of `<details>` below.

```tsx
import faq from "@/data/faq.json";

export default function Faq() {
  return (
    <section
      id="faq"
      style={{ padding: "50px 20px 56px", background: "var(--pr-paper)", color: "var(--pr-paper-ink)" }}
    >
      <div className="pr-section-tag" style={{ fontSize: 10, color: "#3a3a3a" }}>[05] ВОПРОСЫ</div>
      <h2 style={{ fontFamily: "var(--pr-display)", fontSize: 56, lineHeight: 0.88, marginTop: 14, color: "#0A0A0A" }}>
        ЧАСТО<br />СПРАШИВАЮТ.
      </h2>
      <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, color: "#3a3a3a", marginBottom: 24 }}>
        Если вашего вопроса нет — напишите в Telegram.
      </p>
      <div>
        {faq.map((it, i) => (
          <details
            key={i}
            className="pr-faq-item"
            open={i === 0}
            style={{
              borderTop: "1px solid rgba(0,0,0,0.12)",
              borderBottom: i === faq.length - 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
              padding: "20px 0",
            }}
          >
            <summary>
              <span style={{ display: "flex", gap: 12, alignItems: "baseline", flex: 1 }}>
                <span className="pr-num" style={{ fontSize: 9, color: "#7a7a7a" }}>0{i + 1}</span>
                <span style={{ fontFamily: "var(--pr-display)", fontSize: 18, color: "#0A0A0A", lineHeight: 1.1 }}>
                  {it.q}
                </span>
              </span>
              <span className="pr-faq-toggle" style={{ width: 32, height: 32, fontSize: 18 }} />
            </summary>
            <p style={{ marginTop: 12, marginLeft: 28, fontSize: 14, lineHeight: 1.55, color: "#3a3a3a" }}>
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 29.2: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/Faq.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Faq"
```

---

## Task 30: Port mobile/EnrollSection

**Files:**
- Create: `pride-next/src/components/mobile/EnrollSection.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 419–527 (`PrMSEnroll` + inline form).

**Port rules:**
- This is a **server component** (the inline preview part). It renders the section heading + step indicator + a CTA button that opens the modal.
- The actual form is in `EnrollModal` island. The section's CTA button uses `data-pr-enroll-trigger` to open modal at step 1.
- Section has `id="enroll"`.
- Don't try to render the multi-step form inline — let the modal handle it. Section just shows the visual frame ("3 шага" + steps) + CTA.

- [ ] **Step 30.1: Read source**

```bash
sed -n '419,527p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

- [ ] **Step 30.2: Create src/components/mobile/EnrollSection.tsx**

Port the visual frame (the 3-step preview). Replace any embedded form inputs with a single CTA button:

```tsx
export default function EnrollSection() {
  return (
    <section
      id="enroll"
      style={{ padding: "50px 20px 50px", background: "var(--pr-yellow)", color: "#0A0A0A" }}
    >
      <div className="pr-section-tag" style={{ color: "#0A0A0A", fontSize: 10 }}>
        [06] ЗАПИСЬ
      </div>
      <h2 style={{ fontFamily: "var(--pr-display)", fontSize: 48, lineHeight: 0.9, marginTop: 14 }}>
        ТРИ
        <br />
        ПРОСТЫХ
        <br />
        ШАГА.
      </h2>
      <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, marginBottom: 24, maxWidth: 320 }}>
        Без длинных анкет. Куратор перезванивает в течение 15 минут.
      </p>

      <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
        {[
          { n: "01", t: "Звонок куратора · 15 мин" },
          { n: "02", t: "Знакомство со школой и инструктором · 30 мин" },
          { n: "03", t: "Первое занятие — бесплатно" },
        ].map((s) => (
          <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 15 }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: "#0A0A0A",
                color: "var(--pr-yellow)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--pr-display)",
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {s.n}
            </span>
            <span style={{ fontWeight: 600 }}>{s.t}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        data-pr-enroll-trigger
        className="pr-btn-black"
        style={{ width: "100%", justifyContent: "center", padding: "18px 0" }}
      >
        Записаться сейчас <span style={{ fontSize: 18 }}>→</span>
      </button>
    </section>
  );
}
```

(This deliberately deviates from source by NOT inlining the multi-step form — modal owns that. Cleaner.)

- [ ] **Step 30.3: Wire, build, commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/mobile/EnrollSection.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile EnrollSection (CTA frame, modal handles form)"
```

---

## Task 31: Port mobile/Footer

**Files:**
- Create: `pride-next/src/components/mobile/Footer.tsx`

**Source:** `design-bundle/project/mobile-site.jsx` lines 529–608 (`PrMSFooter`).

- [ ] **Step 31.1: Read + port**

```bash
sed -n '529,608p' "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-site.jsx"
```

Create `src/components/mobile/Footer.tsx`. Port verbatim.

- [ ] **Step 31.2: Compose MobileLanding fully**

Replace `src/components/mobile/Landing.tsx`:

```tsx
import Header from "./Header";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Courses from "./Courses";
import Instructors from "./Instructors";
import Trust from "./Trust";
import Reviews from "./Reviews";
import Faq from "./Faq";
import EnrollSection from "./EnrollSection";
import Footer from "./Footer";

export default function MobileLanding() {
  return (
    <main className="pr-site bg-[var(--pr-black)]">
      <Header />
      <Hero />
      <Marquee />
      <Courses />
      <Instructors />
      <Trust />
      <Reviews />
      <Faq />
      <EnrollSection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 31.3: Build + dev smoke**

```bash
npm run build 2>&1 | tail -3
npm run dev &
sleep 3
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected 200. Kill dev server.

- [ ] **Step 31.4: Commit**

```bash
git add src/components/mobile/Footer.tsx src/components/mobile/Landing.tsx
git commit -m "feat: port mobile Footer + compose mobile landing with all 10 sections"
```

---

## Task 32: Build EnrollModal island

**Files:**
- Create: `pride-next/src/components/islands/EnrollModal.tsx`

**Source:** legacy `pride-driving-school/public/site.jsx` `PrEnrollCard` + `PrEnrollModal` (use `git show 2f17690:public/site.jsx | sed -n '660,861p'` to read).

**Port rules:**
- `"use client"` directive at top.
- Multi-step form: step 1 (course pick) → step 2 (category + transmission) → step 3 (name + phone) → step 4 (success).
- Listens on `document` for clicks on `[data-pr-enroll-trigger]`. If `data-course` attribute exists, preselect course (mapping: СТАРТ→Базовый, ПРЕМИУМ→Премиум, VIP→VIP) and jump to step 2; otherwise step 1.
- Esc closes; backdrop click closes.
- Body scroll lock while open.
- On submit, calls `submitEnrollment` server action; shows error inline; on success advances to step 4.
- Initial state: `open: false`, `step: 1`, `data: initialEnrollData`.

- [ ] **Step 32.1: Create src/components/islands/EnrollModal.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import { type EnrollFormData, initialEnrollData } from "@/lib/enroll";
import { submitEnrollment } from "@/app/actions";

const COURSES = [
  { c: "Базовый", p: "50 000 ₽" },
  { c: "Премиум", p: "65 000 ₽" },
  { c: "VIP", p: "110 000 ₽" },
];

const COURSE_MAP: Record<string, string> = {
  СТАРТ: "Базовый",
  ПРЕМИУМ: "Премиум",
  VIP: "VIP",
};

type Step = 1 | 2 | 3 | 4;

export default function EnrollModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<EnrollFormData>(initialEnrollData);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof EnrollFormData>(k: K, v: EnrollFormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-pr-enroll-trigger]");
      if (!target) return;
      const course = target.getAttribute("data-course");
      if (course) {
        setData((d) => ({ ...d, course: COURSE_MAP[course] || course }));
        setStep(2);
      } else {
        setStep(1);
      }
      setError(null);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    const result = await submitEnrollment(data);
    setSubmitting(false);
    if (result.ok) {
      setStep(4);
    } else {
      setError(result.error || "Ошибка");
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="pr-modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pr-modal-card"
        style={{ position: "relative", width: "100%", maxWidth: 560 }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 2,
            width: 40,
            height: 40,
            borderRadius: 999,
            background: "var(--pr-yellow)",
            color: "#0A0A0A",
            border: 0,
            fontSize: 22,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          ×
        </button>

        <div
          style={{
            background: "#0A0A0A",
            color: "#fff",
            borderRadius: 28,
            padding: 40,
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          {step <= 3 && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: s < 3 ? 1 : 0 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: s <= step ? "var(--pr-yellow)" : "rgba(255,255,255,0.1)",
                      color: s <= step ? "#0A0A0A" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 12,
                    }}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: s < step ? "var(--pr-yellow)" : "rgba(255,255,255,0.1)",
                        marginLeft: 8,
                      }}
                    />
                  )}
                </div>
              ))}
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: "var(--pr-mono)",
                  fontSize: 11,
                  color: "var(--pr-mute)",
                }}
              >
                ШАГ {step} / 3
              </span>
            </div>
          )}

          {step === 1 && (
            <>
              <h3
                style={{
                  fontFamily: "var(--pr-display)",
                  fontWeight: 400,
                  fontSize: 32,
                  marginBottom: 32,
                }}
              >
                ВЫБЕРИТЕ КУРС
              </h3>
              <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
                {COURSES.map(({ c, p }) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("course", c)}
                    style={{
                      background: data.course === c ? "var(--pr-yellow)" : "transparent",
                      color: data.course === c ? "#0A0A0A" : "#fff",
                      border:
                        data.course === c
                          ? "1px solid var(--pr-yellow)"
                          : "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 14,
                      padding: "20px 22px",
                      textAlign: "left",
                      fontSize: 17,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{c}</span>
                    <span style={{ fontFamily: "var(--pr-mono)", fontSize: 13, opacity: 0.7 }}>{p}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="pr-btn-yellow"
                onClick={() => setStep(2)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Дальше →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3
                style={{
                  fontFamily: "var(--pr-display)",
                  fontWeight: 400,
                  fontSize: 32,
                  marginBottom: 32,
                }}
              >
                КАТЕГОРИЯ
              </h3>
              <div style={{ marginBottom: 28 }}>
                <div className="pr-num" style={{ marginBottom: 10 }}>
                  КАТЕГОРИЯ ПРАВ
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {(["A", "B"] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update("category", c)}
                      style={{
                        padding: "20px 0",
                        background: data.category === c ? "var(--pr-yellow)" : "transparent",
                        color: data.category === c ? "#0A0A0A" : "#fff",
                        border:
                          data.category === c
                            ? "1px solid var(--pr-yellow)"
                            : "1px solid rgba(255,255,255,0.18)",
                        borderRadius: 14,
                        fontFamily: "var(--pr-display)",
                        fontWeight: 400,
                        fontSize: 30,
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <div className="pr-num" style={{ marginBottom: 10 }}>
                  КОРОБКА ПЕРЕДАЧ
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {(
                    [
                      ["AT", "Автомат"],
                      ["MT", "Механика"],
                    ] as const
                  ).map(([k, t]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => update("transmission", k)}
                      style={{
                        padding: "18px 0",
                        background: data.transmission === k ? "var(--pr-yellow)" : "transparent",
                        color: data.transmission === k ? "#0A0A0A" : "#fff",
                        border:
                          data.transmission === k
                            ? "1px solid var(--pr-yellow)"
                            : "1px solid rgba(255,255,255,0.18)",
                        borderRadius: 14,
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="pr-btn-ghost"
                  onClick={() => setStep(1)}
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  ← Назад
                </button>
                <button
                  type="button"
                  className="pr-btn-yellow"
                  onClick={() => setStep(3)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Дальше →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3
                style={{
                  fontFamily: "var(--pr-display)",
                  fontWeight: 400,
                  fontSize: 32,
                  marginBottom: 32,
                }}
              >
                КОНТАКТ
              </h3>
              <div style={{ marginBottom: 28 }}>
                <div className="pr-num" style={{ marginBottom: 4 }}>
                  КАК К ВАМ ОБРАЩАТЬСЯ
                </div>
                <input
                  className="pr-input"
                  placeholder="Иван"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 32 }}>
                <div className="pr-num" style={{ marginBottom: 4 }}>
                  ТЕЛЕФОН
                </div>
                <input
                  className="pr-input"
                  placeholder="+7 (___) ___-__-__"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(228,84,0,0.06)",
                  borderRadius: 14,
                  marginBottom: 24,
                  border: "1px solid rgba(228,84,0,0.2)",
                }}
              >
                <div className="pr-num" style={{ color: "var(--pr-yellow)", marginBottom: 8 }}>
                  ВАШ ВЫБОР
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>
                  Курс <strong>«{data.course}»</strong> · Категория{" "}
                  <strong>{data.category}</strong> ·{" "}
                  {data.transmission === "AT" ? "Автомат" : "Механика"}
                </div>
              </div>
              {error && (
                <div
                  style={{
                    color: "#ff6b6b",
                    fontSize: 14,
                    marginBottom: 12,
                    padding: "10px 14px",
                    border: "1px solid rgba(255,107,107,0.4)",
                    borderRadius: 10,
                  }}
                >
                  {error}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="pr-btn-ghost"
                  onClick={() => setStep(2)}
                  disabled={submitting}
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  ← Назад
                </button>
                <button
                  type="button"
                  className="pr-btn-yellow"
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ flex: 1, justifyContent: "center", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Отправка…" : "Записаться →"}
                </button>
              </div>
              <p style={{ marginTop: 18, fontSize: 11, color: "var(--pr-mute)", lineHeight: 1.5 }}>
                Куратор свяжется в течение 15 минут.
              </p>
            </>
          )}

          {step === 4 && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 999,
                  background: "var(--pr-yellow)",
                  color: "#0A0A0A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  fontWeight: 800,
                  margin: "0 auto 28px",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "var(--pr-display)",
                  fontWeight: 400,
                  fontSize: 36,
                  marginBottom: 16,
                }}
              >
                ЗАЯВКА ОТПРАВЛЕНА
              </h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "var(--pr-mute-2)",
                  marginBottom: 28,
                }}
              >
                Куратор свяжется в течение 15 минут.
              </p>
              <button
                type="button"
                className="pr-btn-ghost"
                onClick={() => {
                  setStep(1);
                  setData(initialEnrollData);
                  setOpen(false);
                }}
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 32.2: Build**

```bash
npm run build 2>&1 | tail -3
```

Expected: green.

- [ ] **Step 32.3: Commit**

```bash
git add src/components/islands/EnrollModal.tsx
git commit -m "feat: add EnrollModal island with multi-step form + server action"
```

---

## Task 33: Build BurgerMenu island

**Files:**
- Create: `pride-next/src/components/islands/BurgerMenu.tsx`

**Source:** `design-bundle/project/mobile-menu.jsx` (`PrMobileMenu`).

**Port rules:**
- `"use client"`.
- Listens on `document` clicks for `[data-pr-burger]`.
- Esc closes, click-on-link closes (link still navigates to anchor).
- Body scroll lock.
- Animation classes from globals.css: `pr-menu-root`, `pr-menu-fade`, `pr-menu-tape`, `pr-menu-item` (already in CSS).
- One link is "Запись" — make it a `<button>` with `data-pr-enroll-trigger` so it triggers the modal AND closes the menu.

- [ ] **Step 33.1: Read source**

```bash
cat "C:/Users/david/Documents/Pride/pride-driving-school/docs/superpowers/design-bundle/project/mobile-menu.jsx"
```

- [ ] **Step 33.2: Create src/components/islands/BurgerMenu.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import reviews from "@/data/reviews.json";

const LINKS = [
  { n: "01", t: "Главная", sub: "старт", href: "#top" },
  { n: "02", t: "Курсы", sub: "3 тарифа · от 50 000 ₽", href: "#courses" },
  { n: "03", t: "Инструкторы", sub: "команда из 3 человек", href: "#instructors" },
  {
    n: "04",
    t: "Отзывы",
    sub: `5.0 · ${reviews.length}+ на Авито`,
    href: "#reviews",
  },
  { n: "05", t: "Вопросы", sub: "FAQ · рассрочка · возврат", href: "#faq" },
];

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest("[data-pr-burger]")) {
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;
  const close = () => setOpen(false);
  const lionUrl = "/assets/logo.svg";

  return (
    <div
      className="pr-menu-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "var(--pr-black)",
        color: "#fff",
        overflow: "auto",
      }}
    >
      <div
        className="pr-grid-bg"
        style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
      />
      <div
        className="pr-menu-fade"
        style={{
          position: "absolute",
          right: -120,
          bottom: -80,
          opacity: 0.06,
          pointerEvents: "none",
          width: 460,
          height: 460,
          backgroundImage: `url(${lionUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          animationDelay: "0.15s",
        }}
      />
      <div
        className="pr-tape pr-menu-tape"
        style={{
          position: "absolute",
          left: -40,
          top: 380,
          width: 240,
          height: 28,
          animationDelay: "0.2s",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto" }}>
        <div
          className="pr-menu-fade"
          style={{
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--pr-line)",
            animationDelay: "0.05s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={lionUrl} alt="Pride" width={30} height={30} style={{ display: "block" }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: "var(--pr-display)", fontSize: 18, letterSpacing: "0.04em" }}>
                ПРАЙД
              </span>
              <span
                style={{
                  fontFamily: "var(--pr-mono)",
                  fontSize: 8,
                  letterSpacing: "0.18em",
                  color: "var(--pr-mute)",
                  marginTop: 2,
                }}
              >
                ШКОЛА ВОЖДЕНИЯ
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть меню"
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              background: "var(--pr-yellow)",
              color: "#0A0A0A",
              border: 0,
              fontSize: 20,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div className="pr-menu-fade" style={{ padding: "24px 20px 10px", animationDelay: "0.12s" }}>
          <div className="pr-section-tag" style={{ fontSize: 10 }}>
            МЕНЮ · НАВИГАЦИЯ
          </div>
        </div>

        <nav style={{ padding: "0 20px" }}>
          {LINKS.map((l, i) => (
            <a
              key={l.n}
              href={l.href}
              onClick={close}
              className="pr-menu-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 0",
                borderTop: "1px solid var(--pr-line)",
                color: "#fff",
                animationDelay: `${0.18 + i * 0.06}s`,
                cursor: "pointer",
              }}
            >
              <span className="pr-num" style={{ fontSize: 10, color: "var(--pr-mute)", minWidth: 20 }}>
                {l.n}
              </span>
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--pr-display)",
                    fontSize: 36,
                    lineHeight: 0.95,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {l.t}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--pr-mute-2)",
                    fontFamily: "var(--pr-mono)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {l.sub}
                </span>
              </span>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  border: "1px solid var(--pr-line-strong)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                →
              </span>
            </a>
          ))}
          <button
            type="button"
            data-pr-enroll-trigger
            onClick={close}
            className="pr-menu-item"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "18px 0",
              borderTop: "1px solid var(--pr-line)",
              borderBottom: "1px solid var(--pr-line)",
              background: "transparent",
              color: "var(--pr-yellow)",
              animationDelay: `${0.18 + LINKS.length * 0.06}s`,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span className="pr-num" style={{ fontSize: 10, color: "var(--pr-yellow)", minWidth: 20 }}>
              06
            </span>
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontFamily: "var(--pr-display)",
                  fontSize: 36,
                  lineHeight: 0.95,
                  letterSpacing: "-0.01em",
                }}
              >
                Запись
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--pr-mute-2)",
                  fontFamily: "var(--pr-mono)",
                  letterSpacing: "0.06em",
                }}
              >
                оставить заявку
              </span>
            </span>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: "1px solid var(--pr-yellow)",
                background: "var(--pr-yellow)",
                color: "#0A0A0A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              →
            </span>
          </button>
        </nav>

        <div className="pr-menu-fade" style={{ padding: "28px 20px 20px", animationDelay: "0.6s" }}>
          <div className="pr-num" style={{ fontSize: 9, marginBottom: 12 }}>
            СВЯЗАТЬСЯ
          </div>
          <a
            href="tel:+73912345678"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 18px",
              background: "var(--pr-yellow)",
              color: "#0A0A0A",
              borderRadius: 14,
              marginBottom: 10,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>☎</span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 800, fontSize: 15 }}>+7 (391) 234-56-78</span>
                <span
                  style={{
                    fontFamily: "var(--pr-mono)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  ОТКРЫТО · ДО 21:00
                </span>
              </span>
            </span>
            <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>

        <div
          className="pr-menu-fade"
          style={{
            padding: "20px 20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--pr-line)",
            animationDelay: "0.78s",
          }}
        >
          <div className="pr-num" style={{ fontSize: 9 }}>
            ЛИЦЕНЗИЯ № 7167-Л
          </div>
          <div className="pr-num" style={{ fontSize: 9 }}>
            © 2026
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 33.3: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/islands/BurgerMenu.tsx
git commit -m "feat: add BurgerMenu island for mobile overlay nav"
```

---

## Task 34: Build InstructorDetail island

**Files:**
- Create: `pride-next/src/components/islands/InstructorDetail.tsx`

**Source:** legacy `pride-driving-school/public/mobile-site.jsx` `PrMSInstructorDetail` (`git show 2f17690:public/mobile-site.jsx | sed -n '233,332p'`).

**Port rules:**
- `"use client"`.
- Listens for `[data-pr-instructor-card][data-idx]` clicks. Only triggers on viewport `< 768px` (use `window.matchMedia("(max-width: 767px)").matches`).
- Saves `window.scrollY` in a ref, restores on close via `requestAnimationFrame(() => window.scrollTo(0, savedY))`.
- Body scroll lock.
- Esc closes.
- "Записаться к Льву / Дмитрию" CTA: closes the detail screen, then `setTimeout(60ms)` programmatically clicks the first `[data-pr-enroll-trigger]` in the DOM (which triggers EnrollModal).
- Animations: `pr-prof-photo`, `pr-prof-rise`, `pr-prof-num` (already in CSS).
- Image path: `/assets/${inst.img}`.

- [ ] **Step 34.1: Create src/components/islands/InstructorDetail.tsx**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import instructors from "@/data/instructors.json";

export default function InstructorDetail() {
  const [idx, setIdx] = useState<number | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!window.matchMedia("(max-width: 767px)").matches) return;
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-pr-instructor-card]"
      );
      if (!card) return;
      const i = Number(card.getAttribute("data-idx"));
      if (Number.isNaN(i) || i < 0 || i >= instructors.length) return;
      e.preventDefault();
      scrollYRef.current = window.scrollY;
      setIdx(i);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (idx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [idx]);

  const close = () => {
    const y = scrollYRef.current;
    setIdx(null);
    requestAnimationFrame(() => window.scrollTo(0, y));
  };

  if (idx === null) return null;
  const inst = instructors[idx];
  const dativeName = inst.name === "ЛЕВ" ? "Льву" : "Дмитрию";

  const openEnroll = () => {
    close();
    setTimeout(() => {
      const trigger = document.querySelector<HTMLElement>("[data-pr-enroll-trigger]");
      if (trigger) trigger.click();
    }, 60);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8500,
        background: "var(--pr-black)",
        overflowY: "auto",
      }}
    >
      <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <img
          className="pr-prof-photo"
          src={`/assets/${inst.img}`}
          alt={inst.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            right: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Назад"
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <span
            className="pr-stamp"
            style={{
              color: "#fff",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 9,
              padding: "4px 10px",
            }}
          >
            {inst.tag}
          </span>
        </div>
        <div
          className="pr-prof-num"
          style={{
            position: "absolute",
            right: 16,
            top: 70,
            fontSize: 100,
            fontFamily: "var(--pr-display)",
            color: "#fff",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            animationDelay: "0.25s",
          }}
        >
          0{idx + 1}
        </div>
        <div
          className="pr-prof-rise"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "60px 20px 22px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.92))",
            animationDelay: "0.35s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--pr-mono)",
              fontSize: 10,
              color: "var(--pr-yellow)",
              letterSpacing: "0.18em",
            }}
          >
            {inst.surname}
          </div>
          <div
            style={{
              fontFamily: "var(--pr-display)",
              fontSize: 64,
              lineHeight: 0.9,
              color: "#fff",
              marginTop: 4,
            }}
          >
            {inst.name}
          </div>
        </div>
      </div>

      <div
        className="pr-prof-rise"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--pr-line)",
          animationDelay: "0.5s",
        }}
      >
        {inst.statsBig.map((s, i) => (
          <div
            key={s.l}
            style={{
              flex: 1,
              padding: "20px 12px",
              textAlign: "center",
              borderRight: i < inst.statsBig.length - 1 ? "1px solid var(--pr-line)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--pr-display)",
                fontSize: 28,
                color: "var(--pr-yellow)",
                lineHeight: 1,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: "var(--pr-mono)",
                fontSize: 9,
                color: "var(--pr-mute-2)",
                letterSpacing: "0.1em",
                marginTop: 6,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div className="pr-prof-rise" style={{ padding: "28px 20px 8px", animationDelay: "0.6s" }}>
        <div
          style={{
            fontSize: 18,
            lineHeight: 1.4,
            color: "#fff",
            borderLeft: "2px solid var(--pr-yellow)",
            paddingLeft: 16,
            fontStyle: "italic",
          }}
        >
          «{inst.quote}»
        </div>
      </div>

      <div className="pr-prof-rise" style={{ padding: "24px 20px 0", animationDelay: "0.7s" }}>
        <div className="pr-num" style={{ marginBottom: 14 }}>
          ПОДХОД
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
          {inst.approach.map((s) => (
            <li
              key={s}
              style={{
                display: "flex",
                gap: 12,
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--pr-mute-2)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: 7,
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  background: "var(--pr-yellow)",
                }}
              />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="pr-prof-rise" style={{ padding: "32px 20px 40px", animationDelay: "0.8s" }}>
        <button
          type="button"
          onClick={openEnroll}
          className="pr-btn-yellow"
          style={{ width: "100%", justifyContent: "center", padding: "18px 0", cursor: "pointer" }}
        >
          Записаться к {dativeName} <span style={{ fontSize: 18 }}>→</span>
        </button>
        <a
          href="tel:+73912345678"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            background: "var(--pr-yellow)",
            color: "#0A0A0A",
            borderRadius: 14,
            marginTop: 10,
            textDecoration: "none",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>☎</span>
            <span style={{ fontWeight: 800, fontSize: 15 }}>+7 (391) 234-56-78</span>
          </span>
          <span style={{ fontSize: 18 }}>→</span>
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 34.2: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/islands/InstructorDetail.tsx
git commit -m "feat: add InstructorDetail island for mobile detail screen"
```

---

## Task 35: Wire islands into app/page.tsx

**Files:**
- Modify: `pride-next/src/app/page.tsx`

- [ ] **Step 35.1: Replace src/app/page.tsx**

```tsx
import dynamic from "next/dynamic";
import DesktopLanding from "@/components/desktop/Landing";
import MobileLanding from "@/components/mobile/Landing";

const EnrollModal = dynamic(() => import("@/components/islands/EnrollModal"), {
  ssr: false,
});
const BurgerMenu = dynamic(() => import("@/components/islands/BurgerMenu"), {
  ssr: false,
});
const InstructorDetail = dynamic(() => import("@/components/islands/InstructorDetail"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopLanding />
      </div>
      <div className="md:hidden">
        <MobileLanding />
      </div>
      <EnrollModal />
      <BurgerMenu />
      <InstructorDetail />
    </>
  );
}
```

- [ ] **Step 35.2: Build**

```bash
npm run build 2>&1 | tail -10
```

Expected: green. Should see at least one `dist/static/chunks/...EnrollModal*.js` artifact in build output (or similar — Next.js naming).

- [ ] **Step 35.3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire 3 islands into page (lazy, ssr: false)"
```

---

## Task 36: Local dev smoke — run dev, verify both versions render

**Files:** none (verification only)

- [ ] **Step 36.1: Create .env.local for dev**

```bash
cd C:/Users/david/Documents/Pride/pride-next
cat > .env.local <<'EOF'
BOT_ENDPOINT_URL=http://localhost:3001
BOT_SHARED_SECRET=dev-secret-change-in-prod
EOF
```

- [ ] **Step 36.2: Create .env.local.example for repo doc**

```bash
cat > .env.local.example <<'EOF'
BOT_ENDPOINT_URL=https://your-bot-server.com
BOT_SHARED_SECRET=replace-with-32-char-random
EOF
```

- [ ] **Step 36.3: Run dev**

```bash
npm run dev &
sleep 3
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: `200`.

- [ ] **Step 36.4: Manual check at desktop and mobile widths**

In Chrome DevTools:
- Open `http://localhost:3000/` at width 1920 → see desktop tree (Header, Hero with 220px headline, Marquee, Courses 3 cols, etc.)
- Toggle device emulation to iPhone 12 (390×844) → see mobile tree (compact Header with burger, 76px hero headline, 1-col courses, etc.)
- Click "Записаться" in Header → modal opens at step 1
- On mobile, tap burger → overlay opens; tap a nav link → menu closes, scroll to anchor
- On mobile, tap an instructor card → detail screen opens with photo + stats; tap ← → back to scroll position
- On mobile, in detail screen, tap "Записаться к Льву" → detail closes + modal opens
- Submit form with empty fields → red "Заполните имя" / "Заполните телефон" message
- Submit with valid fields → expects bot.js running on :3001 (next task), so will show error if bot.js not running

Kill dev server when done.

- [ ] **Step 36.5: Add .env.local to .gitignore (already should be by default)**

```bash
grep -E '^\.env' .gitignore
```

If missing, add `.env*.local`.

- [ ] **Step 36.6: Commit env example**

```bash
git add .env.local.example
git commit -m "docs: add .env.local.example with required vars"
```

---

## Task 37: Add Express HTTP endpoint to legacy bot.js

**Files:**
- Modify: `pride-driving-school/bot.js`
- Modify: `pride-driving-school/package.json` (add `express`)
- Modify: `pride-driving-school/.env` (add ADMIN_CHAT_ID, BOT_SHARED_SECRET, BOT_HTTP_PORT)

**Important:** This change is in the `pride-driving-school` repo, NOT `pride-next`. The bot stays as a separate process. Switch repos for this task.

- [ ] **Step 37.1: Switch to legacy repo**

```bash
cd C:/Users/david/Documents/Pride/pride-driving-school
```

- [ ] **Step 37.2: Install express**

```bash
npm install express
```

Expected: `express` added to dependencies in `package.json`.

- [ ] **Step 37.3: Modify bot.js — append HTTP endpoint after existing code**

Add to the end of `bot.js`, after the existing `bot.on('polling_error', ...)` block (after line 52):

```js
import express from 'express';

const app = express();
app.use(express.json({ limit: '8kb' }));

const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const BOT_SHARED_SECRET = process.env.BOT_SHARED_SECRET;
const BOT_HTTP_PORT = process.env.BOT_HTTP_PORT || 3001;

if (!ADMIN_CHAT_ID || !BOT_SHARED_SECRET) {
  console.error('Error: ADMIN_CHAT_ID and BOT_SHARED_SECRET must be set in .env');
  process.exit(1);
}

app.post('/api/enroll', async (req, res) => {
  if (req.headers['x-auth'] !== BOT_SHARED_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { course, category, transmission, name, phone } = req.body || {};
  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'name+phone required' });
  }
  const msg =
    `🚗 Новая заявка\n\n` +
    `Имя: ${name}\n` +
    `Телефон: ${phone}\n` +
    `Курс: ${course}\n` +
    `Категория: ${category}\n` +
    `Коробка: ${transmission}`;
  try {
    await bot.sendMessage(ADMIN_CHAT_ID, msg, {
      reply_markup: {
        inline_keyboard: [[{ text: '⏳ Не звонили', callback_data: 'status_not_called' }]],
      },
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Telegram send failed', err);
    res.status(500).json({ error: 'telegram_failed' });
  }
});

app.listen(BOT_HTTP_PORT, () => {
  console.log(`Bot HTTP endpoint on :${BOT_HTTP_PORT}`);
});
```

- [ ] **Step 37.4: Update .env with new vars (do NOT commit .env)**

Edit `pride-driving-school/.env`:

```
VITE_TELEGRAM_BOT_TOKEN=<existing value>
ADMIN_CHAT_ID=<your telegram chat id — get from @userinfobot in Telegram>
BOT_SHARED_SECRET=<32-char random string, must match pride-next/.env.local>
BOT_HTTP_PORT=3001
```

To generate a shared secret:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"
```

Copy the same value to `pride-next/.env.local` (replace `dev-secret-change-in-prod`).

- [ ] **Step 37.5: Local smoke test of bot.js HTTP endpoint**

```bash
cd C:/Users/david/Documents/Pride/pride-driving-school
node bot.js &
sleep 2
```

Expected output: `Bot is running and waiting for interactions...` AND `Bot HTTP endpoint on :3001`.

Test the endpoint:

```bash
curl -X POST http://localhost:3001/api/enroll \
  -H 'Content-Type: application/json' \
  -H "X-Auth: $(cat .env | grep BOT_SHARED_SECRET | cut -d= -f2)" \
  -d '{"name":"Тест","phone":"+71234567890","course":"Премиум","category":"B","transmission":"AT"}'
```

Expected: `{"ok":true}` AND a Telegram message arrives in your admin chat with status-toggle button.

Test bad auth:

```bash
curl -X POST http://localhost:3001/api/enroll \
  -H 'Content-Type: application/json' \
  -H 'X-Auth: wrong' \
  -d '{}'
```

Expected: `{"error":"unauthorized"}` with status 401.

Kill bot.

- [ ] **Step 37.6: Commit bot.js changes**

```bash
git add bot.js package.json package-lock.json
git commit -m "feat(bot): add HTTP /api/enroll endpoint for next.js form submissions"
```

---

## Task 38: End-to-end local smoke

**Files:** none (verification only)

- [ ] **Step 38.1: Start bot.js and Next.js dev concurrently**

Terminal 1:
```bash
cd C:/Users/david/Documents/Pride/pride-driving-school
node bot.js
```

Terminal 2:
```bash
cd C:/Users/david/Documents/Pride/pride-next
npm run dev
```

- [ ] **Step 38.2: Open http://localhost:3000/**

In Chrome DevTools:
1. Set device to iPhone 12 (390×844).
2. Click "Записаться" in mobile burger or Hero CTA → modal opens.
3. Fill course=Премиум, category=B, transmission=AT, name=Test, phone=+71234567890.
4. Click "Записаться →".
5. Expected: modal advances to step 4 (success). Telegram admin chat receives the message.
6. In admin Telegram chat, click ⏳ "Не звонили" → toggles to ✅ "Позвонили".

- [ ] **Step 38.3: Test error path: stop bot.js, retry submit**

Stop bot.js (Ctrl+C in terminal 1). In the modal, fill fields again, submit. Expected: red error "Сервер недоступен..." in step 3, no advance to step 4.

- [ ] **Step 38.4: Test validation: empty fields**

Restart bot.js. Open modal step 3. Submit with empty name. Expected: "Заполните имя" red text. Same with empty phone.

If all four scenarios work, commit a smoke-test record (no code change, just note):

```bash
cd C:/Users/david/Documents/Pride/pride-next
git commit --allow-empty -m "test: e2e smoke passed (form, validation, error, telegram delivery)"
```

---

## Task 39: GitHub repo + Vercel deployment

**Files:** none in repo (config in Vercel and GitHub)

- [ ] **Step 39.1: Create new GitHub repo**

Manually via web UI: https://github.com/new

Name: `pride-next` (private or public, user's choice). Do NOT initialize with README — we have one.

- [ ] **Step 39.2: Push pride-next to GitHub**

```bash
cd C:/Users/david/Documents/Pride/pride-next
git remote add origin https://github.com/<your-username>/pride-next.git
git branch -M main
git push -u origin main
```

- [ ] **Step 39.3: Connect Vercel to repo**

Manually via Vercel UI: https://vercel.com/new
1. Import `pride-next` repo.
2. Framework: Next.js (auto-detected).
3. Build command: `npm run build` (default).
4. Output directory: `.next` (default).

- [ ] **Step 39.4: Add env vars in Vercel project settings**

In Vercel UI → Project → Settings → Environment Variables, add:

```
BOT_ENDPOINT_URL = https://<your-bot-server.com>
BOT_SHARED_SECRET = <same value as in pride-driving-school/.env>
```

- [ ] **Step 39.5: Deploy preview**

Vercel auto-deploys on push to `main` (production) and on PR (preview). The first push from Step 39.2 triggers a production deploy. Wait ~2 min for build.

Open the production URL Vercel provides. Run the smoke checklist from spec § "Acceptance Criteria":
1. ✅ Desktop @1920 visually matches design
2. ✅ Mobile @390 visually matches design
3. ✅ All interactive flows work
4. ✅ Form submission delivers Telegram message
5. ✅ Lighthouse Mobile Performance ≥ 90 (run from Chrome DevTools)

If any fails, fix and push (auto-redeploys).

- [ ] **Step 39.6: Run Lighthouse**

In Chrome DevTools → Lighthouse tab → Mobile preset → "Performance" + "SEO" + "Accessibility" categories. Click Analyze.

Expected scores:
- Performance ≥ 90
- SEO ≥ 95
- Accessibility ≥ 90

Common fixes if Performance < 90:
- Add `priority` to LCP image (Hero lion silhouette).
- Reduce font weights loaded (drop unused weights).
- Add `loading="lazy"` to below-fold `<img>` (instructor / student photos).

If fixes needed, push them; auto-redeploy.

- [ ] **Step 39.7: Final commit on prod merge**

```bash
git tag -a v1.0.0 -m "Pride · Next.js redesign · v1.0.0"
git push origin v1.0.0
```

---

## Task 40: Acceptance + handoff

**Files:** none

- [ ] **Step 40.1: Run full acceptance checklist from spec § "Acceptance Criteria"**

Verify all 7 criteria. Document any deviations and either fix or note as known issue.

- [ ] **Step 40.2: Update README in pride-next**

Replace the auto-generated README with:

```bash
cat > README.md <<'EOF'
# Pride · Next.js Redesign

Marketing landing for Pride driving school (Krasnoyarsk).

## Stack
- Next.js 15 (App Router, RSC) + TypeScript
- Tailwind CSS 4 + custom CSS variables
- Form submission via Server Action → bot.js HTTP endpoint → Telegram admin chat

## Architecture
- Adaptive split: separate desktop (`src/components/desktop/`) and mobile (`src/components/mobile/`) component trees, switched via CSS visibility (`hidden md:block` / `md:hidden`).
- Static sections are React Server Components (zero client JS).
- Three islands (`EnrollModal`, `BurgerMenu`, `InstructorDetail`) are client components, lazy-loaded with `next/dynamic`.

## Local development

```bash
# Terminal 1: bot
cd ../pride-driving-school
node bot.js

# Terminal 2: Next.js
cd pride-next
cp .env.local.example .env.local  # edit values
npm install
npm run dev
```

Open http://localhost:3000

## Deploy
Auto-deploys to Vercel on push to main. Env vars: `BOT_ENDPOINT_URL`, `BOT_SHARED_SECRET`.

## Tests
```bash
npm test     # node --test on src/lib/*.test.ts
npm run lint
npm run build
```

## Source
Spec: `../pride-driving-school/docs/superpowers/specs/2026-05-08-next-redesign-spec.md`
Plan: `../pride-driving-school/docs/superpowers/plans/2026-05-08-next-redesign-plan.md`
Design bundle: `../pride-driving-school/docs/superpowers/design-bundle/`
EOF
```

```bash
git add README.md
git commit -m "docs: replace scaffold readme with project-specific docs"
git push origin main
```

- [ ] **Step 40.3: Done**

Production deployed. Legacy gh-pages still untouched. User decides when to redirect (out of scope for this plan).

---

## Self-Review

**Spec coverage:**
- Stack/architecture: Tasks 1, 2 (bootstrap, Tailwind), 6 (fonts), 11 (page) ✓
- Adaptive split: Tasks 11, 21, 31, 35 ✓
- Component port (desktop): Tasks 12–20 (9 components) ✓
- Component port (mobile): Tasks 22–31 (10 components) ✓
- Islands: Tasks 32 (EnrollModal), 33 (BurgerMenu), 34 (InstructorDetail) ✓
- Form submission: Tasks 8 (types), 9 (tests), 10 (Server Action) ✓
- bot.js v2: Task 37 ✓
- Data + assets: Tasks 3 (assets), 4 (JSON) ✓
- Globals + design tokens: Tasks 5, 19 (Faq CSS), 6 (font binding) ✓
- Deploy: Task 39 (GitHub + Vercel) ✓
- Acceptance: Task 40 ✓

**Placeholder scan:** No "TODO/TBD". Each step shows actual code or commands.

**Type consistency:** `EnrollFormData` defined in Task 8, used in Tasks 10 (Server Action), 32 (modal). `submitEnrollment` signature: `(data: EnrollFormData) => Promise<SubmitResult>` — consistent. Field names `course/category/transmission/name/phone` consistent across spec, types, action, and bot.js endpoint.

**Type/method names checked:**
- `validateEnroll` (Task 8, 9, 10) — same name everywhere ✓
- `submitEnrollment` (Tasks 10, 32) — same ✓
- `initialEnrollData` (Tasks 8, 9, 32) — same ✓
- `env.botEndpointUrl()` (Tasks 8, 10) — same ✓
- Data attributes consistent: `data-pr-enroll-trigger`, `data-pr-burger`, `data-pr-instructor-card`, `data-idx`, `data-course`

**Scope:** Single plan, ~40 tasks. Tasks are bite-sized (mostly 5-15 min each). Total ~2-3 days of focused work.

**Identified gap during review:** The spec mentions deploying bot.js to "user's existing server" but plan doesn't have a task for that. Decision: leave bot.js deployment out of plan scope — it's an existing process running somewhere already (longpolling worked before). The user just runs it on their existing host with the new env vars added. If user wants new hosting (Railway/Render), that's a follow-up task.
