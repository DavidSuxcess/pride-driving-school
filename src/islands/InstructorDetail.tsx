import { useEffect, useRef, useState } from 'react';
import instructors from '../data/instructors.json';

const base = (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL;

export default function InstructorDetail() {
  const [idx, setIdx] = useState<number | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!window.matchMedia('(max-width: 767px)').matches) return;
      const card = (e.target as HTMLElement)?.closest<HTMLElement>('[data-pr-instructor-card]');
      if (!card) return;
      const i = Number(card.getAttribute('data-idx'));
      if (Number.isNaN(i) || i < 0 || i >= instructors.length) return;
      e.preventDefault();
      scrollYRef.current = window.scrollY;
      setIdx(i);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (idx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [idx]);

  const close = () => {
    const y = scrollYRef.current;
    setIdx(null);
    requestAnimationFrame(() => window.scrollTo(0, y));
  };

  if (idx === null) return null;
  const inst = instructors[idx];
  const dativeName = inst.name === 'ЛЕВ' ? 'Льву' : 'Дмитрию';

  const openEnroll = () => {
    close();
    setTimeout(() => {
      const trigger = document.querySelector<HTMLElement>('[data-pr-enroll-trigger]');
      if (trigger) trigger.click();
    }, 60);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 8500,
        background: 'var(--pr-black)',
        overflowY: 'auto',
      }}
    >
      <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          className="pr-prof-photo"
          src={`${base}/assets/${inst.img}`}
          alt={inst.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute', top: 14, left: 14, right: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Назад"
            style={{
              width: 38, height: 38, borderRadius: 999, background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 18,
              cursor: 'pointer',
            }}
          >←</button>
          <span
            className="pr-stamp"
            style={{
              color: '#fff', background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)', fontSize: 9, padding: '4px 10px',
            }}
          >{inst.tag}</span>
        </div>
        <div
          className="pr-prof-num"
          style={{
            position: 'absolute', right: 16, top: 70, fontSize: 100,
            fontFamily: 'var(--pr-display)', color: '#fff',
            lineHeight: 0.9, letterSpacing: '-0.04em',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            animationDelay: '0.25s',
          }}
        >0{idx + 1}</div>
        <div
          className="pr-prof-rise"
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '60px 20px 22px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.92))',
            animationDelay: '0.35s',
          }}
        >
          <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 10, color: 'var(--pr-yellow)', letterSpacing: '0.18em' }}>
            {inst.surname}
          </div>
          <div style={{ fontFamily: 'var(--pr-display)', fontSize: 64, lineHeight: 0.9, color: '#fff', marginTop: 4 }}>
            {inst.name}
          </div>
        </div>
      </div>

      <div
        className="pr-prof-rise"
        style={{ display: 'flex', borderBottom: '1px solid var(--pr-line)', animationDelay: '0.5s' }}
      >
        {inst.statsBig.map((s, i) => (
          <div
            key={s.l}
            style={{
              flex: 1, padding: '20px 12px', textAlign: 'center',
              borderRight: i < inst.statsBig.length - 1 ? '1px solid var(--pr-line)' : 'none',
            }}
          >
            <div style={{ fontFamily: 'var(--pr-display)', fontSize: 28, color: 'var(--pr-yellow)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--pr-mono)', fontSize: 9, color: 'var(--pr-mute-2)', letterSpacing: '0.1em', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="pr-prof-rise" style={{ padding: '28px 20px 8px', animationDelay: '0.6s' }}>
        <div
          style={{
            fontSize: 18, lineHeight: 1.4, color: '#fff',
            borderLeft: '2px solid var(--pr-yellow)', paddingLeft: 16, fontStyle: 'italic',
          }}
        >«{inst.quote}»</div>
      </div>

      <div className="pr-prof-rise" style={{ padding: '24px 20px 0', animationDelay: '0.7s' }}>
        <div className="pr-num" style={{ marginBottom: 14 }}>ПОДХОД</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
          {inst.approach.map((s) => (
            <li key={s} style={{ display: 'flex', gap: 12, fontSize: 14, lineHeight: 1.5, color: 'var(--pr-mute-2)' }}>
              <span style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: 2, background: 'var(--pr-yellow)' }} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="pr-prof-rise" style={{ padding: '32px 20px 40px', animationDelay: '0.8s' }}>
        <button
          type="button"
          onClick={openEnroll}
          className="pr-btn-yellow"
          style={{ width: '100%', justifyContent: 'center', padding: '18px 0', cursor: 'pointer' }}
        >
          Записаться к {dativeName} <span style={{ fontSize: 18 }}>→</span>
        </button>
        <a
          href="tel:+73912345678"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 18px', background: 'var(--pr-yellow)', color: '#0A0A0A',
            borderRadius: 14, marginTop: 10, textDecoration: 'none',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>☎</span>
            <span style={{ fontWeight: 800, fontSize: 15 }}>+7 (391) 234-56-78</span>
          </span>
          <span style={{ fontSize: 18 }}>→</span>
        </a>
      </div>
    </div>
  );
}
