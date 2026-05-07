/* global React */
// ─────────────────────────────────────────────────────────────
// Pride · Driving School — Site (desktop)
// One long page composed of: Header, Hero, Marquee, Stats,
// Courses, Instructors, Reviews, FAQ, Form, Footer.
// All sections are static-ish; interactivity lives inside.
// ─────────────────────────────────────────────────────────────

const PrideSite = () => {
  return (
    <div className="pr-site" style={{ width: 1440, position: 'relative' }}>
      <PrHeader />
      <PrHero />
      <PrMarquee />
      <PrCourses />
      <PrInstructors />
      <PrTrust />
      <PrReviews />
      <PrFaq />
      <PrEnroll />
      <PrFooter />
    </div>
  );
};

// ── Lion logo (real SVG asset, recoloured by CSS filter) ──────
// Source SVG fills with #e45400; for non-orange tints we use a filter.
const PrLion = ({ size = 40, color = '#E45400' }) => {
  const isOrange = color.toUpperCase() === '#E45400' || color.toLowerCase() === '#e45400';
  // Filter recipe to recolour orange→white. For other colours we layer
  // a tinted overlay using mask-image.
  const isWhite = color === '#fff' || color.toLowerCase() === '#ffffff';
  if (isOrange) {
    return <img src="assets/logo.svg" alt="Pride" width={size} height={size} style={{ display: 'block' }} />;
  }
  // Use the SVG as a CSS mask so any color works.
  return (
    <div style={{
      width: size, height: size,
      backgroundColor: color,
      WebkitMaskImage: 'url(assets/logo.svg)',
      maskImage: 'url(assets/logo.svg)',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskPosition: 'center', maskPosition: 'center',
    }} aria-label="Pride" />
  );
};

// ── Header ────────────────────────────────────────────────────
const PrHeader = () => {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--pr-line)',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '20px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PrLion size={36} color="#E45400" />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--pr-display)', fontSize: 22, letterSpacing: '0.04em' }}>ПРАЙД</span>
            <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--pr-mute)', marginTop: 3 }}>
              ШКОЛА ВОЖДЕНИЯ
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 14, fontWeight: 600 }}>
          <a className="pr-link-u" href="#courses">Курсы</a>
          <a className="pr-link-u" href="#instructors">Инструкторы</a>
          <a className="pr-link-u" href="#reviews">Отзывы</a>
          <a className="pr-link-u" href="#faq">Вопросы</a>
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-mute)', letterSpacing: '0.16em' }}>
              ОТКРЫТО · ДО 21:00
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>+7 (391) 234-56-78</div>
          </div>
          <button className="pr-btn-yellow" style={{ padding: '12px 22px', fontSize: 12 }}>
            Записаться <span style={{ fontSize: 16 }}>→</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// ── Hero ──────────────────────────────────────────────────────
const PrHero = () => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--pr-black)' }}>
      <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      {/* Diagonal yellow tape strips */}
      <div style={{
        position: 'absolute', right: -100, top: 80, width: 380, height: 60,
        transform: 'rotate(-8deg)',
      }} className="pr-tape" />
      <div style={{
        position: 'absolute', right: -50, top: 170, width: 220, height: 28,
        transform: 'rotate(-8deg)',
      }} className="pr-tape-thin" />

      {/* Big lion ghost on right */}
      <div style={{
        position: 'absolute', right: -60, top: 220, opacity: 0.06, pointerEvents: 'none',
      }}>
        <PrLion size={780} color="#E45400" />
      </div>

      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '120px 40px 100px',
        position: 'relative', zIndex: 1,
      }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Headline — массивная типографика */}
        <h1 style={{
          fontSize: 220, lineHeight: 0.82, letterSpacing: '-0.02em',
          marginBottom: 40, fontWeight: 400,
        }}>
          ВОДИ<br />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 24 }}>
            <span style={{ color: 'var(--pr-yellow)' }}>УВЕРЕННО.</span>
            <span style={{
              fontSize: 44, fontFamily: 'var(--pr-text)', textTransform: 'none', fontWeight: 600,
              letterSpacing: '-0.01em', color: '#fff', maxWidth: 380,
              borderLeft: '3px solid var(--pr-yellow)', paddingLeft: 20, lineHeight: 1.15,
            }}>
              Не «сдай экзамен», а реально <em style={{ fontStyle: 'normal', background: 'var(--pr-yellow)', color: '#000', padding: '0 4px' }}>научись водить</em>.
            </span>
          </span>
        </h1>

        {/* CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 64 }}>
          <button className="pr-btn-yellow" style={{ padding: '22px 36px', fontSize: 15 }}>
            Записаться на курс <span style={{ fontSize: 20 }}>→</span>
          </button>
          <button className="pr-btn-ghost" style={{ padding: '20px 28px' }}>
            ▶ Как проходит занятие · 1 мин
          </button>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div className="pr-num">ОТЗЫВЫ НА АВИТО</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ color: 'var(--pr-yellow)', fontSize: 18, letterSpacing: 2 }}>★★★★★</span>
              <span style={{ fontSize: 22, fontWeight: 800 }}>5.0</span>
              <span style={{ color: 'var(--pr-mute)', fontSize: 13 }}>· 54+ оценки</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom road-line */}
      <div style={{ height: 4, position: 'relative', overflow: 'hidden' }}>
        <div className="pr-road" style={{ position: 'absolute', inset: 0, opacity: 0.6, backgroundSize: '56px 4px' }} />
      </div>
    </section>
  );
};

// ── Marquee row ──────────────────────────────────────────────
const PrMarquee = () => {
  const items = [
    'КАТ. B · АВТОМАТ', 'КАТ. B · МЕХАНИКА', 'ИНДИВИДУАЛЬНЫЙ ГРАФИК',
    'СОПРОВОЖДЕНИЕ В ГИБДД', 'ЗАБИРАЕМ ИЗ ДОМА', 'ПЛАТЁЖ В РАССРОЧКУ',
    'ЛИЦЕНЗИЯ № 7167-Л', 'СВОЙ АВТОПАРК',
  ];
  const row = [...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--pr-yellow)', color: 'var(--pr-black)',
      borderTop: '1px solid var(--pr-black)', borderBottom: '1px solid var(--pr-black)',
      overflow: 'hidden', padding: '18px 0',
    }}>
      <div className="pr-marquee-track" style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap' }}>
        {row.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 48, fontWeight: 800, fontSize: 22, letterSpacing: '0.04em' }}>
            <span>{t}</span>
            <span style={{ fontSize: 14 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Stats ────────────────────────────────────────────────────
const PrStats = () => {
  const stats = [
    { num: '12', unit: 'ЛЕТ', label: 'на дороге Красноярска' },
    { num: '2 100+', unit: '', label: 'выпускников за всё время' },
    { num: '94%', unit: '', label: 'сдают ГИБДД с первой попытки' },
    { num: '5.0', unit: '★', label: 'средняя оценка на Авито' },
  ];
  return (
    <section style={{ padding: '120px 40px 100px', background: 'var(--pr-black)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60 }}>
          <div className="pr-section-tag">[01] ЦИФРЫ</div>
          <div style={{ maxWidth: 480, color: 'var(--pr-mute-2)', fontSize: 16, lineHeight: 1.5 }}>
            Не маркетинговые «лучшие в городе» — просто то, что мы можем подтвердить чеками, выпусками и протоколами ГИБДД.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--pr-line-strong)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '40px 32px 36px',
              borderRight: i < 3 ? '1px solid var(--pr-line-strong)' : 'none',
              borderBottom: '1px solid var(--pr-line-strong)',
            }}>
              <div className="pr-num" style={{ marginBottom: 24 }}>0{i + 1}</div>
              <div className="pr-ticker" style={{
                fontFamily: 'var(--pr-display)', fontSize: 96, lineHeight: 0.9, letterSpacing: '-0.01em',
              }}>
                {s.num}<span style={{ color: 'var(--pr-yellow)', fontSize: 64 }}>{s.unit}</span>
              </div>
              <div style={{ marginTop: 18, color: 'var(--pr-mute-2)', fontSize: 14, lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Courses ──────────────────────────────────────────────────
const PrCourses = () => {
  const courses = [
    {
      tag: 'БАЗОВЫЙ',
      title: 'СТАРТ',
      price: '50 000',
      pitch: 'Минимум часов, максимум фокуса — для тех, кто учится быстро.',
      hours: '42 ч АКПП · 44 ч МКПП',
      features: [
        'Программа по стандарту ГИБДД',
        'Внутренний экзамен — 1 попытка',
        'Свободный график занятий',
      ],
      accent: false,
    },
    {
      tag: 'ХИТ · 70% ВЫБИРАЮТ',
      title: 'ПРЕМИУМ',
      price: '65 000',
      pitch: 'Расширенная программа с поддержкой на каждом этапе и без скрытых доплат.',
      hours: '54 ч АКПП · 56 ч МКПП',
      features: [
        'Бесплатный внутренний экзамен',
        'Неограниченное число занятий',
        'Индивидуальный график',
        'Забираем из дома',
        'Все походы на экзамен бесплатны',
        'Сопровождение на всех этапах',
      ],
      accent: true,
    },
    {
      tag: 'VIP',
      title: 'ПРЕСТИЖ',
      price: '110 000',
      pitch: 'Премиум-авто, личный куратор и максимум комфорта.',
      hours: 'Без лимита часов',
      features: [
        'Авто премиум-класса',
        'Неограниченное число занятий',
        'Индивидуальный график',
        'Забираем из дома',
        'Все экзамены бесплатно (внутр., ГИБДД, теория)',
        'Сопровождение на всех этапах',
      ],
      accent: false,
      vip: true,
    },
  ];
  return (
    <section id="courses" style={{ padding: '140px 40px', background: 'var(--pr-paper)', color: 'var(--pr-paper-ink)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 80 }}>
          <div>
            <div className="pr-section-tag" style={{ color: '#3a3a3a' }}>[02] КУРСЫ</div>
            <h2 style={{ fontSize: 120, marginTop: 24, color: '#0A0A0A' }}>
              ВЫБЕРИ <br />СВОЙ ТЕМП.
            </h2>
          </div>
          <div style={{ maxWidth: 360, fontSize: 16, lineHeight: 1.5, color: '#3a3a3a', paddingBottom: 12 }}>
            Все три программы дают одно и то же удостоверение. Различаются только тем, сколько часов вы хотите за рулём — и сколько комфорта.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {courses.map((c, i) => (
            <article key={i} style={{
              background: c.vip ? 'var(--pr-black)' : c.accent ? 'var(--pr-yellow)' : '#fff',
              color: c.vip ? '#fff' : '#0A0A0A',
              borderRadius: 'var(--pr-r-xl)',
              padding: '36px 32px 32px',
              border: c.accent ? 'none' : '1px solid rgba(0,0,0,0.08)',
              position: 'relative', display: 'flex', flexDirection: 'column',
            }}>
              {c.accent && (
                <div style={{ position: 'absolute', top: -16, left: 24, background: '#0A0A0A', color: 'var(--pr-yellow)',
                  padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em' }}>
                  {c.tag}
                </div>
              )}
              {!c.accent && (
                <div className="pr-num" style={{ color: c.vip ? 'var(--pr-yellow)' : '#7a7a7a' }}>0{i + 1} · {c.tag}</div>
              )}

              <h3 style={{ fontSize: 64, marginTop: c.accent ? 32 : 16, marginBottom: 20, lineHeight: 0.9, letterSpacing: '-0.01em' }}>
                {c.title}
              </h3>

              <p style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 32, opacity: c.vip ? 0.8 : 0.7, minHeight: 72 }}>
                {c.pitch}
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--pr-display)', fontSize: 56, letterSpacing: '-0.01em' }}>{c.price}</span>
                <span style={{ fontSize: 22, opacity: 0.6 }}>₽</span>
              </div>
              <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 11, letterSpacing: '0.12em',
                color: c.vip ? 'var(--pr-yellow)' : c.accent ? '#3a1a00' : '#7a7a7a', marginBottom: 28 }}>
                {c.hours}
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gap: 12, flex: 1 }}>
                {c.features.map((f, k) => (
                  <li key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.4 }}>
                    <span style={{
                      flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: 2,
                      background: c.vip ? 'var(--pr-yellow)' : c.accent ? '#0A0A0A' : 'var(--pr-yellow-deep)',
                    }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button style={{
                background: c.vip ? 'var(--pr-yellow)' : c.accent ? '#0A0A0A' : '#0A0A0A',
                color: c.vip ? '#0A0A0A' : c.accent ? 'var(--pr-yellow)' : '#fff',
                border: 0, borderRadius: 999, padding: '18px 24px',
                fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                Выбрать <span>→</span>
              </button>
            </article>
          ))}
        </div>

        {/* Footnote */}
        <div style={{ marginTop: 48, display: 'flex', gap: 32, fontSize: 13, color: '#5a5a5a' }}>
        </div>
      </div>
    </section>
  );
};

// ── Instructors ──────────────────────────────────────────────
const PrInstructors = () => {
  const inst = [
    {
      name: 'ЛЕВ',
      surname: 'СТАРШИЙ ИНСТРУКТОР',
      img: 'assets/instructor_lev.jpg',
      years: 17, teaching: 7,
      tag: 'ПСИХОЛОГИЯ ВОЖДЕНИЯ',
      quote: 'Чтобы научиться водить, надо научиться расслабляться. Дальше — техника.',
      stats: ['17 лет за рулём', '7 лет преподавания'],
    },
    {
      name: 'ДМИТРИЙ',
      surname: 'БЕЛОНОГОВ',
      img: 'assets/instructor_dmitry_b.jpg',
      years: 10, teaching: 4,
      tag: 'ГОРОДСКОЙ ПОТОК',
      quote: 'В пробке надо не нервничать, а думать на два хода вперёд. Этому и учим.',
      stats: ['10 лет за рулём', 'АКПП / МКПП'],
    },
    {
      name: 'ДМИТРИЙ',
      surname: 'ИНСТРУКТОР МКПП / АКПП',
      img: 'assets/instructor_dmitry.jpg',
      years: 12, teaching: 5,
      tag: 'БЕЗ КРИКОВ',
      quote: 'Объясняю чётко, без стресса. Учу для жизни, не для галочки в ГАИ.',
      stats: ['12 лет за рулём', 'Маршруты ГИБДД'],
    },
  ];
  return (
    <section id="instructors" style={{ padding: '140px 40px', background: 'var(--pr-black)', position: 'relative' }}>
      <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 80 }}>
          <div>
            <div className="pr-section-tag">[03] КОМАНДА</div>
            <h2 style={{ fontSize: 120, marginTop: 24 }}>
              ТРОЕ ЛЮДЕЙ,<br />
              <span style={{ color: 'var(--pr-yellow)' }}>КОТОРЫЕ НЕ КРИЧАТ.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 360, fontSize: 16, lineHeight: 1.5, color: 'var(--pr-mute-2)', paddingBottom: 12 }}>
            Каждый инструктор Pride — действующий водитель с 10+ лет стажа, не «сел за баранку только чтобы учить».
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {inst.map((p, i) => (
            <article key={i} className="pr-lift" style={{
              borderRadius: 'var(--pr-r-xl)', overflow: 'hidden',
              border: '1px solid var(--pr-line)', background: 'var(--pr-graphite)',
            }}>
              {/* Photo with overlay */}
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
                <div style={{
                  position: 'absolute', top: 16, left: 16, background: 'var(--pr-yellow)',
                  color: '#0A0A0A', padding: '6px 12px', borderRadius: 999,
                  fontFamily: 'var(--pr-mono)', fontSize: 10, letterSpacing: '0.12em', fontWeight: 700,
                  zIndex: 2,
                }}>
                  {p.tag}
                </div>
                {/* Big number watermark */}
                <div style={{
                  position: 'absolute', right: 20, top: 12, fontSize: 110,
                  fontFamily: 'var(--pr-display)', color: '#fff',
                  lineHeight: 0.9, letterSpacing: '-0.04em',
                  textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.0)',
                  opacity: 0.95,
                }}>
                  0{i + 1}
                </div>
                {/* Bottom name strip */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, bottom: 0,
                  padding: '20px 20px 18px', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                }}>
                  <div style={{ fontFamily: 'var(--pr-display)', fontSize: 40, lineHeight: 0.9 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--pr-yellow)', letterSpacing: '0.18em', fontFamily: 'var(--pr-mono)', marginTop: 6 }}>
                    {p.surname}
                  </div>
                </div>
              </div>

              <div style={{ padding: '24px 24px 28px' }}>
                {/* Quote */}
                <div style={{
                  fontSize: 18, lineHeight: 1.4, marginBottom: 24,
                  borderLeft: '2px solid var(--pr-yellow)', paddingLeft: 16, fontStyle: 'italic',
                }}>
                  «{p.quote}»
                </div>
                {/* Stats row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.stats.map((s, k) => (
                    <span key={k} style={{
                      fontSize: 11, color: 'var(--pr-mute-2)', padding: '5px 10px',
                      border: '1px solid var(--pr-line-strong)', borderRadius: 999,
                      letterSpacing: '0.04em',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Trust strip (логотипы / упоминания) ──────────────────────
const PrTrust = () => {
  const items = ['ЛИЦЕНЗИЯ № 7167-Л', 'РОСРЕЕСТР АВТОШКОЛ', 'ГИБДД РОССИИ', 'АВИТО · 5.0'];
  const row = [...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--pr-black)',
      borderTop: '1px solid var(--pr-line-strong)', borderBottom: '1px solid var(--pr-line-strong)',
      overflow: 'hidden', padding: '24px 0',
    }}>
      <div className="pr-marquee-track-rev" style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap', color: 'var(--pr-mute-2)' }}>
        {row.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 80, fontFamily: 'var(--pr-mono)', fontSize: 14, letterSpacing: '0.12em' }}>
            <span>{t}</span>
            <span style={{ color: 'var(--pr-yellow)' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Reviews ──────────────────────────────────────────────────
const PrReviews = () => {
  const reviews = [
    { name: 'Даша Киреева', date: '5 декабря 2024', text: 'Очень коммуникабельный и пунктуальный Лев Александрович! Открывает мир вождения по-новому. Научил всему: ездить по навигатору, заправляться, зеркала правильно настроить, парковаться!' },
    { name: 'Влада', date: '3 декабря 2024', text: 'Самый лучший и любимый инструктор! Нашла через Авито. Научат здесь всему: от правильной езды до реакции в экстренных ситуациях.' },
    { name: 'Александра', date: '30 ноября 2024', text: 'Профессионал своего дела! Инструктор всё понятно объясняет, с его помощью смогла понять и исправить свои ошибки в вождении.' },
    { name: 'Екатерина', date: '7 ноября 2024', text: 'Жаль, что Вы мне не попались раньше, молодой, знающий своё дело инструктор.' },
    { name: 'Вера', date: '5 ноября 2024', text: 'Отличный инструктор! Пришла из другой автошколы. Увидел мои ошибки, всё рассказал, показал и нарисовал!' },
    { name: 'Елизавета', date: '3 ноября 2024', text: 'После двух провальных попыток сдачи экзамена в ГИБДД позанималась со Львом. И сдала экзамен! Занятия проходят в комфортной, дружелюбной атмосфере.' },
    { name: 'Анна Титова', date: '16 июня 2025', text: 'Инструктор супер, очень грамотный, спокойный, очень комфортно с таким человеком.' },
    { name: 'Maxim', date: '23 февраля 2024', text: 'Все доступно и понятно, Лев отличный инструктор, подскажет где ошибки и как их исправить, всем рекомендую.' },
  ];
  const photos = [1,2,3,4,5,1,2,3,4,5,1,2,3].map(n => `assets/student_${((n-1)%5)+1}.jpg`);
  return (
    <section id="reviews" style={{ padding: '140px 0 80px', background: 'var(--pr-black)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px', marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="pr-section-tag">[04] КУРСАНТЫ И ОТЗЫВЫ</div>
            <h2 style={{ fontSize: 120, marginTop: 24 }}>
              <span style={{ color: 'var(--pr-yellow)' }}>5.0</span> НА АВИТО.<br />
              ПОЧИТАЙ ЛЮБОЙ.
            </h2>
          </div>
          <a href="#" className="pr-btn-ghost" style={{ alignSelf: 'flex-end' }}>
            Все 54 отзыва на Авито →
          </a>
        </div>
      </div>

      {/* Photo marquee */}
      <div style={{ overflow: 'hidden', padding: '0 0 40px' }}>
        <div className="pr-marquee-track-fast" style={{ display: 'flex', gap: 16, whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...photos, ...photos].map((src, i) => (
            <div key={i} style={{
              width: 220, height: 290, borderRadius: 'var(--pr-r-md)', overflow: 'hidden', flexShrink: 0,
              border: '1px solid var(--pr-line)', position: 'relative',
            }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ display: 'none' }}>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews grid — masonry-ish 2 columns */}
      <div style={{ maxWidth: 1320, margin: '40px auto 0', padding: '0 40px' }}>
        <div style={{ columnCount: 4, columnGap: 16 }}>
          {reviews.map((r, i) => (
            <article key={i} className="pr-card" style={{
              padding: '20px 22px', breakInside: 'avoid', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'var(--pr-yellow)',
                  color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14,
                }}>
                  {r.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                  <div className="pr-num" style={{ marginTop: 2 }}>{r.date}</div>
                </div>
                <span style={{ color: 'var(--pr-yellow)', fontSize: 12, letterSpacing: 1 }}>★★★★★</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
                {r.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FAQ ──────────────────────────────────────────────────────
const PrFaq = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'СКОЛЬКО ВРЕМЕНИ ЗАЙМЁТ ОБУЧЕНИЕ?', a: 'В среднем 3–4 месяца. Это включает теорию (по будням онлайн) и практику (когда удобно вам). Если торопитесь — есть ускоренная программа на 6 недель.' },
    { q: 'А ЕСЛИ Я БОЮСЬ ЕЗДИТЬ?', a: 'Это нормально. Лев работает с курсантами после неудачных попыток в других школах, и психология вождения — его специальность. Никто не кричит, не давит на педаль, не паникует.' },
    { q: 'МОЖНО ВЕРНУТЬ ДЕНЬГИ?', a: 'Да, в первые 7 дней без вопросов. После — пропорционально неотзанятым часам. Прозрачно, без штрафов и «мелкого шрифта».' },
    { q: 'ЕСТЬ ЛИ РАССРОЧКА?', a: 'Да, 0% на 6 месяцев — оформляем сами на месте, без банков и справок о доходе. Платите равными частями.' },
    { q: 'ЕСЛИ НЕ СДАМ ГИБДД С ПЕРВОГО РАЗА?', a: 'На тарифе «Премиум» — все попытки бесплатны, мы вас сопровождаем. На «Базовом» — повторные сборы (350 ₽) и время инструктора (1 600 ₽/час).' },
  ];
  return (
    <section id="faq" style={{ padding: '140px 40px', background: 'var(--pr-paper)', color: 'var(--pr-paper-ink)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '340px 1fr', gap: 120 }}>
        <div>
          <div className="pr-section-tag" style={{ color: '#3a3a3a' }}>[05] ВОПРОСЫ</div>
          <h2 style={{ fontSize: 60, marginTop: 24, color: '#0A0A0A', lineHeight: 0.95 }}>
            ЧАСТО<br />СПРАШИВАЮТ.
          </h2>
          <p style={{ marginTop: 32, fontSize: 16, lineHeight: 1.5, color: '#3a3a3a' }}>
            Если вашего вопроса нет — напишите в Telegram, отвечаем в течение 15 минут в рабочее время.
          </p>
          <button className="pr-btn-black" style={{ marginTop: 32 }}>Написать в Telegram</button>
        </div>

        <div>
          {items.map((it, i) => (
            <div key={i} style={{
              borderTop: '1px solid rgba(0,0,0,0.12)',
              borderBottom: i === items.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none',
              padding: '28px 0',
            }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'transparent', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
                  <span className="pr-num" style={{ color: '#7a7a7a' }}>0{i + 1}</span>
                  <span style={{ fontFamily: 'var(--pr-display)', fontSize: 22, color: '#0A0A0A', lineHeight: 1.1 }}>{it.q}</span>
                </span>
                <span style={{
                  width: 42, height: 42, borderRadius: 999, border: '1px solid rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: open === i ? 'var(--pr-yellow)' : 'transparent', borderColor: open === i ? 'var(--pr-yellow)' : 'rgba(0,0,0,0.2)',
                  fontSize: 22, fontWeight: 300, transition: 'all 0.2s',
                }}>
                  {open === i ? '–' : '+'}
                </span>
              </button>
              {open === i && (
                <p style={{ marginTop: 20, marginLeft: 56, fontSize: 17, lineHeight: 1.55, color: '#3a3a3a', maxWidth: 640 }}>
                  {it.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Enrollment form (улучшенная UX — многошаговая, дружелюбная) ──
const PrEnroll = () => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ category: 'B', transmission: 'AT', course: 'Премиум', name: '', phone: '' });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <section id="enroll" style={{ padding: '0', background: 'var(--pr-yellow)', color: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '120px 40px',
        display: 'grid', gridTemplateColumns: '1fr 540px', gap: 60,
      }}>
        <div>
          <div className="pr-section-tag" style={{ color: '#0A0A0A' }}>[06] ЗАПИСЬ</div>
          <h2 style={{ fontSize: 96, marginTop: 24, color: '#0A0A0A', lineHeight: 0.95 }}>
            ТРИ<br />
            ПРОСТЫХ<br />
            ШАГА.
          </h2>
          <p style={{ marginTop: 40, fontSize: 18, lineHeight: 1.5, maxWidth: 440 }}>
            Без длинных анкет. Выбираете категорию, оставляете телефон — куратор перезванивает в течение 15 минут и обсуждает детали.
          </p>

          <div style={{ marginTop: 60, display: 'grid', gap: 16 }}>
            {[
              { n: '01', t: 'Звонок куратора · 15 мин' },
              { n: '02', t: 'Знакомство со школой и инструктором · 30 мин' },
              { n: '03', t: 'Первое занятие — бесплатно' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 18 }}>
                <span style={{
                  width: 48, height: 48, borderRadius: 999, background: '#0A0A0A', color: 'var(--pr-yellow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--pr-display)', fontSize: 16,
                }}>{s.n}</span>
                <span style={{ fontWeight: 600 }}>{s.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: '#0A0A0A', color: '#fff', borderRadius: 'var(--pr-r-xl)',
          padding: '40px 44px 44px', boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
        }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            {[1,2,3].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: 28, height: 28, borderRadius: 999,
                  background: s <= step ? 'var(--pr-yellow)' : 'rgba(255,255,255,0.1)',
                  color: s <= step ? '#0A0A0A' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 12, fontFamily: 'var(--pr-mono)',
                }}>{s}</div>
                {s < 3 && <div style={{ flex: 1, height: 1, background: s < step ? 'var(--pr-yellow)' : 'rgba(255,255,255,0.1)' }} />}
              </React.Fragment>
            ))}
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--pr-mono)', fontSize: 11, color: 'var(--pr-mute)', letterSpacing: '0.1em' }}>
              ШАГ {step} / 3
            </span>
          </div>

          {step === 1 && (
            <div>
              <h3 style={{ fontSize: 32, marginBottom: 32 }}>ВЫБЕРИТЕ КУРС</h3>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {['Базовый', 'Премиум', 'VIP Престиж'].map(c => (
                  <button key={c} onClick={() => update('course', c)} style={{
                    background: data.course === c ? 'var(--pr-yellow)' : 'transparent',
                    color: data.course === c ? '#0A0A0A' : '#fff',
                    border: data.course === c ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 'var(--pr-r-md)', padding: '20px 22px', textAlign: 'left',
                    fontSize: 17, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.15s',
                  }}>
                    <span>{c}</span>
                    <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 13, opacity: 0.7 }}>
                      {c === 'Базовый' ? '50 000 ₽' : c === 'Премиум' ? '65 000 ₽' : '110 000 ₽'}
                    </span>
                  </button>
                ))}
              </div>
              <button className="pr-btn-yellow" onClick={() => setStep(2)} style={{ width: '100%', justifyContent: 'center' }}>
                Дальше →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: 32, marginBottom: 32 }}>КАТЕГОРИЯ</h3>
              <div style={{ marginBottom: 28 }}>
                <div className="pr-num" style={{ marginBottom: 10 }}>КАТЕГОРИЯ ПРАВ</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {['A', 'B'].map(c => (
                    <button key={c} onClick={() => update('category', c)} style={{
                      padding: '20px 0', background: data.category === c ? 'var(--pr-yellow)' : 'transparent',
                      color: data.category === c ? '#0A0A0A' : '#fff',
                      border: data.category === c ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 'var(--pr-r-md)', fontFamily: 'var(--pr-display)', fontSize: 30, cursor: 'pointer',
                    }}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <div className="pr-num" style={{ marginBottom: 10 }}>КОРОБКА ПЕРЕДАЧ</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[['AT','Автомат'], ['MT','Механика']].map(([k,t]) => (
                    <button key={k} onClick={() => update('transmission', k)} style={{
                      padding: '18px 0', background: data.transmission === k ? 'var(--pr-yellow)' : 'transparent',
                      color: data.transmission === k ? '#0A0A0A' : '#fff',
                      border: data.transmission === k ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 'var(--pr-r-md)', fontWeight: 700, fontSize: 16, cursor: 'pointer',
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="pr-btn-ghost" onClick={() => setStep(1)} style={{ borderColor: 'rgba(255,255,255,0.2)' }}>← Назад</button>
                <button className="pr-btn-yellow" onClick={() => setStep(3)} style={{ flex: 1, justifyContent: 'center' }}>
                  Дальше →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: 32, marginBottom: 32 }}>КОНТАКТ</h3>
              <div style={{ marginBottom: 28 }}>
                <div className="pr-num" style={{ marginBottom: 4 }}>КАК К ВАМ ОБРАЩАТЬСЯ</div>
                <input className="pr-input" placeholder="Иван" defaultValue={data.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div style={{ marginBottom: 32 }}>
                <div className="pr-num" style={{ marginBottom: 4 }}>ТЕЛЕФОН</div>
                <input className="pr-input" placeholder="+7 (___) ___-__-__" defaultValue={data.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>

              {/* Summary */}
              <div style={{
                padding: '16px 20px', background: 'rgba(228,84,0,0.06)', borderRadius: 'var(--pr-r-md)',
                marginBottom: 24, border: '1px solid rgba(228,84,0,0.2)',
              }}>
                <div className="pr-num" style={{ color: 'var(--pr-yellow)', marginBottom: 8 }}>ВАШ ВЫБОР</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>
                  Курс <strong>«{data.course}»</strong> · Категория <strong>{data.category}</strong> · {data.transmission === 'AT' ? 'Автомат' : 'Механика'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="pr-btn-ghost" onClick={() => setStep(2)} style={{ borderColor: 'rgba(255,255,255,0.2)' }}>← Назад</button>
                <button className="pr-btn-yellow" style={{ flex: 1, justifyContent: 'center' }}>
                  Записаться →
                </button>
              </div>

              <p style={{ marginTop: 18, fontSize: 11, color: 'var(--pr-mute)', lineHeight: 1.5 }}>
                Нажимая «Записаться», вы соглашаетесь с <a className="pr-link-u" style={{ color: 'var(--pr-mute-2)' }}>политикой конфиденциальности</a>.
                Мы перезвоним в течение 15 минут.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ── Footer ───────────────────────────────────────────────────
const PrFooter = () => {
  return (
    <footer style={{ background: 'var(--pr-black)', borderTop: '1px solid var(--pr-line)', padding: '80px 40px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* Big wordmark */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 60, borderBottom: '1px solid var(--pr-line)',
        }}>
          <div style={{
            fontFamily: 'var(--pr-display)', fontSize: 240, lineHeight: 0.85, letterSpacing: '-0.02em',
            color: 'var(--pr-yellow)',
          }}>
            ПРАЙД
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="pr-num">КРАСНОЯРСК</div>
            <div style={{ fontFamily: 'var(--pr-display)', fontSize: 36, marginTop: 12 }}>
              МАСТЕРСТВО<br />НАЧИНАЕТСЯ ЗДЕСЬ.
            </div>
          </div>
        </div>

        {/* Cols */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, padding: '60px 0' }}>
          <div>
            <div className="pr-num" style={{ marginBottom: 14 }}>КОНТАКТЫ</div>
            <div style={{ fontSize: 15, lineHeight: 1.7 }}>
              ул. Ленина, 78<br />
              660049, Красноярск<br />
              <a href="tel:+73912345678">+7 (391) 234-56-78</a><br />
              <a href="mailto:hello@pride-school.ru">hello@pride-school.ru</a>
            </div>
          </div>
          <div>
            <div className="pr-num" style={{ marginBottom: 14 }}>РЕЖИМ РАБОТЫ</div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--pr-mute-2)' }}>
              Пн–Пт · 09:00–21:00<br />
              Сб · 10:00–18:00<br />
              Вс · по записи
            </div>
          </div>
          <div>
            <div className="pr-num" style={{ marginBottom: 14 }}>ССЫЛКИ</div>
            <div style={{ fontSize: 15, lineHeight: 1.9 }}>
              <a className="pr-link-u" href="#courses">Курсы и цены</a><br />
              <a className="pr-link-u" href="#instructors">Инструкторы</a><br />
              <a className="pr-link-u" href="#reviews">Отзывы</a><br />
              <a className="pr-link-u" href="#faq">Частые вопросы</a>
            </div>
          </div>
          <div>
            <div className="pr-num" style={{ marginBottom: 14 }}>СОЦСЕТИ</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['VK', 'TG', 'INST', 'YT'].map(s => (
                <a key={s} href="#" style={{
                  width: 48, height: 48, borderRadius: 999, border: '1px solid var(--pr-line-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12,
                }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div style={{
          paddingTop: 30, borderTop: '1px solid var(--pr-line)',
          display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--pr-mute)',
          fontFamily: 'var(--pr-mono)', letterSpacing: '0.06em',
        }}>
          <span>© 2026 ООО АВТОШКОЛА «ПРОФИ»</span>
          <span>ЛИЦЕНЗИЯ № 7167-Л</span>
          <span>ИНН 2466154321</span>
          <span>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</span>
        </div>
      </div>
    </footer>
  );
};

window.PrideSite = PrideSite;
window.PrLion = PrLion;
