import 'package:flutter/material.dart';

class IncidentProvider extends ChangeNotifier {
  List<Map<String, dynamic>> _incidents = [];
  
  List<Map<String, dynamic>> get incidents => _incidents;
  
  Future<void> loadIncidents() async {
    // TODO: Fetch from API
    notifyListeners();
  }
}
