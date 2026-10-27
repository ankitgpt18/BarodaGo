import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  MessageSquare, 
  Check, 
  ArrowRight,
  Send
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';
import { Issue } from '../../types';

interface IssueDetailModalProps {
  issue: Issue | null;
  onClose: () => void;
  onTrack?: (code: string) => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  issue,
  onClose,
  onTrack,
}) => {
  const { theme, colors } = useTheme();
  const [upvotes, setUpvotes] = useState(issue?.upvotes || 18);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    {
      author: 'Sneha M.',
      time: '12m ago',
      text: 'Saw an Activa rider almost tumble here at 10 AM. Glad this was logged promptly. Please fix before evening school pickup!',
    },
    {
      author: 'Kunal Patel',
      time: '45m ago',
      text: 'Ward 9 asphalt mixer vehicle was spotted nearby on RC Dutt Road. Hope they address this directly today.',
    },
  ]);

  if (!issue) return null;

  const code = issue.trackingNumber || issue.trackingCode || issue.id;
  const ward = issue.wardName || issue.ward || 'Alkapuri, Ward 9';

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((v) => v - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((v) => v + 1);
      setHasUpvoted(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      {
        author: 'You (Ankit)',
        time: 'Just now',
        text: commentInput.trim(),
      },
      ...comments,
    ]);
    setCommentInput('');
  };

  return (
    <div className="absolute inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end justify-center select-none animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl min-h-screen sm:min-h-0 sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-colors duration-200"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        {/* Sticky Header */}
        <header
          className="sticky top-0 z-20 px-4 py-3 border-b flex items-center justify-between transition-colors"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.borderLight,
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{
                cursor: 'pointer',
                border: `1px solid ${colors.borderLight}`,
                backgroundColor: colors.sand,
                color: colors.textPrimary,
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <h2
              className="text-base font-bold transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Public Issue Detail
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: issue.title,
                    text: `Issue #${code}: ${issue.title} on BarodaGo`,
                    url: window.location.href,
                  }).catch(() => {});
                }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{
                cursor: 'pointer',
                border: `1px solid ${colors.borderLight}`,
                backgroundColor: colors.sand,
                color: colors.textPrimary,
              }}
              title="Share"
            >
              <Share2 size={15} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Top Identifier & Status Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded-md text-xs font-black"
                style={{
                  fontFamily: FontFamily.mono,
                  backgroundColor: colors.sand,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.borderLight}`,
                }}
              >
                #{code}
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{
                  fontFamily: FontFamily.mono,
                  backgroundColor: theme === 'dark' ? '#2F230D' : '#FEF3C7',
                  color: theme === 'dark' ? '#FBBF24' : '#B45309',
                  border: `1px solid ${theme === 'dark' ? '#785A17' : '#FCD34D'}`,
                }}
              >
                • IN PROGRESS
              </span>
            </div>
            <span
              className="text-xs font-semibold"
              style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
            >
              {ward}
            </span>
          </div>

          {/* Photo Preview */}
          <div
            className="relative rounded-3xl overflow-hidden aspect-16/10 shadow-xs"
            style={{
              backgroundColor: colors.sand,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            <img
              src={issue.imageUrl}
              alt={issue.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>VMC Roads & Bridges Dept</span>
            </div>
          </div>

          {/* Title & Author */}
          <div>
            <h1
              className="text-xl sm:text-2xl font-extrabold leading-tight transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              {issue.title}
            </h1>
            <p
              className="text-xs mt-1 flex items-center gap-2 font-medium transition-colors"
              style={{ color: colors.textSecondary }}
            >
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>Reported {issue.createdAt || '25 min ago'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{ward}</span>
              </span>
            </p>
          </div>

          {/* Description Block */}
          <div
            className="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed transition-colors"
            style={{
              backgroundColor: colors.surfaceCard,
              border: `1px solid ${colors.borderLight}`,
              color: colors.textPrimary,
            }}
          >
            {issue.description ||
              'Roughly 2.5 feet wide cavity formed after monsoon shower right where vehicles turn toward Vadodara Central. Loose gravel on edges is causing two-wheelers to skid during peak morning rush.'}
          </div>

          {/* Me Too & WhatsApp Share Row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleUpvote}
              className="p-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                cursor: 'pointer',
                backgroundColor: hasUpvoted ? (theme === 'dark' ? '#3B1A17' : '#FFE4E6') : colors.surfaceCard,
                border: `1px solid ${hasUpvoted ? (theme === 'dark' ? '#7A271A' : '#FECDD3') : colors.borderLight}`,
                color: hasUpvoted ? colors.secondaryBright : colors.textPrimary,
              }}
            >
              <ThumbsUp size={16} className={hasUpvoted ? 'fill-current' : ''} />
              <div className="text-left">
                <div className="text-xs font-bold leading-tight">Me too ({upvotes})</div>
                <div className="text-[10px]" style={{ color: colors.textSecondary }}>Confirmed near you</div>
              </div>
            </button>

            <button
              onClick={() => {
                const text = encodeURIComponent(
                  `Check this civic issue in Vadodara: ${issue.title} (${code}) on BarodaGo`
                );
                window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
              }}
              className="p-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                cursor: 'pointer',
                backgroundColor: theme === 'dark' ? '#112F1E' : '#E8F5E9',
                border: `1px solid ${theme === 'dark' ? '#1D5A38' : '#C8E6C9'}`,
                color: theme === 'dark' ? '#4ADE80' : '#2E7D32',
              }}
            >
              <Share2 size={16} />
              <div className="text-left">
                <div className="text-xs font-bold leading-tight">WhatsApp</div>
                <div className="text-[10px]" style={{ color: theme === 'dark' ? '#86EFAC' : '#388E3C' }}>
                  Share to ward group
                </div>
              </div>
            </button>
          </div>

          {/* Resolution Stepper */}
          <div
            className="p-4 rounded-2xl space-y-3 transition-colors"
            style={{
              backgroundColor: colors.surfaceCard,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            <div className="flex items-center justify-between">
              <h4
                className="text-xs font-black uppercase tracking-widest"
                style={{ fontFamily: FontFamily.mono, color: colors.textPrimary }}
              >
                RESOLUTION PROGRESS
              </h4>
              <span
                className="text-[11px] font-bold text-emerald-500"
                style={{ fontFamily: FontFamily.mono }}
              >
                SLA: 24h
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <div>
                  <span className="font-bold" style={{ color: colors.textPrimary }}>Received & Logged</span>
                  <p className="text-[11px]" style={{ color: colors.textSecondary }}>Automated ticket registered via Sayaji Civic Portal.</p>
                </div>
                <span className="text-[10px] font-mono ml-auto" style={{ color: colors.textSecondary }}>10:14 AM</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div>
                  <span className="font-bold" style={{ color: colors.textPrimary }}>Verified & Assigned</span>
                  <p className="text-[11px]" style={{ color: colors.textSecondary }}>Assigned to Ward 9 Road Maintenance Crew (Supervisor: V. Solanki).</p>
                </div>
                <span className="text-[10px] font-mono ml-auto" style={{ color: colors.textSecondary }}>10:32 AM</span>
              </div>
            </div>
          </div>

          {/* Community Comments Section */}
          <div
            className="p-4 rounded-2xl space-y-3 transition-colors"
            style={{
              backgroundColor: colors.surfaceCard,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} style={{ color: colors.textSecondary }} />
                <h4
                  className="text-sm font-bold transition-colors"
                  style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                >
                  Community Voices ({comments.length})
                </h4>
              </div>
            </div>

            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add citizen observation or update..."
                className="flex-1 px-3 py-2 rounded-xl text-xs outline-none transition-colors"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.borderLight}`,
                  color: colors.textPrimary,
                }}
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl text-white text-xs font-bold active:scale-95 transition-all"
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: colors.primary,
                }}
              >
                <Send size={13} />
              </button>
            </form>

            <div className="space-y-2.5 pt-1">
              {comments.map((comm, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl space-y-1 transition-colors"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.borderLight}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: colors.textPrimary }}>{comm.author}</span>
                    <span className="text-[10px] font-mono" style={{ color: colors.textSecondary }}>{comm.time}</span>
                  </div>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>{comm.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div
          className="sticky bottom-0 p-4 border-t flex items-center gap-3 transition-colors"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.borderLight,
          }}
        >
          <button
            onClick={() => {
              onClose();
              onTrack?.(code);
            }}
            className="flex-1 py-3 rounded-full text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
            style={{
              cursor: 'pointer',
              border: 'none',
              fontFamily: FontFamily.body,
              backgroundColor: colors.primary,
            }}
          >
            <span>Live Dispatch Tracking</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
