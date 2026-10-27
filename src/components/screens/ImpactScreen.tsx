import React, { useState } from 'react';
import { 
  Coins, 
  Award, 
  TreePine, 
  Bus, 
  Coffee, 
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

interface ImpactScreenProps {
  onOpenReport?: () => void;
}

export const ImpactScreen: React.FC<ImpactScreenProps> = () => {
  const { theme, colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'rewards' | 'leaderboard' | 'badges'>('rewards');
  const [coins, setCoins] = useState(420);

  const rewards = [
    {
      id: 'rew-1',
      title: 'Free Sayaji Baug EV Shuttle Ride',
      cost: 150,
      category: 'Transit',
      sponsor: 'VMC Eco Mobility',
      icon: Bus,
      bg: theme === 'dark' ? '#0F3320' : '#DCFCE7',
      color: theme === 'dark' ? '#4ADE80' : '#15803D',
    },
    {
      id: 'rew-2',
      title: 'Heritage Cafe 50% Brew Voucher',
      cost: 200,
      category: 'Dining',
      sponsor: 'Alkapuri Roasters',
      icon: Coffee,
      bg: theme === 'dark' ? '#38280D' : '#FEF3C7',
      color: theme === 'dark' ? '#FBBF24' : '#B45309',
    },
    {
      id: 'rew-3',
      title: 'Plant a Banyan Sapling in Your Name',
      cost: 350,
      category: 'Green Vadodara',
      sponsor: 'Sayaji Urban Forestry',
      icon: TreePine,
      bg: theme === 'dark' ? '#0F3025' : '#D1FAE5',
      color: theme === 'dark' ? '#34D399' : '#065F46',
    },
  ];

  const wardRanks = [
    { rank: 1, ward: 'Ward 4 (Gotri - Vasna)', score: 88, resolved: '342 issues' },
    { rank: 2, ward: 'Ward 12 (Manjalpur)', score: 81, resolved: '298 issues' },
    { rank: 3, ward: 'Ward 9 (Alkapuri - Race Course)', score: 72, resolved: '264 issues', isCurrent: true },
    { rank: 4, ward: 'Ward 1 (Sayajigunj - Station)', score: 68, resolved: '215 issues' },
    { rank: 5, ward: 'Ward 7 (Karelibaug)', score: 65, resolved: '190 issues' },
  ];

  const badges = [
    { title: 'Pothole Patrol', desc: '5 verified road hazard reports', earned: true, date: 'Oct 2026' },
    { title: 'Clean Sayaji', desc: 'Garbage dump resolved near you', earned: true, date: 'Sep 2026' },
    { title: 'Guardian of Lights', desc: '3 streetlights verified after dusk', earned: true, date: 'Aug 2026' },
    { title: 'Civic Crusader', desc: 'Reach 500 Sayaji Karma coins', earned: false, progress: '420/500' },
  ];

  const handleRedeem = (cost: number, title: string) => {
    if (coins >= cost) {
      setCoins((c) => c - cost);
      alert(`🎉 Voucher for "${title}" redeemed successfully! Added to your pass wallet.`);
    } else {
      alert(`You need ${cost - coins} more coins to claim this reward. Keep reporting issues to earn coins!`);
    }
  };

  return (
    <div
      className="pb-28 px-4 sm:px-6 max-w-2xl mx-auto space-y-5 pt-2 min-h-full transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* 1. Karma Balance Card */}
      <div
        className="rounded-3xl p-6 text-white shadow-md relative overflow-hidden"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #11261B 0%, #1A3B2B 100%)'
            : 'linear-gradient(135deg, #163828 0%, #1F4D37 100%)',
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300"
              style={{ fontFamily: FontFamily.mono }}
            >
              SAYAJI GAEKWAD KARMA
            </span>
            <div className="px-2.5 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-600 text-xs font-bold text-emerald-200">
              Level 2 Citizen
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-3">
            <Coins size={32} className="text-amber-400 fill-amber-400" />
            <span
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ fontFamily: FontFamily.mono }}
            >
              {coins}
            </span>
            <span className="text-sm font-semibold text-emerald-200">Civic Coins</span>
          </div>

          <p className="text-xs text-emerald-100/80 mt-2 max-w-sm">
            Earned through 14 verified road reports & community confirmations in Ward 9.
          </p>
        </div>
      </div>

      {/* 2. Tabs */}
      <div
        className="flex items-center gap-2 p-1 rounded-2xl transition-colors"
        style={{
          backgroundColor: colors.sand,
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        {[
          { id: 'rewards', label: 'Civic Rewards' },
          { id: 'leaderboard', label: 'Ward Ranks' },
          { id: 'badges', label: 'Badges' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
              style={{
                backgroundColor: isActive ? colors.primary : 'transparent',
                color: isActive ? '#FFFFFF' : colors.textPrimary,
                fontFamily: FontFamily.body,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      {activeTab === 'rewards' && (
        <div className="space-y-3">
          <h3
            className="text-base font-bold transition-colors"
            style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
          >
            Redeem Your Coins
          </h3>
          <div className="space-y-3">
            {rewards.map((rew) => {
              const Icon = rew.icon;
              return (
                <div
                  key={rew.id}
                  className="p-4 rounded-2xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all"
                  style={{
                    backgroundColor: colors.surfaceCard,
                    border: `1px solid ${colors.borderLight}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: rew.bg, color: rew.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-bold leading-snug transition-colors"
                        style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                      >
                        {rew.title}
                      </h4>
                      <p className="text-xs transition-colors" style={{ color: colors.textSecondary }}>
                        {rew.sponsor}
                      </p>
                      <div
                        className="flex items-center gap-1 mt-1 text-xs font-bold"
                        style={{
                          fontFamily: FontFamily.mono,
                          color: theme === 'dark' ? '#FBBF24' : '#B45309',
                        }}
                      >
                        <Coins size={12} className="fill-amber-500 text-amber-500" />
                        <span>{rew.cost} Coins</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(rew.cost, rew.title)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white active:scale-95 transition-all shadow-2xs shrink-0"
                    style={{
                      backgroundColor: colors.primary,
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    Claim
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div
          className="rounded-3xl p-5 space-y-4 shadow-2xs transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-base font-bold transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              VMC Vadodara Ward Rankings
            </h3>
            <span
              className="text-xs font-bold transition-colors"
              style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
            >
              October 2026
            </span>
          </div>

          <div className="space-y-2">
            {wardRanks.map((ward) => (
              <div
                key={ward.rank}
                className="p-3 rounded-2xl flex items-center justify-between transition-all"
                style={{
                  backgroundColor: ward.isCurrent
                    ? theme === 'dark' ? '#2A2412' : '#FEF9EF'
                    : colors.surface,
                  border: ward.isCurrent
                    ? `2px solid ${theme === 'dark' ? '#92400E' : '#FCD34D'}`
                    : `1px solid ${colors.borderLight}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      ward.rank === 1
                        ? 'bg-amber-400 text-amber-950'
                        : ward.rank === 2
                        ? 'bg-neutral-300 text-neutral-800'
                        : ward.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                    style={{ fontFamily: FontFamily.mono }}
                  >
                    #{ward.rank}
                  </span>
                  <div>
                    <h5
                      className="text-sm font-bold leading-snug transition-colors"
                      style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                    >
                      {ward.ward} {ward.isCurrent && '(Your Ward)'}
                    </h5>
                    <p className="text-xs transition-colors" style={{ color: colors.textSecondary }}>
                      {ward.resolved}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className="text-base font-black transition-colors"
                    style={{ fontFamily: FontFamily.mono, color: colors.textPrimary }}
                  >
                    {ward.score}
                  </span>
                  <span
                    className="text-[10px] block transition-colors"
                    style={{ color: colors.textSecondary }}
                  >
                    SAYAJI INDEX
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 gap-3">
          {badges.map((b, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl text-center space-y-2 transition-all shadow-2xs"
              style={{
                backgroundColor: b.earned ? colors.surfaceCard : colors.surface,
                border: `1px solid ${colors.borderLight}`,
                opacity: b.earned ? 1 : 0.6,
              }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                style={{
                  backgroundColor: b.earned ? (theme === 'dark' ? '#3B2F10' : '#FEF3C7') : colors.sand,
                  color: b.earned ? (theme === 'dark' ? '#FBBF24' : '#B45309') : colors.textSecondary,
                }}
              >
                <Award size={24} />
              </div>
              <h5
                className="text-sm font-bold transition-colors"
                style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
              >
                {b.title}
              </h5>
              <p className="text-xs transition-colors" style={{ color: colors.textSecondary }}>
                {b.desc}
              </p>
              {b.earned ? (
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: theme === 'dark' ? '#143021' : '#ECFDF5',
                    color: theme === 'dark' ? '#6EE7B7' : '#065F46',
                  }}
                >
                  Earned {b.date}
                </span>
              ) : (
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: colors.sand,
                    color: colors.textSecondary,
                  }}
                >
                  {b.progress}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
