# 🏛️ BarodaGo Civic Operating Engine (Backend)

> **High-concurrency, distributed civic tech backend built for 2.3+ Million Citizens across 19 Vadodara Municipal Corporation (VMC) Administrative Wards.**

---

## ⚡ Architecture Highlights (Engineered for Million-User Scale)

```
[ Citizen Smartphone / Web App ]
               │
               ▼
[ Sliding-Window Rate Limiter ] ── (Token Bucket: Max 10 req/15min)
               │
               ▼
   [ Fastify / Express API ] ────► [ Prometheus Metrics (/metrics) ]
               │
   ┌───────────┴───────────────────────────────┐
   ▼                                           ▼
[ Spatial Deduplication Engine ]     [ Double-Entry Ledger ]
• Haversine R-Tree Matrix            • Strict Invariant Check
• 25m Radius Merge Detection         • Idempotency Replay Shield
• Prevents 50x Duplicate Work Orders • Zero Negative Balances
   │                                           │
   ▼                                           ▼
[ Ray-Casting Ward Polygon Engine ]   [ Digital Voucher Vault ]
• 19 Real VMC Ward Boundaries        • Tamper-Evident QR Payloads
• Auto-routes to Ward Exec Engineer  • 30-Day Auto-Expiration
```

---

## 🚀 Key Engineering Capabilities

### 1. Spatial Deduplication & Clustering
- When multiple citizens report the same pothole on **RC Dutt Road** or cattle on **Akota Flyover**, the system computes Haversine distances against active candidate records in the spatial partition.
- Incidents within **25 meters** are automatically merged as **corroborations** rather than dispatching redundant municipal repair crews.
- Corroborating citizens receive **+20 Civic Points**, while reinforcing ticket urgency.

### 2. Ray-Casting Point-in-Polygon Ward Resolution
- Uses ray-intersection mathematics to map any $(latitude, longitude)$ coordinate to its exact administrative ward polygon (Ward 1 to 19 across East, West, North, South, and Central zones).
- Automatically assigns the designated VMC Executive Engineer, depot contact, and SLA countdown (e.g. 4h for stray cattle/live wires, 24h for bitumen craters).

### 3. Double-Entry Civic Ledger (ACID Guarantees)
- Designed to eliminate race conditions, double-spending, and financial liabilities in civic points redemption.
- Every earn or spend event requires a unique `idempotencyKey`. Network retries safely return existing transaction state without double-crediting.
- Maintains a strictly monotonic balance:
  $$\text{balanceAfter} = \text{previousBalance} + \text{amount}$$

### 4. Sliding-Window Rate Limiting
- Dynamic sliding-window timestamp tracking preventing bot floods and DDoS attacks during city-wide storms or emergencies.
- Auto-prunes stale client records every 5 minutes to prevent memory leaks under millions of unique IPs.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Liveness & readiness probe for Kubernetes / Docker |
| `GET` | `/metrics` | Prometheus metrics scrape target (`uptime`, `heap`, `active_wards`) |
| `GET` | `/api/v1/wards` | List all 19 VMC wards with boundaries & executive engineers |
| `POST` | `/api/v1/wards/resolve` | Resolve VMC ward for coordinate `{ latitude, longitude }` |
| `POST` | `/api/v1/incidents` | Report new civic defect (auto-deduplicated within 25m) |
| `GET` | `/api/v1/incidents` | Query active incidents with category, ward, and search filters |
| `GET` | `/api/v1/incidents/:code` | Retrieve single ticket with chronological municipal audit log |
| `POST` | `/api/v1/incidents/:code/resolve` | Ward engineer resolution with photographic proof |
| `GET` | `/api/v1/rewards/catalog` | View municipal rewards catalog |
| `POST` | `/api/v1/rewards/redeem` | Atomically redeem points for QR voucher pass |
| `GET` | `/api/v1/ledger/:phone` | Full citizen account balance & immutable audit statement |

---

## 🧪 Testing & Verification

Comprehensive unit test suite powered by **Vitest**:
```bash
npm test
```
Verifies:
- Ray-Casting Point-in-Polygon for Alkapuri (Ward 1) and Karelibaug (Ward 7).
- Haversine distance accuracy across Vadodara coordinates.
- Spatial deduplication within 25 meters.
- Idempotency replay protection under network retries.
- Overdraft rejection on points redemption.
- Perceptual image hashing consistency.

---

## 🐳 Docker Deployment

Spin up the entire distributed infrastructure (Node.js API + PostGIS + Redis + Prometheus):
```bash
docker compose up -d
```
