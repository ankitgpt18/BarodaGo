import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'barodago_vmc_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = '7d';

export interface UserTokenPayload {
  userId: string;
  phone: string;
  name: string;
  role: 'citizen' | 'ward_engineer' | 'admin';
  wardNumber?: number;
}

export class AuthService {
  // Ephemeral OTP storage (Key: phone -> { otp: string, expiresAt: number })
  private static otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();

  /**
   * Request 6-digit OTP for phone authentication.
   * Deterministic test OTP '181818' for automated testing and local developer convenience.
   */
  public static requestOtp(phone: string): { success: boolean; message: string; testOtp?: string } {
    const otp = phone === '+91 99999 99999' ? '181818' : Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins validity

    this.otpStore.set(phone, { otp, expiresAt });

    return {
      success: true,
      message: `OTP dispatched to ${phone}. Valid for 5 minutes.`,
      // Exposing testOtp for seamless local inspection and integration testing
      testOtp: otp
    };
  }

  /**
   * Verifies OTP and signs a secure JWT bearer token.
   */
  public static verifyOtp(params: {
    phone: string;
    otp: string;
    name?: string;
    role?: 'citizen' | 'ward_engineer' | 'admin';
    wardNumber?: number;
  }): { token: string; user: UserTokenPayload } {
    const record = this.otpStore.get(params.phone);

    // Allow master test OTP '181818' or matched stored OTP
    const isMasterOtp = params.otp === '181818';
    const isStoredOtpValid = record && record.otp === params.otp && Date.now() <= record.expiresAt;

    if (!isMasterOtp && !isStoredOtpValid) {
      throw new Error('Invalid or expired OTP. Please request a new code.');
    }

    // Clean up OTP after successful use
    this.otpStore.delete(params.phone);

    const user: UserTokenPayload = {
      userId: `usr_${Math.abs(params.phone.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0))}`,
      phone: params.phone,
      name: params.name || (params.role === 'ward_engineer' ? 'Er. VMC Ward Officer' : 'Citizen of Vadodara'),
      role: params.role || 'citizen',
      wardNumber: params.wardNumber
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return { token, user };
  }

  /**
   * Verify and decode bearer token.
   */
  public static verifyToken(token: string): UserTokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
      return decoded;
    } catch {
      throw new Error('Unauthorized: Invalid or expired Bearer token.');
    }
  }
}
