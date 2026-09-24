import React from 'react';
import {
  MapPin,
  Clock,
  ThumbsUp,
  Users,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  User
} from 'lucide-react';
import { Issue } from '../types';
import { CATEGORY_DETAILS } from '../data/mockData';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

interface IssueCardProps {
  issue: Issue;
  onOpenDetails: (issue: Issue) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onOpenDetails }) => {
  const { toggleUpvote, corroborateIssue } = useCivicData();
  const categoryInfo = CATEGORY_DETAILS[issue.category] || {
    label: issue.category,
    color: '#F97316'
  };

  const getStatusBadge = () => {
    switch (issue.status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-emerald-950/70 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-800/60">
            <ShieldCheck className="h-3 w-3 mr-0.5" />
            <span>Resolved</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-amber-950/70 px-2 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-800/60">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse mr-0.5" />
            <span>On-Site Crew</span>
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-sky-950/70 px-2 py-0.5 text-[11px] font-semibold text-sky-300 border border-sky-800/60">
            <span>Dispatched</span>
          </span>
        );
      case 'ai_verified':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-cyan-950/80 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 border border-cyan-700/60">
            <Sparkles className="h-2.5 w-2.5 mr-0.5" />
            <span>AI Verified</span>
          </span>
        );
      case 'reported':
      default:
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-neutral-300 border border-neutral-700">
            <span>Queued</span>
          </span>
        );
    }
  };

  const displayImage = issue.status === 'resolved' && issue.afterImageUrl ? issue.afterImageUrl : issue.imageUrl;

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0E131E] p-4 transition-all duration-200 hover:border-neutral-700 hover:bg-[#121824] hover:shadow-xl">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
              style={{
                backgroundColor: `${categoryInfo.color}15`,
                color: categoryInfo.color,
                border: `1px solid ${categoryInfo.color}30`
              }}
            >
              {categoryInfo.label}
            </span>

            {issue.urgency === 'hazard' && (
              <span className="inline-flex items-center space-x-1 rounded-md bg-rose-950/80 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-800/60">
                <AlertTriangle className="h-2.5 w-2.5" />
                <span>HAZARD</span>
              </span>
            )}
          </div>

          <div>{getStatusBadge()}</div>
        </div>

        {/* Image Preview */}
        <div
          onClick={() => onOpenDetails(issue)}
          className="relative mb-3 h-44 w-full overflow-hidden rounded-xl bg-neutral-950 cursor-pointer"
        >
          <img
            src={displayImage}
            alt={issue.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {issue.aiAnalysis && (
            <div className="absolute top-2 left-2 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-800/60">
              AI Conf: {issue.aiAnalysis.confidence.toFixed(1)}%
            </div>
          )}

          <div className="absolute bottom-2 right-2 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 font-mono text-[10px] text-neutral-300">
            {issue.trackingNumber}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(issue)}
          className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-1.5"
        >
          {issue.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
          {issue.description}
        </p>

        {/* Landmark */}
        <div className="flex items-start space-x-1.5 text-xs text-neutral-300 mb-3 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/60">
          <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
          <div className="line-clamp-1">
            <span className="font-semibold text-neutral-200">
              Ward {issue.wardNumber} ({issue.wardName})
            </span>
            <span className="text-neutral-500 mx-1">•</span>
            <span className="text-neutral-400">{issue.landmark}</span>
          </div>
        </div>

        {/* Department and SLA */}
        <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between mb-3 border-t border-neutral-800/60 pt-2">
          <span className="truncate max-w-[200px]" title={issue.assignedDepartment}>
            {issue.assignedDepartment}
          </span>
          <span className="flex items-center text-neutral-400 text-[10px]">
            <Clock className="h-3 w-3 mr-1 text-neutral-400" />
            {issue.estimatedTurnaroundHours}h SLA
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleUpvote(issue.id);
            }}
            className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
              issue.userUpvoted
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
            }`}
          >
            <ThumbsUp className={`h-3 w-3 ${issue.userUpvoted ? 'text-amber-400' : 'text-neutral-400'}`} />
            <span className="font-mono">{issue.upvotes}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              corroborateIssue(issue.id);
            }}
            className="flex items-center space-x-1 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 px-2 py-1.5 text-[11px] text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors"
          >
            <Users className="h-3 w-3 text-sky-400" />
            <span className="font-mono text-neutral-300">+{issue.corroborationsCount}</span>
          </button>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenDetails(issue);
          }}
          className="flex items-center space-x-1 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>Timeline</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};
