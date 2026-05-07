import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

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
