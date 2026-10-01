import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../src/services/authService.js';
import { FeedbackService } from '../src/services/feedbackService.js';
import { IncidentService } from '../src/services/incidentService.js';
import { ContractorQualityService } from '../src/services/contractorQualityService.js';
import { ForensicGuardService } from '../src/services/forensicGuardService.js';

describe('AuthService: OTP and JWT Flow', () => {
  const phone = '+91 98250 11999';

  it('should issue an OTP and verify with valid JWT token', () => {
    const req = AuthService.requestOtp(phone);
    expect(req.success).toBe(true);
    expect(req.testOtp).toBeDefined();

    const { token, user } = AuthService.verifyOtp({
      phone,
      otp: req.testOtp!,
      name: 'Rohan Trivedi',
      role: 'citizen'
    });

    expect(token).toBeDefined();
    expect(user.phone).toBe(phone);
    expect(user.role).toBe('citizen');

    // Verify token validity
    const decoded = AuthService.verifyToken(token);
    expect(decoded.phone).toBe(phone);
    expect(decoded.name).toBe('Rohan Trivedi');
  });

  it('should reject invalid OTP', () => {
    expect(() => {
      AuthService.verifyOtp({
        phone: '+91 91234 56789',
        otp: '000000'
      });
    }).toThrow(/Invalid or expired OTP/);
  });
});

describe('FeedbackService: Citizen Dispute & Quality Verification Loop', () => {
  let trackingNumber: string;

  beforeEach(() => {
    IncidentService.initSeed();
    ContractorQualityService.initSeed();

    // Create and resolve a test ticket
    const { incident } = IncidentService.createIncident({
      citizenPhone: '+91 98250 77889',
      citizenName: 'Devang Vyas',
      imageUrl: 'https://images.unsplash.com/photo-1515162816999?auto=format',
      latitude: 22.3105,
      longitude: 73.1704,
      category: 'pothole',
      landmark: 'Chakli Circle'
    });

    IncidentService.resolveIncident(
      incident.trackingNumber,
      'https://images.unsplash.com/photo-1544620347?auto=format',
      'Bitumen mastic patch completed.'
    );

    trackingNumber = incident.trackingNumber;
  });

  it('should award +15 points for positive citizen verification (Rating: 5/5)', () => {
    const res = FeedbackService.submitFeedback({
      trackingNumber,
      citizenPhone: '+91 98250 77889',
      rating: 5,
      isSatisfied: true,
      qualityTag: 'smooth_finish',
      comment: 'Excellent work, road is completely smooth now!'
    });

    expect(res.ticketReopened).toBe(false);
    expect(res.pointsAwarded).toBe(15);
  });

  it('should RE-OPEN ticket and escalate to Executive Engineer if citizen is dissatisfied (Rating: 1/5)', () => {
    const res = FeedbackService.submitFeedback({
      trackingNumber,
      citizenPhone: '+91 98250 77889',
      rating: 1,
      isSatisfied: false,
      qualityTag: 'issue_persists',
      comment: 'The patch caved in immediately after heavy rain today!'
    });

    expect(res.ticketReopened).toBe(true);
    expect(res.pointsAwarded).toBe(0);

    // Verify incident state in system
    const inc = IncidentService.findByTrackingNumber(trackingNumber);
    expect(inc?.state).toBe('in_progress');
    expect(inc?.urgency).toBe('hazard');
  });
});

describe('ContractorQualityService: Premature Roadway Failure Detection', () => {
  it('should flag premature failure if pothole re-occurs within 15m of previous patch within 90 days', () => {
    const resolvedList = [
      {
        id: 'inc-old-1',
        trackingNumber: 'VMC-BDQ-8901',
        coordinates: { latitude: 22.3105, longitude: 73.1704 },
        resolvedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        assignedDepartment: 'Roads & Bridges Division'
      }
    ];

    // New pothole 8 meters away
    const newCoords = { latitude: 22.31055, longitude: 73.17043 };

    const check = ContractorQualityService.checkPrematureFailure(newCoords, resolvedList);
    expect(check.isPrematureFailure).toBe(true);
    expect(check.matchedIncidentNumber).toBe('VMC-BDQ-8901');
    expect(check.daysSinceResolution).toBe(15);
  });
});

describe('ForensicGuardService: Anti-Spoofing & EXIF Verification', () => {
  const deviceCoords = { latitude: 22.3105, longitude: 73.1704 };

  it('should pass audit for fresh, geographically coherent photo', () => {
    const audit = ForensicGuardService.auditReportForensics(deviceCoords, {
      captureTimestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      exifCoordinates: { latitude: 22.3106, longitude: 73.1705 } // ~15m away
    });

    expect(audit.passed).toBe(true);
    expect(audit.isFlagged).toBe(false);
    expect(audit.riskScore).toBe(0);
  });

  it('should flag GPS coherence breach if camera EXIF deviates by >500m from device location', () => {
    const audit = ForensicGuardService.auditReportForensics(deviceCoords, {
      captureTimestamp: new Date().toISOString(),
      exifCoordinates: { latitude: 22.3250, longitude: 73.2000 } // ~3.5km away in Karelibaug
    });

    expect(audit.isFlagged).toBe(true);
    expect(audit.flags.some((f) => f.includes('GPS_COHERENCE_BREACH'))).toBe(true);
  });
});
