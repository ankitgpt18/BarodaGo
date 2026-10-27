import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import AppColors from '../../constants/colors';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

export interface FundingProject {
  id: string;
  title: string;
  description: string;
  verifiedBy: string;
  currentAmount: number;
  targetAmount: number;
  contributorsCount: number;
  contributorInitials: string[];
  suggestedContribution: number;
}

interface FundingCardProps {
  project: FundingProject;
  onContribute?: (projectId: string, amount: number) => void;
}

export const FundingCard: React.FC<FundingCardProps> = ({
  project,
  onContribute,
}) => {
  const { theme, colors } = useTheme();
  const percentage = Math.min(
    100,
    Math.round((project.currentAmount / project.targetAmount) * 100)
  );

  return (
    <div
      className="shrink-0 w-[290px] sm:w-[320px] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
      style={{
        backgroundColor: colors.surfaceCard,
        border: `1px solid ${colors.borderLight}`,
      }}
    >
      <div>
        {/* Verification badge */}
        <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
          <CheckCircle2 size={13} className="text-emerald-700" />
          <span>{project.verifiedBy}</span>
        </div>

        {/* Project Title & Description */}
        <h4
          className="text-base font-bold mt-2.5 line-clamp-1 leading-snug"
          style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
        >
          {project.title}
        </h4>
        <p
          className="text-xs mt-1 line-clamp-1"
          style={{ fontFamily: FontFamily.body, color: colors.textMuted }}
        >
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mt-3.5">
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.sand }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: AppColors.primary,
              }}
            />
          </div>

          <div
            className="flex items-center justify-between mt-2 text-xs font-semibold"
            style={{ fontFamily: FontFamily.mono }}
          >
            <span style={{ color: colors.textPrimary }}>
              ₹{project.currentAmount.toLocaleString('en-IN')} of ₹
              {project.targetAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-emerald-800 font-bold">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Contributors & CTA Button */}
      <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
        {/* Avatar Stack */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {project.contributorInitials.slice(0, 3).map((initial, i) => (
              <span
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white"
                style={{
                  backgroundColor: ['#FEE2E2', '#FEF3C7', '#D1FAE5'][i % 3],
                  color: ['#991B1B', '#92400E', '#065F46'][i % 3],
                  fontFamily: FontFamily.mono,
                }}
              >
                {initial}
              </span>
            ))}
          </div>
          <span
            className="text-[11px] text-neutral-500 font-medium"
            style={{ fontFamily: FontFamily.body }}
          >
            {project.contributorsCount} contributors
          </span>
        </div>

        {/* Contribute Button */}
        <button
          onClick={() => onContribute?.(project.id, project.suggestedContribution)}
          className="px-3 py-1.5 rounded-full text-xs font-bold text-white transition-all active:scale-95 shadow-2xs hover:opacity-95"
          style={{
            backgroundColor: AppColors.secondary,
            fontFamily: FontFamily.body,
            cursor: 'pointer',
          }}
        >
          Contribute ₹{project.suggestedContribution}
        </button>
      </div>
    </div>
  );
};
