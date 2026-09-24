import React from 'react';
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Trash2,
  Droplets,
  Users,
  MapPin,
  Calendar,
  UtensilsCrossed
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';

export const FoodAndHygieneSection: React.FC = () => {
  const { foodSpots } = useCivicData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0F141F] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3 py-1 text-xs text-rose-300 mb-2">
              <UtensilsCrossed className="h-3.5 w-3.5 text-rose-400" />
              <span>Aapnu Vadodara Food & Hygiene Radar</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Civic Cleanliness Index for Street Food Icons
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              We love Baroda’s Sev Usal, Peda, and Farsan. BarodaGO empowers citizens and VMC health inspectors to audit public dustbins, clean oil rotation, and potable RO water at iconic food hubs.
            </p>
          </div>

          <div className="flex items-center space-x-2 rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 text-xs text-neutral-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>FSSAI Clean Street Food Hub Standard Audited</span>
          </div>
        </div>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodSpots.map((spot) => (
          <div
            key={spot.id}
            className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0E131E] overflow-hidden shadow-lg hover:border-neutral-700 transition-all group"
          >
            <div>
              {/* Photo & Rating Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131E] via-transparent to-black/30" />

                {/* Score badge */}
                <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-xl bg-black/80 backdrop-blur-md px-2.5 py-1 border border-neutral-700 shadow-md">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-mono font-bold text-white text-xs">
                    {spot.hygieneRating}
                  </span>
                  <span className="text-[10px] text-neutral-400">/ 5.0</span>
                </div>

                {/* Crowd Level */}
                <div className="absolute top-3 left-3 rounded-md bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-neutral-300 border border-neutral-700">
                  Crowd: <strong className="text-white">{spot.crowdLevel}</strong>
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <div className="flex items-center space-x-1 text-[11px] text-orange-400 font-medium">
                    <MapPin className="h-3 w-3" />
                    <span>{spot.area}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {spot.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="text-xs font-semibold text-amber-300 bg-amber-950/20 px-2.5 py-1 rounded-lg border border-amber-800/30">
                  {spot.specialty}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {spot.recommendationNote}
                </p>

                {/* Hygiene checklist */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-[11px]">
                  <div className="flex items-center space-x-1.5 text-neutral-300">
                    <Droplets className="h-3.5 w-3.5 text-sky-400" />
                    <span>RO Water Tested</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-neutral-300">
                    <Trash2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Dual Bins Present</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-950/50 p-3 text-[11px] text-neutral-400">
              <span className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-neutral-400" />
                <span>Audited: {spot.inspectedDate}</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-400">
                <Users className="h-3 w-3" />
                <span>{spot.verifiedCount} citizen votes</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
