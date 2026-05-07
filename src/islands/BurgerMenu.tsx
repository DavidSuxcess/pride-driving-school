import { useEffect, useState } from 'react';
import reviews from '../data/reviews.json';

const base = (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL;
const reviewsCount = reviews.length;

const links = [
  { n: '01', t: 'Главная', sub: 'старт', href: '#top' },
  { n: '02', t: 'Курсы', sub: '3 тарифа · от 50 000 ₽', href: '#courses' },
  { n: '03', t: 'Инструкторы', sub: 'команда из 3 человек', href: '#instructors' },
  { n: '04', t: 'Отзывы', sub: `5.0 · ${reviewsCount} на Авито`, href: '#reviews' },
  { n: '05', t: 'Вопросы', sub: 'FAQ · рассрочка · возврат', href: '#faq' },
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

  const close = () => setOpen(false);
  const lionUrl = `${base}/assets/logo.svg`;

  return (
    <div
      className="pr-menu-root"
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'var(--pr-black)', color: '#fff',
        overflow: 'auto',
      }}
    >
      <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
      <div
        className="pr-menu-fade"
        style={{
          position: 'absolute', right: -120, bottom: -80,
          opacity: 0.06, pointerEvents: 'none',
          width: 460, height: 460,
          backgroundImage: `url(${lionUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          animationDelay: '0.15s',
        }}
      />
      <div
        className="pr-tape pr-menu-tape"
        style={{
          position: 'absolute', left: -40, top: 380, width: 240, height: 28,
          animationDelay: '0.2s',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 480, margin: '0 auto' }}>
        <div
          className="pr-menu-fade"
          style={{
            padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid var(--pr-line)',
            animationDelay: '0.05s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={lionUrl} alt="Pride" width={30} height={30} style={{ display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'var(--pr-display)', fontSize: 18, letterSpacing: '0.04em' }}>ПРАЙД</span>
              <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 8, letterSpacing: '0.18em', color: 'var(--pr-mute)', marginTop: 2 }}>
                ШКОЛА ВОЖДЕНИЯ
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть меню"
            style={{
              width: 38, height: 38, borderRadius: 999, background: 'var(--pr-yellow)',
              color: '#0A0A0A', border: 0, fontSize: 20, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >×</button>
        </div>

        <div className="pr-menu-fade" style={{ padding: '24px 20px 10px', animationDelay: '0.12s' }}>
          <div className="pr-section-tag" style={{ fontSize: 10 }}>МЕНЮ · НАВИГАЦИЯ</div>
        </div>

        <nav style={{ padding: '0 20px' }}>
          {links.map((l, i) => (
            <a
              key={l.n}
              href={l.href}
              onClick={close}
              className="pr-menu-item"
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 0',
                borderTop: '1px solid var(--pr-line)',
                color: '#fff',
                animationDelay: `${0.18 + i * 0.06}s`,
                cursor: 'pointer',
              }}
            >
              <span className="pr-num" style={{ fontSize: 10, color: 'var(--pr-mute)', minWidth: 20 }}>{l.n}</span>
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
                border: '1px solid var(--pr-line-strong)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>→</span>
            </a>
          ))}
          <button
            type="button"
            data-pr-enroll-trigger
            onClick={close}
            className="pr-menu-item"
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 0',
              borderTop: '1px solid var(--pr-line)',
              borderBottom: '1px solid var(--pr-line)',
              background: 'transparent',
              color: 'var(--pr-yellow)',
              animationDelay: `${0.18 + links.length * 0.06}s`,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span className="pr-num" style={{ fontSize: 10, color: 'var(--pr-yellow)', minWidth: 20 }}>06</span>
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--pr-display)', fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
                Запись
              </span>
              <span style={{ fontSize: 11, color: 'var(--pr-mute-2)', fontFamily: 'var(--pr-mono)', letterSpacing: '0.06em' }}>
                оставить заявку
              </span>
            </span>
            <span style={{
              width: 32, height: 32, borderRadius: 999,
              border: '1px solid var(--pr-yellow)',
              background: 'var(--pr-yellow)',
              color: '#0A0A0A',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>→</span>
          </button>
        </nav>

        <div className="pr-menu-fade" style={{ padding: '28px 20px 20px', animationDelay: '0.6s' }}>
          <div className="pr-num" style={{ fontSize: 9, marginBottom: 12 }}>СВЯЗАТЬСЯ</div>
          <a
            href="tel:+73912345678"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 18px', background: 'var(--pr-yellow)', color: '#0A0A0A',
              borderRadius: 14, marginBottom: 10,
            }}
          >
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
            <a
              href="#"
              style={{
                padding: '14px 0', textAlign: 'center', borderRadius: 12,
                border: '1px solid var(--pr-line-strong)', fontSize: 13, fontWeight: 600,
              }}
            >✈ Telegram</a>
            <a
              href="#"
              style={{
                padding: '14px 0', textAlign: 'center', borderRadius: 12,
                border: '1px solid var(--pr-line-strong)', fontSize: 13, fontWeight: 600,
              }}
            >⚡ WhatsApp</a>
          </div>
        </div>

        <div
          className="pr-menu-fade"
          style={{ padding: '18px 20px', borderTop: '1px solid var(--pr-line)', animationDelay: '0.7s' }}
        >
          <div className="pr-num" style={{ fontSize: 9, marginBottom: 8 }}>АДРЕС · КРАСНОЯРСК</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
            ул. Ленина, 78 · 660049
          </div>
        </div>

        <div
          className="pr-menu-fade"
          style={{
            padding: '20px 20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid var(--pr-line)', animationDelay: '0.78s',
          }}
        >
          <div className="pr-num" style={{ fontSize: 9 }}>ЛИЦЕНЗИЯ № 7167-Л</div>
          <div className="pr-num" style={{ fontSize: 9 }}>© 2026</div>
        </div>
      </div>
    </div>
  );
}
