# BarodaGO (BDQ)

> **Vadodara Civic OS & Neighborhood Radar**  
> A civic engagement and municipal issue dispatch platform built for the citizens of Vadodara, Gujarat. Connecting neighborhood alerts directly to Vadodara Municipal Corporation (VMC) ward executive engineers with real-time audit trails, interactive GIS mapping, and urban heritage walking quests.

---

## The Vision

In Indian municipal governance, civic grievance reporting often falls into a black box: complaints get routed through fragmented WhatsApp numbers or buried in paper registries.

**BarodaGO** eliminates this friction. It provides a tactile, transparent citizen interface designed with modern product engineering standards:

- **Direct Ward Routing**: Automatically categorizes and attributes reports to one of Vadodara's 19 municipal wards (Alkapuri, Akota, Sayajigunj, Gotri, Karelibaug, Raopura, etc.) and specific zone executive engineers.
- **Auditable Lifecycle**: Step-by-step public ledger from triage to contractor dispatch to final compaction sign-off with before-and-after photographic verification.
- **Citizen Corroboration**: Neighbors can upvote and corroborate ("I also face this"), algorithmically elevating priority for VMC field teams.
- **Civic Pride & Urban Quests**: Features the *Sayaji Heritage & Green Walking Quests* (Gaekwad royal promenade, Sayajibaug banyan trail, Sursagar waterfront) and the *Aapnu Vadodara Food & Hygiene Radar* (cleanliness index for iconic food spots like Mahakali Sev Usal and Duliram Peda).
- **Neighborhood Micro-Drives**: Pre-sanctioned citizen crowdfunded interventions (blind-curve convex mirrors, native neem sapling buffer along the Vishwamitri river, reflective collars for community animals).

---

## Core Modules & Architecture

```
BarodaGO Architecture
├── Presentation Layer
│   ├── Civic Radar (Real-time feed with status filters: Triage, On-Site, Work Order, Resolved)
│   ├── Interactive Before/After Resolution Slider (Side-by-side photographic repair audit)
│   ├── Leaflet GIS Command Center (Geocoded coordinate markers with status rings)
│   ├── Sayaji Heritage Quests (Interactive checkpoints, distance tracker, karma badges)
│   ├── Food Cleanliness Index (FSSAI & citizen hygiene audits for Vadodara eateries)
│   └── Community Micro-Drives (Pledge ledger with official VMC permit tracking)
│
├── State & Client Core
│   ├── Reactive CivicDataContext (LocalStorage persistence + real-time reactivity)
│   ├── Tactile Sound Engine (Low-latency Web Audio API physical feedback)
│   ├── Ticket Routing Engine (Unique BDQ-2026-XXXX format with SLA estimation)
│   └── Recruiter Demo Presets (Instant one-click prefilled photos & tickets)
│
└── Municipal Standards
    ├── Open311 Compliant Schema
    └── 19-Ward Directory with Executive Engineer contact routing
```

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (Custom dark palette: slate, deep zinc, safety amber, emerald audit green)
- **Mapping & GIS:** Leaflet + OpenStreetMap CartoDB Tiles with custom SVG pulsing markers
- **Icons:** Lucide React
- **Animations & Effects:** Framer Motion + Canvas Confetti
- **Audio:** Web Audio API (Synthesized tactile clicks and chime feedback)
- **Tooling:** Vite, Rollup

---

## Quick Start

### 1. Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/ankitgpt18/BarodaGo.git
cd BarodaGo
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## Sample Demo Tickets (For Recruiters & Evaluators)

To test the system immediately without manual entry, use the **Track Ticket** feature or the **Demo Presets** in the report modal:

| Tracking Code | Ward & Location | Category | Status |
| :--- | :--- | :--- | :--- |
| `BDQ-2026-8921` | Ward 1 (Alkapuri - RC Dutt Rd) | Pothole & Road Crater | **Resolved & Audited** (With Before/After photo) |
| `BDQ-2026-9044` | Ward 4 (Sayajigunj - Dairy Den) | Streetlight Blackout | **Crew On-Site** (Hydraulic lift dispatched) |
| `BDQ-2026-9188` | Ward 2 (Akota Flyover Ramp) | Stray Cattle Hazard | **Immediate Hazard** (CNCD Flying Squad active) |
| `BDQ-2026-9112` | Ward 14 (Gotri - Harinagar) | Drainage Silt Blockage | **Work Order Issued** |

---

## Vadodara Ward Coverage

BarodaGO covers all 19 administrative wards under the Vadodara Municipal Corporation:
- **West Zone:** Ward 1 (Alkapuri, Race Course), Ward 2 (Akota, OP Road), Ward 14 (Gotri, Harinagar)
- **Central Zone:** Ward 4 (Sayajigunj, Station), Ward 7 (Raopura, Mandvi, Sursagar)
- **North Zone:** Ward 6 (Karelibaug, Bahucharaji), Ward 8 (Fatehgunj, MSU Campus), Ward 9 (Sama, Harni)
- **South Zone:** Ward 5 (Manjalpur, Tarsali), Ward 10 (Makarpura), Ward 12 (Atladara)
- **East Zone:** Ward 13 (Waghodia Road), Ward 15 (Bapod, Ajwa Road)

---

## License

MIT &copy; 2026 Ankit. Built with pride for Vadodara (આપણું વડોદરા).
