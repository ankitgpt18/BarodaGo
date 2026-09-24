import React from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Circle,
  Footprints,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

export const HeritageQuestsSection: React.FC = () => {
  const { quests, toggleJoinQuest, toggleStopComplete } = useCivicData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0F141F] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-300 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Sayaji Heritage & Urban Exploration Quests</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Discover Vadodara on Foot. Earn Civic Karma.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Explore the royal legacy of Maharaja Sayajirao Gaekwad III, identify ancient banyan canopies, and audit public pedestrian infrastructure while staying healthy.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 text-xs">
            <div className="text-center">
              <div className="font-mono font-bold text-emerald-400 text-base">3</div>
              <div className="text-[10px] text-neutral-400 uppercase">Curated Trails</div>
            </div>
            <div className="h-6 w-px bg-neutral-800" />
            <div className="text-center">
              <div className="font-mono font-bold text-amber-400 text-base">360</div>
              <div className="text-[10px] text-neutral-400 uppercase">Max Karma Pts</div>
            </div>
            <div className="h-6 w-px bg-neutral-800" />
            <div className="text-center">
              <div className="font-mono font-bold text-sky-400 text-base">10.1 km</div>
              <div className="text-[10px] text-neutral-400 uppercase">Walkable Grid</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0E131E] overflow-hidden shadow-lg hover:border-neutral-700 transition-all"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                <img
                  src={quest.imageUrl}
                  alt={quest.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131E] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-white border border-white/10">
                  {quest.difficulty}
                </div>

                <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-amber-500/20 backdrop-blur-md px-2 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                  <Award className="h-3 w-3 text-amber-400" />
                  <span>+{quest.karmaReward} pts</span>
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <div className="text-[11px] font-semibold text-emerald-400">
                    {quest.titleGujarati}
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {quest.title}
                  </h3>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 py-2.5 text-xs text-neutral-400 bg-neutral-900/40">
                <span className="flex items-center space-x-1">
                  <Footprints className="h-3.5 w-3.5 text-orange-400" />
                  <span>{quest.distanceKm} km</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-sky-400" />
                  <span>~{quest.estMinutes} mins</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{quest.stops.length} stops</span>
                </span>
              </div>

              {/* Description */}
              <div className="p-4 space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {quest.description}
                </p>

                {/* Progress bar if joined */}
                {quest.joined && (
                  <div className="space-y-1.5 rounded-xl border border-emerald-800/40 bg-emerald-950/20 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-400">Quest in Progress</span>
                      <span className="font-mono text-emerald-300 font-bold">
                        {quest.progressPercent || 0}% Done
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${quest.progressPercent || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Trail Stops Checklist */}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Trail Checkpoints & Stops:
                  </div>
                  <div className="space-y-2">
                    {quest.stops.map((stop) => (
                      <div
                        key={stop.id}
                        onClick={() => quest.joined && toggleStopComplete(quest.id, stop.id)}
                        className={`flex items-start space-x-2.5 rounded-xl border p-2.5 text-xs transition-all ${
                          stop.completed
                            ? 'border-emerald-800/60 bg-emerald-950/20 text-neutral-300'
                            : 'border-neutral-800/80 bg-neutral-900/30 text-neutral-400'
                        } ${quest.joined ? 'cursor-pointer hover:border-neutral-700' : 'opacity-80'}`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {stop.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-neutral-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${stop.completed ? 'text-emerald-300 line-through' : 'text-neutral-200'}`}>
                            {stop.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-0.5">
                            {stop.hint}
                          </div>
                          <div className="text-[10px] text-amber-400/90 font-mono mt-1">
                            Historical fact: {stop.historicalNote}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quest Action Button */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-950/40">
              <button
                onClick={() => toggleJoinQuest(quest.id)}
                className={`w-full rounded-xl py-2.5 px-4 text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                  quest.joined
                    ? 'border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/50'
                }`}
              >
                {quest.joined ? (
                  <span>Leave Quest / Active</span>
                ) : (
                  <>
                    <span>Start Walking Quest</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
