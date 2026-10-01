import { describe, it, expect, beforeEach } from 'vitest';
import { SpatialService } from '../src/services/spatialService.js';
import { LedgerService } from '../src/services/ledgerService.js';
import { IncidentService } from '../src/services/incidentService.js';
import { TriageEngine } from '../src/services/triageEngine.js';

describe('SpatialService: Vadodara GIS Point-in-Polygon & Deduplication', () => {
  it('should accurately resolve Alkapuri coordinates to Ward 1 (West Zone)', () => {
    // RC Dutt Road, Alkapuri
    const coords = { latitude: 22.3105, longitude: 73.1704 };
    const ward = SpatialService.resolveWardForCoordinates(coords);

    expect(ward.wardNumber).toBe(1);
    expect(ward.zone).toBe('West');
    expect(ward.executiveEngineer).toBe('Er. Rajesh V. Parmar');
  });

  it('should accurately resolve Karelibaug coordinates to Ward 7 (North Zone)', () => {
    // Bahucharaji Road, Karelibaug
    const coords = { latitude: 22.3245, longitude: 73.2045 };
    const ward = SpatialService.resolveWardForCoordinates(coords);

    expect(ward.wardNumber).toBe(7);
    expect(ward.zone).toBe('North');
    expect(ward.executiveEngineer).toBe('Er. Chirag A. Dave');
  });

  it('should compute Haversine distance correctly between two points in Vadodara', () => {
    // Inox Circle (22.3105, 73.1704) to Chakli Circle (~450 meters away)
    const p1 = { latitude: 22.3105, longitude: 73.1704 };
    const p2 = { latitude: 22.3115, longitude: 73.1745 };

    const distance = SpatialService.haversineDistanceMeters(p1, p2);
    expect(distance).toBeGreaterThan(400);
    expect(distance).toBeLessThan(550);
  });

  it('should detect duplicate civic defect within 25 meters and merge', () => {
    const existing = [
      {
        id: 'inc-test-1',
        trackingNumber: 'VMC-BDQ-1001',
        category: 'pothole',
        coordinates: { latitude: 22.3105, longitude: 73.1704 },
        state: 'dispatched'
      }
    ];

    // Point 12 meters away (same pothole)
    const newPoint = { latitude: 22.31055, longitude: 73.17045 };
    const result = SpatialService.findSpatialDuplicate(newPoint, 'pothole', existing, 25);

    expect(result.isDuplicate).toBe(true);
    expect(result.matchedIncidentId).toBe('inc-test-1');
    expect(result.distanceMeters).toBeLessThan(25);
  });

  it('should NOT merge if distance is greater than 25 meters', () => {
    const existing = [
      {
        id: 'inc-test-1',
        trackingNumber: 'VMC-BDQ-1001',
        category: 'pothole',
        coordinates: { latitude: 22.3105, longitude: 73.1704 },
        state: 'dispatched'
      }
    ];

    // Point 150 meters away
    const farPoint = { latitude: 22.3118, longitude: 73.1704 };
    const result = SpatialService.findSpatialDuplicate(farPoint, 'pothole', existing, 25);

    expect(result.isDuplicate).toBe(false);
  });
});

describe('LedgerService: Double-Entry Accounting & Idempotency', () => {
  const testPhone = `+91 99999 ${Math.floor(10000 + Math.random() * 90000)}`;

  it('should create account with zero points and credit on report', () => {
    const res = LedgerService.postTransaction({
      citizenPhone: testPhone,
      amount: 50,
      type: 'EARN_REPORT',
      idempotencyKey: `test_earn_1_${testPhone}`,
      referenceId: 'ref_1',
      description: 'First report credit'
    });

    expect(res.success).toBe(true);
    expect(res.newBalance).toBe(50);
    expect(res.isDuplicateRequest).toBe(false);
  });

  it('should guarantee idempotency on network retry (never double credit)', () => {
    const key = `idemp_test_key_${testPhone}`;

    // First attempt
    const res1 = LedgerService.postTransaction({
      citizenPhone: testPhone,
      amount: 50,
      type: 'EARN_REPORT',
      idempotencyKey: key,
      referenceId: 'ref_2',
      description: 'Idempotent report'
    });

    const balanceAfterFirst = res1.newBalance;

    // Simulated network retry with identical key
    const res2 = LedgerService.postTransaction({
      citizenPhone: testPhone,
      amount: 50,
      type: 'EARN_REPORT',
      idempotencyKey: key,
      referenceId: 'ref_2',
      description: 'Idempotent report'
    });

    expect(res2.isDuplicateRequest).toBe(true);
    expect(res2.newBalance).toBe(balanceAfterFirst); // Balance did NOT double!
  });

  it('should prevent negative balance when spending more points than available', () => {
    expect(() => {
      LedgerService.postTransaction({
        citizenPhone: testPhone,
        amount: -999999, // Exceeds balance
        type: 'SPEND_REDEEM',
        idempotencyKey: `bad_spend_${Date.now()}`,
        referenceId: 'ref_overspend',
        description: 'Attempted fraud overdraft'
      });
    }).toThrow(/Insufficient points balance/);
  });
});

describe('TriageEngine: Defect Classification & Hazard Scoring', () => {
  it('should compute deterministic perceptual hash for images', () => {
    const url = 'https://images.unsplash.com/photo-1515162816999?auto=format';
    const hash1 = TriageEngine.computeImageHash(url);
    const hash2 = TriageEngine.computeImageHash(url);

    expect(hash1).toBe(hash2);
    expect(hash1).toMatch(/^phash_/);
  });

  it('should classify cattle obstruction as urgent hazard with CNCD department routing', () => {
    const coords = { latitude: 22.2982, longitude: 73.1895 };
    const triage = TriageEngine.analyzeCivicDefect('https://example.com/stray-cattle.jpg', coords, 'stray_cattle');

    expect(triage.defectCategory).toBe('stray_cattle');
    expect(triage.urgency).toBe('hazard');
    expect(triage.hazardScore).toBeGreaterThanOrEqual(90);
    expect(triage.slaTargetHours).toBe(4);
    expect(triage.recommendedDepartment).toContain('Cattle Nuisance Control Department');
  });
});
