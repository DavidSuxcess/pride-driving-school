/* global React, PrLion */
// ─────────────────────────────────────────────────────────────
// Before / After — слайдер сравнения старого Hero и нового
// Перетаскиваемый делитель: слева — старый сайт (упрощённый рендер),
// справа — новый. Это сердце презентации редизайна.
// ─────────────────────────────────────────────────────────────

const PrBeforeAfter = () => {
  const [pos, setPos] = React.useState(50);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);

  const onMove = (clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  React.useEffect(() => {
    const move = (e) => { if (dragging.current) onMove(e.clientX); };
    const up = () => { dragging.current = false; document.body.style.userSelect = ''; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  const start = (e) => { dragging.current = true; document.body.style.userSelect = 'none'; e.preventDefault(); };

  return (
    <div style={{ width: 1440, height: 900, position: 'relative', background: '#0A0A0A', overflow: 'hidden' }} ref={ref}>
      {/* === BEFORE (left, full layer) === */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <PrOldSite />
      </div>

      {/* === AFTER (right, clipped) === */}
      <div style={{
        position: 'absolute', inset: 0,
        clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`,
      }}>
        <PrNewSite />
      </div>

      {/* Divider line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2,
        background: '#E45400', transform: 'translateX(-1px)', zIndex: 10,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.4), 0 0 30px rgba(228,84,0,0.5)',
      }} />

      {/* Drag handle */}
      <button onMouseDown={start} style={{
        position: 'absolute', top: '50%', left: `${pos}%`, transform: 'translate(-50%, -50%)', zIndex: 11,
        width: 70, height: 70, borderRadius: 999, background: '#E45400',
        border: '3px solid #0A0A0A', cursor: 'ew-resize',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        fontFamily: 'var(--pr-display)', fontSize: 18, color: '#0A0A0A', letterSpacing: '0.04em',
      }}>
        ⇆
      </button>

      {/* Labels */}
      <div style={{
        position: 'absolute', top: 24, left: 24, zIndex: 12,
        fontFamily: 'var(--pr-mono)', fontSize: 11, letterSpacing: '0.2em',
        color: '#fff', background: 'rgba(0,0,0,0.7)', padding: '8px 14px', borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
      }}>
        ← БЫЛО · ТЕКУЩИЙ САЙТ
      </div>
      <div style={{
        position: 'absolute', top: 24, right: 24, zIndex: 12,
        fontFamily: 'var(--pr-mono)', fontSize: 11, letterSpacing: '0.2em',
        color: '#0A0A0A', background: '#E45400', padding: '8px 14px', borderRadius: 999,
      }}>
        СТАЛО · РЕДИЗАЙН →
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 12,
        color: '#fff', fontFamily: 'var(--pr-mono)', fontSize: 11, letterSpacing: '0.16em',
        background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
      }}>
        ⇆ ПОТЯНИТЕ ОРАНЖЕВЫЙ КРУГ
      </div>
    </div>
  );
};

// ── Old site (упрощённое воссоздание текущего hero) ───────────
const PrOldSite = () => (
  <div style={{ width: '100%', height: '100%', background: '#050505', color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflow: 'hidden' }}>
    {/* Header */}
    <div style={{
      height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.9)',
    }}>
      <div style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <span>Курсы</span>
        <span>Инструкторы</span>
      </div>
      <PrLion size={48} color="#e45400" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Отзывы</span>
        <div style={{
          padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 800,
          background: 'linear-gradient(to right, #f97316, #dc2626)', color: '#fff',
        }}>
          📞 +7 (999) 123-45-67
        </div>
      </div>
    </div>

    {/* Hero with dot pattern */}
    <div style={{
      height: 'calc(100% - 80px)',
      background: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      padding: '120px 64px 0',
      position: 'relative',
    }}>
      {/* Lion ghost on right */}
      <div style={{
        position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
        opacity: 0.32, pointerEvents: 'none',
      }}>
        <PrLion size={620} color="#e45400" />
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 56, fontWeight: 800, color: '#e45400', letterSpacing: '0.04em', maxWidth: 720,
      }}>
        Школа вождения
      </div>

      {/* Main title */}
      <div style={{
        fontFamily: 'Russo One, system-ui, sans-serif', fontSize: 156, lineHeight: 1, letterSpacing: '0.04em',
        textTransform: 'uppercase', marginTop: 24,
        textShadow: '0 8px 30px rgba(0,0,0,0.4)',
      }}>
        ПРАЙД
      </div>

      {/* Tagline */}
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 28, opacity: 0.9 }}>
        Мастерство начинается здесь!
      </div>

      {/* CTA — orange gradient pill */}
      <div style={{
        marginTop: 52, display: 'inline-block',
        padding: '20px 36px', borderRadius: 999,
        background: '#e45400', color: '#fff', fontSize: 18, fontWeight: 800,
        boxShadow: '0 0 30px rgba(228,84,0,0.4)',
      }}>
        Записаться на курс
      </div>
    </div>
  </div>
);

// ── New site (упрощённый Hero — только верх для сравнения) ────
const PrNewSite = () => (
  <div style={{ width: '100%', height: '100%', background: 'var(--pr-black)', color: '#fff', position: 'relative', overflow: 'hidden' }}
       className="pr-site">
    {/* Header */}
    <div style={{
      height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', borderBottom: '1px solid var(--pr-line)',
      background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(14px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <PrLion size={36} color="#E45400" />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'var(--pr-display)', fontSize: 22, letterSpacing: '0.04em' }}>ПРАЙД</span>
          <span style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--pr-mute)', marginTop: 3 }}>
            ШКОЛА ВОЖДЕНИЯ
          </span>
        </div>
      </div>
      <nav style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 600 }}>
        <span>Курсы</span><span>Инструкторы</span><span>Отзывы</span><span>Вопросы</span>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, color: 'var(--pr-mute)', letterSpacing: '0.16em' }}>ОТКРЫТО · ДО 21:00</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>+7 (391) 234-56-78</div>
        </div>
        <button className="pr-btn-yellow" style={{ padding: '10px 18px', fontSize: 11 }}>Записаться →</button>
      </div>
    </div>

    {/* Hero */}
    <div style={{ position: 'relative', padding: '90px 40px 0', height: 'calc(100% - 80px)' }}>
      <div className="pr-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div style={{
        position: 'absolute', right: -100, top: 50, width: 380, height: 60,
        transform: 'rotate(-8deg)',
      }} className="pr-tape" />
      <div style={{
        position: 'absolute', right: -50, top: 130, width: 220, height: 28,
        transform: 'rotate(-8deg)',
      }} className="pr-tape-thin" />
      <div style={{ position: 'absolute', right: -40, top: 180, opacity: 0.07 }}>
        <PrLion size={620} color="#E45400" />
      </div>

      <div style={{ position: 'relative' }}>
        <span className="pr-stamp" style={{ color: 'var(--pr-yellow)' }}>
          <span className="pr-blink" style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--pr-yellow)' }} />
          НАБОР НА ЯНВАРЬ — ОСТАЛОСЬ 7 МЕСТ
        </span>
        <h1 style={{
          fontFamily: 'var(--pr-display)', fontSize: 168, lineHeight: 0.85, letterSpacing: '-0.01em',
          textTransform: 'uppercase', marginTop: 30,
        }}>
          ВОДИ<br />
          <span style={{ color: 'var(--pr-yellow)' }}>УВЕРЕННО.</span>
        </h1>
        <p style={{ marginTop: 28, fontSize: 22, lineHeight: 1.4, maxWidth: 480, color: 'var(--pr-mute-2)' }}>
          Не «сдай экзамен», а реально <span className="pr-mark">научись водить</span>.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
          <button className="pr-btn-yellow" style={{ padding: '18px 28px' }}>Записаться на курс →</button>
          <button className="pr-btn-ghost" style={{ padding: '16px 22px', fontSize: 13 }}>▶ Как проходит занятие</button>
        </div>
      </div>
    </div>
  </div>
);

window.PrBeforeAfter = PrBeforeAfter;
