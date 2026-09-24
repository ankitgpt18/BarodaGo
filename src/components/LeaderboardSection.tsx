import React from 'react';
import {
  Award,
  Flame,
  CheckCircle2,
  Building2,
  Phone,
  MapPin,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';

export const LeaderboardSection: React.FC = () => {
  const { champions, wards, userKarma } = useCivicData();

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0F141F] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-yellow-500/30 bg-yellow-950/40 px-3 py-1 text-xs text-yellow-300 mb-2">
              <Award className="h-3.5 w-3.5 text-yellow-400" />
              <span>Vadodara Civic Champions & Ward Network</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Recognizing Citizens Who Keep Baroda Moving
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Every verified pothole report, completed heritage walking trail, and confirmed streetlight restoration earns Civic Karma. See who is making the biggest impact in your ward.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
            <span className="text-[11px] font-mono text-amber-300 uppercase">Your Profile</span>
            <div className="text-2xl font-extrabold font-mono text-amber-400">
              {userKarma} pts
            </div>
            <span className="text-xs text-neutral-300">Level 3 Civic Contributor</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Champions Leaderboard */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Top Civic Contributors this Month</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400">Updated Daily</span>
          </div>

          <div className="space-y-3">
            {champions.map((champ) => (
              <div
                key={champ.rank}
                className="flex items-center justify-between rounded-xl border border-neutral-800 bg-[#0E131E] p-4 transition-all hover:border-neutral-700 hover:bg-[#121926]"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg font-mono font-bold text-sm bg-neutral-900 border border-neutral-800 text-neutral-300">
                    #{champ.rank}
                  </div>

                  <img
                    src={champ.avatarUrl}
                    alt={champ.name}
                    className="h-10 w-10 rounded-full object-cover border border-neutral-700"
                  />

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-white">{champ.name}</h4>
                      <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                        {champ.badge}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">{champ.ward}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-extrabold text-amber-400 text-base">
                    {champ.karma} pts
                  </div>
                  <div className="text-[11px] text-neutral-400 flex items-center justify-end space-x-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>{champ.issuesResolved} fixes verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 19 Wards Directory */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-sky-400" />
              <span>VMC Ward Executive Engineers</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400">19 Wards Total</span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {wards.map((ward) => (
              <div
                key={ward.wardNumber}
                className="rounded-xl border border-neutral-800 bg-[#0E131E] p-3 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">
                    Ward {ward.wardNumber}: {ward.name}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    {ward.resolvedThisMonth} fixed
                  </span>
                </div>

                <div className="text-[11px] text-neutral-400">
                  {ward.officeAddress}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-800/60 text-[11px]">
                  <span className="text-neutral-300 font-medium">
                    {ward.engineerName}
                  </span>
                  <span className="flex items-center space-x-1 font-mono text-amber-400">
                    <Phone className="h-2.5 w-2.5" />
                    <span>{ward.engineerPhone}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
