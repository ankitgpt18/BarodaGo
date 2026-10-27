import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import AppColors from '../../constants/colors';
import { FontFamily } from '../../constants/typography';

interface AreaScoreCardProps {
  wardName?: string;
  score?: number;
  total?: number;
  delta?: string;
  rank?: number;
  totalWards?: number;
  onViewScorecard?: () => void;
}

export const AreaScoreCard: React.FC<AreaScoreCardProps> = ({
  wardName = 'WARD 9',
  score = 72,
  total = 100,
  delta = '+4 this week',
  rank = 3,
  totalWards = 19,
  onViewScorecard,
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5 text-white shadow-md transition-transform active:scale-[0.99]"
      style={{
        background: 'linear-gradient(135deg, #E24832 0%, #D83120 45%, #C22212 100%)',
        boxShadow: '0 10px 25px -5px rgba(216, 49, 32, 0.35)',
      }}
    >
      {/* Decorative background subtle seal pattern */}
      <div
        className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full opacity-10 pointer-events-none"
        style={{
          border: '18px solid #FFFFFF',
        }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          {/* Label */}
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-extrabold tracking-widest text-white/80 uppercase"
              style={{ fontFamily: FontFamily.mono }}
            >
              AREA SCORE · {wardName}
            </span>
          </div>

          {/* Big Score Numbers */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span
              className="text-4xl sm:text-5xl font-black tracking-tight leading-none"
              style={{ fontFamily: FontFamily.display }}
            >
              {score}
            </span>
            <span
              className="text-xl sm:text-2xl font-bold text-white/75"
              style={{ fontFamily: FontFamily.display }}
            >
              /{total}
            </span>
            <span
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs text-white"
              style={{ fontFamily: FontFamily.mono }}
            >
              {delta}
            </span>
          </div>

          {/* Rank status */}
          <p
            className="text-xs sm:text-sm font-medium text-white/90 mt-1"
            style={{ fontFamily: FontFamily.body }}
          >
            Rank #{rank} of {totalWards} wards
          </p>

          {/* Action Button */}
          <div className="mt-4">
            <button
              onClick={onViewScorecard}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#D83120] hover:bg-neutral-50 active:scale-95 transition-all shadow-sm"
              style={{ fontFamily: FontFamily.body, cursor: 'pointer' }}
            >
              <span>View scorecard</span>
              <ArrowRight size={14} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        {/* Circular Radial Graphic / Star */}
        <div className="relative flex flex-col items-center">
          <div className="w-18 h-18 rounded-full border-4 border-white/25 flex items-center justify-center p-2 relative shadow-inner">
            <div
              className="absolute inset-0 rounded-full border-4 border-white border-t-transparent"
              style={{ transform: 'rotate(45deg)' }}
            />
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
              <Star size={22} className="text-white fill-white" />
            </div>
          </div>
          <span
            className="text-[9px] font-bold tracking-wider text-white/70 uppercase mt-2"
            style={{ fontFamily: FontFamily.mono }}
          >
            VMC SAYAJI INDEX
          </span>
        </div>
      </div>
    </div>
  );
};
