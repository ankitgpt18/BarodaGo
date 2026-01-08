import 'package:flutter/material.dart';

class MissionProvider extends ChangeNotifier {
  List<Map<String, dynamic>> _missions = [];
  
  List<Map<String, dynamic>> get missions => _missions;
  
  Future<void> loadMissions() async {
    // TODO: Fetch from API
    notifyListeners();
  }
  
  Future<void> completeMission(int missionId) async {
    // TODO: Submit completion to API
    notifyListeners();
  }
}
