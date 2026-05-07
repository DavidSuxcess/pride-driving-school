/* global React, IOSFrame, PrLion */
// ─────────────────────────────────────────────────────────────
// Pride · Mobile screens — 4 ключевых экрана внутри iPhone 15
// ─────────────────────────────────────────────────────────────

const MOBILE_W = 390;

// 1) Hero / Home (мобильная)
const PrMobileHome = () => (
  <div className="pr-site" style={{ width: MOBILE_W, background: 'var(--pr-black)', minHeight: 844, position: 'relative', overflow: 'hidden' }}>
    {/* Mini header */}
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px 12px', borderBottom: '1px solid var(--pr-line)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <PrLion size={28} color="#E45400" />
        <span style={{ fontFamily: 'var(--pr-display)', fontSize: 18, color: '#fff' }}>ПРАЙД</span>
      </div>
      <button style={{
        width: 38, height: 38, borderRadius: 999, background: 'var(--pr-yellow)',
        color: '#0A0A0A', border: 0, fontSize: 18, fontWeight: 800,
      }}>≡</button>
    </div>

    {/* Hero */}
    <div style={{ position: 'relative', padding: '24px 20px 28px' }}>
      <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'var(--pr-display)', fontSize: 76, lineHeight: 0.85, letterSpacing: '-0.01em',
          marginTop: 8, color: '#fff', textTransform: 'uppercase' }}>
          ВОДИ<br />
          <span style={{ color: 'var(--pr-yellow)' }}>УВЕРЕННО.</span>
        </h1>
        <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.45, color: 'var(--pr-mute-2)', maxWidth: 300 }}>
          Не «сдай экзамен», а реально <span className="pr-mark">научись водить</span>.
        </p>
      </div>
    </div>

    {/* CTAs */}
    <div style={{ padding: '0 20px 24px', display: 'grid', gap: 10 }}>
      <button className="pr-btn-yellow" style={{
        width: '100%', justifyContent: 'space-between', padding: '18px 22px',
      }}>
        Записаться на курс <span style={{ fontSize: 18 }}>→</span>
      </button>
      <button className="pr-btn-ghost" style={{ width: '100%', padding: '14px 22px', fontSize: 13 }}>
        ▶ Как проходит занятие · 1 мин
      </button>
    </div>

    {/* Stats grid — 2 поля */}
    <div style={{ padding: '0 20px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
        border: '1px solid var(--pr-line-strong)', borderRadius: 14, overflow: 'hidden' }}>
        {[
          { n: '94%', l: 'сдают с первого раза' },
          { n: '5.0 ★', l: '54+ отзывов на Авито' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: 16, borderRight: i % 2 === 0 ? '1px solid var(--pr-line-strong)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--pr-display)', fontSize: 28, color: 'var(--pr-yellow)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 11, color: 'var(--pr-mute-2)', marginTop: 6, lineHeight: 1.3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Tape */}
    <div style={{ overflow: 'hidden', padding: '12px 0', background: 'var(--pr-yellow)', color: '#0A0A0A' }}>
      <div className="pr-marquee-track-fast" style={{ display: 'flex', gap: 24, whiteSpace: 'nowrap' }}>
        {[...Array(12)].map((_, i) => (
          <span key={i} style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.04em' }}>
            КАТ. B · ИНДИВ. ГРАФИК · РАССРОЧКА 0% · СОПРОВОЖДЕНИЕ В ГИБДД ✦
          </span>
        ))}
      </div>
    </div>

    {/* Course teaser */}
    <div style={{ padding: '32px 20px 28px' }}>
      <div className="pr-section-tag" style={{ fontSize: 10, color: 'var(--pr-mute-2)' }}>[02] КУРСЫ</div>
      <h2 style={{ fontFamily: 'var(--pr-display)', fontSize: 42, color: '#fff', marginTop: 14, lineHeight: 0.9, textTransform: 'uppercase' }}>
        ВЫБЕРИ <br />СВОЙ ТЕМП.
      </h2>

      {/* Highlighted course */}
      <div style={{
        marginTop: 22, background: 'var(--pr-yellow)', color: '#0A0A0A',
        borderRadius: 22, padding: '22px 22px 20px', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: -10, left: 18, background: '#0A0A0A', color: 'var(--pr-yellow)',
          padding: '4px 10px', borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
        }}>
          ХИТ · 70% ВЫБИРАЮТ
        </div>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.9, marginTop: 10 }}>ПРЕМИУМ</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--pr-display)', fontSize: 36 }}>65 000</span>
          <span style={{ fontSize: 16, opacity: 0.6 }}>₽</span>
        </div>
        <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 9.5, letterSpacing: '0.1em', color: '#3a1a00', marginTop: 4 }}>
          54 Ч АКПП · 56 Ч МКПП
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'grid', gap: 6, fontSize: 12 }}>
          {['Бесплатный внутренний экзамен', 'Без лимита занятий', 'Забираем из дома', 'Индивидуальный график'].map((f, i) => (
            <li key={i} style={{ display: 'flex', gap: 8 }}>
              <span style={{ flexShrink: 0, marginTop: 5, width: 5, height: 5, borderRadius: 1, background: '#0A0A0A' }} />
              {f}
            </li>
          ))}
        </ul>
        <button style={{
          width: '100%', background: '#0A0A0A', color: 'var(--pr-yellow)',
          border: 0, borderRadius: 999, padding: '14px 0', fontWeight: 800, fontSize: 12,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>Выбрать Премиум</button>
      </div>

      {/* Scroll hint */}
      <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-mute)', letterSpacing: '0.16em' }}>
        ↓ ЕЩЁ 2 ТАРИФА
      </div>
    </div>
  </div>
);

// 2) Courses comparison (мобильный таб-свитч)
const PrMobileCourses = () => {
  const [active, setActive] = React.useState(1);
  const courses = [
    { tag: 'СТАРТ', sub: 'Базовый', price: '50 000', hours: '42 ч АКПП · 44 ч МКПП', features: ['Программа по стандарту ГИБДД','Внутренний экзамен — 1 попытка','Свободный график занятий'] },
    { tag: 'ПРЕМИУМ', sub: 'Хит · 70% выбирают', price: '65 000', hours: '54 ч АКПП · 56 ч МКПП', features: ['Бесплатный внутренний экзамен','Неограниченное число занятий','Индивидуальный график','Забираем из дома','Сопровождение на всех этапах'] },
    { tag: 'ПРЕСТИЖ', sub: 'VIP', price: '110 000', hours: 'Без лимита часов', features: ['Авто премиум-класса','Неограниченное число занятий','Индивидуальный график','Забираем из дома','Все экзамены бесплатно','Сопровождение на всех этапах'] },
  ];
  const c = courses[active];
  return (
    <div className="pr-site" style={{ width: MOBILE_W, minHeight: 844, background: 'var(--pr-paper)', color: '#0A0A0A' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fff',
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: 999, background: '#0A0A0A', color: '#fff', border: 0, fontSize: 18,
        }}>←</button>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 18, color: '#0A0A0A' }}>КУРСЫ</div>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ padding: '24px 20px 30px' }}>
        <div className="pr-section-tag" style={{ fontSize: 10, color: '#3a3a3a' }}>[02] КУРСЫ</div>
        <h1 style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.88, marginTop: 12, color: '#0A0A0A' }}>
          ВЫБЕРИ<br />СВОЙ ТЕМП.
        </h1>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 6, marginTop: 28, padding: 5,
          background: '#0A0A0A', borderRadius: 999,
        }}>
          {courses.map((cc, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              flex: 1, padding: '12px 0', border: 0, borderRadius: 999,
              background: active === i ? 'var(--pr-yellow)' : 'transparent',
              color: active === i ? '#0A0A0A' : '#fff',
              fontWeight: 800, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer',
            }}>{cc.tag}</button>
          ))}
        </div>

        {/* Active card */}
        <div style={{
          marginTop: 22, background: '#fff', borderRadius: 22, padding: '24px 22px',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, letterSpacing: '0.14em', color: '#7a7a7a' }}>{c.sub.toUpperCase()}</div>
          <div style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.9, marginTop: 6, color: '#0A0A0A' }}>{c.tag}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 14 }}>
            <span style={{ fontFamily: 'var(--pr-display)', fontSize: 44, color: '#0A0A0A' }}>{c.price}</span>
            <span style={{ fontSize: 18, opacity: 0.5 }}>₽</span>
          </div>
          <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, letterSpacing: '0.12em', color: '#7a7a7a', marginTop: 4 }}>
            {c.hours}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '20px 0 16px' }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            {c.features.map((f, k) => (
              <li key={k} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.4 }}>
                <span style={{ flexShrink: 0, marginTop: 6, width: 6, height: 6, borderRadius: 2, background: 'var(--pr-yellow-deep)' }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Sticky CTA */}
        <button className="pr-btn-yellow" style={{
          width: '100%', justifyContent: 'center', marginTop: 24, padding: '20px 0', fontSize: 14,
        }}>
          Выбрать «{c.tag}» — {c.price} ₽
        </button>

        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: '#5a5a5a', lineHeight: 1.5 }}>
          ★ Рассрочка 0% на 6 месяцев · ★ Возврат в первые 7 дней
        </div>
      </div>
    </div>
  );
};

// 3) Instructor profile (мобильный)
const PrMobileInstructor = () => (
  <div className="pr-site" style={{ width: MOBILE_W, minHeight: 844, background: 'var(--pr-black)' }}>
    {/* Hero photo */}
    <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
      <img src="assets/instructor_lev.jpg" alt="Лев"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', top: 14, left: 14, right: 14,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: 999, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', fontSize: 18,
        }}>←</button>
        <span className="pr-stamp" style={{
          color: '#fff', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)', fontSize: 9, padding: '4px 10px',
        }}>
          ПСИХОЛОГИЯ ВОЖДЕНИЯ
        </span>
      </div>
      {/* Big number watermark */}
      <div style={{
        position: 'absolute', right: 16, top: 70, fontSize: 100,
        fontFamily: 'var(--pr-display)', color: '#fff',
        lineHeight: 0.9, letterSpacing: '-0.04em',
        textShadow: '0 4px 20px rgba(0,0,0,0.6)',
      }}>01</div>

      {/* Name strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '60px 20px 22px', background: 'linear-gradient(transparent, rgba(0,0,0,0.92))',
      }}>
        <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-yellow)', letterSpacing: '0.18em' }}>
          СТАРШИЙ ИНСТРУКТОР
        </div>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 64, lineHeight: 0.9, color: '#fff', marginTop: 4 }}>
          ЛЕВ
        </div>
      </div>
    </div>

    {/* Stats row */}
    <div style={{
      display: 'flex', borderBottom: '1px solid var(--pr-line)',
    }}>
      {[
        { n: '17', l: 'ЛЕТ ЗА РУЛЁМ' },
        { n: '7', l: 'ЛЕТ ПРЕПОДАЁТ' },
      ].map((s, i) => (
        <div key={i} style={{
          flex: 1, padding: '20px 12px', textAlign: 'center',
          borderRight: i < 1 ? '1px solid var(--pr-line)' : 'none',
        }}>
          <div style={{ fontFamily: 'var(--pr-display)', fontSize: 28, color: 'var(--pr-yellow)', lineHeight: 1 }}>{s.n}</div>
          <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, color: 'var(--pr-mute-2)', letterSpacing: '0.1em', marginTop: 6 }}>{s.l}</div>
        </div>
      ))}
    </div>

    {/* Quote */}
    <div style={{ padding: '28px 20px 8px' }}>
      <div style={{
        fontSize: 18, lineHeight: 1.4, color: '#fff',
        borderLeft: '2px solid var(--pr-yellow)', paddingLeft: 16, fontStyle: 'italic',
      }}>
        «Чтобы научиться водить, надо научиться расслабляться. Дальше — техника.»
      </div>
    </div>

    {/* Bullet list */}
    <div style={{ padding: '24px 20px 0' }}>
      <div className="pr-num" style={{ marginBottom: 14 }}>ПОДХОД</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
        {[
          'Использует знания психологии — индивидуальный подход к каждому ученику.',
          'Помогает преодолеть страхи, выявить слабые стороны и превратить их в преимущества.',
          'Обучает не только правилам, но и свободному, уверенному вождению.',
        ].map((s, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
            <span style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: 2, background: 'var(--pr-yellow)' }} />
            {s}
          </li>
        ))}
      </ul>
    </div>

    {/* Sticky CTA */}
    <div style={{ padding: '32px 20px 28px' }}>
      <button className="pr-btn-yellow" style={{ width: '100%', justifyContent: 'center', padding: '18px 0' }}>
        Записаться ко Льву <span style={{ fontSize: 18 }}>→</span>
      </button>
      <button className="pr-btn-ghost" style={{ width: '100%', marginTop: 10, padding: '14px 0', fontSize: 13 }}>
        ☎ Позвонить · +7 (391) 234-56-78
      </button>
    </div>
  </div>
);

// 4) Enrollment form mobile
const PrMobileForm = () => {
  const [step] = React.useState(2);
  return (
    <div className="pr-site" style={{ width: MOBILE_W, minHeight: 844, background: 'var(--pr-yellow)', color: '#0A0A0A' }}>
      {/* Sticky top */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: 999, background: '#0A0A0A', color: 'var(--pr-yellow)',
          border: 0, fontSize: 18,
        }}>←</button>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 16 }}>ЗАПИСЬ</div>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ padding: '20px 20px 28px' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          {[1,2,3].map(s => (
            <React.Fragment key={s}>
              <div style={{
                width: 26, height: 26, borderRadius: 999,
                background: s <= step ? '#0A0A0A' : 'rgba(0,0,0,0.15)',
                color: s <= step ? 'var(--pr-yellow)' : '#0A0A0A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 11, fontFamily: 'var(--pr-mono)',
              }}>{s}</div>
              {s < 3 && <div style={{ flex: 1, height: 1, background: s < step ? '#0A0A0A' : 'rgba(0,0,0,0.15)' }} />}
            </React.Fragment>
          ))}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--pr-mono)', fontSize: 10, letterSpacing: '0.1em' }}>
            ШАГ 2/3
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--pr-display)', fontSize: 64, lineHeight: 0.9, marginTop: 8 }}>
          КАТЕГОРИЯ.
        </h1>
        <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.45, opacity: 0.7 }}>
          Большинство выбирают B + автомат. Если не уверены, на звонке поможем определиться.
        </p>

        {/* Category */}
        <div style={{ marginTop: 28 }}>
          <div className="pr-num" style={{ color: '#3a3a3a', marginBottom: 10 }}>КАТЕГОРИЯ ПРАВ</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { k: 'A', l: 'мото' },
              { k: 'B', l: 'легковой авто', active: true },
            ].map(c => (
              <div key={c.k} style={{
                padding: '20px 16px',
                background: c.active ? '#0A0A0A' : 'transparent',
                color: c.active ? 'var(--pr-yellow)' : '#0A0A0A',
                border: c.active ? '1px solid #0A0A0A' : '1px solid rgba(0,0,0,0.2)',
                borderRadius: 14, textAlign: 'left',
              }}>
                <div style={{ fontFamily: 'var(--pr-display)', fontSize: 38 }}>{c.k}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div style={{ marginTop: 24 }}>
          <div className="pr-num" style={{ color: '#3a3a3a', marginBottom: 10 }}>КОРОБКА ПЕРЕДАЧ</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { k: 'AT', l: 'Автомат', active: true },
              { k: 'MT', l: 'Механика' },
            ].map(c => (
              <div key={c.k} style={{
                padding: '16px 14px',
                background: c.active ? '#0A0A0A' : 'transparent',
                color: c.active ? 'var(--pr-yellow)' : '#0A0A0A',
                border: c.active ? '1px solid #0A0A0A' : '1px solid rgba(0,0,0,0.2)',
                borderRadius: 12,
              }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{c.l}</div>
                <div style={{ fontSize: 10, opacity: 0.65, marginTop: 4, fontFamily: 'var(--pr-mono)', letterSpacing: '0.08em' }}>
                  {c.k === 'AT' ? '54 Ч ПРАКТИКИ' : '56 Ч ПРАКТИКИ'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div style={{
          marginTop: 22, padding: '14px 16px', background: '#0A0A0A', color: 'var(--pr-yellow)',
          borderRadius: 12, fontSize: 12, lineHeight: 1.5,
        }}>
          <div className="pr-num" style={{ color: 'var(--pr-yellow)', marginBottom: 4 }}>ПОДСКАЗКА</div>
          <span style={{ color: '#fff' }}>
            Если сомневаетесь — берите автомат. Большинство современных машин такие, и сдавать ГИБДД проще.
          </span>
        </div>

        {/* Sticky bottom */}
        <button className="pr-btn-black" style={{
          width: '100%', marginTop: 28, padding: '18px 0', fontSize: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 22, paddingRight: 22,
        }}>
          <span>Дальше · контакт</span>
          <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </div>
  );
};

window.PrMobileHome = PrMobileHome;
window.PrMobileCourses = PrMobileCourses;
window.PrMobileInstructor = PrMobileInstructor;
window.PrMobileForm = PrMobileForm;

// 5) Reviews mobile — карусель отзывов + photo strip
const PrMobileReviews = () => {
  const reviews = [
    { name: 'Даша Киреева', date: '5 декабря 2024', text: 'Очень коммуникабельный и пунктуальный Лев Александрович! Открывает мир вождения по-новому. Научил всему: ездить по навигатору, заправляться, парковаться!' },
    { name: 'Влада', date: '3 декабря 2024', text: 'Самый лучший и любимый инструктор! Нашла через Авито. Научат здесь всему: от правильной езды до реакции в экстренных ситуациях.' },
    { name: 'Александра', date: '30 ноября 2024', text: 'Профессионал своего дела! Инструктор всё понятно объясняет, с его помощью смогла понять и исправить свои ошибки в вождении.' },
    { name: 'Елизавета', date: '3 ноября 2024', text: 'После двух провальных попыток сдачи экзамена в ГИБДД позанималась со Львом. И сдала экзамен! Занятия проходят в комфортной, дружелюбной атмосфере.' },
  ];
  const photos = [1,2,3,4,5,1,2].map(n => `assets/student_${((n-1)%5)+1}.jpg`);
  return (
    <div className="pr-site" style={{ width: MOBILE_W, minHeight: 844, background: 'var(--pr-black)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px 12px', borderBottom: '1px solid var(--pr-line)',
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,0.08)',
          border: '1px solid var(--pr-line-strong)', color: '#fff', fontSize: 18,
        }}>←</button>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 18, color: '#fff' }}>ОТЗЫВЫ</div>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ padding: '24px 20px 12px' }}>
        <div className="pr-section-tag" style={{ fontSize: 10 }}>[04] КУРСАНТЫ И ОТЗЫВЫ</div>
        <h1 style={{ fontFamily: 'var(--pr-display)', fontSize: 56, lineHeight: 0.88, marginTop: 12, color: '#fff' }}>
          <span style={{ color: 'var(--pr-yellow)' }}>5.0</span> НА АВИТО.<br />
          ПОЧИТАЙ.
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
          <span style={{ color: 'var(--pr-yellow)', fontSize: 16, letterSpacing: 2 }}>★★★★★</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>5.0</span>
          <span style={{ fontSize: 12, color: 'var(--pr-mute)' }}>· 54+ оценок на Авито</span>
        </div>
      </div>

      {/* Photo strip */}
      <div style={{ overflow: 'hidden', padding: '20px 0 24px' }}>
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

      {/* Reviews list */}
      <div style={{ padding: '0 20px 24px', display: 'grid', gap: 12 }}>
        {reviews.map((r, i) => (
          <article key={i} style={{
            padding: '18px 18px 16px',
            background: 'var(--pr-graphite)', border: '1px solid var(--pr-line)',
            borderRadius: 14,
          }}>
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
            <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--pr-mute-2)', margin: 0 }}>{r.text}</p>
          </article>
        ))}
      </div>

      <div style={{ padding: '4px 20px 28px' }}>
        <button className="pr-btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 12 }}>
          Все 54 отзыва на Авито →
        </button>
      </div>
    </div>
  );
};

// 6) FAQ mobile
const PrMobileFaq = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'СКОЛЬКО ВРЕМЕНИ ЗАЙМЁТ ОБУЧЕНИЕ?', a: 'В среднем 3–4 месяца. Это включает теорию (по будням онлайн) и практику (когда удобно вам). Если торопитесь — есть ускоренная программа на 6 недель.' },
    { q: 'А ЕСЛИ Я БОЮСЬ ЕЗДИТЬ?', a: 'Это нормально. Лев работает с курсантами после неудачных попыток в других школах, и психология вождения — его специальность. Никто не кричит и не давит на педаль.' },
    { q: 'МОЖНО ВЕРНУТЬ ДЕНЬГИ?', a: 'Да, в первые 7 дней без вопросов. После — пропорционально неотзанятым часам. Прозрачно, без штрафов и «мелкого шрифта».' },
    { q: 'ЕСТЬ ЛИ РАССРОЧКА?', a: 'Да, 0% на 6 месяцев — оформляем сами на месте, без банков и справок о доходе.' },
    { q: 'ЕСЛИ НЕ СДАМ ГИБДД С ПЕРВОГО РАЗА?', a: 'На тарифе «Премиум» — все попытки бесплатны, мы сопровождаем. На «Базовом» — повторные сборы (350 ₽) и время инструктора (1 600 ₽/час).' },
  ];
  return (
    <div className="pr-site" style={{ width: MOBILE_W, minHeight: 844, background: 'var(--pr-paper)', color: '#0A0A0A' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fff',
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: 999, background: '#0A0A0A', color: '#fff', border: 0, fontSize: 18,
        }}>←</button>
        <div style={{ fontFamily: 'var(--pr-display)', fontSize: 18 }}>ВОПРОСЫ</div>
        <div style={{ width: 38 }} />
      </div>

      <div style={{ padding: '24px 20px 30px' }}>
        <div className="pr-section-tag" style={{ fontSize: 10, color: '#3a3a3a' }}>[05] ВОПРОСЫ</div>
        <h1 style={{ fontFamily: 'var(--pr-display)', fontSize: 52, lineHeight: 0.9, marginTop: 12 }}>
          ЧАСТО<br />СПРАШИВАЮТ.
        </h1>
        <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, color: '#3a3a3a' }}>
          Если вашего вопроса нет — напишите в Telegram, отвечаем в течение 15 минут.
        </p>

        <div style={{ marginTop: 28 }}>
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
                  <span style={{ fontFamily: 'var(--pr-display)', fontSize: 16, color: '#0A0A0A', lineHeight: 1.15 }}>{it.q}</span>
                </span>
                <span style={{
                  width: 32, height: 32, borderRadius: 999, border: '1px solid rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: open === i ? 'var(--pr-yellow)' : 'transparent',
                  fontSize: 18, fontWeight: 300,
                }}>{open === i ? '–' : '+'}</span>
              </button>
              {open === i && (
                <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.5, color: '#3a3a3a' }}>
                  {it.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <button className="pr-btn-black" style={{ marginTop: 24, width: '100%', justifyContent: 'center', padding: '16px 0', fontSize: 13 }}>
          Написать в Telegram
        </button>
      </div>
    </div>
  );
};

// 7) Footer / Contact mobile
const PrMobileFooter = () => (
  <div className="pr-site" style={{ width: MOBILE_W, minHeight: 844, background: 'var(--pr-black)', color: '#fff' }}>
    {/* Top contact CTA */}
    <div style={{ padding: '40px 20px 28px', borderBottom: '1px solid var(--pr-line)' }}>
      <div className="pr-section-tag" style={{ fontSize: 10 }}>[07] КОНТАКТ</div>
      <h1 style={{ fontFamily: 'var(--pr-display)', fontSize: 60, lineHeight: 0.9, marginTop: 14, textTransform: 'uppercase' }}>
        ЕСТЬ<br />
        <span style={{ color: 'var(--pr-yellow)' }}>ВОПРОС?</span>
      </h1>
      <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
        Куратор перезвонит за 15 минут или напишет в мессенджере — выбирайте удобное.
      </p>

      <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
        <button className="pr-btn-yellow" style={{ width: '100%', justifyContent: 'space-between', padding: '18px 22px' }}>
          ☎ +7 (391) 234-56-78 <span style={{ fontSize: 18 }}>→</span>
        </button>
        <button className="pr-btn-ghost" style={{ width: '100%', padding: '14px 22px', fontSize: 13, justifyContent: 'space-between' }}>
          ✈ Telegram · @pridekrsk <span style={{ fontSize: 16 }}>→</span>
        </button>
        <button className="pr-btn-ghost" style={{ width: '100%', padding: '14px 22px', fontSize: 13, justifyContent: 'space-between' }}>
          ⚡ WhatsApp <span style={{ fontSize: 16 }}>→</span>
        </button>
      </div>
    </div>

    {/* Trust strip */}
    <div style={{ overflow: 'hidden', padding: '14px 0', borderBottom: '1px solid var(--pr-line)' }}>
      <div className="pr-marquee-track-fast" style={{ display: 'flex', gap: 28, whiteSpace: 'nowrap' }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--pr-mute-2)' }}>
            ЛИЦЕНЗИЯ № 7167-Л · РОСРЕЕСТР АВТОШКОЛ · ГИБДД РОССИИ · АВИТО · 5.0 ✦
          </span>
        ))}
      </div>
    </div>

    {/* Address */}
    <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid var(--pr-line)' }}>
      <div className="pr-num" style={{ marginBottom: 10 }}>АДРЕС · КРАСНОЯРСК</div>
      <div style={{ fontFamily: 'var(--pr-display)', fontSize: 24, lineHeight: 1.1, marginBottom: 8 }}>
        ул. Карла Маркса, 48<br />
        офис 312
      </div>
      <div style={{ fontSize: 13, color: 'var(--pr-mute-2)', lineHeight: 1.5 }}>
        Пн–Пт: 09:00–20:00 · Сб: 10:00–17:00
      </div>
    </div>

    {/* Footer nav */}
    <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--pr-line)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
        {['Главная', 'Курсы', 'Команда', 'Отзывы', 'Вопросы', 'Запись'].map((l, i) => (
          <a key={i} style={{ fontSize: 14, color: 'var(--pr-mute-2)', textDecoration: 'none' }}>
            {l} <span style={{ color: 'var(--pr-yellow)' }}>→</span>
          </a>
        ))}
      </div>
    </div>

    {/* Bottom mark */}
    <div style={{ padding: '24px 20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <PrLion size={32} color="#E45400" />
        <div>
          <div style={{ fontFamily: 'var(--pr-display)', fontSize: 18 }}>ПРАЙД</div>
          <div className="pr-num" style={{ fontSize: 9 }}>АВТОШКОЛА</div>
        </div>
      </div>
      <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-mute)', letterSpacing: '0.1em' }}>
        © 2025
      </div>
    </div>
  </div>
);

window.PrMobileReviews = PrMobileReviews;
window.PrMobileFaq = PrMobileFaq;
window.PrMobileFooter = PrMobileFooter;
