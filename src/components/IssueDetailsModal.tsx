import React from 'react';
import {
  X,
  MapPin,
  Clock,
  ThumbsUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { Issue } from '../types';
import { CATEGORY_DETAILS } from '../data/mockData';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

interface IssueDetailsModalProps {
  issue: Issue | null;
  onClose: () => void;
}

export const IssueDetailsModal: React.FC<IssueDetailsModalProps> = ({
  issue,
  onClose
}) => {
  const { toggleUpvote, corroborateIssue } = useCivicData();
  const [copied, setCopied] = React.useState(false);

  if (!issue) return null;

  const categoryInfo = CATEGORY_DETAILS[issue.category] || {
    label: issue.category,
    color: '#F97316'
  };

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(issue.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-700 bg-[#0E131E] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#0A0D15] px-6 py-4 shrink-0">
          <div className="flex items-center space-x-3">
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
              style={{
                backgroundColor: `${categoryInfo.color}15`,
                color: categoryInfo.color,
                border: `1px solid ${categoryInfo.color}40`
              }}
            >
              {categoryInfo.label}
            </span>

            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              title="Click to copy tracking ID"
            >
              <span>{issue.trackingNumber}</span>
              {copied ? (
                <Check className="h-3 w-3 text-emerald-400" />
              ) : (
                <Copy className="h-3 w-3 text-neutral-500" />
              )}
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Status */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  issue.status === 'resolved'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : issue.urgency === 'hazard'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                {issue.status.toUpperCase()}
              </span>

              <span className="text-xs text-neutral-400 font-mono">
                Assigned: {issue.assignedDepartment}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {issue.title}
            </h2>

            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              {issue.description}
            </p>
          </div>

          {/* Location Bar */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2 text-xs">
            <div className="flex items-start space-x-2 text-neutral-300">
              <MapPin className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">
                  Vadodara Ward {issue.wardNumber} ({issue.wardName}):{' '}
                </span>
                <span>{issue.address}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 pl-6 font-mono text-[11px] text-neutral-400">
              <span>GPS: {issue.lat.toFixed(4)}° N, {issue.lng.toFixed(4)}° E</span>
              <span>Officer: {issue.assignedOfficer}</span>
            </div>
          </div>

          {/* Photos: Before & After */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Evidence & Verification Photos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="relative h-48 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <img
                    src={issue.beforeImageUrl}
                    alt="Initial citizen report"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 rounded bg-black/75 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-900">
                    REPORTED HAZARD
                  </div>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Logged by citizen with EXIF geocoding
                </div>
              </div>

              {issue.afterImageUrl ? (
                <div className="space-y-1">
                  <div className="relative h-48 rounded-xl overflow-hidden border border-emerald-900/60 bg-neutral-950">
                    <img
                      src={issue.afterImageUrl}
                      alt="Completed repair"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 rounded bg-emerald-950/90 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-700">
                      OFFICIAL RESOLUTION
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified on-site by VMC Executive Engineer
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30 p-4 text-center">
                  <HardHat className="h-8 w-8 text-neutral-600 mb-2" />
                  <span className="text-xs font-semibold text-neutral-400">
                    Resolution in progress
                  </span>
                  <span className="text-[11px] text-neutral-400 mt-1 max-w-[200px]">
                    After-photo will be uploaded once field crew finishes compacting & sign-off.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Chronological Audit Timeline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Chronological Municipal Audit Trail
            </h4>
            <div className="relative pl-6 space-y-4 border-l border-neutral-800">
              {issue.timeline.map((event) => (
                <div key={event.id} className="relative">
                  <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-neutral-900 bg-amber-500 shadow" />
                  <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                    <span className="text-neutral-300">{event.timestamp}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-semibold">{event.actor}</span>
                    <span className="text-neutral-500">({event.actorRole})</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300 leading-normal">
                    {event.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t border-neutral-800 bg-[#0A0D15] px-6 py-4 shrink-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleUpvote(issue.id)}
              className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                issue.userUpvoted
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>Priority ({issue.upvotes})</span>
            </button>

            <button
              onClick={() => corroborateIssue(issue.id)}
              className="flex items-center space-x-1.5 rounded-xl bg-neutral-800/80 px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 border border-neutral-700 transition-colors"
            >
              <Users className="h-3.5 w-3.5 text-sky-400" />
              <span>I Also Face This (+{issue.corroborationsCount})</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-700 transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
