# 📱 BarodaGo Mobile Apps - Development Guide

This document provides guidance for developing the Citizen and Worker mobile apps using Flutter.

## Project Structure

```
apps/
├── citizen/          # Citizen App - "Magic Camera"
│   ├── lib/
│   │   ├── main.dart
│   │   ├── screens/
│   │   ├── widgets/
│   │   └── services/
│   └── pubspec.yaml
│
└── worker/           # Worker App - "Efficiency Portal"
    ├── lib/
    │   ├── main.dart
    │   ├── screens/
    │   ├── widgets/
    │   └── services/
    └── pubspec.yaml
```

## Citizen App Features

### 1. Magic Camera Screen
- **Gesture-based camera interface**
- **Zero-text input** - just point and shoot
- **Real-time AI triage** feedback
- **GPS auto-capture**

### 2. Community Feed
- **Ward-based filtering** (19 Vadodara wards)
- **Before/After image carousel**
- **High-Five** (like) interactions
- **Banyan Points** display

### 3. Sanskari Sanchay
- **Vote for eyesores**
- **Crowdfunding campaigns**
- **UPI payment integration** (Razorpay)
- **Progress tracking**

## Worker App Features

### 1. Mission List
- **Assigned tasks** with priority
- **Route optimization** via Google Maps
- **Material requirements**
- **Estimated completion time**

### 2. Mission Detail
- **Before photo** from citizen
- **Navigation** to location
- **After photo capture** with AI verification
- **Task completion** workflow

### 3. Worker Profile
- **Skill-based leveling** system
- **Banyan Points** leaderboard
- **Performance metrics**
- **Earnings tracking**

## Key Dependencies

```yaml
# pubspec.yaml (both apps)
dependencies:
  flutter:
    sdk: flutter
  camera: ^0.10.5          # Camera access
  geolocator: ^10.1.0      # GPS location
  google_maps_flutter: ^2.5.0  # Maps integration
  http: ^1.1.0             # API calls
  provider: ^6.1.1         # State management
  image_picker: ^1.0.5     # Image handling
  firebase_auth: ^4.15.0   # Authentication
  razorpay_flutter: ^1.3.6 # Payments (Citizen App)
  lottie: ^2.7.0           # Animations
```

## Design System

### Colors (Citizen App)
```dart
// Glassmorphism theme
const primaryColor = Color(0xFF6366F1);
const secondaryColor = Color(0xFF10B981);
const accentColor = Color(0xFFF59E0B);
const backgroundColor = Color(0xFF0F172A);
```

### Colors (Worker App)
```dart
// Utilitarian theme
const primaryColor = Color(0xFF3B82F6);
const successColor = Color(0xFF10B981);
const warningColor = Color(0xFFF59E0B);
const dangerColor = Color(0xFFEF4444);
```

## API Integration

### Base Service
```dart
class ApiService {
  static const String baseUrl = 'http://localhost:8000/api';
  
  Future<Map<String, dynamic>> reportIncident({
    required File image,
    required double latitude,
    required double longitude,
    required int userId,
  }) async {
    var request = http.MultipartRequest(
      'POST',
      Uri.parse('$baseUrl/incidents/report'),
    );
    
    request.files.add(await http.MultipartFile.fromPath('image', image.path));
    request.fields['latitude'] = latitude.toString();
    request.fields['longitude'] = longitude.toString();
    request.fields['user_id'] = userId.toString();
    
    var response = await request.send();
    var responseData = await response.stream.bytesToString();
    return json.decode(responseData);
  }
}
```

## Authentication Flow

1. **Phone OTP** via Firebase Auth
2. **User registration** via `/api/auth/register/citizen` or `/worker`
3. **Token storage** in secure storage
4. **Auto-login** on app restart

## Camera Implementation

```dart
class MagicCameraScreen extends StatefulWidget {
  @override
  _MagicCameraScreenState createState() => _MagicCameraScreenState();
}

class _MagicCameraScreenState extends State<MagicCameraScreen> {
  CameraController? _controller;
  Position? _currentPosition;
  
  @override
  void initState() {
    super.initState();
    _initializeCamera();
    _getCurrentLocation();
  }
  
  Future<void> _captureAndReport() async {
    final image = await _controller!.takePicture();
    
    // Show loading animation
    showDialog(
      context: context,
      builder: (context) => LottieBuilder.asset('assets/analyzing.json'),
    );
    
    // Upload to backend
    final result = await ApiService().reportIncident(
      image: File(image.path),
      latitude: _currentPosition!.latitude,
      longitude: _currentPosition!.longitude,
      userId: currentUser.id,
    );
    
    // Show AI analysis result
    Navigator.pop(context);
    _showResultDialog(result);
  }
}
```

## Gamification UI

### Banyan Points Display
```dart
class BanyanPointsWidget extends StatelessWidget {
  final int points;
  
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF6366F1), Color(0xFF10B981)],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: [
          Text('🌳', style: TextStyle(fontSize: 20)),
          SizedBox(width: 8),
          Text(
            '$points Points',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
```

## Testing

```bash
# Run unit tests
flutter test

# Run integration tests
flutter drive --target=test_driver/app.dart

# Run on specific device
flutter run -d <device-id>
```

## Build for Production

```bash
# Android
flutter build apk --release
flutter build appbundle --release

# iOS
flutter build ios --release
```

## Performance Optimization

1. **Image compression** before upload (max 2MB)
2. **Lazy loading** for community feed
3. **Caching** for ward data and user profile
4. **Background location** updates for workers

## Next Steps

1. Implement Firebase Authentication
2. Add Razorpay payment gateway
3. Integrate Google Maps for navigation
4. Add push notifications for task assignments
5. Implement offline mode with local storage

---

**Note**: The mobile apps are currently in the planning phase. The backend API is ready and tested. Start with the Citizen App's Magic Camera feature as it's the core user experience.
