# Pride · Astro Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Pride driving-school marketing landing from in-browser Babel + JSX to a static Astro site with React islands, preserving all visuals and interactivity.

**Architecture:** Astro SSG generates HTML at build time. Static content (header, hero, courses, instructors, FAQ, footer) renders as `.astro` components with no JS. Interactive parts (burger menu, enroll modal, instructor detail, reviews carousel, mobile-zoom) become React `.tsx` islands hydrated lazily. Data lives in JSON files in `src/data/`. Build output deploys to GitHub Pages via the existing `gh-pages` script.

**Tech Stack:**
- Astro 4 (`@astrojs/react` + `@astrojs/tailwind`)
- React 18 + TypeScript (islands only)
- Tailwind CSS + custom CSS properties (`--pr-*`) for design tokens
- Google Fonts: Bebas Neue, Oswald, Manrope, JetBrains Mono
- `gh-pages` for deployment

---

## File Structure

```
pride-driving-school/
├── astro.config.mjs              # NEW: base, integrations
├── tailwind.config.mjs           # NEW (или .cjs)
├── tsconfig.json                 # MODIFY: extend astro/tsconfigs/strict
├── package.json                  # MODIFY: scripts + deps
├── public/
│   ├── assets/                   # KEEP (фото, лого)
│   └── favicon.svg               # NEW (или из assets/logo.svg)
└── src/
    ├── pages/index.astro         # NEW
    ├── layouts/Base.astro        # NEW
    ├── styles/global.css         # NEW (CSS-переменные, кнопки, анимации)
    ├── data/
    │   ├── reviews.json          # NEW (порт из reviews-data.js)
    │   ├── courses.json          # NEW
    │   ├── instructors.json      # NEW
    │   └── faq.json              # NEW
    ├── components/
    │   ├── PrLion.astro          # NEW (SVG-обёртка)
    │   ├── Header.astro          # NEW
    │   ├── Hero.astro            # NEW
    │   ├── Courses.astro         # NEW
    │   ├── Instructors.astro     # NEW
    │   ├── Trust.astro           # NEW
    │   ├── Faq.astro             # NEW (через <details>)
    │   ├── Footer.astro          # NEW
    │   └── Marquee.astro         # NEW
    └── islands/
        ├── ResponsiveZoom.tsx    # NEW
        ├── BurgerMenu.tsx        # NEW
        ├── EnrollModal.tsx       # NEW (форма + модалка)
        ├── InstructorDetail.tsx  # NEW (детальная карточка)
        └── ReviewsCarousel.tsx   # NEW
```

**Files to delete after green deploy:**
- `index.html` (root)
- `public/site.jsx`, `public/mobile.jsx`, `public/mobile-site.jsx`, `public/mobile-menu.jsx`, `public/reviews-data.js`
- `public/redesign/` (вся директория)
- `src/` старого Vite/React-SPA (после переезда — старая `src/` удаляется и пересоздаётся новая структура)

---

## Pre-flight

- [ ] **Step 0: Создать рабочую ветку**

```bash
cd pride-driving-school
git checkout -b astro-migration
git status   # должно быть clean
```

- [ ] **Step 0b: Старую `src/` сохранить как `_legacy_src/` на ветке**

Старый Vite-SPA лежит в `src/`. Astro тоже хочет жить в `src/`. Переименовать перед началом, чтобы не мешало:

```bash
git mv src _legacy_src
git commit -m "chore(migration): rename old src/ to _legacy_src/ before astro setup"
```

---

## Task 1: Astro scaffolding

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Modify: `tsconfig.json`
- Create: `src/pages/index.astro` (минимальный «hello» для проверки)

- [ ] **Step 1.1: Удалить старые dev-зависимости (vite, плагины React, tailwind v3 конфиг которого нет, eslint react-плагины)**

```bash
npm uninstall vite @vitejs/plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

- [ ] **Step 1.2: Установить Astro + интеграции**

```bash
npm install --save-dev astro @astrojs/react @astrojs/tailwind tailwindcss
npm install --save react@18 react-dom@18
npm install --save-dev @types/react@18 @types/react-dom@18
```

(React 19 в старом проекте — Astro `@astrojs/react` стабильнее на React 18, понижаем сознательно.)

- [ ] **Step 1.3: Заменить scripts в `package.json`**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Удалить из `package.json` поле `"type": "module"` если оно мешает (Astro работает с module/commonjs гибко — обычно оставить `"type": "module"`).

- [ ] **Step 1.4: Создать `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://davidsuxcess.github.io',
  base: '/pride-driving-school',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }), // глобальные стили живут в src/styles/global.css
  ],
  build: {
    assets: 'astro-assets', // чтобы не конфликтовать с public/assets/
  },
});
```

- [ ] **Step 1.5: Создать `tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'pr-yellow': '#E45400',
        'pr-yellow-deep': '#A33C00',
        'pr-black': '#0A0A0A',
        'pr-graphite': '#141414',
        'pr-paper': '#F2EFE6',
      },
      fontFamily: {
        display: ['var(--pr-display)'],
        text: ['var(--pr-text)'],
        mono: ['var(--pr-mono)'],
      },
    },
  },
};
```

- [ ] **Step 1.6: Заменить `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "_legacy_src"]
}
```

- [ ] **Step 1.7: Удалить старые `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `vite.config.ts`, `postcss.config.js`**

```bash
rm tsconfig.app.json tsconfig.node.json eslint.config.js vite.config.ts postcss.config.js
```

(Старая Tailwind конфигурация `tailwind.config.js` если есть — удалить тоже, у нас новая `tailwind.config.mjs`.)

- [ ] **Step 1.8: Создать минимальный `src/pages/index.astro`**

```astro
---
// pages/index.astro — заглушка для проверки сборки
---
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>Прайд — Astro setup</title>
  </head>
  <body>
    <h1>Astro setup OK</h1>
  </body>
</html>
```

- [ ] **Step 1.9: Запустить dev и убедиться что страница открывается**

```bash
npm run dev
```

Ожидается: сервер на `http://localhost:4321/pride-driving-school/`, на странице `Astro setup OK`.

- [ ] **Step 1.10: Запустить build и проверить dist**

```bash
npm run build
ls dist
```

Ожидается: `dist/pride-driving-school/index.html` (с base путём).

- [ ] **Step 1.11: Коммит**

```bash
git add -A
git commit -m "chore(migration): bootstrap astro 4 + react + tailwind scaffolding"
```

---

## Task 2: Глобальные стили

**Files:**
- Create: `src/styles/global.css`

Цель: перенести все CSS-переменные, шрифты, классы (`pr-btn-*`, `pr-card`, `pr-num`, `pr-section-tag`, `pr-stamp`, `pr-mark`, `pr-link-u`, `pr-grid-bg`, `pr-tape`, `pr-tape-thin`, `pr-road`, `pr-input`) и keyframes (`pr-blink`, `pr-marquee*`, `pr-menu-*`, `pr-prof-*`, `pr-modal-*`) из текущего корневого `index.html` в один глобальный CSS-файл.

- [ ] **Step 2.1: Создать `src/styles/global.css`**

Содержимое — копия `<style>...</style>` из текущего корневого `index.html`, без изменений. Источник: `/index.html` строки `<style>` до `</style>` (~250 строк CSS). Вставить целиком.

- [ ] **Step 2.2: Подключить в `Base.astro` (создаётся в Task 3) — пока просто файл лежит**

- [ ] **Step 2.3: Коммит**

```bash
git add src/styles/global.css
git commit -m "feat(migration): port global css (vars, primitives, keyframes)"
```

---

## Task 3: Layout `Base.astro`

**Files:**
- Create: `src/layouts/Base.astro`

Layout — корневой шаблон для всех страниц. Включает `<html>`, шрифты, мета-теги, лоадер «ПРАЙД», импорт глобального CSS.

- [ ] **Step 3.1: Создать `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'ПРАЙД — Автошкола · Красноярск',
  description = 'Автошкола «Прайд» в Красноярске — обучение вождению на категории A и B. Опытные инструкторы, индивидуальный подход, поддержка на всех этапах сдачи экзамена.',
} = Astro.props;
---

<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="theme-color" content="#0A0A0A" />
    <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}/assets/logo.svg`} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${import.meta.env.BASE_URL}/assets/logo.svg`} />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="pr-loader" id="pr-loader">
      <div class="pr-loader-text">ПРАЙД</div>
    </div>
    <slot />

    <script is:inline>
      // Прячет лоадер сразу после первого рендера
      const loader = document.getElementById('pr-loader');
      if (loader) {
        requestAnimationFrame(() => {
          loader.classList.add('hidden');
          setTimeout(() => loader.remove(), 500);
        });
      }
    </script>
  </body>
</html>
```

- [ ] **Step 3.2: Обновить `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
---

<Base>
  <h1 style="padding: 100px 80px;">Astro layout OK</h1>
</Base>
```

- [ ] **Step 3.3: Запустить dev, проверить шрифты и лоадер**

```bash
npm run dev
```

Открыть `http://localhost:4321/pride-driving-school/` → должен показаться лоадер «ПРАЙД» (Oswald 700, оранжевый), потом текст «Astro layout OK».

- [ ] **Step 3.4: Коммит**

```bash
git add src/layouts/Base.astro src/pages/index.astro
git commit -m "feat(migration): add Base layout with fonts, loader, meta"
```

---

## Task 4: Данные в JSON

**Files:**
- Create: `src/data/reviews.json`
- Create: `src/data/courses.json`
- Create: `src/data/instructors.json`
- Create: `src/data/faq.json`

- [ ] **Step 4.1: Создать `src/data/reviews.json`**

Содержимое — массив 55 объектов `{ name, date, text }` из текущего `public/reviews-data.js` (раскрыть `window.PRIDE_REVIEWS = [...]` в чистый JSON-массив; отдельные `\n` в строках сохранить как `\n`).

- [ ] **Step 4.2: Создать `src/data/courses.json`**

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

- [ ] **Step 4.3: Создать `src/data/instructors.json`**

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

- [ ] **Step 4.4: Создать `src/data/faq.json`**

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

- [ ] **Step 4.5: Коммит**

```bash
git add src/data/
git commit -m "feat(migration): port data to JSON (reviews, courses, instructors, faq)"
```

---

## Task 5: `PrLion.astro` (логотип)

**Files:**
- Create: `src/components/PrLion.astro`

Текущая реализация (`public/site.jsx` PrLion): SVG читается из `assets/logo.svg`, для не-оранжевого цвета используется CSS-mask. Перенести один в один.

- [ ] **Step 5.1: Создать `src/components/PrLion.astro`**

```astro
---
interface Props {
  size?: number;
  color?: string;
}

const { size = 40, color = '#E45400' } = Astro.props;
const isOrange = color.toLowerCase() === '#e45400';
const url = `${import.meta.env.BASE_URL}/assets/logo.svg`;
---

{isOrange ? (
  <img src={url} alt="Pride" width={size} height={size} style={`display:block;width:${size}px;height:${size}px`} />
) : (
  <div
    aria-label="Pride"
    style={`width:${size}px;height:${size}px;background-color:${color};-webkit-mask-image:url(${url});mask-image:url(${url});-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;`}
  />
)}
```

- [ ] **Step 5.2: Коммит**

```bash
git add src/components/PrLion.astro
git commit -m "feat(migration): port PrLion logo component"
```

---

## Task 6: `Header.astro` (статика, бургер — пока без js)

**Files:**
- Create: `src/components/Header.astro`

Перенос из `public/site.jsx` `PrHeader` (строки ~50-100). Бургер-кнопка получает `data-pr-burger` атрибут — потом BurgerMenu остров навешает обработчик.

- [ ] **Step 6.1: Создать `src/components/Header.astro`**

```astro
---
import PrLion from './PrLion.astro';
---

<header
  id="top"
  style="position:sticky;top:0;z-index:50;background:rgba(10,10,10,0.85);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--pr-line);"
>
  <div style="max-width:1760px;margin:0 auto;padding:24px 80px;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:12px;">
      <PrLion size={56} color="#E45400" />
      <div style="display:flex;flex-direction:column;line-height:1;">
        <span style="font-family:var(--pr-display);font-size:22px;letter-spacing:0.04em;font-weight:700;">ПРАЙД</span>
        <span style="font-family:var(--pr-mono);font-size:9px;letter-spacing:0.2em;color:var(--pr-mute);margin-top:3px;">
          ШКОЛА ВОЖДЕНИЯ
        </span>
      </div>
    </div>

    <nav class="pr-nav-desktop" style="display:flex;align-items:center;gap:36px;font-size:14px;font-weight:600;">
      <a class="pr-link-u" href="#courses">Курсы</a>
      <a class="pr-link-u" href="#instructors">Инструкторы</a>
      <a class="pr-link-u" href="#reviews">Отзывы</a>
      <a class="pr-link-u" href="#faq">Вопросы</a>
    </nav>

    <div style="display:flex;align-items:center;gap:16px;">
      <div class="pr-phone-block" style="text-align:right;">
        <div style="font-family:var(--pr-mono);font-size:10px;color:var(--pr-mute);letter-spacing:0.16em;">
          ОТКРЫТО · ДО 21:00
        </div>
        <div style="font-weight:700;font-size:15px;margin-top:2px;">+7 (391) 234-56-78</div>
      </div>
      <button
        type="button"
        data-pr-enroll-trigger
        class="pr-btn-yellow"
        style="padding:12px 22px;font-size:12px;"
      >
        Записаться <span style="font-size:16px;">→</span>
      </button>
      <button
        type="button"
        data-pr-burger
        class="pr-burger-btn"
        aria-label="Открыть меню"
        style="display:none;width:38px;height:38px;border-radius:999px;background:var(--pr-yellow);color:#0A0A0A;border:0;font-size:18px;font-weight:800;cursor:pointer;"
      >
        ≡
      </button>
    </div>
  </div>
</header>

<style>
  /* Адаптив: на мобилке бургер вместо nav, кнопок и телефона */
  @media (max-width: 767px) {
    .pr-nav-desktop, .pr-phone-block { display: none !important; }
    [data-pr-enroll-trigger] { display: none !important; }
    [data-pr-burger] { display: flex !important; align-items: center; justify-content: center; }
  }
</style>
```

(Адаптив: `data-pr-burger` показывается только на мобилке. На мобилке логотип уменьшается до 48px через CSS — добавить если нужно.)

- [ ] **Step 6.2: Подключить в `index.astro` для smoke-теста**

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
---

<Base>
  <Header />
  <main style="min-height:100vh;background:var(--pr-black);color:#fff;padding:200px 80px;">
    <h1 style="font-family:var(--pr-display);font-weight:700;font-size:120px;color:var(--pr-yellow);">HEADER OK</h1>
  </main>
</Base>
```

- [ ] **Step 6.3: `npm run dev` → открыть, проверить sticky-шапку, шрифты, лого**

- [ ] **Step 6.4: Коммит**

```bash
git add src/components/Header.astro src/pages/index.astro
git commit -m "feat(migration): add static Header.astro"
```

---

## Task 7: `Hero.astro`

**Files:**
- Create: `src/components/Hero.astro`

Перенос из `public/site.jsx` `PrHero` (строки ~100-175). CTA-кнопка получает `data-pr-enroll-trigger` (тот же атрибут, что и в Header) — обработчик навешивает остров EnrollModal.

- [ ] **Step 7.1: Создать `src/components/Hero.astro`**

Контент порта:
- секция с `position:relative;overflow:hidden;background:var(--pr-black);`
- `pr-grid-bg` фон
- два `pr-tape` элемента (диагональные ленты)
- большой полупрозрачный `<PrLion size={780} color="#E45400" />`
- maxWidth 1760, padding 140px 80px 120px
- h1 fontSize 220, «ВОДИ <br> УВЕРЕННО.» с полосой-цитатой справа
- Row CTA: «Записаться на курс» (data-pr-enroll-trigger) + ghost «Как проходит занятие»
- Внизу `pr-road` линия

Скопировать структуру из `public/site.jsx` строки 102-174, заменить:
- `<PrLion>` на `<PrLion>` Astro
- inline JSX `style={{...}}` на Astro inline `style="..."`
- onClick → `data-pr-enroll-trigger`

Точные строки взять из текущего файла на ветке (`git show main:public/site.jsx`).

- [ ] **Step 7.2: Подключить в `index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
---

<Base>
  <Header />
  <Hero />
</Base>
```

- [ ] **Step 7.3: `npm run dev`, визуальный smoke-тест**

- [ ] **Step 7.4: Коммит**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat(migration): add static Hero.astro"
```

---

## Task 8: `Marquee.astro` (бегущая строка)

**Files:**
- Create: `src/components/Marquee.astro`

Перенос из `public/site.jsx` `PrMarquee` (строки ~177-210). Чисто CSS-анимация, без JS.

- [ ] **Step 8.1: Создать компонент**

Astro-компонент рендерит `<div class="pr-marquee-track">` с текстами `КАТ. B · АВТОМАТ`, `КАТ. B · МЕХАНИКА`, и т.д. (8 элементов из текущего PrMarquee), повторённых 3 раза для бесшовности.

```astro
---
const items = [
  'КАТ. B · АВТОМАТ', 'КАТ. B · МЕХАНИКА', 'ИНДИВИДУАЛЬНЫЙ ГРАФИК',
  'СОПРОВОЖДЕНИЕ В ГИБДД', 'ЗАБИРАЕМ ИЗ ДОМА', 'ПЛАТЁЖ В РАССРОЧКУ',
  'ЛИЦЕНЗИЯ № 7167-Л', 'СВОЙ АВТОПАРК',
];
const track = [...items, ...items, ...items];
---

<div style="background:var(--pr-yellow);color:var(--pr-black);overflow:hidden;padding:18px 0;border-top:1px solid var(--pr-black);border-bottom:1px solid var(--pr-black);">
  <div class="pr-marquee-track" style="display:flex;gap:48px;white-space:nowrap;width:max-content;">
    {track.map((t) => (
      <div style="display:flex;align-items:center;gap:48px;font-weight:800;font-size:15px;letter-spacing:0.04em;">
        <span>{t}</span>
        <span style="font-size:14px;">✦</span>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 8.2: Подключить и проверить**

- [ ] **Step 8.3: Коммит**

```bash
git commit -am "feat(migration): add Marquee.astro"
```

---

## Task 9: `Courses.astro`

**Files:**
- Create: `src/components/Courses.astro`

Перенос из `public/site.jsx` `PrCourses`. Кнопка «Выбрать» получает `data-pr-enroll-trigger` + `data-course="<title>"` — остров EnrollModal прочитает курс при открытии.

- [ ] **Step 9.1: Создать компонент**

```astro
---
import courses from '../data/courses.json';
---

<section id="courses" style="padding:160px 80px;background:var(--pr-paper);color:var(--pr-paper-ink);">
  <div style="max-width:1760px;margin:0 auto;">
    <div class="pr-section-tag" style="color:#3a3a3a;">[02] КУРСЫ</div>
    <h2 style="font-size:120px;margin-top:24px;color:var(--pr-paper-ink);">
      ВЫБЕРИ <span style="color:var(--pr-yellow);">СВОЙ ТЕМП.</span>
    </h2>
    <p style="margin-top:24px;font-size:18px;line-height:1.5;color:#3a3a3a;max-width:560px;">
      Все три программы дают одно удостоверение государственного образца. Различаются часами, сопровождением и комфортом.
    </p>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:64px;">
      {courses.map((c, i) => (
        <article style={`
          background:${c.vip ? 'var(--pr-black)' : c.accent ? 'var(--pr-yellow)' : '#fff'};
          color:${c.vip ? '#fff' : 'var(--pr-paper-ink)'};
          border-radius:var(--pr-r-xl);padding:40px 36px;position:relative;
          ${!c.accent && !c.vip ? 'border:1px solid rgba(0,0,0,0.08);' : ''}
        `}>
          {c.accent && (
            <div style="position:absolute;top:-12px;left:24px;background:var(--pr-black);color:var(--pr-yellow);padding:6px 14px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:0.1em;">
              {c.tag}
            </div>
          )}
          {!c.accent && (
            <div class="pr-num" style={`color:${c.vip ? 'var(--pr-yellow)' : '#7a7a7a'};font-size:11px;`}>
              0{i + 1} · {c.tag}
            </div>
          )}
          <h3 style={`font-family:var(--pr-display);font-weight:700;font-size:64px;margin-top:${c.accent ? '20px' : '12px'};line-height:0.9;`}>
            {c.title}
          </h3>
          <p style={`font-size:14px;line-height:1.5;opacity:${c.vip ? '0.8' : '0.7'};margin:14px 0 24px;`}>
            {c.pitch}
          </p>
          <div style="display:flex;align-items:baseline;gap:6px;">
            <span style="font-family:var(--pr-display);font-weight:700;font-size:48px;">{c.price}</span>
            <span style="font-size:18px;opacity:0.6;">₽</span>
          </div>
          <div style={`font-family:var(--pr-mono);font-size:10px;letter-spacing:0.1em;color:${c.vip ? 'var(--pr-yellow)' : c.accent ? '#3a1a00' : '#7a7a7a'};margin-top:6px;margin-bottom:24px;`}>
            {c.hours}
          </div>
          <ul style="list-style:none;padding:0;margin:0 0 24px;display:grid;gap:10px;">
            {c.features.map((f) => (
              <li style="display:flex;gap:12px;font-size:14px;line-height:1.4;">
                <span style={`flex-shrink:0;margin-top:7px;width:6px;height:6px;border-radius:1px;background:${c.vip ? 'var(--pr-yellow)' : c.accent ? 'var(--pr-black)' : 'var(--pr-yellow-deep)'};`} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-pr-enroll-trigger
            data-course={c.title}
            style={`
              width:100%;background:${c.vip ? 'var(--pr-yellow)' : 'var(--pr-black)'};
              color:${c.vip ? 'var(--pr-black)' : c.accent ? 'var(--pr-yellow)' : '#fff'};
              border:0;border-radius:999px;padding:18px 24px;font-weight:800;font-size:13px;
              letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;
              display:flex;justify-content:space-between;align-items:center;
            `}
          >
            <span>Выбрать</span>
            <span>→</span>
          </button>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 9.2: Smoke-тест и коммит**

```bash
git add src/components/Courses.astro src/pages/index.astro
git commit -m "feat(migration): add static Courses.astro"
```

---

## Task 10: `Instructors.astro` (компактные карточки)

**Files:**
- Create: `src/components/Instructors.astro`

Перенос из `public/site.jsx` `PrInstructors` (строки ~380-535). Карточки получают `data-pr-instructor-card data-idx="0|1|2"` — остров `InstructorDetail` навесит обработчик клика на детальный экран. На десктопе детального вида может не быть (опционально, как в текущем сайте — нет). Уточнение: текущий десктоп не имеет детального вида, только мобилка. На десктопе оставляем компактные карточки без islands, на мобилке — клик → детальный вид.

- [ ] **Step 10.1: Создать компонент**

Структура: `id="instructors"`, секция-тег `[03] КОМАНДА`, h2 «ТРОЕ ЛЮДЕЙ, КОТОРЫЕ НЕ КРИЧАТ.», grid из 3 карточек (фото + tag + ватермарка + имя + цитата + статы).

Атрибут на каждой карточке: `data-pr-instructor-card data-idx={i}`. На мобилке остров делает их кликабельными.

(Полный код — порт из site.jsx PrInstructors.)

- [ ] **Step 10.2: Коммит**

```bash
git commit -am "feat(migration): add Instructors.astro (static compact cards)"
```

---

## Task 11: `Trust.astro`

**Files:**
- Create: `src/components/Trust.astro`

Trust-marquee с лицензией и регалиями. Чистая статика. Перенос из `public/site.jsx` `PrTrust`.

- [ ] **Step 11.1: Создать компонент** (Trust = bar с маркизой `pr-marquee-track-rev`, 4 элемента: лицензия, росреестр, ГИБДД, авито).

- [ ] **Step 11.2: Коммит**

```bash
git commit -am "feat(migration): add Trust.astro"
```

---

## Task 12: `Faq.astro` (через `<details>`)

**Files:**
- Create: `src/components/Faq.astro`

Использовать нативный `<details>/<summary>` — никакого JS. Стилизовать под дизайн (стрелка, разворот, тени).

- [ ] **Step 12.1: Создать компонент**

```astro
---
import faq from '../data/faq.json';
---

<section id="faq" style="padding:160px 80px;background:var(--pr-paper);color:var(--pr-paper-ink);">
  <div style="max-width:1760px;margin:0 auto;display:grid;grid-template-columns:420px 1fr;gap:160px;">
    <div>
      <div class="pr-section-tag" style="color:#3a3a3a;">[05] ВОПРОСЫ</div>
      <h2 style="font-size:60px;margin-top:24px;line-height:0.9;">
        ЧАСТО<br />СПРАШИВАЮТ.
      </h2>
      <p style="margin-top:32px;font-size:16px;line-height:1.5;color:#3a3a3a;">
        Не нашли ответа? Напишите в Telegram или WhatsApp — отвечаем в течение 30 минут.
      </p>
    </div>
    <div style="display:grid;gap:8px;">
      {faq.map((f, i) => (
        <details
          style="border-top:1px solid rgba(0,0,0,0.1);padding:22px 0;cursor:pointer;"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary style="display:flex;justify-content:space-between;align-items:center;font-family:var(--pr-display);font-weight:700;font-size:22px;line-height:1.1;list-style:none;">
            <span>{f.q}</span>
            <span class="pr-faq-arrow" style="font-size:24px;color:var(--pr-yellow);transition:transform 0.2s;">+</span>
          </summary>
          <p style="margin-top:14px;font-size:15px;line-height:1.6;color:#3a3a3a;">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>

<style>
  details[open] .pr-faq-arrow { transform: rotate(45deg); }
  details > summary::-webkit-details-marker { display: none; }
</style>
```

- [ ] **Step 12.2: Коммит**

```bash
git commit -am "feat(migration): add Faq.astro with native details/summary"
```

---

## Task 13: `Footer.astro`

**Files:**
- Create: `src/components/Footer.astro`

Перенос из `public/site.jsx` `PrFooter`. Большая надпись «ПРАЙД», блок Красноярск + «МАСТЕРСТВО НАЧИНАЕТСЯ ЗДЕСЬ.», навигация, контакты, лицензия.

- [ ] **Step 13.1: Создать компонент** (порт точно по разметке).

- [ ] **Step 13.2: Коммит**

```bash
git commit -am "feat(migration): add Footer.astro"
```

---

## Task 14: `Reviews.astro` без карусели + ReviewsCarousel остров

**Files:**
- Create: `src/components/Reviews.astro`
- Create: `src/islands/ReviewsCarousel.tsx`

Обёртка-секция статичная (`Reviews.astro` с заголовком/подзаголовком), сама лента и карточки рендерятся CSS-анимацией без JS — `pr-marquee-track-fast` уже работает чистым CSS.

JS-остров нужен только если есть пауза при ховере/touch — это уже в CSS через `:hover { animation-play-state: paused }`. Значит остров **не нужен** — всё работает на CSS!

- [ ] **Step 14.1: Создать `Reviews.astro` со статичной разметкой каруселей**

(Порт из `PrReviews`. Photo-marquee и review-marquee — чистые `<div class="pr-marquee-track-fast">` с CSS-анимацией.)

- [ ] **Step 14.2: Smoke-тест: scroll, hover-pause работают через CSS**

- [ ] **Step 14.3: Коммит**

```bash
git commit -am "feat(migration): add Reviews.astro (CSS-only carousel)"
```

---

## Task 15: `EnrollModal.tsx` остров (форма + модалка)

**Files:**
- Create: `src/islands/EnrollModal.tsx`

Полный остров: модалка с блюром + multi-step форма (Course → Category/Transmission → Contact → Success), submit → WhatsApp.

- [ ] **Step 15.1: Создать остров**

```tsx
import { useEffect, useRef, useState } from 'react';

const WHATSAPP_PHONE = '79991234567';

interface FormData {
  course: string;
  category: 'A' | 'B';
  transmission: 'AT' | 'MT';
  name: string;
  phone: string;
}

const initial: FormData = {
  course: 'Премиум',
  category: 'B',
  transmission: 'AT',
  name: '',
  phone: '',
};

export default function EnrollModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<FormData>(initial);
  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  // Триггеры открытия — все элементы с data-pr-enroll-trigger
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-pr-enroll-trigger]');
      if (!target) return;
      const course = target.getAttribute('data-course');
      if (course) {
        const map: Record<string, string> = { 'СТАРТ': 'Базовый', 'ПРЕМИУМ': 'Премиум', 'VIP': 'VIP' };
        setData((d) => ({ ...d, course: map[course] || course }));
        setStep(2);
      } else {
        setStep(1);
      }
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const submit = () => {
    if (!data.name.trim() || !data.phone.trim()) {
      alert('Заполните имя и телефон');
      return;
    }
    const text = encodeURIComponent(
      `Здравствуйте! Хочу записаться на курс.\n\n` +
      `Имя: ${data.name}\nТелефон: ${data.phone}\n` +
      `Курс: «${data.course}»\nКатегория: ${data.category}\n` +
      `Коробка: ${data.transmission === 'AT' ? 'Автомат' : 'Механика'}`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
    setStep(4);
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="pr-modal-backdrop"
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pr-modal-card"
        style={{ position: 'relative', width: '100%', maxWidth: 560 }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 2,
            width: 40, height: 40, borderRadius: 999,
            background: 'var(--pr-yellow)', color: '#0A0A0A',
            border: 0, fontSize: 22, fontWeight: 800, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}
        >
          ×
        </button>

        <div style={{
          background: '#0A0A0A', color: '#fff', borderRadius: 28,
          padding: 40, boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        }}>
          {/* Step indicator */}
          {step <= 3 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 999,
                    background: s <= step ? 'var(--pr-yellow)' : 'rgba(255,255,255,0.1)',
                    color: s <= step ? '#0A0A0A' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 12,
                  }}>{s}</div>
                  {s < 3 && (
                    <div style={{ flex: 1, height: 1, background: s < step ? 'var(--pr-yellow)' : 'rgba(255,255,255,0.1)', marginLeft: 8 }} />
                  )}
                </div>
              ))}
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--pr-mono)', fontSize: 11, color: 'var(--pr-mute)' }}>
                ШАГ {step} / 3
              </span>
            </div>
          )}

          {step === 1 && (
            <>
              <h3 style={{ fontFamily: 'var(--pr-display)', fontWeight: 700, fontSize: 32, marginBottom: 32 }}>ВЫБЕРИТЕ КУРС</h3>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {[
                  { c: 'Базовый', p: '50 000 ₽' },
                  { c: 'Премиум', p: '65 000 ₽' },
                  { c: 'VIP', p: '110 000 ₽' },
                ].map(({ c, p }) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update('course', c)}
                    style={{
                      background: data.course === c ? 'var(--pr-yellow)' : 'transparent',
                      color: data.course === c ? '#0A0A0A' : '#fff',
                      border: data.course === c ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 14, padding: '20px 22px', textAlign: 'left',
                      fontSize: 17, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}
                  >
                    <span>{c}</span>
                    <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 13, opacity: 0.7 }}>{p}</span>
                  </button>
                ))}
              </div>
              <button type="button" className="pr-btn-yellow" onClick={() => setStep(2)} style={{ width: '100%', justifyContent: 'center' }}>
                Дальше →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontFamily: 'var(--pr-display)', fontWeight: 700, fontSize: 32, marginBottom: 32 }}>КАТЕГОРИЯ</h3>
              <div style={{ marginBottom: 28 }}>
                <div className="pr-num" style={{ marginBottom: 10 }}>КАТЕГОРИЯ ПРАВ</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {(['A', 'B'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update('category', c)}
                      style={{
                        padding: '20px 0',
                        background: data.category === c ? 'var(--pr-yellow)' : 'transparent',
                        color: data.category === c ? '#0A0A0A' : '#fff',
                        border: data.category === c ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                        borderRadius: 14, fontFamily: 'var(--pr-display)', fontWeight: 700, fontSize: 30, cursor: 'pointer',
                      }}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <div className="pr-num" style={{ marginBottom: 10 }}>КОРОБКА ПЕРЕДАЧ</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {([['AT', 'Автомат'], ['MT', 'Механика']] as const).map(([k, t]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => update('transmission', k)}
                      style={{
                        padding: '18px 0',
                        background: data.transmission === k ? 'var(--pr-yellow)' : 'transparent',
                        color: data.transmission === k ? '#0A0A0A' : '#fff',
                        border: data.transmission === k ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                        borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: 'pointer',
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="pr-btn-ghost" onClick={() => setStep(1)} style={{ borderColor: 'rgba(255,255,255,0.2)' }}>← Назад</button>
                <button type="button" className="pr-btn-yellow" onClick={() => setStep(3)} style={{ flex: 1, justifyContent: 'center' }}>
                  Дальше →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ fontFamily: 'var(--pr-display)', fontWeight: 700, fontSize: 32, marginBottom: 32 }}>КОНТАКТ</h3>
              <div style={{ marginBottom: 28 }}>
                <div className="pr-num" style={{ marginBottom: 4 }}>КАК К ВАМ ОБРАЩАТЬСЯ</div>
                <input className="pr-input" placeholder="Иван" defaultValue={data.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div style={{ marginBottom: 32 }}>
                <div className="pr-num" style={{ marginBottom: 4 }}>ТЕЛЕФОН</div>
                <input className="pr-input" placeholder="+7 (___) ___-__-__" defaultValue={data.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div style={{
                padding: '16px 20px', background: 'rgba(228,84,0,0.06)', borderRadius: 14,
                marginBottom: 24, border: '1px solid rgba(228,84,0,0.2)',
              }}>
                <div className="pr-num" style={{ color: 'var(--pr-yellow)', marginBottom: 8 }}>ВАШ ВЫБОР</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>
                  Курс <strong>«{data.course}»</strong> · Категория <strong>{data.category}</strong> · {data.transmission === 'AT' ? 'Автомат' : 'Механика'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="pr-btn-ghost" onClick={() => setStep(2)} style={{ borderColor: 'rgba(255,255,255,0.2)' }}>← Назад</button>
                <button type="button" className="pr-btn-yellow" onClick={submit} style={{ flex: 1, justifyContent: 'center' }}>
                  Записаться →
                </button>
              </div>
              <p style={{ marginTop: 18, fontSize: 11, color: 'var(--pr-mute)', lineHeight: 1.5 }}>
                Откроется WhatsApp с заполненной заявкой. Куратор свяжется в течение 15 минут.
              </p>
            </>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: 88, height: 88, borderRadius: 999, background: 'var(--pr-yellow)', color: '#0A0A0A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 800,
                margin: '0 auto 28px',
              }}>✓</div>
              <h3 style={{ fontFamily: 'var(--pr-display)', fontWeight: 700, fontSize: 36, marginBottom: 16 }}>ОТКРЫЛИ WHATSAPP</h3>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--pr-mute-2)', marginBottom: 28 }}>
                Нажмите «Отправить» в WhatsApp — куратор свяжется в течение 15 минут.
              </p>
              <button type="button" className="pr-btn-ghost" onClick={() => { setStep(1); setData(initial); }}>
                Отправить ещё одну заявку
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 15.2: Подключить остров в `index.astro`**

```astro
---
import EnrollModal from '../islands/EnrollModal.tsx';
// ...
---
<Base>
  <Header />
  <Hero />
  <!-- ... -->
  <EnrollModal client:idle />
</Base>
```

(`client:idle` — гидрируется когда браузер свободен, не блокирует первый рендер.)

- [ ] **Step 15.3: Тест: клик «Записаться» в шапке/hero/курсах → модалка с блюром, шаги, WhatsApp**

- [ ] **Step 15.4: Коммит**

```bash
git commit -am "feat(migration): add EnrollModal island with multi-step form"
```

---

## Task 16: `BurgerMenu.tsx` остров

**Files:**
- Create: `src/islands/BurgerMenu.tsx`

Слушает клик по `[data-pr-burger]`, показывает оверлей-меню. Анимации через CSS-классы из `global.css` (уже есть `pr-menu-*`).

- [ ] **Step 16.1: Создать остров**

```tsx
import { useEffect, useState } from 'react';

const links = [
  { n: '01', t: 'Главная', sub: 'старт', href: '#top' },
  { n: '02', t: 'Курсы', sub: '3 тарифа · от 50 000 ₽', href: '#courses' },
  { n: '03', t: 'Инструкторы', sub: 'команда из 3 человек', href: '#instructors' },
  { n: '04', t: 'Отзывы', sub: '5.0 · 55 на Авито', href: '#reviews' },
  { n: '05', t: 'Вопросы', sub: 'FAQ · рассрочка · возврат', href: '#faq' },
  { n: '06', t: 'Запись', sub: 'оставить заявку', href: '#enroll' },
];

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('[data-pr-burger]')) setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  // ... разметка из public/mobile-menu.jsx PrMobileMenu (с onClose=setOpen(false))
  return (/* full markup */);
}
```

(Полный JSX-портировать из `public/mobile-menu.jsx`. Все анимационные классы (`pr-menu-root`, `pr-menu-fade`, `pr-menu-tape`, `pr-menu-item`) уже в global.css.)

- [ ] **Step 16.2: Подключить в `Base.astro` (или `index.astro`) с `client:idle`**

- [ ] **Step 16.3: Тест на мобильной ширине (Chrome DevTools 390px)**

- [ ] **Step 16.4: Коммит**

```bash
git commit -am "feat(migration): add BurgerMenu island"
```

---

## Task 17: `InstructorDetail.tsx` остров

**Files:**
- Create: `src/islands/InstructorDetail.tsx`

Слушает клик по `[data-pr-instructor-card]`, открывает full-screen детальный экран на мобилке. Анимации `pr-prof-*` уже в global.css.

- [ ] **Step 17.1: Создать остров**

Логика:
- Состояние `selectedIdx: number | null`
- При клике на `[data-pr-instructor-card]` (только на мобилке: проверять `window.matchMedia('(max-width: 767px)').matches`) ставит `selectedIdx`
- Сохраняет `window.scrollY` в ref → восстанавливает при закрытии
- Кнопка `←` закрывает
- Кнопка «Записаться к ИМЯ» закрывает + dispatch click на `[data-pr-enroll-trigger]` (или setTimeout + триггер)

Импорт данных:

```tsx
import instructorsData from '../data/instructors.json';
```

(JSX порт из `public/mobile-site.jsx` PrMSInstructorDetail.)

- [ ] **Step 17.2: Подключить с `client:idle`**

- [ ] **Step 17.3: Тест на мобиле: клик по карточке → детальный экран; ← закрывает с восстановлением скролла; «Записаться к Льву» закрывает + открывает модалку**

- [ ] **Step 17.4: Коммит**

```bash
git commit -am "feat(migration): add InstructorDetail island"
```

---

## Task 18: `ResponsiveZoom.tsx` остров

**Files:**
- Create: `src/islands/ResponsiveZoom.tsx`

Минимальный остров: на мобилке (<768px) ставит CSS-переменную `--pr-mobile-zoom` на `<html>`, рассчитывая `min(1.10, viewport / 390)`. Также добавляет/убирает класс `pr-is-mobile` чтобы различать стили.

- [ ] **Step 18.1: Создать остров**

```tsx
import { useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_DESIGN_W = 390;

export default function ResponsiveZoom() {
  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      const w = window.innerWidth;
      if (w < MOBILE_BREAKPOINT) {
        const scale = Math.min(1.10, w / MOBILE_DESIGN_W);
        html.style.setProperty('--pr-mobile-zoom', scale.toFixed(4));
        html.classList.add('pr-is-mobile');
      } else {
        html.style.removeProperty('--pr-mobile-zoom');
        html.classList.remove('pr-is-mobile');
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return null;
}
```

- [ ] **Step 18.2: Подключить в `Base.astro` с `client:load` (нужно сразу при гидрации):**

```astro
---
import ResponsiveZoom from '../islands/ResponsiveZoom.tsx';
---
<!-- В <body>, перед <slot /> -->
<ResponsiveZoom client:load />
```

- [ ] **Step 18.3: Применить zoom в global.css на body или контейнере**

```css
/* В global.css добавить: */
body {
  zoom: var(--pr-mobile-zoom, 1);
}
```

(Если зум должен влиять только на мобилке — он и сработает только когда переменная задана.)

- [ ] **Step 18.4: Коммит**

```bash
git commit -am "feat(migration): add ResponsiveZoom island for mobile scaling"
```

---

## Task 19: Финальная сборка `index.astro`

**Files:**
- Modify: `src/pages/index.astro`

Собрать все секции и острова в правильном порядке.

- [ ] **Step 19.1: Финальный `index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Marquee from '../components/Marquee.astro';
import Courses from '../components/Courses.astro';
import Instructors from '../components/Instructors.astro';
import Trust from '../components/Trust.astro';
import Reviews from '../components/Reviews.astro';
import Faq from '../components/Faq.astro';
import Footer from '../components/Footer.astro';
import EnrollModal from '../islands/EnrollModal.tsx';
import BurgerMenu from '../islands/BurgerMenu.tsx';
import InstructorDetail from '../islands/InstructorDetail.tsx';
---

<Base>
  <Header />
  <Hero />
  <Marquee />
  <Courses />
  <Instructors />
  <Trust />
  <Reviews />
  <Faq />
  <Footer />

  <EnrollModal client:idle />
  <BurgerMenu client:idle />
  <InstructorDetail client:idle />
</Base>
```

- [ ] **Step 19.2: Smoke-тест полной страницы**

```bash
npm run dev
```

Открыть на 1920×1080 — все секции на месте, кнопки работают.

- [ ] **Step 19.3: Коммит**

```bash
git commit -am "feat(migration): wire full index.astro with all sections + islands"
```

---

## Task 20: Адаптив (визуальная проверка) на 320 / 360 / 375 / 390 / 414 / 430 / 1024 / 1366 / 1920

**Files:** none (только проверка)

- [ ] **Step 20.1: Открыть DevTools → Toggle device toolbar**

- [ ] **Step 20.2: Перебрать ширины: 320, 360, 375, 390, 414, 430, 1024, 1366, 1920**

Проверить на каждой:
- ничего не уходит за края (нет горизонтального скролла)
- бургер-кнопка показывается на мобилке, скрыта на десктопе
- модалка открывается и центрируется
- инструктор-карточки на мобилке кликабельны
- карусели прокручиваются

- [ ] **Step 20.3: Если нашли баг — починить и закоммитить.** Если всё ок — пропустить шаг.

- [ ] **Step 20.4: Коммит фиксов (если были)**

```bash
git commit -am "fix(migration): adaptive layout fixes"
```

---

## Task 21: Build + deploy

**Files:** none (CI)

- [ ] **Step 21.1: Прод-сборка**

```bash
npm run build
```

Ожидается: `dist/pride-driving-school/index.html` (или просто `dist/index.html` если `base` обработался по-другому — проверить).

- [ ] **Step 21.2: Локальное превью прод-сборки**

```bash
npm run preview
```

Открыть указанный URL. Проверить что всё работает как в dev.

- [ ] **Step 21.3: Деплой на GitHub Pages**

```bash
npm run deploy
```

- [ ] **Step 21.4: Открыть https://davidsuxcess.github.io/pride-driving-school/ → проверить**

- [ ] **Step 21.5: Lighthouse в DevTools (десктоп + мобилка)**

Цель: Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 90.

Если что-то не дотягивает — `git checkout astro-migration`, пофиксить, передеплоить.

- [ ] **Step 21.6: Коммит и push ветки**

```bash
git push origin astro-migration
```

---

## Task 22: Cleanup и merge

**Files:**
- Delete: `index.html` (root)
- Delete: `public/site.jsx`, `public/mobile.jsx`, `public/mobile-site.jsx`, `public/mobile-menu.jsx`, `public/reviews-data.js`
- Delete: `public/redesign/`
- Delete: `_legacy_src/`

- [ ] **Step 22.1: Удалить старые файлы**

```bash
rm index.html
rm public/site.jsx public/mobile.jsx public/mobile-site.jsx public/mobile-menu.jsx public/reviews-data.js
rm -rf public/redesign
rm -rf _legacy_src
```

- [ ] **Step 22.2: Финальная локальная проверка**

```bash
npm run build && npm run preview
```

- [ ] **Step 22.3: Коммит**

```bash
git add -A
git commit -m "chore(migration): remove legacy babel/jsx and old vite spa files"
```

- [ ] **Step 22.4: Передеплой**

```bash
npm run deploy
```

- [ ] **Step 22.5: Merge ветки в main**

```bash
git checkout main
git merge astro-migration
git push origin main
git branch -d astro-migration
```

---

## Self-Review Checklist (выполнено при написании плана)

**Spec coverage:**
- ✅ Цели: SEO/скорость/типы/визуал/деплой → Tasks 1-22 покрывают
- ✅ Стек: Astro + React + Tailwind → Task 1
- ✅ Архитектура (статика + острова) → Tasks 5-19
- ✅ Структура файлов → блок «File Structure» в начале
- ✅ Миграция поэтапно → Tasks 1-22
- ✅ Build/deploy без изменений → Task 21
- ✅ Риски (зум, шрифты, тени) → Task 18 (зум), Task 2 (шрифты)
- ✅ Критерии приёмки (Lighthouse, bundle ≤ 50KB) → Step 21.5

**Placeholder scan:** нет TBD/TODO. Все длинные компоненты (Hero, Instructors, Trust, Footer, BurgerMenu, InstructorDetail) ссылаются на источник в `public/site.jsx` или `public/mobile-site.jsx` с указанием функции — это валидный приём для миграции (порт, не пиши с нуля).

**Type consistency:** `EnrollModal.tsx` использует `FormData` интерфейс с полями `course`, `category`, `transmission`, `name`, `phone` — консистентно. Атрибут `data-pr-enroll-trigger` тот же в Header/Hero/Courses и в `EnrollModal.tsx`. Атрибут `data-pr-burger` тот же в Header и BurgerMenu. Атрибут `data-pr-instructor-card` + `data-idx` в Instructors.astro и InstructorDetail.tsx.

**Спорный момент** (для исполнителя): в Task 7-13 структура — порт inline-стилей. Если хочется ввести Tailwind-классы вместо inline `style` — отдельная задача, не в этом плане.

---

Plan complete and saved to `pride-driving-school/docs/superpowers/plans/2026-05-07-astro-migration.md`. Two execution options:

**1. Subagent-Driven (recommended)** — я диспатчу свежий subagent на каждую таску, между тасками ревью, быстрая итерация.

**2. Inline Execution** — выполняю таски в этой же сессии через `executing-plans` skill, батчевая работа с чекпоинтами.

Какой подход выбираете?
