import React, { useState } from 'react';
import {
  HeartHandshake,
  Users,
  CheckCircle2,
  FileCheck2,
  Coins,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

export const CommunityDrivesSection: React.FC = () => {
  const { drives, pledgeToDrive } = useCivicData();
  const [pledgeAmounts, setPledgeAmounts] = useState<Record<string, number>>({});

  const handlePledge = (driveId: string, amount: number) => {
    sound.playSuccess();
    pledgeToDrive(driveId, amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0F141F] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-sky-500/30 bg-sky-950/40 px-3 py-1 text-xs text-sky-300 mb-2">
              <HeartHandshake className="h-3.5 w-3.5 text-sky-400" />
              <span>Vadodara Citizen Micro-Projects</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Crowdfund Neighborhood Enhancements
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              When small civic improvements need fast community momentum, citizens pool micro-pledges with approved VMC municipal permits. 100% transparent ledger.
            </p>
          </div>

          <div className="flex items-center space-x-2 rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 text-xs text-neutral-300">
            <FileCheck2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>All initiatives pre-sanctioned by VMC Ward Engineers</span>
          </div>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {drives.map((drive) => {
          const percent = Math.min(100, Math.round((drive.raisedAmount / drive.targetAmount) * 100));

          return (
            <div
              key={drive.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0E131E] overflow-hidden shadow-lg hover:border-neutral-700 transition-all"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={drive.imageUrl}
                    alt={drive.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E131E] via-transparent to-black/30" />

                  <div className="absolute top-3 right-3 rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 font-mono text-[10px] text-neutral-300 border border-neutral-700">
                    Permit #{drive.vmcPermitNumber}
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="text-[11px] font-semibold text-orange-400">
                      {drive.area}
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {drive.title}
                    </h3>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="p-4 space-y-4">
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {drive.description}
                  </p>

                  {/* Funding Bar */}
                  <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/50 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-400">Raised: </span>
                        <strong className="text-emerald-400 font-mono text-sm">
                          ₹{drive.raisedAmount.toLocaleString()}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="text-neutral-400">Target: </span>
                        <strong className="text-white font-mono text-xs">
                          ₹{drive.targetAmount.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-sky-400" />
                        <span>{drive.supportersCount} citizen backers</span>
                      </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {percent}% Funded
                      </span>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="text-xs text-neutral-400 bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-800/80">
                    <strong className="text-neutral-200">Outcome Impact:</strong> {drive.impactMetrics}
                  </div>
                </div>
              </div>

              {/* Pledge Controls */}
              <div className="p-4 border-t border-neutral-800 bg-neutral-950/40">
                {drive.status === 'completed' ? (
                  <div className="flex items-center justify-center space-x-1.5 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 rounded-xl border border-emerald-800/50">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Fully Funded & Executed</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase text-center">
                      Quick Citizen Pledge (Demo Mode)
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePledge(drive.id, 250)}
                        className="rounded-xl border border-neutral-700 bg-neutral-800/90 py-2 text-xs font-bold text-white hover:bg-neutral-700 transition-colors"
                      >
                        Pledge ₹250
                      </button>
                      <button
                        onClick={() => handlePledge(drive.id, 500)}
                        className="rounded-xl bg-orange-600 py-2 text-xs font-bold text-white hover:bg-orange-500 transition-colors shadow"
                      >
                        Pledge ₹500
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
