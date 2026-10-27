import React, { useState } from 'react';
import { Navigation, Clock, MessageSquare, ThumbsUp, Share2, Camera } from 'lucide-react';
import AppColors from '../../constants/colors';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';
import { Issue } from '../../types';

interface CivicIssueCardProps {
  issue: Issue;
  onSelect?: (issue: Issue) => void;
  onTrack?: (trackingCode: string) => void;
}

export const CivicIssueCard: React.FC<CivicIssueCardProps> = ({
  issue,
  onSelect,
  onTrack,
}) => {
  const { theme, colors } = useTheme();
  const [upvotes, setUpvotes] = useState(issue.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes((v) => v - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((v) => v + 1);
      setHasUpvoted(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = issue.trackingNumber || issue.trackingCode || issue.id;
    if (navigator.share) {
      navigator.share({
        title: issue.title,
        text: `Check civic report ${code}: ${issue.title} on BarodaGo`,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return {
          label: 'IN PROGRESS',
          bg: '#FEF3C7',
          text: '#92400E',
          border: '#FDE68A',
        };
      case 'resolved':
        return {
          label: 'RESOLVED',
          bg: '#D1FAE5',
          text: '#065F46',
          border: '#A7F3D0',
        };
      case 'dispatched':
        return {
          label: 'DISPATCHED',
          bg: '#E0E7FF',
          text: '#3730A3',
          border: '#C7D2FE',
        };
      case 'ai_verified':
        return {
          label: 'VERIFIED',
          bg: '#D1FAE5',
          text: '#065F46',
          border: '#A7F3D0',
        };
      default:
        return {
          label: 'OPEN',
          bg: '#FEE2E2',
          text: '#991B1B',
          border: '#FECACA',
        };
    }
  };

  const badge = getStatusBadge(issue.status);

  return (
    <div
      onClick={() => onSelect?.(issue)}
      className="rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
      style={{
        backgroundColor: colors.surfaceCard,
        border: `1px solid ${colors.borderLight}`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left Column: Pills + Title + Meta */}
        <div className="flex-1 min-w-0">
          {/* Category & Status Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
              style={{ fontFamily: FontFamily.mono, backgroundColor: colors.sand, color: colors.textSecondary }}
            >
              {issue.category.toUpperCase()}
            </span>
            <span
              className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
              style={{
                backgroundColor: badge.bg,
                color: badge.text,
                border: `1px solid ${badge.border}`,
                fontFamily: FontFamily.mono,
              }}
            >
              {badge.label}
            </span>
          </div>

          {/* Issue Title */}
          <h4
            className="text-base font-bold mt-2 line-clamp-2 leading-snug transition-colors"
            style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
          >
            {issue.title}
          </h4>

          {/* Distance & Timestamp */}
          <div
            className="flex items-center gap-3 mt-2 text-xs font-medium"
            style={{ fontFamily: FontFamily.body, color: colors.textMuted }}
          >
            <div className="flex items-center gap-1">
              <Navigation size={13} className="text-neutral-400" />
              <span>{issue.wardName || issue.ward || 'Alkapuri'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={13} className="text-neutral-400" />
              <span>{issue.createdAt || '25 min ago'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Square Photo with Badge */}
        {issue.imageUrl && (
          <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-2xs">
            <img
              src={issue.imageUrl}
              alt={issue.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
              <Camera size={11} />
              <span>{issue.mediaCount || 1}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Row: Me Too (Upvote) + Comments + Share */}
      <div className="flex items-center justify-between mt-3.5 pt-3" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
        <div className="flex items-center gap-2">
          {/* Me Too Button */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
              hasUpvoted
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : ''
            }`}
            style={{
              fontFamily: FontFamily.body,
              cursor: 'pointer',
              backgroundColor: hasUpvoted ? undefined : colors.surfaceSubtle,
              color: hasUpvoted ? undefined : colors.textSecondary,
            }}
          >
            <ThumbsUp size={13} className={hasUpvoted ? 'fill-rose-700' : ''} />
            <span>Me too · {upvotes}</span>
          </button>

          {/* Comments Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(issue);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
            style={{ fontFamily: FontFamily.body, cursor: 'pointer', backgroundColor: colors.surfaceSubtle, color: colors.textSecondary }}
          >
            <MessageSquare size={13} />
            <span>Comments · {issue.commentsCount || 4}</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ cursor: 'pointer', backgroundColor: colors.surfaceSubtle, color: colors.textMuted }}
          aria-label="Share"
        >
          <Share2 size={14} />
        </button>
      </div>
    </div>
  );
};
