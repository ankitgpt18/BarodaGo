import 'package:local_auth/local_auth.dart';
import 'package:flutter/services.dart';

class BiometricAuthService {
  static final LocalAuthentication _auth = LocalAuthentication();

  static Future<bool> isAvailable() async {
    try {
      return await _auth.canCheckBiometrics && await _auth.isDeviceSupported();
    } catch (e) {
      print('Biometric check error: $e');
      return false;
    }
  }

  static Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _auth.getAvailableBiometrics();
    } catch (e) {
      print('Get biometrics error: $e');
      return [];
    }
  }

  static Future<bool> authenticate({
    String reason = 'Please authenticate to continue',
  }) async {
    try {
      final bool canAuth = await isAvailable();
      if (!canAuth) return false;

      return await _auth.authenticate(
        localizedReason: reason,
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: true,
        ),
      );
    } on PlatformException catch (e) {
      print('Authentication error: $e');
      return false;
    }
  }

  static Future<bool> authenticateWithFallback({
    String reason = 'Please authenticate to continue',
  }) async {
    try {
      final bool canAuth = await isAvailable();
      if (!canAuth) return false;

      return await _auth.authenticate(
        localizedReason: reason,
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: false, // Allow PIN/Pattern fallback
        ),
      );
    } on PlatformException catch (e) {
      print('Authentication error: $e');
      return false;
    }
  }

  static Future<void> cancelAuthentication() async {
    await _auth.stopAuthentication();
  }
}
