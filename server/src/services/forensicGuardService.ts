import { GeoCoordinate } from '../models/types.js';
import { SpatialService } from './spatialService.js';

export interface ForensicMetadata {
  captureTimestamp?: string;
  exifCoordinates?: GeoCoordinate;
  deviceModel?: string;
  softwareSignatures?: string[];
}

export interface ForensicAuditResult {
  passed: boolean;
  isFlagged: boolean;
  riskScore: number; // 0 - 100
  flags: string[];
}

export class ForensicGuardService {
  /**
   * Evaluates image forensics against device reporting context to prevent point farming,
   * recycled photos, and GPS mock locations.
   */
  public static auditReportForensics(
    deviceCoords: GeoCoordinate,
    metadata?: ForensicMetadata
  ): ForensicAuditResult {
    const flags: string[] = [];
    let riskScore = 0;

    if (!metadata) {
      return { passed: true, isFlagged: false, riskScore: 0, flags: [] };
    }

    // 1. Timestamp Freshness Check (Max 2 hours old for urgent civic alerts)
    if (metadata.captureTimestamp) {
      const captureTime = new Date(metadata.captureTimestamp).getTime();
      const ageHours = (Date.now() - captureTime) / (1000 * 60 * 60);

      if (ageHours > 48) {
        flags.push('PHOTO_STALE_OVER_48H: Photo taken over 48 hours ago.');
        riskScore += 45;
      } else if (ageHours > 2) {
        flags.push('PHOTO_AGED_OVER_2H: Photo capture timestamp is older than 2 hours.');
        riskScore += 20;
      }
    }

    // 2. EXIF GPS vs Network GPS Coherence Check (Max 500m deviation)
    if (metadata.exifCoordinates) {
      const deviationMeters = SpatialService.haversineDistanceMeters(
        deviceCoords,
        metadata.exifCoordinates
      );

      if (deviationMeters > 500) {
        flags.push(
          `GPS_COHERENCE_BREACH: Camera EXIF GPS deviates by ${Math.round(deviationMeters)}m from device network location.`
        );
        riskScore += 60;
      }
    }

    // 3. Software signature check (Photoshop / Canva / Synthetic AI generator markers)
    if (metadata.softwareSignatures && metadata.softwareSignatures.length > 0) {
      const suspiciousSoftware = ['photoshop', 'canva', 'midjourney', 'dall-e', 'stable-diffusion'];
      for (const sig of metadata.softwareSignatures) {
        if (suspiciousSoftware.some((s) => sig.toLowerCase().includes(s))) {
          flags.push(`SUSPICIOUS_SOFTWARE_SIGNATURE: Image contains editing artifact (${sig}).`);
          riskScore += 50;
        }
      }
    }

    const passed = riskScore < 75;
    const isFlagged = riskScore >= 30;

    return {
      passed,
      isFlagged,
      riskScore,
      flags
    };
  }
}
