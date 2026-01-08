import 'package:flutter/material.dart';

class AuthProvider extends ChangeNotifier {
  bool _isAuthenticated = false;
  
  bool get isAuthenticated => _isAuthenticated;
  
  Future<void> login(String email, String password) async {
    // TODO: Implement Firebase auth
    _isAuthenticated = true;
    notifyListeners();
  }
  
  Future<void> logout() async {
    _isAuthenticated = false;
    notifyListeners();
  }
}
