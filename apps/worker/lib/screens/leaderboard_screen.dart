import 'package:flutter/material.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Leaderboard'),
        backgroundColor: Colors.orange,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 10,
        itemBuilder: (context, index) => _buildLeaderboardItem(index),
      ),
    );
  }

  Widget _buildLeaderboardItem(int index) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: index < 3 ? Colors.orange : Colors.grey,
          child: Text('${index + 1}'),
        ),
        title: Text('Worker ${index + 1}'),
        subtitle: Text('Level ${10 - index}'),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text('${(1000 - index * 50)} pts', style: const TextStyle(fontWeight: FontWeight.bold)),
            Text('${50 - index} completed', style: const TextStyle(fontSize: 12, color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}
