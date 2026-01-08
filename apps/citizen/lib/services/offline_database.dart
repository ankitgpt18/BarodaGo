import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'dart:convert';

class OfflineDatabase {
  static Database? _database;

  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  static Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'barodago_offline.db');

    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  static Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE pending_incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_path TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        timestamp INTEGER NOT NULL,
        synced INTEGER DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE cached_incidents (
        id INTEGER PRIMARY KEY,
        data TEXT NOT NULL,
        cached_at INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE user_data (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    ''');
  }

  // Pending Incidents
  static Future<int> savePendingIncident(Map<String, dynamic> incident) async {
    final db = await database;
    return await db.insert('pending_incidents', incident);
  }

  static Future<List<Map<String, dynamic>>> getPendingIncidents() async {
    final db = await database;
    return await db.query(
      'pending_incidents',
      where: 'synced = ?',
      whereArgs: [0],
    );
  }

  static Future<void> markIncidentSynced(int id) async {
    final db = await database;
    await db.update(
      'pending_incidents',
      {'synced': 1},
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  // Cached Incidents
  static Future<void> cacheIncident(int id, Map<String, dynamic> data) async {
    final db = await database;
    await db.insert(
      'cached_incidents',
      {
        'id': id,
        'data': jsonEncode(data),
        'cached_at': DateTime.now().millisecondsSinceEpoch,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  static Future<Map<String, dynamic>?> getCachedIncident(int id) async {
    final db = await database;
    final results = await db.query(
      'cached_incidents',
      where: 'id = ?',
      whereArgs: [id],
    );

    if (results.isEmpty) return null;
    return jsonDecode(results.first['data'] as String);
  }

  static Future<List<Map<String, dynamic>>> getAllCachedIncidents() async {
    final db = await database;
    final results = await db.query('cached_incidents');
    
    return results.map((row) {
      return jsonDecode(row['data'] as String) as Map<String, dynamic>;
    }).toList();
  }

  // User Data
  static Future<void> saveUserData(String key, String value) async {
    final db = await database;
    await db.insert(
      'user_data',
      {'key': key, 'value': value},
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  static Future<String?> getUserData(String key) async {
    final db = await database;
    final results = await db.query(
      'user_data',
      where: 'key = ?',
      whereArgs: [key],
    );

    if (results.isEmpty) return null;
    return results.first['value'] as String;
  }

  static Future<void> clearOldCache({int daysOld = 7}) async {
    final db = await database;
    final cutoff = DateTime.now().subtract(Duration(days: daysOld)).millisecondsSinceEpoch;
    
    await db.delete(
      'cached_incidents',
      where: 'cached_at < ?',
      whereArgs: [cutoff],
    );
  }
}
