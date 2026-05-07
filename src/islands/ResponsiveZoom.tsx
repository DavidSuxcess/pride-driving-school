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
