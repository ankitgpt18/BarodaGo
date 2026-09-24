import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gift,
  Ticket,
  CheckCircle2,
  Sparkles,
  QrCode,
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Coins
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { RewardItem, RedeemedVoucher } from '../types';
import { sound } from '../utils/sound';

export const RewardsRedemptionStore: React.FC = () => {
  const {
    rewards,
    userPoints,
    redeemReward,
    redeemedVouchers,
    selectedVoucherModal,
    setSelectedVoucherModal
  } = useCivicData();

  const [activeTab, setActiveTab] = useState<'rewards' | 'my_vouchers'>('rewards');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRedeem = (reward: RewardItem) => {
    setErrorMessage(null);
    const result = redeemReward(reward);

    if (result.success && result.voucher) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setSelectedVoucherModal(result.voucher);
    } else {
      sound.playClick();
      setErrorMessage(result.error || 'Failed to redeem');
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Points Balance */}
      <div className="rounded-3xl border border-neutral-800 bg-gradient-to-r from-[#0F141F] via-[#111724] to-[#0D121C] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
              <Gift className="h-3.5 w-3.5 text-amber-400" />
              <span>Civic Karma Points Store</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Redeem Points for Real Vadodara Perks
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Every verified civic issue report earns +50 to +75 points. Redeem them for free city transit passes, planetarium tickets, local heritage food vouchers, or property tax rebates.
            </p>
          </div>

          {/* User Points Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-500/5 p-5 text-center min-w-[220px] shadow-lg">
            <div className="text-[11px] font-mono uppercase text-amber-300 font-semibold">
              Available Civic Points
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 my-1">
              {userPoints} <span className="text-lg font-normal text-amber-300/80">pts</span>
            </div>
            <div className="text-[11px] text-neutral-300">
              {redeemedVouchers.length} Vouchers Claimed
            </div>
          </div>
        </div>

        {/* Tab switch: Rewards Catalog vs My Claimed Vouchers */}
        <div className="mt-6 flex space-x-2 border-t border-neutral-800/80 pt-4">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'rewards'
                ? 'bg-neutral-200 text-neutral-900 shadow'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60'
            }`}
          >
            Perks Catalog ({rewards.length})
          </button>

          <button
            onClick={() => setActiveTab('my_vouchers')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'my_vouchers'
                ? 'bg-neutral-200 text-neutral-900 shadow'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60'
            }`}
          >
            <Ticket className="h-3.5 w-3.5" />
            <span>My Active Passes ({redeemedVouchers.length})</span>
          </button>
        </div>
      </div>

      {/* Error alert if not enough points */}
      {errorMessage && (
        <div className="flex items-center space-x-2 rounded-xl border border-rose-800/80 bg-rose-950/40 p-4 text-xs text-rose-300 animate-shake">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Rewards Catalog View */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const canAfford = userPoints >= reward.pointsCost;

            return (
              <div
                key={reward.id}
                className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0E131E] overflow-hidden shadow-lg hover:border-neutral-700 transition-all group"
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={reward.imageUrl}
                      alt={reward.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E131E] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400 border border-neutral-700">
                      {reward.discountValue}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-xl bg-amber-500/20 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-black text-amber-300 border border-amber-500/40 shadow">
                      <Coins className="h-3.5 w-3.5 text-amber-400" />
                      <span>{reward.pointsCost} pts</span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3">
                      <div className="text-[10px] uppercase font-mono text-neutral-400">
                        {reward.partner}
                      </div>
                      <h3 className="text-base font-bold text-white line-clamp-1">
                        {reward.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {reward.description}
                    </p>

                    <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-2 text-[11px] text-neutral-400">
                      <strong className="text-neutral-300">Terms:</strong> {reward.terms}
                    </div>
                  </div>
                </div>

                {/* Redeem Action */}
                <div className="p-4 border-t border-neutral-800 bg-neutral-950/40">
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      canAfford
                        ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-lg shadow-amber-950/40 active:scale-95'
                        : 'border border-neutral-800 bg-neutral-900 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Redeem for {reward.pointsCost} Points</span>
                      </>
                    ) : (
                      <span>Need {reward.pointsCost - userPoints} More Points</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* My Claimed Vouchers View */}
      {activeTab === 'my_vouchers' && (
        <div>
          {redeemedVouchers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {redeemedVouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  onClick={() => setSelectedVoucherModal(voucher)}
                  className="rounded-2xl border border-neutral-700 bg-[#0E131E] p-4 cursor-pointer hover:border-amber-500/50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-800">
                      ACTIVE PASS
                    </span>
                    <span className="font-mono text-xs text-neutral-400">{voucher.redeemedAt}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white">{voucher.title}</h4>
                    <p className="text-xs text-neutral-400">{voucher.partner}</p>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 font-mono text-xs">
                    <span className="text-amber-400 font-bold">{voucher.code}</span>
                    <span className="text-neutral-400 text-[10px]">Show QR &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-12 text-center space-y-3">
              <Ticket className="h-8 w-8 text-neutral-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No active vouchers yet</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Report a civic issue or complete a quiz to earn points, then claim free transit passes and food vouchers.
              </p>
              <button
                onClick={() => setActiveTab('rewards')}
                className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500"
              >
                Browse Rewards
              </button>
            </div>
          )}
        </div>
      )}

      {/* Digital Pass / Voucher Modal */}
      {selectedVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl border border-amber-500/40 bg-[#0E131E] p-6 shadow-2xl space-y-5 text-center">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950 px-3 py-1 text-xs font-mono font-bold text-emerald-300 border border-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>OFFICIAL VADODARA CITIZEN PASS</span>
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{selectedVoucherModal.title}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{selectedVoucherModal.partner}</p>
            </div>

            {/* Generated QR Code Simulation */}
            <div className="mx-auto flex flex-col items-center justify-center p-4 rounded-2xl border border-neutral-700 bg-white shadow-inner max-w-[200px]">
              <QrCode className="h-32 w-32 text-neutral-950" />
              <span className="mt-1 font-mono text-[10px] font-bold text-neutral-700 tracking-wider">
                {selectedVoucherModal.code}
              </span>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-xs space-y-1 text-left">
              <div className="flex justify-between text-neutral-400">
                <span>Value:</span>
                <strong className="text-emerald-400 font-mono">{selectedVoucherModal.discountValue}</strong>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Issue Date:</span>
                <span className="text-white">{selectedVoucherModal.redeemedAt}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Instructions:</span>
                <span className="text-neutral-300">Show this QR code at counter</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedVoucherModal(null);
              }}
              className="w-full rounded-xl bg-neutral-800 py-2.5 text-xs font-bold text-white hover:bg-neutral-700 transition-colors"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
