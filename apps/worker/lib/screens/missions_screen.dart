import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class MissionsScreen extends StatelessWidget {
  const MissionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Missions'),
        backgroundColor: Colors.orange,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 3,
        itemBuilder: (context, index) => _buildMissionCard(context, index),
      ),
    );
  }

  Widget _buildMissionCard(BuildContext context, int index) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.orange,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text('ASSIGNED', style: TextStyle(color: Colors.white, fontSize: 12)),
                ),
                const Spacer(),
                Text('Severity: ${8 - index}', style: const TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 12),
            const Text('Pothole on Main Road', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('Large pothole causing traffic disruption', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(Icons.location_on, size: 16, color: Colors.grey),
                const SizedBox(width: 4),
                const Text('Alkapuri Ward', style: TextStyle(color: Colors.grey)),
                const Spacer(),
                TextButton.icon(
                  onPressed: () => _openMaps(),
                  icon: const Icon(Icons.directions),
                  label: const Text('Navigate'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                child: const Text('Complete Mission'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openMaps() async {
    final url = Uri.parse('https://www.google.com/maps/dir/?api=1&destination=22.3072,73.1812');
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    }
  }
}
