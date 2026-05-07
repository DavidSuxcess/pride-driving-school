# Миграция сайта на Astro

**Дата**: 2026-05-07
**Статус**: Approved (verbal)
**Скоуп**: Маркетинговый лендинг автошколы «Прайд». Без бэкенда.

## 1. Контекст

Сейчас (production):

- `index.html` (project root) — inline CSS + inline App
- React 18 + Babel-standalone (компиляция JSX **в браузере**)
- JSX-файлы: `site.jsx`, `mobile.jsx`, `mobile-site.jsx`, `mobile-menu.jsx`, `reviews-data.js`
- Bundle на странице: ~250KB JS (Babel + React UMD), ~1–1.5s первая отрисовка после JS-компиляции
- `src/` (Vite/React/TS/Tailwind) — «спящий» SPA, не подключён к продакшен `index.html`

## 2. Цели миграции

- Чистая статика для SEO (Yandex + Google видят полный HTML без JS)
- Быстрая первая отрисовка (`<200ms` total на 4G), bundle JS снижается с ~250KB до ~30–40KB
- TypeScript-типы для компонентов
- Сохранить весь визуал и интерактив текущего редизайна
- Деплой на тот же GitHub Pages
- Удалить «спящий» `src/` после миграции

## 3. Не-цели

- **Нет** бэкенда, API-routes, баз данных
- **Нет** админ-панели / CMS — данные в JSON-файлах в репо
- **Нет** личного кабинета, оплат, расписания
- **Нет** SSR/ISR — только SSG

## 4. Стек

| Слой | Решение |
|---|---|
| Build | Astro 4+ |
| Интерактив | React 18 (через `@astrojs/react`) — острова |
| Стили | Tailwind CSS (`@astrojs/tailwind`) + CSS custom properties (`--pr-*`) |
| Типы | TypeScript |
| Шрифты | Google Fonts: Bebas Neue, Oswald, Manrope, JetBrains Mono |
| Деплой | `gh-pages -d dist` → ветка `gh-pages` |
| Хостинг | GitHub Pages (`davidsuxcess.github.io/pride-driving-school/`) |

## 5. Архитектура

**Статика (`.astro`-компоненты)** — рендерится в HTML на сборке, JS не нужен:

- Header (без бургера)
- Hero (без CTA-логики)
- Courses (3 карточки тарифов)
- Instructors (компактные карточки)
- Trust strip
- FAQ (раскрытое или со статичным аккордеоном через `<details>`)
- Footer

**Острова (React `.tsx` с `client:visible` или `client:load`)** — JS подключается лениво:

- `<BurgerMenu />` — оверлей с навигацией (мобилка)
- `<EnrollModal />` — кнопки «Записаться» открывают модалку с 4-шаговой формой → WhatsApp
- `<InstructorDetailIsland />` — клик по карточке инструктора → детальный экран с анимациями + кнопка «Записаться к...»
- `<ReviewsCarousel />` — auto-scroll лента отзывов
- `<MarqueeStrip />` — бегущая строка
- `<ResponsiveZoom />` — JS, который ставит CSS-переменную `--pr-mobile-zoom` на `<html>` для масштабирования мобильного дизайна 390px под viewport

## 6. Структура файлов

```
pride-driving-school/
├── astro.config.mjs        # base: '/pride-driving-school/', integrations: [react, tailwind]
├── tsconfig.json
├── package.json
├── public/
│   ├── assets/             # instructor_*.jpg, student_*.jpg, logo.svg
│   └── favicon.svg
└── src/
    ├── pages/
    │   └── index.astro     # склейка секций
    ├── layouts/
    │   └── Base.astro      # <html>, шрифты, глобальный CSS, лоадер
    ├── data/
    │   ├── reviews.json    # 55 отзывов (из reviews-data.js)
    │   ├── courses.json    # 3 тарифа
    │   ├── instructors.json
    │   └── faq.json
    ├── styles/
    │   └── global.css      # CSS-переменные (--pr-*), кнопки, анимации, keyframes
    ├── components/
    │   ├── Header.astro
    │   ├── Hero.astro
    │   ├── Courses.astro
    │   ├── Reviews.astro
    │   ├── Instructors.astro
    │   ├── Faq.astro
    │   ├── Trust.astro
    │   ├── Footer.astro
    │   └── PrLion.astro    # SVG-логотип льва
    └── islands/
        ├── BurgerMenu.tsx
        ├── EnrollModal.tsx       # включает PrEnrollCard + PrMSEnrollCard
        ├── InstructorDetail.tsx  # детальный экран с анимациями
        ├── ReviewsCarousel.tsx
        └── ResponsiveZoom.tsx    # client:load, ставит --pr-mobile-zoom
```

## 7. План миграции (поэтапно)

1. **Setup**: создать новую ветку `astro-migration`. Установить Astro в этой ветке. Настроить `astro.config.mjs` с base `/pride-driving-school/` и интеграциями react+tailwind.
2. **Глобальные стили**: перенести CSS-переменные + шрифты + классы (`pr-btn-*`, `pr-card`, анимации, `pr-grid-bg`, `pr-tape*`) из inline `<style>` в `src/styles/global.css`.
3. **Данные**: перенести 55 отзывов, курсы, инструкторов, FAQ из JSX в JSON-файлы в `src/data/`.
4. **Статичные секции**: переписать Header, Hero, Courses, Trust, Footer, Faq как `.astro`-компоненты, тянущие данные из JSON.
5. **Острова**: переписать BurgerMenu, EnrollModal, InstructorDetail, ReviewsCarousel, ResponsiveZoom как React TSX компоненты с типами. Обвернуть `client:visible` или `client:load`.
6. **Layout + index page**: собрать `index.astro` из секций. `Base.astro` ставит `<html>`, шрифты, лоадер.
7. **Адаптив**: проверить ширину 320 / 360 / 375 / 390 / 414 / 430 / 1024 / 1366 / 1920. Mobile zoom-логика (`--pr-mobile-zoom`) переезжает в `ResponsiveZoom.tsx`.
8. **Контент-проверка**: визуально сверить с текущим продом — все секции, тексты, кликабельность кнопок «Записаться», открытие модалки, анимации.
9. **Build + deploy**: `npm run deploy` собирает Astro в `dist/` и пушит в `gh-pages`. Один раз сравнить `dist/index.html` — должна быть статика, без babel-скриптов.
10. **Cleanup**: после успешного деплоя удалить старые файлы — `index.html` (root), `public/site.jsx`, `public/mobile.jsx`, `public/mobile-site.jsx`, `public/mobile-menu.jsx`, `public/reviews-data.js`, `public/redesign/`. Удалить весь `src/` старого Vite-SPA. Слить ветку `astro-migration` в main.

## 8. Build & Deploy

- `package.json` scripts:
  - `dev`: `astro dev`
  - `build`: `astro build`
  - `preview`: `astro preview`
  - `predeploy`: `npm run build`
  - `deploy`: `gh-pages -d dist`
- `astro.config.mjs`:
  - `site: 'https://davidsuxcess.github.io'`
  - `base: '/pride-driving-school'`
  - `output: 'static'`
  - integrations: `react()`, `tailwind()`

## 9. Риски и митигации

| Риск | Митигация |
|---|---|
| CSS зум-логика (`zoom: var(--pr-mobile-zoom)`) сломается в Astro | Перевести в `ResponsiveZoom.tsx` остров с `client:load`, JS ставит CSS var на `<html>` — поведение идентичное текущему |
| Tailwind конфликтует с существующими CSS-переменными `--pr-*` | Tailwind не трогает CSS-переменные, конфликта нет. Проверить только классы pr-* (наши) vs Tailwind defaults |
| WhatsApp-флоу формы (window.open) не работает в SSG | Это клиентский код в острове `EnrollModal.tsx` — работает как сейчас |
| Шрифт Bebas Neue без кириллицы → fallback Arial Black на десктопе, Oswald на мобилке | Логика сохранится через медиа-запрос в global.css (как сейчас) |
| Sticky header в Astro со скроллом | `position: sticky` — pure CSS, работает без изменений |

## 10. Критерии приёмки

- Lighthouse Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 90 (десктоп + мобилка)
- Initial JS bundle ≤ 50KB gzipped
- Время до first contentful paint ≤ 1s на 4G симуляции
- Все интерактивные элементы работают как сейчас (кнопки записаться, бургер, карусели, модалка, инструкторы)
- Визуальный паритет с текущим продом на breakpoint'ах 320 / 390 / 414 / 1366 / 1920
- `npm run deploy` пушит на GitHub Pages, сайт открывается на корневом URL

## 11. Открытые вопросы

Нет (все решены в обсуждении).
