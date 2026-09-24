import {
  Issue,
  RewardItem,
  CivicQuizQuestion,
  HeritageQuest,
  WardInfo
} from '../types';

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'issue-1',
    trackingNumber: 'VMC-BDQ-8921',
    title: 'Severe road crater on RC Dutt Road near Inox Circle',
    description: 'Deep tarmac depression right before Chakli Circle causing two-wheelers to swerve dangerously during evening rush hour traffic. High risk of accidents.',
    category: 'pothole',
    wardName: 'Alkapuri',
    wardNumber: 1,
    landmark: '120m West of Inox Cinema, Opposite Bank of Baroda Zonal Office',
    address: 'RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007',
    lat: 22.3105,
    lng: 73.1704,
    status: 'resolved',
    urgency: 'hazard',
    upvotes: 56,
    userUpvoted: false,
    corroborationsCount: 24,
    createdAt: '2026-09-21T08:30:00Z',
    resolvedAt: '2026-09-23T16:15:00Z',
    estimatedTurnaroundHours: 24,
    assignedDepartment: 'VMC Roads & Bridges Engineering Division (West Zone)',
    assignedOfficer: 'Er. Rajesh V. Parmar',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-1',
        timestamp: 'Sep 21, 08:30 AM',
        status: 'reported',
        note: 'Image uploaded by citizen via BarodaGO AI Vision Scanner.',
        actor: 'Citizen App',
        actorRole: 'Intake'
      },
      {
        id: 't-2',
        timestamp: 'Sep 21, 08:31 AM',
        status: 'ai_verified',
        note: 'AI Model classified: Severe Bitumen Crater (96.4% confidence). Urgency set to Immediate Hazard.',
        actor: 'BarodaGO Vision Engine',
        actorRole: 'Automated AI Triage'
      },
      {
        id: 't-3',
        timestamp: 'Sep 22, 11:20 AM',
        status: 'dispatched',
        note: 'Work order #VMC-WO-8422 assigned to Rapid Bitumen Squad 2.',
        actor: 'Er. Rajesh Parmar',
        actorRole: 'Ward 1 Executive Engineer'
      },
      {
        id: 't-4',
        timestamp: 'Sep 23, 03:00 PM',
        status: 'in_progress',
        note: 'Compacting and cold asphalt patch completed with bitumen sealant.',
        actor: 'Field Foreman Jagdish',
        actorRole: 'Site Crew Lead'
      },
      {
        id: 't-5',
        timestamp: 'Sep 23, 04:15 PM',
        status: 'resolved',
        note: 'Compacted road inspected and cleared for normal traffic. Verification photo approved.',
        actor: 'Er. Rajesh Parmar',
        actorRole: 'Ward 1 Executive Engineer'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'pothole',
      categoryLabel: 'Road Surface Fracture & Pothole',
      confidence: 96.4,
      defectSummary: 'Severe tarmac crater with aggregate layer subsidence',
      technicalDescription: 'Computer vision detected a deep asphalt depression (~14cm depth, ~75cm diameter) on high-density vehicular carriageway. Aggregate sub-base is exposed with edges eroding under traffic load.',
      urgency: 'hazard',
      hazardScore: 88,
      recommendedDepartment: 'VMC Roads & Bridges Engineering Division (West Zone)',
      estimatedResolutionHours: 24,
      boundingBoxes: [{ x: 22, y: 35, width: 55, height: 42, label: 'Bitumen Crater (96.4%)' }],
      suggestedTags: ['Road Hazard', 'Tarmac Crater', 'Immediate Compaction']
    },
    reporterDetails: {
      name: 'Ankit Gupta',
      phone: '+91 98250 XXXXX',
      pointsAwarded: 75
    }
  },
  {
    id: 'issue-2',
    trackingNumber: 'VMC-BDQ-9044',
    title: 'Cluster of 5 streetlights blacked out near Dairy Den Circle',
    description: 'Main pedestrian lane between Dairy Den Circle and Sayajigunj Railway Station underpass is completely dark after 7:30 PM.',
    category: 'streetlight',
    wardName: 'Sayajigunj',
    wardNumber: 4,
    landmark: 'Between Dairy Den and Central Bus Terminus Lane',
    address: 'Station Road, Sayajigunj, Vadodara 390005',
    lat: 22.3114,
    lng: 73.1895,
    status: 'in_progress',
    urgency: 'high',
    upvotes: 71,
    userUpvoted: true,
    corroborationsCount: 31,
    createdAt: '2026-09-23T19:40:00Z',
    estimatedTurnaroundHours: 18,
    assignedDepartment: 'VMC Public Lighting Cell & Electrical Division',
    assignedOfficer: 'Er. Nilesh Solanki',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-21',
        timestamp: 'Sep 23, 07:40 PM',
        status: 'reported',
        note: 'Image scanned with night-vision luminaire detection.',
        actor: 'Citizen Mobile',
        actorRole: 'Citizen Contributor'
      },
      {
        id: 't-22',
        timestamp: 'Sep 23, 07:41 PM',
        status: 'ai_verified',
        note: 'Dark zone span measured at ~180m. Feeder circuit tripping identified.',
        actor: 'Vision Engine',
        actorRole: 'AI Analysis'
      },
      {
        id: 't-23',
        timestamp: 'Sep 24, 09:30 AM',
        status: 'in_progress',
        note: 'Hydraulic lift truck on site replacing burnt wiring junction box and 4 LED fixtures.',
        actor: 'Line Inspector Dilip',
        actorRole: 'Field Electrician'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'streetlight',
      categoryLabel: 'Streetlight Feeder Failure & Dark Zone',
      confidence: 91.8,
      defectSummary: 'Cluster of public luminaires unlit along pedestrian corridor',
      technicalDescription: 'Night-time lux analysis indicates dark corridor spanning 180 meters. Feeder circuit tripping or luminaire LED driver burnout detected.',
      urgency: 'high',
      hazardScore: 78,
      recommendedDepartment: 'VMC Public Lighting Cell & Electrical Division',
      estimatedResolutionHours: 18,
      boundingBoxes: [{ x: 30, y: 15, width: 40, height: 65, label: 'Unlit Luminaire Pole (91.8%)' }],
      suggestedTags: ['Lighting Outage', 'Feeder Pillar Trip', 'Student Safety']
    },
    reporterDetails: {
      name: 'Priya Bhatt',
      phone: '+91 94280 XXXXX',
      pointsAwarded: 50
    }
  },
  {
    id: 'issue-3',
    trackingNumber: 'VMC-BDQ-9188',
    title: 'Herd of unattended stray cattle roaming middle of Akota Bridge ramp',
    description: '6 to 8 cows resting on the flyover descent towards Dandia Bazar. Two cars had to brake violently.',
    category: 'stray_cattle',
    wardName: 'Akota',
    wardNumber: 2,
    landmark: 'East Descent of Akota-Dandia Bazar Flyover',
    address: 'Akota Bridge, Vadodara 390020',
    lat: 22.2965,
    lng: 73.167,
    status: 'in_progress',
    urgency: 'hazard',
    upvotes: 94,
    userUpvoted: true,
    corroborationsCount: 42,
    createdAt: '2026-09-24T14:15:00Z',
    estimatedTurnaroundHours: 4,
    assignedDepartment: 'VMC Cattle Nuisance Control Department (CNCD Flying Squad)',
    assignedOfficer: 'Inspector Mukesh Rabari',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-51',
        timestamp: 'Sep 24, 02:15 PM',
        status: 'reported',
        note: 'Image scanned: Multiple bovine animals identified in traffic carriageway.',
        actor: 'Citizen Mobile',
        actorRole: 'Citizen'
      },
      {
        id: 't-52',
        timestamp: 'Sep 24, 02:16 PM',
        status: 'ai_verified',
        note: 'Hazard score: 92/100. Dispatched automated alert to CNCD Flying Squad #2.',
        actor: 'AI Vision Engine',
        actorRole: 'Emergency Triage'
      },
      {
        id: 't-53',
        timestamp: 'Sep 24, 02:35 PM',
        status: 'in_progress',
        note: 'CNCD Cattle impound truck on site to shift cows to Khatamba gaushala.',
        actor: 'CNCD Flying Squad',
        actorRole: 'VMC Field Unit'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'stray_cattle',
      categoryLabel: 'Stray Cattle Roadway Obstruction',
      confidence: 98.1,
      defectSummary: 'Unattended cattle herd blocking active vehicular lane',
      technicalDescription: 'Vision model identified multiple livestock (bovine) obstructing fast-moving traffic lane near bridge descent without reflective gear or supervision.',
      urgency: 'hazard',
      hazardScore: 92,
      recommendedDepartment: 'VMC Cattle Nuisance Control Department (CNCD Flying Squad)',
      estimatedResolutionHours: 4,
      boundingBoxes: [{ x: 18, y: 25, width: 62, height: 58, label: 'Bovine Obstruction (98.1%)' }],
      suggestedTags: ['Cattle Hazard', 'CNCD Dispatch', 'Bridge Safety']
    },
    reporterDetails: {
      name: 'Rohan Trivedi',
      phone: '+91 97129 XXXXX',
      pointsAwarded: 80
    }
  },
  {
    id: 'issue-4',
    trackingNumber: 'VMC-BDQ-9240',
    title: 'Dangling live electrical cable hanging over pedestrian footpath',
    description: 'Overhead cable ruptured during heavy wind. Exposed copper conductor dangling ~1.7m above ground near shop front.',
    category: 'live_wires',
    wardName: 'Karelibaug',
    wardNumber: 6,
    landmark: 'Bahucharaji Road, Opposite Amrapali Shopping Complex',
    address: 'Bahucharaji Road, Karelibaug, Vadodara 390018',
    lat: 22.3245,
    lng: 73.2045,
    status: 'dispatched',
    urgency: 'hazard',
    upvotes: 82,
    userUpvoted: false,
    corroborationsCount: 39,
    createdAt: '2026-09-24T16:00:00Z',
    estimatedTurnaroundHours: 6,
    assignedDepartment: 'MGVCL & VMC Joint Emergency Electrical Unit',
    assignedOfficer: 'Er. Chirag Dave',
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-41',
        timestamp: 'Sep 24, 04:00 PM',
        status: 'reported',
        note: 'AI live wire detection triggered by citizen camera capture.',
        actor: 'Citizen Mobile',
        actorRole: 'Citizen'
      },
      {
        id: 't-42',
        timestamp: 'Sep 24, 04:01 PM',
        status: 'ai_verified',
        note: 'Critical Hazard Score 97/100: High electrical shock risk. Automated priority SOS to MGVCL feeder station.',
        actor: 'AI Vision Engine',
        actorRole: 'Emergency Dispatch'
      },
      {
        id: 't-43',
        timestamp: 'Sep 24, 04:15 PM',
        status: 'dispatched',
        note: 'Emergency line repair unit dispatched with insulated boom.',
        actor: 'MGVCL Dispatcher',
        actorRole: 'Grid Operator'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'live_wires',
      categoryLabel: 'Exposed Electrical Cable / Dangling Live Wire',
      confidence: 97.5,
      defectSummary: 'Severed low-tension electrical cable hanging near footpath',
      technicalDescription: 'Overhead utility cable rupture with exposed conductors hanging at pedestrian head level (~1.8m above sidewalk). High risk of electrical shock or short-circuit fire.',
      urgency: 'hazard',
      hazardScore: 97,
      recommendedDepartment: 'MGVCL & VMC Joint Emergency Electrical Unit',
      estimatedResolutionHours: 6,
      boundingBoxes: [{ x: 25, y: 20, width: 50, height: 60, label: 'Exposed Live Cable (97.5%)' }],
      suggestedTags: ['Electrical Shock Risk', 'Emergency Disconnect', 'MGVCL Crew']
    },
    reporterDetails: {
      name: 'Hardik Shah',
      phone: '+91 99040 XXXXX',
      pointsAwarded: 90
    }
  },
  {
    id: 'issue-5',
    trackingNumber: 'VMC-BDQ-9112',
    title: 'Potable water pipeline rupture flooding Harinagar intersection',
    description: 'Clean municipal drinking water gushing from underground joint since early morning, reducing tap pressure across societies.',
    category: 'water_leak',
    wardName: 'Gotri',
    wardNumber: 14,
    landmark: 'Harinagar Char Rasta, Near Gotri Water Tank',
    address: 'Gotri Main Road, Vadodara 390021',
    lat: 22.3188,
    lng: 73.1432,
    status: 'dispatched',
    urgency: 'hazard',
    upvotes: 63,
    userUpvoted: false,
    corroborationsCount: 22,
    createdAt: '2026-09-24T06:10:00Z',
    estimatedTurnaroundHours: 12,
    assignedDepartment: 'VMC Water Works Department (Distribution Cell)',
    assignedOfficer: 'Er. Mayur Joshi',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-31',
        timestamp: 'Sep 24, 06:10 AM',
        status: 'reported',
        note: 'Image uploaded by Gotri resident.',
        actor: 'Citizen Mobile',
        actorRole: 'Citizen'
      },
      {
        id: 't-32',
        timestamp: 'Sep 24, 06:11 AM',
        status: 'ai_verified',
        note: 'Acoustic and visual displacement confirms potable main rupture. Hazard score 89/100.',
        actor: 'AI Vision Engine',
        actorRole: 'AI Triage'
      },
      {
        id: 't-33',
        timestamp: 'Sep 24, 08:00 AM',
        status: 'dispatched',
        note: 'Excavation backhoe and isolation valve crew mobilized.',
        actor: 'Er. Mayur Joshi',
        actorRole: 'Water Works'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'water_leak',
      categoryLabel: 'Potable Water Pipeline Rupture & Road Flooding',
      confidence: 95.3,
      defectSummary: 'Sub-surface pressurized pipeline fracture with freshwater loss',
      technicalDescription: 'Clean municipal water surge from underground distribution main. Surface water is pooling along roadway curb, creating hydraulic erosion under asphalt.',
      urgency: 'hazard',
      hazardScore: 89,
      recommendedDepartment: 'VMC Water Works Department (Distribution Cell)',
      estimatedResolutionHours: 12,
      boundingBoxes: [{ x: 20, y: 35, width: 60, height: 45, label: 'Water Surge Fracture (95.3%)' }],
      suggestedTags: ['Water Main Burst', 'Freshwater Loss', 'Valve Throttling']
    },
    reporterDetails: {
      name: 'Jayesh Patel',
      phone: '+91 98980 XXXXX',
      pointsAwarded: 70
    }
  },
  {
    id: 'issue-6',
    trackingNumber: 'VMC-BDQ-8805',
    title: 'Secondary municipal waste dump spilling onto pedestrian path',
    description: 'Open dumpster overflowing near vegetable market. Organic waste and plastic bags encroaching onto carriage road.',
    category: 'garbage',
    wardName: 'Raopura',
    wardNumber: 7,
    landmark: 'Near Mandvi Gate Crossway, Old City',
    address: 'Mandvi Road, Vadodara 390001',
    lat: 22.3005,
    lng: 73.205,
    status: 'in_progress',
    urgency: 'normal',
    upvotes: 48,
    userUpvoted: false,
    corroborationsCount: 19,
    createdAt: '2026-09-23T11:00:00Z',
    estimatedTurnaroundHours: 24,
    assignedDepartment: 'VMC Solid Waste Management Cell (Central Zone)',
    assignedOfficer: 'Shri B.K. Rathwa',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-61',
        timestamp: 'Sep 23, 11:00 AM',
        status: 'reported',
        note: 'Photo taken by morning shopper.',
        actor: 'Citizen Mobile',
        actorRole: 'Citizen'
      },
      {
        id: 't-62',
        timestamp: 'Sep 23, 11:01 AM',
        status: 'ai_verified',
        note: 'AI detected waste spill volume exceeding bin capacity by ~45%.',
        actor: 'AI Vision Engine',
        actorRole: 'AI Triage'
      },
      {
        id: 't-63',
        timestamp: 'Sep 24, 07:30 AM',
        status: 'in_progress',
        note: 'Hydraulic compactor truck #12 on site for full collection and lime spraying.',
        actor: 'VMC Sanitation Crew',
        actorRole: 'Field Unit'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'garbage',
      categoryLabel: 'Municipal Waste Accumulation & Overflow',
      confidence: 94.7,
      defectSummary: 'Overflowing commercial dumpster with street litter spillage',
      technicalDescription: 'Open municipal refuse spill exceeding collection receptacle capacity by ~45%. Debris includes decomposing organic waste, single-use plastic, and construction rubble.',
      urgency: 'normal',
      hazardScore: 64,
      recommendedDepartment: 'VMC Solid Waste Management Cell (Central Zone)',
      estimatedResolutionHours: 24,
      boundingBoxes: [{ x: 15, y: 28, width: 68, height: 52, label: 'Waste Accumulation (94.7%)' }],
      suggestedTags: ['Waste Overflow', 'Compactor Truck Required', 'Sanitation Notice']
    },
    reporterDetails: {
      name: 'Farida Malek',
      phone: '+91 98790 XXXXX',
      pointsAwarded: 40
    }
  }
];

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: 'rew-brts',
    title: 'Vadodara City Bus (VMC Transit) 10-Ride Pass',
    partner: 'VMC Urban Transport Cell (Vinayak City Bus)',
    pointsCost: 150,
    category: 'transit',
    description: 'Get 10 free rides on any AC / Non-AC city bus across all routes in Vadodara (Station to Gotri, Waghodia, Tarsali, Gorwa).',
    terms: 'Valid for 30 days from redemption. Show QR code to bus conductor.',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    discountValue: '₹150 Free Bus Fare'
  },
  {
    id: 'rew-planetarium',
    title: 'Sayaji Baug Planetarium & Museum Pass',
    partner: 'Vadodara Cultural & Heritage Department',
    pointsCost: 100,
    category: 'culture',
    description: 'Free entry for 2 adults to Sardar Patel Planetarium sky show and the historic Baroda Museum & Picture Gallery inside Kamati Baug.',
    terms: 'Valid on all days except government holidays. Includes museum entry.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    discountValue: '2x Free Entry Tickets'
  },
  {
    id: 'rew-sev-usal',
    title: 'Mahakali Sev Usal & Bun Combo Voucher',
    partner: 'Mahakali Sev Usal (Ghee Kanta, Mandvi)',
    pointsCost: 120,
    category: 'food',
    description: 'Complimentary signature spicy Tari Sev Usal plate served with soft butter bun and spring onions at Baroda’s most legendary eatery.',
    terms: 'Valid for dine-in or parcel at Mandvi main outlet. 1 voucher per visit.',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    discountValue: '100% Free Combo Plate'
  },
  {
    id: 'rew-peda',
    title: 'Shree Duliram Na Peda 250g Gift Box',
    partner: 'Shree Duliram Na Peda (Raopura Heritage Store)',
    pointsCost: 200,
    category: 'food',
    description: 'Redeem a 250g freshly boxed pack of Vadodara’s famous pure mawa cardamom & kesar peda made with traditional royal recipe.',
    terms: 'Valid at Raopura flag store. Subject to daily fresh batch availability.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    discountValue: 'Free 250g Peda Box (₹160 Val)'
  },
  {
    id: 'rew-tax-rebate',
    title: 'VMC Municipal Property Tax 2% Green Rebate',
    partner: 'VMC Assessment & Municipal Revenue Cell',
    pointsCost: 500,
    category: 'tax_rebate',
    description: 'Official 2% civic contributor deduction on your annual residential municipal property tax bill in Vadodara.',
    terms: 'Apply reference code directly on official VMC Citizen e-Payment portal.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    discountValue: '2% Direct Tax Discount'
  },
  {
    id: 'rew-sapling',
    title: 'Sayaji Baug Botanical Nursery Native Sapling Kit',
    partner: 'VMC Parks & Gardens Directorate',
    pointsCost: 80,
    category: 'eco',
    description: 'Adopt 2 native saplings (Neem, Gulmohar or Kadam) with organic compost bag from the Sayajibaug nursery to plant in your residential society.',
    terms: 'Collect directly from Kamati Baug Gate #3 Nursery.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    discountValue: 'Free 2x Native Trees Kit'
  }
];

export const CIVIC_QUIZ_QUESTIONS: CivicQuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Who commissioned the iconic Laxmi Vilas Palace and Sayaji Baug in Vadodara?',
    options: [
      'Maharaja Sayajirao Gaekwad III',
      'Maharaja Khanderao Gaekwad',
      'Damajirao Gaekwad',
      'Fatehsinghrao Gaekwad'
    ],
    correctIndex: 0,
    explanation: 'Maharaja Sayajirao Gaekwad III (1863-1939) transformed Baroda with modern civic planning, free universal education, and grand architecture.',
    points: 25
  },
  {
    id: 'q-2',
    question: 'How many administrative wards is the Vadodara Municipal Corporation (VMC) divided into?',
    options: ['12 Wards', '15 Wards', '19 Wards', '24 Wards'],
    correctIndex: 2,
    explanation: 'Vadodara is officially divided into 19 municipal wards across East, West, North, and South administrative zones.',
    points: 25
  },
  {
    id: 'q-3',
    question: 'What is the standard SLA turnaround target for VMC emergency road pothole repairs under BarodaGO?',
    options: ['7 Days', '24 Hours', '1 Month', 'No target'],
    correctIndex: 1,
    explanation: 'High-hazard potholes logged via BarodaGO are prioritized for cold-mix or bitumen repair within 24 hours by Ward executive teams.',
    points: 25
  }
];

export const HERITAGE_QUESTS: HeritageQuest[] = [
  {
    id: 'quest-gaekwad',
    title: 'The Gaekwad Royal Heritage Promenade',
    titleGujarati: 'ગાયકવાડ રાજવી ધરોહર પથ',
    subtitle: '4.8 km architectural odyssey through Vadodara’s royal century',
    description: 'Walk in the footsteps of Maharaja Sayajirao Gaekwad III. Decode Indo-Saracenic masonry, visit secret step-wells, and document public civic monuments.',
    distanceKm: 4.8,
    estMinutes: 75,
    startingPoint: 'Kirti Mandir, Sayajigunj',
    stopsCount: 5,
    karmaReward: 150,
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1590059390047-66a877549019?auto=format&fit=crop&w=800&q=80',
    joined: false,
    progressPercent: 0,
    stops: [
      {
        id: 's-1',
        name: 'Kirti Mandir (Cenotaph of Gaekwads)',
        hint: 'Find the bronze sun medallion above the entrance courtyard.',
        lat: 22.3082,
        lng: 73.1952,
        historicalNote: 'Built in 1936 to mark the golden jubilee of Maharaja Sayajirao Gaekwad III.'
      },
      {
        id: 's-2',
        name: 'Tambekar Wada',
        hint: 'Inspect the 19th-century Maratha wood carvings and wall frescoes.',
        lat: 22.3015,
        lng: 73.2085,
        historicalNote: 'Residence of Bhaskar Vithal Tambekar, Diwan of Baroda (1849-54).'
      },
      {
        id: 's-3',
        name: 'Nyay Mandir (Temple of Justice)',
        hint: 'Spot the statue of Maharani Chimnabai I in the central marble hall.',
        lat: 22.3018,
        lng: 73.2052,
        historicalNote: 'Commissioned by Maharaja Sayajirao in 1896 in Byzantine style.'
      },
      {
        id: 's-4',
        name: 'Mandvi City Gate',
        hint: 'Walk beneath the Mughal-era arched pavilion at the exact crossways.',
        lat: 22.3005,
        lng: 73.2098,
        historicalNote: 'Historic center of old Vadodara where octroi taxes were levied.'
      },
      {
        id: 's-5',
        name: 'Laxmi Vilas Palace East Gate',
        hint: 'Photograph the red Agra sandstone clock tower from the public avenue.',
        lat: 22.2938,
        lng: 73.1915,
        historicalNote: 'Four times the size of Buckingham Palace, completed in 1890.'
      }
    ]
  },
  {
    id: 'quest-sayaji-baug',
    title: 'Sayaji Baug Botanical & Wildlife Trail',
    titleGujarati: 'સયાજી બાગ પ્રાકૃતિક પરિભ્રમણ',
    subtitle: '3.2 km morning eco-quest under 140-year-old banyan canopies',
    description: 'Vadodara’s crown jewel since 1879. Catalog 6 rare tree species, verify clean drinking water kiosks, and spot the famous blue-headed rock thrush.',
    distanceKm: 3.2,
    estMinutes: 45,
    startingPoint: 'Kala Ghoda Circle Gate',
    stopsCount: 4,
    karmaReward: 120,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    joined: true,
    progressPercent: 50,
    stops: [
      {
        id: 'sb-1',
        name: 'The Historic Joy Train Track (Sayaji Express)',
        hint: 'Check the rail gauge track near the Children’s Park junction.',
        lat: 22.3145,
        lng: 73.1872,
        historicalNote: 'Gifted by Maharaja Sayajirao to children, operating on a 10-inch miniature gauge.',
        completed: true
      },
      {
        id: 'sb-2',
        name: 'Sardar Patel Planetarium & Floral Clock',
        hint: 'Verify the mechanical second hand on the living flower bed.',
        lat: 22.316,
        lng: 73.189,
        historicalNote: 'One of the first floral clocks established in India.',
        completed: true
      },
      {
        id: 'sb-3',
        name: 'Vishwamitri River Suspension Footbridge',
        hint: 'Document the suspension wire cables and water level gauge.',
        lat: 22.3175,
        lng: 73.191,
        historicalNote: 'Pedestrian bridge connecting Sayaji Baug to the zoological park.',
        completed: false
      },
      {
        id: 'sb-4',
        name: 'Baroda Museum & Picture Gallery',
        hint: 'Locate the colossal blue whale skeleton in the natural history wing.',
        lat: 22.313,
        lng: 73.188,
        historicalNote: 'Founded in 1887, housing priceless European oil paintings.',
        completed: false
      }
    ]
  }
];

export const VADODARA_WARDS: WardInfo[] = [
  {
    wardNumber: 1,
    name: 'Alkapuri & Race Course',
    nameGujarati: 'અલકાપુરી અને રેસકોર્સ',
    officeAddress: 'VMC Ward 1 Office, Behind Inox Cinema, Race Course',
    engineerName: 'Er. Rajesh V. Parmar',
    engineerPhone: '+91 265 233 4101',
    activeIssuesCount: 14,
    resolvedThisMonth: 82
  },
  {
    wardNumber: 2,
    name: 'Akota & Old Padra Road',
    nameGujarati: 'અકોટા અને ઓલ્ડ પાદરા રોડ',
    officeAddress: 'VMC Ward 2 Office, Near Akota Stadium',
    engineerName: 'Er. Sunil K. Makwana',
    engineerPhone: '+91 265 235 6211',
    activeIssuesCount: 9,
    resolvedThisMonth: 64
  },
  {
    wardNumber: 4,
    name: 'Sayajigunj & Station Area',
    nameGujarati: 'સયાજીગંજ અને સ્ટેશન વિસ્તાર',
    officeAddress: 'VMC Ward 4 Office, Near Kala Ghoda, Sayajigunj',
    engineerName: 'Er. Nilesh Solanki',
    engineerPhone: '+91 265 236 9914',
    activeIssuesCount: 12,
    resolvedThisMonth: 88
  },
  {
    wardNumber: 6,
    name: 'Karelibaug & Bahucharaji',
    nameGujarati: 'કારેલીબાગ અને બહુચરાજી',
    officeAddress: 'VMC Ward 6 Office, Bahucharaji Road, Karelibaug',
    engineerName: 'Er. Pankaj Bhatt',
    engineerPhone: '+91 265 246 3201',
    activeIssuesCount: 11,
    resolvedThisMonth: 77
  },
  {
    wardNumber: 7,
    name: 'Raopura, Mandvi & Sursagar',
    nameGujarati: 'રાવપુરા, માંડવી અને સૂરસાગર',
    officeAddress: 'VMC Central Ward Office, Nyay Mandir Compound',
    engineerName: 'Er. Dharmesh Pandya',
    engineerPhone: '+91 265 242 1805',
    activeIssuesCount: 21,
    resolvedThisMonth: 95
  },
  {
    wardNumber: 8,
    name: 'Fatehgunj & MSU Campus',
    nameGujarati: 'ફતેહગંજ અને એમ.એસ. યુનિ.',
    officeAddress: 'VMC Ward 8 Office, Near Rosary School, Fatehgunj',
    engineerName: 'Er. Sandeep Chudasama',
    engineerPhone: '+91 265 279 2314',
    activeIssuesCount: 8,
    resolvedThisMonth: 54
  },
  {
    wardNumber: 14,
    name: 'Gotri & Harinagar',
    nameGujarati: 'ગોત્રી અને હરિનગર',
    officeAddress: 'VMC Ward 14 Office, Near Gotri Water Tank',
    engineerName: 'Er. Mayur Joshi',
    engineerPhone: '+91 265 237 0192',
    activeIssuesCount: 15,
    resolvedThisMonth: 68
  }
];

export const CATEGORY_DETAILS: Record<
  string,
  { label: string; icon: string; color: string; description: string }
> = {
  pothole: {
    label: 'Roads & Potholes',
    icon: 'Construction',
    color: '#F97316',
    description: 'Crater damage, broken asphalt, sunken utility trench'
  },
  streetlight: {
    label: 'Streetlights & Grid',
    icon: 'Lightbulb',
    color: '#FBBF24',
    description: 'Blackout zones, flickering lamps, exposed feeder box'
  },
  water_leak: {
    label: 'Water Leak & Supply',
    icon: 'Droplets',
    color: '#38BDF8',
    description: 'Potable pipeline rupture, pressure drop, clean water waste'
  },
  garbage: {
    label: 'Garbage & Sanitation',
    icon: 'Trash2',
    color: '#A3E635',
    description: 'Overflowing dumpsters, plastic litter, unauthorized debris'
  },
  stray_cattle: {
    label: 'Stray Cattle Hazard',
    icon: 'AlertTriangle',
    color: '#EF4444',
    description: 'Cattle blocking traffic flyovers, road obstruction'
  },
  live_wires: {
    label: 'Electricity & Live Wires',
    icon: 'Zap',
    color: '#EC4899',
    description: 'Severed overhead cables, sparking boxes, low-hanging wires'
  },
  drainage: {
    label: 'Drainage & Gutter Silt',
    icon: 'Waves',
    color: '#06B6D4',
    description: 'Choked culverts, monsoon waterlogging, foul backflow'
  }
};
