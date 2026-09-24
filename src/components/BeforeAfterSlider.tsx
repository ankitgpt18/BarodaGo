import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, MapPin, Calendar, HardHat } from 'lucide-react';

interface BeforeAfterSliderProps {
  title?: string;
  location?: string;
  ward?: string;
  beforeImg?: string;
  afterImg?: string;
  beforeDate?: string;
  afterDate?: string;
  contractor?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  title = 'RC Dutt Road Pothole Crater Patching (Near Chakli Circle)',
  location = '120m West of Inox Cinema, Alkapuri',
  ward = 'Ward 1 (West Zone)',
  beforeImg = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
  afterImg = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  beforeDate = 'Sep 21, 2026',
  afterDate = 'Sep 23, 2026',
  contractor = 'VMC Ward 1 Rapid Bitumen Squad'
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#0F141F] p-4 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 rounded bg-emerald-950/80 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800/80">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Civic Resolution</span>
            </span>
            <span className="text-xs font-mono text-neutral-400">
              Before / After Audit
            </span>
          </div>
          <h3 className="mt-1 font-bold text-base sm:text-lg text-white">
            {title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 text-orange-400" />
              <span>{location} • {ward}</span>
            </span>
            <span className="flex items-center space-x-1">
              <HardHat className="h-3 w-3 text-amber-400" />
              <span>{contractor}</span>
            </span>
          </div>
        </div>

        <div className="text-xs text-neutral-400 font-mono self-start sm:self-auto bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
          Slide bar left ↔ right to inspect
        </div>
      </div>

      {/* Interactive slider container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-64 sm:h-96 w-full select-none overflow-hidden rounded-xl bg-neutral-950 cursor-ew-resize border border-neutral-700/80"
      >
        {/* AFTER Image (Full background) */}
        <img
          src={afterImg}
          alt="After resolution"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImg}
            alt="Before condition"
            className="absolute inset-0 h-full w-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Divider line & handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border-2 border-white shadow-xl text-white">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 9l-4 3 4 3m8-6l4 3-4 3"
              />
            </svg>
          </div>
        </div>

        {/* BEFORE Badge */}
        <div className="absolute top-3 left-3 rounded-lg bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-rose-300 border border-rose-900/60 shadow">
          <div className="flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span>BEFORE ({beforeDate})</span>
          </div>
        </div>

        {/* AFTER Badge */}
        <div className="absolute top-3 right-3 rounded-lg bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-900/60 shadow">
          <div className="flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>AFTER ({afterDate})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
