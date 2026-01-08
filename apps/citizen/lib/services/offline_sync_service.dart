import 'package:connectivity_plus/connectivity_plus.dart';
import 'offline_database.dart';
import 'api_service.dart';
import 'dart:io';

class OfflineSyncService {
  static final Connectivity _connectivity = Connectivity();
  static bool _isSyncing = false;

  static Future<void> initialize() async {
    // Listen to connectivity changes
    _connectivity.onConnectivityChanged.listen((result) {
      if (result != ConnectivityResult.none && !_isSyncing) {
        syncPendingData();
      }
    });
  }

  static Future<bool> isOnline() async {
    try {
      final result = await InternetAddress.lookup('google.com');
      return result.isNotEmpty && result[0].rawAddress.isNotEmpty;
    } catch (_) {
      return false;
    }
  }

  static Future<void> syncPendingData() async {
    if (_isSyncing) return;
    _isSyncing = true;

    try {
      final online = await isOnline();
      if (!online) {
        _isSyncing = false;
        return;
      }

      final pendingIncidents = await OfflineDatabase.getPendingIncidents();

      for (var incident in pendingIncidents) {
        try {
          // Upload incident
          final result = await ApiService.reportIncident(
            imageFile: File(incident['image_path']),
            latitude: incident['latitude'],
            longitude: incident['longitude'],
          );

          if (result['status'] == 'success') {
            await OfflineDatabase.markIncidentSynced(incident['id']);
            print('Synced incident ${incident['id']}');
          }
        } catch (e) {
          print('Failed to sync incident ${incident['id']}: $e');
        }
      }

      // Clean old cache
      await OfflineDatabase.clearOldCache(daysOld: 7);
    } finally {
      _isSyncing = false;
    }
  }

  static Future<void> saveForLater({
    required File imageFile,
    required double latitude,
    required double longitude,
  }) async {
    await OfflineDatabase.savePendingIncident({
      'image_path': imageFile.path,
      'latitude': latitude,
      'longitude': longitude,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
      'synced': 0,
    });

    print('Incident saved for offline sync');
  }

  static Future<int> getPendingCount() async {
    final pending = await OfflineDatabase.getPendingIncidents();
    return pending.length;
  }
}
