/* global React, PrLion */
// Pride · Mobile · открытое бургер-меню (overlay)

const PrMobileMenu = ({ onClose } = {}) => {
  const close = onClose || (() => {});
  const links = [
    { n: '01', t: 'Главная', sub: 'старт', href: '#top' },
    { n: '02', t: 'Курсы', sub: '3 тарифа · от 50 000 ₽', href: '#ms-courses' },
    { n: '03', t: 'Инструкторы', sub: 'команда из 3 человек', href: '#ms-instructors' },
    { n: '04', t: 'Отзывы', sub: '5.0 · 54+ на Авито', href: '#ms-reviews' },
    { n: '05', t: 'Вопросы', sub: 'FAQ · рассрочка · возврат', href: '#ms-faq' },
    { n: '06', t: 'Запись', sub: 'оставить заявку', href: '#ms-enroll' },
  ];
  return (
    <div className="pr-site" style={{
      width: 390, minHeight: 844, background: 'var(--pr-black)',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid bg */}
      <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      {/* Lion ghost */}
      <div style={{ position: 'absolute', right: -120, bottom: -80, opacity: 0.06, pointerEvents: 'none' }}>
        <PrLion size={460} color="#E45400" />
      </div>
      {/* Diagonal tape */}
      <div className="pr-tape" style={{
        position: 'absolute', left: -40, top: 380, width: 240, height: 28,
        transform: 'rotate(-8deg)', opacity: 0.9,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <div style={{
          padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--pr-line)',
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
          {/* Close */}
          <button onClick={close} aria-label="Закрыть меню" style={{
            width: 38, height: 38, borderRadius: 999, background: 'var(--pr-yellow)',
            color: '#0A0A0A', border: 0, fontSize: 20, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>×</button>
        </div>

        {/* Section tag */}
        <div style={{ padding: '24px 20px 10px' }}>
          <div className="pr-section-tag" style={{ fontSize: 10 }}>МЕНЮ · НАВИГАЦИЯ</div>
        </div>

        {/* Big nav links */}
        <nav style={{ padding: '0 20px' }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} onClick={close} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 0',
              borderTop: '1px solid var(--pr-line)',
              borderBottom: i === links.length - 1 ? '1px solid var(--pr-line)' : 'none',
              color: l.active ? 'var(--pr-yellow)' : '#fff',
              cursor: 'pointer',
            }}>
              <span className="pr-num" style={{ fontSize: 10, color: l.active ? 'var(--pr-yellow)' : 'var(--pr-mute)', minWidth: 20 }}>
                {l.n}
              </span>
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'var(--pr-display)', fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
                  {l.t}
                </span>
                <span style={{ fontSize: 11, color: 'var(--pr-mute-2)', fontFamily: 'var(--pr-mono)', letterSpacing: '0.06em' }}>
                  {l.sub}
                </span>
              </span>
              <span style={{
                width: 32, height: 32, borderRadius: 999,
                border: l.active ? '1px solid var(--pr-yellow)' : '1px solid var(--pr-line-strong)',
                background: l.active ? 'var(--pr-yellow)' : 'transparent',
                color: l.active ? '#0A0A0A' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>→</span>
            </a>
          ))}
        </nav>

        {/* Contact block */}
        <div style={{ padding: '28px 20px 20px' }}>
          <div className="pr-num" style={{ fontSize: 9, marginBottom: 12 }}>СВЯЗАТЬСЯ</div>
          <a style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 18px', background: 'var(--pr-yellow)', color: '#0A0A0A',
            borderRadius: 14, marginBottom: 10,
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <a style={{
              padding: '14px 0', textAlign: 'center', borderRadius: 12,
              border: '1px solid var(--pr-line-strong)', fontSize: 13, fontWeight: 600,
            }}>✈ Telegram</a>
            <a style={{
              padding: '14px 0', textAlign: 'center', borderRadius: 12,
              border: '1px solid var(--pr-line-strong)', fontSize: 13, fontWeight: 600,
            }}>⚡ WhatsApp</a>
          </div>
        </div>

        {/* Address */}
        <div style={{ padding: '18px 20px', borderTop: '1px solid var(--pr-line)' }}>
          <div className="pr-num" style={{ fontSize: 9, marginBottom: 8 }}>АДРЕС · КРАСНОЯРСК</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
            ул. Ленина, 78 · 660049
          </div>
        </div>

        {/* Footer mark */}
        <div style={{
          padding: '20px 20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid var(--pr-line)',
        }}>
          <div className="pr-num" style={{ fontSize: 9 }}>ЛИЦЕНЗИЯ № 7167-Л</div>
          <div className="pr-num" style={{ fontSize: 9 }}>© 2026</div>
        </div>
      </div>
    </div>
  );
};

window.PrMobileMenu = PrMobileMenu;
