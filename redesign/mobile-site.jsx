/* global React, PrLion */
// ─────────────────────────────────────────────────────────────
// Pride · Mobile Site — единая длинная страница 390px
// Структура повторяет десктоп: Header → Hero → Marquee →
// Courses → Instructors → Trust → Reviews → FAQ → Enroll → Footer
// ─────────────────────────────────────────────────────────────

const MS_W = 390;

// ── Header ────────────────────────────────────────────────────
const PrMSHeader = ({ onMenuOpen }) => (
  <header id="top" style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(10,10,10,0.92)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    borderBottom: '1px solid var(--pr-line)',
  }}>
    <div style={{
      padding: '14px 20px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <PrLion size={30} color="#E45400" />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'var(--pr-display)', fontSize: 18, letterSpacing: '0.04em' }}>ПРАЙД</span>
          <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 8, letterSpacing: '0.18em', color: 'var(--pr-mute)', marginTop: 2 }}>
            ШКОЛА ВОЖДЕНИЯ
          </span>
        </div>
      </div>
      <button onClick={onMenuOpen} aria-label="Открыть меню" style={{
        width: 38, height: 38, borderRadius: 999, background: 'var(--pr-yellow)',
        color: '#0A0A0A', border: 0, fontSize: 18, fontWeight: 800,
        cursor: 'pointer',
      }}>≡</button>
    </div>
  </header>
);

// ── Hero ──────────────────────────────────────────────────────
const PrMSHero = () => (
  <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--pr-black)' }}>
    <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
    <div style={{
      position: 'absolute', right: -60, top: 100, opacity: 0.07, pointerEvents: 'none',
    }}>
      <PrLion size={360} color="#E45400" />
    </div>
    <div style={{
      position: 'absolute', right: -60, top: 30, width: 220, height: 36,
      transform: 'rotate(-8deg)',
    }} className="pr-tape" />

    <div style={{ position: 'relative', padding: '40px 20px 36px' }}>
      <h1 style={{
        fontSize: 76, lineHeight: 0.85, letterSpacing: '-0.02em',
        color: '#fff', textTransform: 'uppercase', marginBottom: 24,
        whiteSpace: 'nowrap',
      }}>
        ВОДИ<br />
        <span style={{ color: 'var(--pr-yellow)' }}>УВЕРЕННО.</span>
      </h1>
      <div style={{
        fontSize: 16, lineHeight: 1.4, color: '#fff', maxWidth: 320,
        borderLeft: '3px solid var(--pr-yellow)', paddingLeft: 14, marginBottom: 28,
      }}>
        Не «сдай экзамен», а реально <span className="pr-mark">научись водить</span>.
      </div>

      <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
        <button className="pr-btn-yellow" style={{ width: '100%', padding: '18px 22px', justifyContent: 'space-between' }}>
          Записаться на курс <span style={{ fontSize: 18 }}>→</span>
        </button>
        <button className="pr-btn-ghost" style={{ width: '100%', padding: '14px 22px', fontSize: 13 }}>
          ▶ Как проходит занятие · 1 мин
        </button>
      </div>

      <div style={{
        padding: '14px 16px', border: '1px solid var(--pr-line-strong)', borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div className="pr-num" style={{ fontSize: 9 }}>ОТЗЫВЫ НА АВИТО</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--pr-yellow)', fontSize: 13, letterSpacing: 1 }}>★★★★★</span>
          <span style={{ fontSize: 16, fontWeight: 800 }}>5.0</span>
          <span style={{ color: 'var(--pr-mute)', fontSize: 11 }}>· {(typeof window !== 'undefined' && window.PRIDE_REVIEWS) ? window.PRIDE_REVIEWS.length : 55}+</span>
        </div>
      </div>
    </div>
    <div style={{ height: 4, position: 'relative', overflow: 'hidden' }}>
      <div className="pr-road" style={{ position: 'absolute', inset: 0, opacity: 0.6, backgroundSize: '40px 4px' }} />
    </div>
  </section>
);

// ── Marquee ──────────────────────────────────────────────────
const PrMSMarquee = () => {
  const items = [
    'КАТ. B · АВТОМАТ', 'КАТ. B · МЕХАНИКА', 'ИНДИВ. ГРАФИК',
    'СОПРОВОЖДЕНИЕ В ГИБДД', 'РАССРОЧКА 0%', 'ЛИЦЕНЗИЯ № 7167-Л',
  ];
  const row = [...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--pr-yellow)', color: 'var(--pr-black)',
      borderTop: '1px solid var(--pr-black)', borderBottom: '1px solid var(--pr-black)',
      overflow: 'hidden', padding: '12px 0',
    }}>
      <div className="pr-marquee-track-fast" style={{ display: 'flex', gap: 24, whiteSpace: 'nowrap' }}>
        {row.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, fontWeight: 800, fontSize: 13, letterSpacing: '0.04em' }}>
            <span>{t}</span>
            <span style={{ fontSize: 11 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Courses ──────────────────────────────────────────────────
const PrMSCourses = () => {
  const courses = [
    { tag: 'БАЗОВЫЙ', title: 'СТАРТ', price: '50 000', hours: '42 ч АКПП · 44 ч МКПП',
      pitch: 'Минимум часов, максимум фокуса.',
      features: ['Программа по стандарту ГИБДД', 'Внутренний экзамен — 1 попытка', 'Свободный график занятий'],
      accent: false },
    { tag: 'ХИТ · 70% ВЫБИРАЮТ', title: 'ПРЕМИУМ', price: '65 000', hours: '54 ч АКПП · 56 ч МКПП',
      pitch: 'Расширенная программа без скрытых доплат.',
      features: ['Бесплатный внутренний экзамен', 'Без лимита занятий', 'Индивидуальный график', 'Забираем из дома', 'Сопровождение на всех этапах'],
      accent: true },
    { tag: 'VIP', title: 'ПРЕСТИЖ', price: '110 000', hours: 'Без лимита часов',
      pitch: 'Премиум-авто и личный куратор.',
      features: ['Авто премиум-класса', 'Без лимита занятий', 'Все экзамены бесплатно', 'Сопровождение на всех этапах'],
      accent: false, vip: true },
  ];
  return (
    <section id="ms-courses" style={{ padding: '50px 20px 56px', background: 'var(--pr-paper)', color: '#0A0A0A' }}>
      <div className="pr-section-tag" style={{ fontSize: 10, color: '#3a3a3a' }}>[02] КУРСЫ</div>
      <h2 style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.88, marginTop: 14, color: '#0A0A0A' }}>
        ВЫБЕРИ <br />СВОЙ ТЕМП.
      </h2>
      <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, color: '#3a3a3a', marginBottom: 28 }}>
        Все три программы дают одно удостоверение. Различаются часами и комфортом.
      </p>

      <div style={{ display: 'grid', gap: 16 }}>
        {courses.map((c, i) => (
          <article key={i} style={{
            background: c.vip ? 'var(--pr-black)' : c.accent ? 'var(--pr-yellow)' : '#fff',
            color: c.vip ? '#fff' : '#0A0A0A',
            borderRadius: 22, padding: '24px 22px',
            border: c.accent || c.vip ? 'none' : '1px solid rgba(0,0,0,0.08)',
            position: 'relative',
          }}>
            {c.accent && (
              <div style={{
                position: 'absolute', top: -10, left: 18, background: '#0A0A0A', color: 'var(--pr-yellow)',
                padding: '4px 10px', borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
              }}>{c.tag}</div>
            )}
            {!c.accent && (
              <div className="pr-num" style={{ color: c.vip ? 'var(--pr-yellow)' : '#7a7a7a', fontSize: 9 }}>0{i + 1} · {c.tag}</div>
            )}
            <h3 style={{ fontFamily: 'var(--pr-display)', fontSize: 48, marginTop: c.accent ? 14 : 8, lineHeight: 0.9 }}>{c.title}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.5, opacity: c.vip ? 0.8 : 0.7, margin: '10px 0 18px' }}>{c.pitch}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'var(--pr-display)', fontSize: 38 }}>{c.price}</span>
              <span style={{ fontSize: 16, opacity: 0.6 }}>₽</span>
            </div>
            <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, letterSpacing: '0.1em',
              color: c.vip ? 'var(--pr-yellow)' : c.accent ? '#3a1a00' : '#7a7a7a', marginTop: 4, marginBottom: 16 }}>
              {c.hours}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'grid', gap: 8 }}>
              {c.features.map((f, k) => (
                <li key={k} style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.4 }}>
                  <span style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: 1,
                    background: c.vip ? 'var(--pr-yellow)' : c.accent ? '#0A0A0A' : 'var(--pr-yellow-deep)' }} />
                  {f}
                </li>
              ))}
            </ul>
            <button style={{
              width: '100%', background: c.vip ? 'var(--pr-yellow)' : '#0A0A0A',
              color: c.vip ? '#0A0A0A' : c.accent ? 'var(--pr-yellow)' : '#fff',
              border: 0, borderRadius: 999, padding: '14px 0', fontWeight: 800, fontSize: 12,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>Выбрать «{c.title}»</button>
          </article>
        ))}
      </div>
    </section>
  );
};

// ── Instructors ──────────────────────────────────────────────
const MS_INSTRUCTORS = [
  { name: 'ЛЕВ', surname: 'СТАРШИЙ ИНСТРУКТОР', img: 'assets/instructor_lev.jpg',
    tag: 'ПСИХОЛОГИЯ ВОЖДЕНИЯ',
    quote: 'Чтобы научиться водить, надо научиться расслабляться. Дальше — техника.',
    statsShort: ['17 лет за рулём', '7 лет преподавания'],
    statsBig: [{ n: '17', l: 'ЛЕТ ЗА РУЛЁМ' }, { n: '7', l: 'ЛЕТ ПРЕПОДАЁТ' }],
    approach: [
      'Использует знания психологии — индивидуальный подход к каждому ученику.',
      'Помогает преодолеть страхи, выявить слабые стороны и превратить их в преимущества.',
      'Обучает не только правилам, но и свободному, уверенному вождению.',
    ] },
  { name: 'ДМИТРИЙ', surname: 'БЕЛОНОГОВ', img: 'assets/instructor_dmitry_b.jpg',
    tag: 'ГОРОДСКОЙ ПОТОК',
    quote: 'В пробке надо не нервничать, а думать на два хода вперёд.',
    statsShort: ['10 лет за рулём', 'АКПП / МКПП'],
    statsBig: [{ n: '10', l: 'ЛЕТ ЗА РУЛЁМ' }, { n: 'AT/MT', l: 'ОБЕ КОРОБКИ' }],
    approach: [
      'Главные принципы: терпение, ответственность и стрессоустойчивость.',
      'Учу сохранять спокойствие при сложных манёврах и в плотном городском потоке.',
      'Внимательный и обстоятельный подход к каждому занятию.',
    ] },
  { name: 'ДМИТРИЙ', surname: 'ИНСТРУКТОР МКПП / АКПП', img: 'assets/instructor_dmitry.jpg',
    tag: 'БЕЗ КРИКОВ',
    quote: 'Объясняю чётко, без стресса. Учу для жизни, не для галочки.',
    statsShort: ['12 лет за рулём', 'Маршруты ГИБДД'],
    statsBig: [{ n: '12', l: 'ЛЕТ ЗА РУЛЁМ' }, { n: 'AT/MT', l: 'ОБЕ КОРОБКИ' }],
    approach: [
      'Обучаю на МКПП («механика») и АКПП («автомат») — выбор за вами.',
      'Объясняю чётко, без стресса и криков — создаю безопасную атмосферу.',
      'Учу не для галочки в ГАИ, а для уверенной езды в жизни.',
    ] },
];

const PrMSInstructorDetail = ({ inst, idx, onClose }) => (
  <div className="pr-site" style={{ width: MS_W, background: 'var(--pr-black)', minHeight: '100vh' }}>
    {/* Hero photo */}
    <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
      <img className="pr-prof-photo" src={inst.img} alt={inst.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', top: 14, left: 14, right: 14,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={onClose} style={{
          width: 38, height: 38, borderRadius: 999, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 18,
          cursor: 'pointer',
        }}>←</button>
        <span className="pr-stamp" style={{
          color: '#fff', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)', fontSize: 9, padding: '4px 10px',
        }}>{inst.tag}</span>
      </div>
      <div className="pr-prof-num" style={{
        position: 'absolute', right: 16, top: 70, fontSize: 100,
        fontFamily: 'var(--pr-display)', color: '#fff',
        lineHeight: 0.9, letterSpacing: '-0.04em',
        textShadow: '0 4px 20px rgba(0,0,0,0.6)',
        animationDelay: '0.25s',
      }}>0{idx + 1}</div>
      <div className="pr-prof-rise" style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '60px 20px 22px', background: 'linear-gradient(transparent, rgba(0,0,0,0.92))',
        animationDelay: '0.35s',
      }}>
        <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-yellow)', letterSpacing: '0.18em' }}>
          {inst.surname}
        </div>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 64, lineHeight: 0.9, color: '#fff', marginTop: 4 }}>
          {inst.name}
        </div>
      </div>
    </div>

    {/* Stats row */}
    <div className="pr-prof-rise" style={{ display: 'flex', borderBottom: '1px solid var(--pr-line)', animationDelay: '0.5s' }}>
      {inst.statsBig.map((s, i) => (
        <div key={i} style={{
          flex: 1, padding: '20px 12px', textAlign: 'center',
          borderRight: i < inst.statsBig.length - 1 ? '1px solid var(--pr-line)' : 'none',
        }}>
          <div style={{ fontFamily: 'var(--pr-display)', fontSize: 28, color: 'var(--pr-yellow)', lineHeight: 1 }}>{s.n}</div>
          <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, color: 'var(--pr-mute-2)', letterSpacing: '0.1em', marginTop: 6 }}>{s.l}</div>
        </div>
      ))}
    </div>

    {/* Quote */}
    <div className="pr-prof-rise" style={{ padding: '28px 20px 8px', animationDelay: '0.6s' }}>
      <div style={{
        fontSize: 18, lineHeight: 1.4, color: '#fff',
        borderLeft: '2px solid var(--pr-yellow)', paddingLeft: 16, fontStyle: 'italic',
      }}>«{inst.quote}»</div>
    </div>

    {/* Approach */}
    <div className="pr-prof-rise" style={{ padding: '24px 20px 0', animationDelay: '0.7s' }}>
      <div className="pr-num" style={{ marginBottom: 14 }}>ПОДХОД</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
        {inst.approach.map((s, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
            <span style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: 2, background: 'var(--pr-yellow)' }} />
            {s}
          </li>
        ))}
      </ul>
    </div>

    {/* CTAs */}
    <div className="pr-prof-rise" style={{ padding: '32px 20px 40px', animationDelay: '0.8s' }}>
      <button className="pr-btn-yellow" style={{ width: '100%', justifyContent: 'center', padding: '18px 0', cursor: 'pointer' }}>
        Записаться к {inst.name === 'ЛЕВ' ? 'Льву' : 'Дмитрию'} <span style={{ fontSize: 18 }}>→</span>
      </button>
      <a href="tel:+73912345678" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 18px', background: 'var(--pr-yellow)', color: '#0A0A0A',
        borderRadius: 14, marginTop: 10, textDecoration: 'none',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>☎</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: 15 }}>+7 (391) 234-56-78</span>
            <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, letterSpacing: '0.1em', opacity: 0.7 }}>
              ОТКРЫТО · ДО 21:00
            </span>
          </span>
        </span>
        <span style={{ fontSize: 18 }}>→</span>
      </a>
    </div>
  </div>
);

const PrMSInstructors = ({ onSelect }) => (
  <section id="ms-instructors" style={{ padding: '50px 20px 56px', background: 'var(--pr-black)', position: 'relative' }}>
    <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
    <div style={{ position: 'relative' }}>
      <div className="pr-section-tag" style={{ fontSize: 10 }}>[03] КОМАНДА</div>
      <h2 style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.88, marginTop: 14, color: '#fff' }}>
        ТРОЕ ЛЮДЕЙ,<br />
        <span style={{ color: 'var(--pr-yellow)' }}>КОТОРЫЕ НЕ КРИЧАТ.</span>
      </h2>
      <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, color: 'var(--pr-mute-2)', marginBottom: 28 }}>
        Каждый — действующий водитель с 10+ лет стажа. Нажмите карточку, чтобы открыть профиль.
      </p>

      <div style={{ display: 'grid', gap: 16 }}>
        {MS_INSTRUCTORS.map((p, i) => (
          <article key={i} onClick={() => onSelect(i)} style={{
            borderRadius: 18, overflow: 'hidden',
            border: '1px solid var(--pr-line)', background: 'var(--pr-graphite)',
            cursor: 'pointer',
          }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', top: 12, left: 12, background: 'var(--pr-yellow)',
                color: '#0A0A0A', padding: '5px 10px', borderRadius: 999,
                fontFamily: 'var(--pr-mono)', fontSize: 9, letterSpacing: '0.12em', fontWeight: 700,
              }}>{p.tag}</div>
              <div style={{
                position: 'absolute', right: 14, top: 8, fontSize: 84,
                fontFamily: 'var(--pr-display)', color: '#fff',
                lineHeight: 0.9, letterSpacing: '-0.04em',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}>0{i + 1}</div>
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                padding: '40px 16px 14px', background: 'linear-gradient(transparent, rgba(0,0,0,0.92))',
              }}>
                <div style={{ fontFamily: 'var(--pr-display)', fontSize: 32, lineHeight: 0.9, color: '#fff' }}>{p.name}</div>
                <div style={{ fontSize: 9, color: 'var(--pr-yellow)', letterSpacing: '0.18em', fontFamily: 'var(--pr-mono)', marginTop: 4 }}>
                  {p.surname}
                </div>
              </div>
            </div>
            <div style={{ padding: '18px 18px 20px' }}>
              <div style={{
                fontSize: 14, lineHeight: 1.4, color: '#fff', marginBottom: 14,
                borderLeft: '2px solid var(--pr-yellow)', paddingLeft: 12, fontStyle: 'italic',
              }}>«{p.quote}»</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.statsShort.map((s, k) => (
                    <span key={k} style={{
                      fontSize: 10, color: 'var(--pr-mute-2)', padding: '4px 9px',
                      border: '1px solid var(--pr-line-strong)', borderRadius: 999,
                    }}>{s}</span>
                  ))}
                </div>
                <span style={{ fontSize: 11, color: 'var(--pr-yellow)', fontWeight: 700, letterSpacing: '0.04em' }}>
                  ПРОФИЛЬ →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ── Trust ────────────────────────────────────────────────────
const PrMSTrust = () => {
  const items = ['ЛИЦЕНЗИЯ № 7167-Л', 'РОСРЕЕСТР АВТОШКОЛ', 'ГИБДД РОССИИ', 'АВИТО · 5.0'];
  const row = [...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--pr-black)',
      borderTop: '1px solid var(--pr-line-strong)', borderBottom: '1px solid var(--pr-line-strong)',
      overflow: 'hidden', padding: '14px 0',
    }}>
      <div className="pr-marquee-track-rev" style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap', color: 'var(--pr-mute-2)' }}>
        {row.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 32, fontFamily: 'var(--pr-mono)', fontSize: 10, letterSpacing: '0.12em' }}>
            <span>{t}</span>
            <span style={{ color: 'var(--pr-yellow)' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Reviews ──────────────────────────────────────────────────
const PrMSReviews = () => {
  const allReviews = (typeof window !== 'undefined' && window.PRIDE_REVIEWS) || [];
  const reviewsTotal = allReviews.length;
  const reviews = allReviews.slice(0, 10);
  const photos = [1,2,3,4,5,1,2].map(n => `assets/student_${((n-1)%5)+1}.jpg`);
  const truncate = (s, n) => (s.length > n ? s.slice(0, n).trimEnd() + '…' : s);
  return (
    <section id="ms-reviews" style={{ padding: '50px 0 50px', background: 'var(--pr-black)' }}>
      <div style={{ padding: '0 20px' }}>
        <div className="pr-section-tag" style={{ fontSize: 10 }}>[04] КУРСАНТЫ И ОТЗЫВЫ</div>
        <h2 style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.88, marginTop: 14, color: '#fff' }}>
          <span style={{ color: 'var(--pr-yellow)' }}>5.0</span> НА АВИТО.<br />
          ПОЧИТАЙ ЛЮБОЙ.
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, marginBottom: 24 }}>
          <span style={{ color: 'var(--pr-yellow)', fontSize: 14, letterSpacing: 1 }}>★★★★★</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>5.0</span>
          <span style={{ fontSize: 12, color: 'var(--pr-mute)' }}>· {reviewsTotal} отзывов</span>
        </div>
      </div>

      {/* Photo strip */}
      <div style={{ overflow: 'hidden', padding: '4px 0 20px' }}>
        <div className="pr-marquee-track-fast" style={{ display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
          {[...photos, ...photos].map((src, i) => (
            <div key={i} style={{
              width: 130, height: 170, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
              border: '1px solid var(--pr-line)',
            }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
        {reviews.map((r, i) => (
          <article key={i} className="pr-card" style={{ padding: '18px 18px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--pr-yellow)',
                color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13,
              }}>{r.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{r.name}</div>
                <div className="pr-num" style={{ marginTop: 2, fontSize: 9 }}>{r.date}</div>
              </div>
              <span style={{ color: 'var(--pr-yellow)', fontSize: 11, letterSpacing: 1 }}>★★★★★</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--pr-mute-2)', margin: 0, whiteSpace: 'pre-line' }}>{truncate(r.text, 220)}</p>
          </article>
        ))}
        <a href="https://www.avito.ru/brands/2445e40064cd9cc62a80139e1a006b77/all" target="_blank" rel="noopener noreferrer" className="pr-btn-ghost" style={{ width: '100%', marginTop: 8, justifyContent: 'center', padding: '14px 0', fontSize: 12, textAlign: 'center' }}>
          Все {reviewsTotal} отзывов на Авито →
        </a>
      </div>
    </section>
  );
};

// ── FAQ ──────────────────────────────────────────────────────
const PrMSFaq = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'СКОЛЬКО ВРЕМЕНИ ЗАЙМЁТ ОБУЧЕНИЕ?', a: 'В среднем 3–4 месяца. Теория онлайн по будням, практика — когда удобно вам.' },
    { q: 'А ЕСЛИ Я БОЮСЬ ЕЗДИТЬ?', a: 'Это нормально. Лев работает с курсантами после неудачных попыток в других школах. Никто не кричит и не давит.' },
    { q: 'МОЖНО ВЕРНУТЬ ДЕНЬГИ?', a: 'Да, в первые 7 дней без вопросов. После — пропорционально неотзанятым часам.' },
    { q: 'ЕСТЬ ЛИ РАССРОЧКА?', a: 'Да, 0% на 6 месяцев — оформляем сами на месте, без банков и справок.' },
    { q: 'ЕСЛИ НЕ СДАМ С ПЕРВОГО РАЗА?', a: 'На «Премиум» — все попытки бесплатны, мы сопровождаем. На «Базовом» — повторные сборы 350 ₽.' },
  ];
  return (
    <section id="ms-faq" style={{ padding: '50px 20px 56px', background: 'var(--pr-paper)', color: '#0A0A0A' }}>
      <div className="pr-section-tag" style={{ fontSize: 10, color: '#3a3a3a' }}>[05] ВОПРОСЫ</div>
      <h2 style={{ fontFamily: 'var(--pr-display)', fontSize: 52, lineHeight: 0.9, marginTop: 14 }}>
        ЧАСТО<br />СПРАШИВАЮТ.
      </h2>
      <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, color: '#3a3a3a' }}>
        Если вашего вопроса нет — напишите в Telegram, отвечаем за 15 минут.
      </p>

      <div style={{ marginTop: 24 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            borderTop: '1px solid rgba(0,0,0,0.12)',
            borderBottom: i === items.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none',
            padding: '18px 0',
          }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left',
            }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="pr-num" style={{ color: '#7a7a7a', fontSize: 9 }}>0{i + 1}</span>
                <span style={{ fontFamily: 'var(--pr-display)', fontSize: 17, color: '#0A0A0A', lineHeight: 1.15 }}>{it.q}</span>
              </span>
              <span style={{
                width: 32, height: 32, borderRadius: 999, border: '1px solid rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: open === i ? 'var(--pr-yellow)' : 'transparent',
                fontSize: 18, fontWeight: 300,
              }}>{open === i ? '–' : '+'}</span>
            </button>
            {open === i && (
              <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.5, color: '#3a3a3a' }}>{it.a}</p>
            )}
          </div>
        ))}
      </div>

      <button className="pr-btn-black" style={{ marginTop: 24, width: '100%', justifyContent: 'center', padding: '16px 0', fontSize: 13 }}>
        Написать в Telegram
      </button>
    </section>
  );
};

// ── Enroll ──────────────────────────────────────────────────
const PrMSEnroll = () => {
  const [step, setStep] = React.useState(2);
  const [data, setData] = React.useState({ category: 'B', transmission: 'AT', course: 'Премиум' });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  return (
    <section id="ms-enroll" style={{ background: 'var(--pr-yellow)', color: '#0A0A0A' }}>
      <div style={{ padding: '50px 20px 32px' }}>
        <div className="pr-section-tag" style={{ fontSize: 10, color: '#0A0A0A' }}>[06] ЗАПИСЬ</div>
        <h2 style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.92, marginTop: 14 }}>
          ТРИ<br />ПРОСТЫХ<br />ШАГА.
        </h2>
        <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, maxWidth: 320 }}>
          Без длинных анкет. Куратор перезванивает за 15 минут.
        </p>

        <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
          {[
            { n: '01', t: 'Звонок куратора · 15 мин' },
            { n: '02', t: 'Знакомство · 30 мин' },
            { n: '03', t: 'Первое занятие — бесплатно' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 14 }}>
              <span style={{
                width: 36, height: 36, borderRadius: 999, background: '#0A0A0A', color: 'var(--pr-yellow)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--pr-display)', fontSize: 13, flexShrink: 0,
              }}>{s.n}</span>
              <span style={{ fontWeight: 600 }}>{s.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div style={{ padding: '0 20px 50px' }}>
        <div style={{
          background: '#0A0A0A', color: '#fff', borderRadius: 22,
          padding: '24px 22px 26px', boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            {[1,2,3].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: 24, height: 24, borderRadius: 999,
                  background: s <= step ? 'var(--pr-yellow)' : 'rgba(255,255,255,0.1)',
                  color: s <= step ? '#0A0A0A' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 11, fontFamily: 'var(--pr-mono)',
                }}>{s}</div>
                {s < 3 && <div style={{ flex: 1, height: 1, background: s < step ? 'var(--pr-yellow)' : 'rgba(255,255,255,0.1)' }} />}
              </React.Fragment>
            ))}
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-mute)', letterSpacing: '0.1em' }}>
              ШАГ {step}/3
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--pr-display)', fontSize: 28, marginBottom: 22 }}>КАТЕГОРИЯ.</h3>

          <div style={{ marginBottom: 20 }}>
            <div className="pr-num" style={{ marginBottom: 8, fontSize: 9 }}>КАТЕГОРИЯ ПРАВ</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['A', 'B'].map(c => (
                <button key={c} onClick={() => update('category', c)} style={{
                  padding: '16px 0', background: data.category === c ? 'var(--pr-yellow)' : 'transparent',
                  color: data.category === c ? '#0A0A0A' : '#fff',
                  border: data.category === c ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 12, fontFamily: 'var(--pr-display)', fontSize: 26, cursor: 'pointer',
                }}>{c}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <div className="pr-num" style={{ marginBottom: 8, fontSize: 9 }}>КОРОБКА ПЕРЕДАЧ</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['AT','Автомат'], ['MT','Механика']].map(([k,t]) => (
                <button key={k} onClick={() => update('transmission', k)} style={{
                  padding: '14px 0', background: data.transmission === k ? 'var(--pr-yellow)' : 'transparent',
                  color: data.transmission === k ? '#0A0A0A' : '#fff',
                  border: data.transmission === k ? '1px solid var(--pr-yellow)' : '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{
            padding: '12px 14px', background: 'rgba(228,84,0,0.08)', borderRadius: 10,
            marginBottom: 18, border: '1px solid rgba(228,84,0,0.25)',
          }}>
            <div className="pr-num" style={{ color: 'var(--pr-yellow)', marginBottom: 4, fontSize: 9 }}>ПОДСКАЗКА</div>
            <div style={{ fontSize: 12, lineHeight: 1.5, color: '#fff' }}>
              Если сомневаетесь — берите автомат. Большинство современных машин такие.
            </div>
          </div>

          <button className="pr-btn-yellow" onClick={() => setStep(3)} style={{
            width: '100%', justifyContent: 'space-between', padding: '16px 22px',
          }}>
            <span>Дальше · контакт</span>
            <span style={{ fontSize: 18 }}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// ── Footer ───────────────────────────────────────────────────
const PrMSFooter = () => (
  <footer style={{ background: 'var(--pr-black)', borderTop: '1px solid var(--pr-line)', padding: '40px 20px 32px' }}>
    {/* Big wordmark */}
    <div style={{
      fontFamily: 'var(--pr-display)', fontSize: 130, lineHeight: 0.85, letterSpacing: '-0.02em',
      color: 'var(--pr-yellow)', marginBottom: 20, transform: 'translateX(-6px)',
    }}>ПРАЙД</div>
    <div style={{ marginBottom: 32 }}>
      <div className="pr-num" style={{ fontSize: 9 }}>КРАСНОЯРСК</div>
      <div style={{ fontFamily: 'var(--pr-display)', fontSize: 22, marginTop: 8, color: '#fff' }}>
        МАСТЕРСТВО<br />НАЧИНАЕТСЯ ЗДЕСЬ.
      </div>
    </div>

    <div style={{ display: 'grid', gap: 24, paddingBottom: 28, borderBottom: '1px solid var(--pr-line)' }}>
      <div>
        <div className="pr-num" style={{ marginBottom: 10, fontSize: 9 }}>КОНТАКТЫ</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: '#fff' }}>
          ул. Ленина, 78<br />
          660049, Красноярск<br />
          <a href="tel:+73912345678">+7 (391) 234-56-78</a><br />
          <a href="mailto:hello@pride-school.ru">hello@pride-school.ru</a>
        </div>
      </div>
      <div>
        <div className="pr-num" style={{ marginBottom: 10, fontSize: 9 }}>РЕЖИМ РАБОТЫ</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--pr-mute-2)' }}>
          Пн–Пт · 09:00–21:00<br />
          Сб · 10:00–18:00<br />
          Вс · по записи
        </div>
      </div>
      <div>
        <div className="pr-num" style={{ marginBottom: 10, fontSize: 9 }}>ССЫЛКИ</div>
        <div style={{ fontSize: 13, lineHeight: 1.9 }}>
          <a className="pr-link-u">Курсы и цены</a> · <a className="pr-link-u">Инструкторы</a><br />
          <a className="pr-link-u">Отзывы</a> · <a className="pr-link-u">Частые вопросы</a>
        </div>
      </div>
      <div>
        <div className="pr-num" style={{ marginBottom: 10, fontSize: 9 }}>СОЦСЕТИ</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['VK', 'TG', 'INST', 'YT'].map(s => (
            <a key={s} style={{
              width: 42, height: 42, borderRadius: 999, border: '1px solid var(--pr-line-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11,
            }}>{s}</a>
          ))}
        </div>
      </div>
    </div>

    <div style={{
      paddingTop: 20, fontSize: 10, color: 'var(--pr-mute)',
      fontFamily: 'var(--pr-mono)', letterSpacing: '0.06em', lineHeight: 1.8,
    }}>
      © 2026 ООО АВТОШКОЛА «ПРОФИ»<br />
      ЛИЦЕНЗИЯ № 7167-Л · ИНН 2466154321<br />
      ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
    </div>
  </footer>
);

// ── Compose ──────────────────────────────────────────────────
const PrideMobileSite = () => {
  const [selectedInstructor, setSelectedInstructor] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const savedScrollRef = React.useRef(0);

  const openInstructor = React.useCallback((idx) => {
    savedScrollRef.current = window.scrollY;
    setSelectedInstructor(idx);
  }, []);

  const closeInstructor = React.useCallback(() => {
    setSelectedInstructor(null);
  }, []);

  // When opening: scroll to top of detail view.
  // When closing: restore the home-page scroll position.
  React.useEffect(() => {
    if (selectedInstructor !== null) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, savedScrollRef.current);
    }
  }, [selectedInstructor]);

  // Lock body scroll while menu is open
  React.useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  if (menuOpen && window.PrMobileMenu) {
    return <window.PrMobileMenu onClose={() => setMenuOpen(false)} />;
  }

  if (selectedInstructor !== null) {
    return (
      <PrMSInstructorDetail
        inst={MS_INSTRUCTORS[selectedInstructor]}
        idx={selectedInstructor}
        onClose={closeInstructor}
      />
    );
  }

  return (
    <div className="pr-site" style={{ width: MS_W, position: 'relative' }}>
      <PrMSHeader onMenuOpen={() => setMenuOpen(true)} />
      <PrMSHero />
      <PrMSMarquee />
      <PrMSCourses />
      <PrMSInstructors onSelect={openInstructor} />
      <PrMSTrust />
      <PrMSReviews />
      <PrMSFaq />
      <PrMSEnroll />
      <PrMSFooter />
    </div>
  );
};

window.PrideMobileSite = PrideMobileSite;
