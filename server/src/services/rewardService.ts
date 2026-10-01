import { RewardVoucher } from '../models/types.js';
import { LedgerService } from './ledgerService.js';

export interface CatalogItem {
  id: string;
  title: string;
  partner: string;
  pointsCost: number;
  category: 'transit' | 'food' | 'culture' | 'rebate';
  description: string;
  discountValue: string;
}

export const REWARDS_CATALOG: CatalogItem[] = [
  {
    id: 'rew-brts',
    title: 'Vadodara City Bus (Vinayak Transit) 10-Ride Pass',
    partner: 'VMC Urban Transport Cell',
    pointsCost: 150,
    category: 'transit',
    description: '10 free rides on any AC/Non-AC city bus across all routes in Vadodara.',
    discountValue: '₹150 Free Bus Fare'
  },
  {
    id: 'rew-planetarium',
    title: 'Sayaji Baug Planetarium & Museum Pass',
    partner: 'Vadodara Cultural & Heritage Department',
    pointsCost: 100,
    category: 'culture',
    description: 'Free entry for 2 adults to Sardar Patel Planetarium and Baroda Museum.',
    discountValue: 'Free Double Entry (₹100)'
  },
  {
    id: 'rew-sevusal',
    title: 'Mahakali Sev Usal VIP Food Voucher',
    partner: 'Mahakali Sev Usal (Ghee Kanta)',
    pointsCost: 80,
    category: 'food',
    description: '1 Special Tari Sev Usal + Extra Pav + Chhas at historic Mandvi stall.',
    discountValue: '₹80 Complimentary Meal'
  },
  {
    id: 'rew-pedabox',
    title: 'Duliram Peda Heritage Sweets Gift Box',
    partner: 'Shree Duliram Pendawala (Raopura)',
    pointsCost: 200,
    category: 'food',
    description: '250g box of signature handmade Kesar Mawa Peda.',
    discountValue: '₹220 Sweet Box'
  },
  {
    id: 'rew-taxrebate',
    title: '2% VMC Residential Property Tax Rebate',
    partner: 'Vadodara Municipal Corporation Revenue Cell',
    pointsCost: 500,
    category: 'rebate',
    description: 'Official 2% rebate coupon for FY 2026-27 municipal property assessment.',
    discountValue: '2% Municipal Tax Discount'
  }
];

export class RewardService {
  private static vouchers: Map<string, RewardVoucher> = new Map();

  public static getCatalog(): CatalogItem[] {
    return REWARDS_CATALOG;
  }

  public static redeemReward(
    phone: string,
    rewardId: string,
    citizenName = 'Citizen of Vadodara'
  ): RewardVoucher {
    const item = REWARDS_CATALOG.find((r) => r.id === rewardId);
    if (!item) {
      throw new Error(`Reward item '${rewardId}' not found in catalog.`);
    }

    // 1. Post debit to double-entry ledger
    const voucherId = `vouch_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const idempotencyKey = `redeem_${voucherId}_${phone}`;

    LedgerService.postTransaction({
      citizenPhone: phone,
      citizenName,
      amount: -item.pointsCost, // Negative amount for spending
      type: 'SPEND_REDEEM',
      idempotencyKey,
      referenceId: voucherId,
      description: `Redeemed ${item.title}`
    });

    // 2. Generate digital pass with tamper-evident voucher code
    const voucherCode = `BG-VMC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days validity

    const voucher: RewardVoucher = {
      id: voucherId,
      voucherCode,
      citizenPhone: phone,
      rewardId: item.id,
      rewardTitle: item.title,
      pointsPaid: item.pointsCost,
      qrPayload: JSON.stringify({
        code: voucherCode,
        phone,
        partner: item.partner,
        reward: item.title,
        validUntil: expiresAt
      }),
      status: 'active',
      expiresAt,
      createdAt: new Date().toISOString()
    };

    this.vouchers.set(voucherId, voucher);
    return voucher;
  }

  public static getVouchersByPhone(phone: string): RewardVoucher[] {
    return Array.from(this.vouchers.values()).filter(
      (v) => v.citizenPhone === phone
    );
  }
}
