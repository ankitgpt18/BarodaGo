import redis
from typing import Optional, Any
import json
import os

class CacheService:
    def __init__(self):
        redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self.redis_client = redis.from_url(redis_url, decode_responses=True)
        self.default_ttl = 300  # 5 minutes

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        try:
            value = self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            print(f"Cache get error: {e}")
            return None

    def set(self, key: str, value: Any, ttl: int = None):
        """Set value in cache with TTL"""
        try:
            ttl = ttl or self.default_ttl
            self.redis_client.setex(
                key,
                ttl,
                json.dumps(value, default=str)
            )
        except Exception as e:
            print(f"Cache set error: {e}")

    def delete(self, key: str):
        """Delete key from cache"""
        try:
            self.redis_client.delete(key)
        except Exception as e:
            print(f"Cache delete error: {e}")

    def clear_pattern(self, pattern: str):
        """Clear all keys matching pattern"""
        try:
            keys = self.redis_client.keys(pattern)
            if keys:
                self.redis_client.delete(*keys)
        except Exception as e:
            print(f"Cache clear error: {e}")

    def increment(self, key: str, amount: int = 1) -> int:
        """Increment counter"""
        try:
            return self.redis_client.incrby(key, amount)
        except Exception as e:
            print(f"Cache increment error: {e}")
            return 0

    def get_leaderboard(self, key: str, limit: int = 10):
        """Get top N from sorted set"""
        try:
            return self.redis_client.zrevrange(key, 0, limit - 1, withscores=True)
        except Exception as e:
            print(f"Leaderboard get error: {e}")
            return []

    def update_leaderboard(self, key: str, member: str, score: float):
        """Update sorted set score"""
        try:
            self.redis_client.zadd(key, {member: score})
        except Exception as e:
            print(f"Leaderboard update error: {e}")

cache_service = CacheService()
