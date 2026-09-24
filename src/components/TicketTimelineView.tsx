import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  Phone,
  HardHat,
  ThumbsUp,
  Users,
  Copy,
  Check,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { Issue } from '../types';
import { sound } from '../utils/sound';

interface TicketTimelineViewProps {
  initialCode?: string;
}

export const TicketTimelineView: React.FC<TicketTimelineViewProps> = ({ initialCode = 'VMC-BDQ-8921' }) => {
  const { issues, getIssueByTrackingNumber, toggleUpvote, corroborateIssue } = useCivicData();

  const [inputCode, setInputCode] = useState(initialCode);
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>(() => getIssueByTrackingNumber(initialCode) || issues[0]);
  const [copied, setCopied] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const found = getIssueByTrackingNumber(inputCode.trim());
    setSelectedIssue(found);
  };

  const handleQuickChip = (code: string) => {
    sound.playClick();
    setInputCode(code);
    const found = getIssueByTrackingNumber(code);
    setSelectedIssue(found);
  };

  const handleCopyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="rounded-3xl border border-neutral-800 bg-[#0F141F] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-300 mb-2">
              <Clock className="h-3.5 w-3.5 text-sky-400" />
              <span>Real-Time Municipal Dispatch Tracker</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Track Issue Timeline & Crew Dispatch
            </h2>
            <p className="text-xs text-neutral-400">
              Enter reference ID to inspect field officer logs, contractor work orders, and resolution photos.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 min-w-[280px]">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="e.g. VMC-BDQ-8921"
              className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500 shadow"
            >
              Track
            </button>
          </form>
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/80">
          <span className="text-[11px] font-mono text-neutral-500">Live Sample Tickets:</span>
          {issues.slice(0, 4).map((iss) => (
            <button
              key={iss.id}
              onClick={() => handleQuickChip(iss.trackingNumber)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                selectedIssue?.id === iss.id
                  ? 'border border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold'
                  : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
              }`}
            >
              {iss.trackingNumber} ({iss.category.replace('_', ' ')})
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Display Card */}
      {selectedIssue ? (
        <div className="rounded-3xl border border-neutral-800 bg-[#0E131E] p-6 sm:p-8 shadow-2xl space-y-8">
          {/* Ticket Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => handleCopyCode(selectedIssue.trackingNumber)}
                  className="flex items-center space-x-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-mono font-bold text-amber-400 hover:border-amber-500 transition-colors"
                >
                  <span>{selectedIssue.trackingNumber}</span>
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-neutral-500" />}
                </button>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    selectedIssue.status === 'resolved'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : selectedIssue.urgency === 'hazard'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {selectedIssue.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedIssue.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  <span>Ward {selectedIssue.wardNumber} ({selectedIssue.wardName}) • {selectedIssue.landmark}</span>
                </span>
                <span className="text-neutral-600">•</span>
                <span className="flex items-center space-x-1">
                  <HardHat className="h-3.5 w-3.5 text-sky-400" />
                  <span>{selectedIssue.assignedDepartment}</span>
                </span>
              </div>
            </div>

            {/* Reporter details */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 min-w-[240px] text-xs space-y-1">
              <div className="text-[10px] uppercase font-mono text-neutral-400">Citizen Submitter</div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <User className="h-3.5 w-3.5 text-amber-400" />
                <span>{selectedIssue.reporterDetails.name}</span>
              </div>
              <div className="text-neutral-400 flex items-center space-x-1.5 font-mono text-[11px]">
                <Phone className="h-3 w-3 text-neutral-500" />
                <span>{selectedIssue.reporterDetails.phone}</span>
              </div>
              <div className="text-amber-400 font-mono text-[11px] pt-1">
                Karma Awarded: +{selectedIssue.reporterDetails.pointsAwarded} pts
              </div>
            </div>
          </div>

          {/* Photos Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase text-neutral-400">Initial Citizen AI Scan</div>
              <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <img src={selectedIssue.imageUrl} alt="Initial defect" className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-900">
                  DEFECT LOGGED
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase text-neutral-400">
                {selectedIssue.status === 'resolved' ? 'VMC Field Verification Photo' : 'Current Repair Status'}
              </div>
              {selectedIssue.afterImageUrl ? (
                <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-emerald-900/80 bg-neutral-950">
                  <img src={selectedIssue.afterImageUrl} alt="Resolved" className="h-full w-full object-cover" />
                  <div className="absolute top-2 left-2 rounded bg-emerald-950/90 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-700">
                    RESOLVED & COMPACTED
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-4 text-center">
                  <HardHat className="h-8 w-8 text-neutral-600 mb-2" />
                  <span className="text-xs font-semibold text-neutral-300">Field Unit Active</span>
                  <span className="text-[11px] text-neutral-400 mt-1 max-w-[220px]">
                    After-photo will be submitted by Ward Engineer upon completion.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Chronological Step-by-Step Stepper */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Chronological Audit Trail & Triage
            </h4>

            <div className="relative pl-6 space-y-6 border-l-2 border-neutral-800">
              {selectedIssue.timeline.map((event) => (
                <div key={event.id} className="relative group">
                  <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-neutral-900 bg-amber-500 shadow" />
                  <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 mb-0.5">
                    <span className="text-neutral-200 font-bold">{event.timestamp}</span>
                    <span>•</span>
                    <span className="text-amber-400">{event.actor}</span>
                    <span className="text-neutral-500">({event.actorRole})</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/80">
                    {event.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interaction controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleUpvote(selectedIssue.id)}
                className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  selectedIssue.userUpvoted
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>Priority ({selectedIssue.upvotes})</span>
              </button>

              <button
                onClick={() => corroborateIssue(selectedIssue.id)}
                className="flex items-center space-x-1.5 rounded-xl bg-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 border border-neutral-700"
              >
                <Users className="h-3.5 w-3.5 text-sky-400" />
                <span>I Also Face This (+{selectedIssue.corroborationsCount})</span>
              </button>
            </div>

            <div className="text-xs text-neutral-400 font-mono">
              Target Turnaround: <strong className="text-white">{selectedIssue.estimatedTurnaroundHours} Hours</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-12 text-center text-xs text-neutral-400">
          No ticket found with reference code "{inputCode}". Select one of the sample tickets above.
        </div>
      )}
    </div>
  );
};
