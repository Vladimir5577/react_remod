import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CaseCardSlider({ title, area, pkg, duration, desc, imgBefore, imgAfter, href }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(4, Math.min(clientX - rect.left, rect.width - 4));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    updatePosition(e.clientX);
    const onMove = (ev) => updatePosition(ev.clientX);
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [updatePosition]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchStart = (e) => updatePosition(e.touches[0].clientX);
    const onTouchMove = (e) => { e.preventDefault(); updatePosition(e.touches[0].clientX); };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [updatePosition]);

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-bg overflow-hidden hover:border-border-strong hover-lift transition-all">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden select-none cursor-col-resize"
        onMouseDown={onMouseDown}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label="Слайдер до/после"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => Math.max(4, p - 3));
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(96, p + 3));
        }}
      >
        <div className="absolute inset-0">
          <img src={imgAfter} alt={`После ремонта — ${title}`} className="w-full h-full object-cover pointer-events-none" />
          <span className="absolute bottom-2 right-2 z-10 text-caption font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">После</span>
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={imgBefore} alt={`До ремонта — ${title}`} className="w-full h-full object-cover pointer-events-none" />
          <span className="absolute bottom-2 left-2 z-10 text-caption font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">До</span>
        </div>
        <div
          className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)]" />
          <div className="absolute w-8 h-8 rounded-full bg-white shadow-elevated flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 3L1 7L4 11M10 3L13 7L10 11" stroke="#0D0C0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <Link to={href} className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-body font-semibold text-ink">{title}</h3>
          <span className="text-caption text-ink-faint shrink-0 mt-0.5">{duration}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-caption font-medium px-2.5 py-1 bg-bg-secondary border border-border rounded-pill text-ink-muted">{area}</span>
          <span className="text-caption font-medium px-2.5 py-1 bg-bg-secondary border border-border rounded-pill text-ink-muted">{pkg}</span>
        </div>
        <p className="text-body-sm text-ink-muted leading-relaxed">{desc}</p>
        <div className="mt-auto pt-3 flex items-center gap-1.5 text-body-sm font-semibold text-ink group-hover:gap-2.5 transition-all">
          Хочу так же
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
