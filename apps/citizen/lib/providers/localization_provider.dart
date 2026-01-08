import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalizationProvider extends ChangeNotifier {
  Locale _locale = const Locale('en');

  Locale get locale => _locale;

  LocalizationProvider() {
    _loadLocale();
  }

  Future<void> _loadLocale() async {
    final prefs = await SharedPreferences.getInstance();
    final languageCode = prefs.getString('language_code') ?? 'en';
    _locale = Locale(languageCode);
    notifyListeners();
  }

  Future<void> setLocale(Locale locale) async {
    _locale = locale;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('language_code', locale.languageCode);
    notifyListeners();
  }
}

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'app_name': 'BarodaGo',
      'home': 'Home',
      'feed': 'Feed',
      'report': 'Report',
      'profile': 'Profile',
      'banyan_points': 'Banyan Points',
      'report_issue': 'Report Issue',
      'view_feed': 'View Feed',
      'recent_activity': 'Recent Activity',
      'no_activity': 'No recent activity',
      'submit': 'Submit',
      'cancel': 'Cancel',
      'loading': 'Loading...',
    },
    'gu': {
      'app_name': 'બરોડાગો',
      'home': 'હોમ',
      'feed': 'ફીડ',
      'report': 'રિપોર્ટ',
      'profile': 'પ્રોફાઇલ',
      'banyan_points': 'બરગદ પોઇન્ટ્સ',
      'report_issue': 'સમસ્યા જણાવો',
      'view_feed': 'ફીડ જુઓ',
      'recent_activity': 'તાજેતરની પ્રવૃત્તિ',
      'no_activity': 'કોઈ તાજેતરની પ્રવૃત્તિ નથી',
      'submit': 'સબમિટ કરો',
      'cancel': 'રદ કરો',
      'loading': 'લોડ થઈ રહ્યું છે...',
    },
  };

  String translate(String key) {
    return _localizedValues[locale.languageCode]?[key] ?? key;
  }
}

class AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => ['en', 'gu'].contains(locale.languageCode);

  @override
  Future<AppLocalizations> load(Locale locale) async {
    return AppLocalizations(locale);
  }

  @override
  bool shouldReload(AppLocalizationsDelegate old) => false;
}
