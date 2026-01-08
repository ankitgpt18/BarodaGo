import 'dart:io';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'http://localhost:8000/api';

  static Future<Map<String, dynamic>> reportIncident({
    required File imageFile,
    required double latitude,
    required double longitude,
  }) async {
    final request = http.MultipartRequest('POST', Uri.parse('$baseUrl/incidents/report'));
    
    request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));
    request.fields['latitude'] = latitude.toString();
    request.fields['longitude'] = longitude.toString();
    request.fields['user_id'] = '1'; // TODO: Get from auth

    final response = await request.send();
    final responseData = await response.stream.bytesToString();
    return json.decode(responseData);
  }

  static Future<Map<String, dynamic>> getUserStats() async {
    // TODO: Implement actual API call
    return {
      'banyan_points': 0,
      'total_reports': 0,
      'total_high_fives': 0,
    };
  }
}
