import React, { useState, useEffect } from 'react';
import { Search, X, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { Issue } from '../types';
import { sound } from '../utils/sound';

interface TicketLookupModalProps {
  onInspectIssue: (issue: Issue) => void;
}

export const TicketLookupModal: React.FC<TicketLookupModalProps> = ({ onInspectIssue }) => {
  const {
    isLookupModalOpen,
    setIsLookupModalOpen,
    lookupPresetCode,
    setLookupPresetCode,
    getIssueByTrackingNumber
  } = useCivicData();

  const [inputCode, setInputCode] = useState('');
  const [matchedIssue, setMatchedIssue] = useState<Issue | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (lookupPresetCode) {
      setInputCode(lookupPresetCode);
      const found = getIssueByTrackingNumber(lookupPresetCode);
      setMatchedIssue(found || null);
      setHasSearched(true);
      setLookupPresetCode('');
    }
  }, [lookupPresetCode, getIssueByTrackingNumber, setLookupPresetCode]);

  if (!isLookupModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (!inputCode.trim()) return;

    const found = getIssueByTrackingNumber(inputCode.trim());
    setMatchedIssue(found || null);
    setHasSearched(true);
  };

  const handleQuickChip = (code: string) => {
    sound.playClick();
    setInputCode(code);
    const found = getIssueByTrackingNumber(code);
    setMatchedIssue(found || null);
    setHasSearched(true);
  };

  const handleClose = () => {
    sound.playClick();
    setIsLookupModalOpen(false);
    setInputCode('');
    setMatchedIssue(null);
    setHasSearched(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-700 bg-[#0E131E] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#0A0D15] px-6 py-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-amber-400" />
            <h3 className="font-bold text-base text-white">
              Municipal Ticket Tracker
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter BDQ-2026-XXXX"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-2.5 px-4 font-mono text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-500 transition-colors"
            >
              Track
            </button>
          </form>

          {/* Quick preset chips for demo */}
          <div>
            <div className="text-[11px] font-mono text-neutral-400 mb-2">
              Demo sample tickets (Click to test):
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { code: 'BDQ-2026-8921', desc: 'Alkapuri Pothole (Resolved)' },
                { code: 'BDQ-2026-9044', desc: 'Sayajigunj Lights (On-site)' },
                { code: 'BDQ-2026-9188', desc: 'Akota Cattle (Hazard)' }
              ].map((chip) => (
                <button
                  key={chip.code}
                  type="button"
                  onClick={() => handleQuickChip(chip.code)}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 text-xs text-neutral-300 hover:border-amber-500/50 hover:text-white transition-all text-left"
                >
                  <span className="font-mono font-bold text-amber-400 mr-1.5">
                    {chip.code}
                  </span>
                  <span className="text-[10px] text-neutral-400">{chip.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Matched Result Card */}
          {matchedIssue && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {matchedIssue.trackingNumber}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    matchedIssue.status === 'resolved'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {matchedIssue.status.toUpperCase()}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white line-clamp-2">
                {matchedIssue.title}
              </h4>

              <div className="text-xs text-neutral-400 space-y-1">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="h-3 w-3 text-orange-400" />
                  <span>Ward {matchedIssue.wardNumber} ({matchedIssue.wardName}) • {matchedIssue.landmark}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-3 w-3 text-sky-400" />
                  <span>Assigned: {matchedIssue.assignedDepartment}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onInspectIssue(matchedIssue);
                  }}
                  className="flex items-center space-x-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700 transition-colors"
                >
                  <span>Open Complete Audit Trail</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {hasSearched && !matchedIssue && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-center text-xs text-neutral-400">
              No ticket found for this code. Try one of the demo samples above or report a new issue to generate a ticket.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
