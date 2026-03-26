import { useState, useRef, useCallback, useEffect } from 'react';

export default function BeforeAfterSlider({
  imgBefore,
  imgAfter,
  altBefore = 'До ремонта',
  altAfter = 'После ремонта',
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2));
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
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl select-none cursor-col-resize"
      onMouseDown={onMouseDown}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="Слайдер до/после"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPosition((p) => Math.max(2, p - 2));
        if (e.key === 'ArrowRight') setPosition((p) => Math.min(98, p + 2));
      }}
    >
      <div className="absolute inset-0">
        <img src={imgAfter} alt={altAfter} className="w-full h-full object-cover pointer-events-none" />
        <span className="absolute bottom-4 right-4 z-10 text-caption font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-pill">После</span>
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={imgBefore} alt={altBefore} className="w-full h-full object-cover pointer-events-none" />
        <span className="absolute bottom-4 left-4 z-10 text-caption font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-pill">До</span>
      </div>

      <div
        className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-0.5 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
        <div className="absolute w-10 h-10 rounded-full bg-white shadow-elevated flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 4L2 8L5 12M11 4L14 8L11 12" stroke="#0D0C0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
