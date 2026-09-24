import {
  Issue,
  HeritageQuest,
  FoodHygieneSpot,
  CommunityDrive,
  CitizenChampion,
  WardInfo
} from '../types';

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'issue-1',
    trackingNumber: 'BDQ-2026-8921',
    title: 'Severe road subsidence & pothole crater on RC Dutt Road',
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
    upvotes: 42,
    userUpvoted: false,
    corroborationsCount: 19,
    createdAt: '2026-09-21T08:30:00Z',
    resolvedAt: '2026-09-23T16:15:00Z',
    estimatedTurnaroundHours: 36,
    assignedDepartment: 'VMC Engineering Division (West Zone)',
    assignedOfficer: 'Er. Rajesh V. Parmar (Ward 1 Executive)',
    beforeImageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-1',
        timestamp: 'Sep 21, 08:30 AM',
        status: 'reported',
        note: 'Issue reported with high-resolution geocoded photo by citizen Hardik Shah.',
        actor: 'Citizen App',
        actorRole: 'Citizen Contributor',
        badge: 'Logged'
      },
      {
        id: 't-2',
        timestamp: 'Sep 21, 09:45 AM',
        status: 'verified',
        note: 'Triaged and verified by VMC Control Desk. Upgraded to Hazard priority due to traffic density.',
        actor: 'Control Room Officer',
        actorRole: 'VMC Central Dispatch',
        badge: 'Triage Done'
      },
      {
        id: 't-3',
        timestamp: 'Sep 22, 11:20 AM',
        status: 'dispatched',
        note: 'Work order #VMC-WO-8422 assigned to M/s Shrinath Roadworks & Bitumen Squad 2.',
        actor: 'Er. Rajesh Parmar',
        actorRole: 'Ward 1 Executive Engineer',
        badge: 'Crew Dispatched'
      },
      {
        id: 't-4',
        timestamp: 'Sep 23, 03:00 PM',
        status: 'in_progress',
        note: 'Compacting and cold asphalt patch completed with bitumen sealant.',
        actor: 'Field Foreman Jagdish',
        actorRole: 'Site Crew Lead',
        badge: 'On-Site Work'
      },
      {
        id: 't-5',
        timestamp: 'Sep 23, 04:15 PM',
        status: 'resolved',
        note: 'Site inspected, level tested, and road cleared for smooth vehicular movement. Confirmed by 3 local shopkeepers.',
        actor: 'Er. Rajesh Parmar',
        actorRole: 'Ward 1 Executive Engineer',
        badge: 'Audit Verified'
      }
    ],
    reporterKarmaAwarded: 50
  },
  {
    id: 'issue-2',
    trackingNumber: 'BDQ-2026-9044',
    title: 'Cluster of 5 streetlights blacked out near Dairy Den Circle',
    description: 'Main pedestrian lane between Dairy Den Circle and Sayajigunj Railway Station underpass is completely pitch dark after 7:30 PM. Women and commuters feel unsafe.',
    category: 'streetlight',
    wardName: 'Sayajigunj',
    wardNumber: 4,
    landmark: 'Between Dairy Den and Central Bus Terminus Lane',
    address: 'Station Road, Sayajigunj, Vadodara 390005',
    lat: 22.3114,
    lng: 73.1895,
    status: 'in_progress',
    urgency: 'high',
    upvotes: 67,
    userUpvoted: true,
    corroborationsCount: 28,
    createdAt: '2026-09-23T19:40:00Z',
    estimatedTurnaroundHours: 24,
    assignedDepartment: 'VMC Electrical & Public Lighting Cell',
    assignedOfficer: 'Er. Nilesh Solanki (Central Zone)',
    beforeImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-21',
        timestamp: 'Sep 23, 07:40 PM',
        status: 'reported',
        note: 'Reported by MSU student Priya Bhatt with photos of darkened pedestrian pavement.',
        actor: 'Priya Bhatt',
        actorRole: 'Citizen Contributor'
      },
      {
        id: 't-22',
        timestamp: 'Sep 23, 08:15 PM',
        status: 'verified',
        note: 'Feeder pillar #SS-14 identified as tripped due to moisture ingress.',
        actor: 'VMC Electrical Helpline',
        actorRole: 'Dispatcher'
      },
      {
        id: 't-23',
        timestamp: 'Sep 24, 09:30 AM',
        status: 'in_progress',
        note: 'Hydraulic lift truck on site. Replacing burnt wiring junction box and 4 LED fixtures.',
        actor: 'VMC Line Inspector Dilip',
        actorRole: 'Field Electrician'
      }
    ],
    reporterKarmaAwarded: 35
  },
  {
    id: 'issue-3',
    trackingNumber: 'BDQ-2026-9112',
    title: 'Stormwater drain blockage causing waterlogging at Harinagar crossroad',
    description: 'Plastic trash and silt choked the RCC culvert grate. Even a 15-minute drizzle causes 1 foot water accumulation in front of commercial shops.',
    category: 'drainage',
    wardName: 'Gotri',
    wardNumber: 14,
    landmark: 'Harinagar Char Rasta, near Gotri Water Tank',
    address: 'Gotri Main Road, Vadodara 390021',
    lat: 22.3188,
    lng: 73.1432,
    status: 'dispatched',
    urgency: 'high',
    upvotes: 38,
    userUpvoted: false,
    corroborationsCount: 14,
    createdAt: '2026-09-24T06:10:00Z',
    estimatedTurnaroundHours: 24,
    assignedDepartment: 'VMC Storm Water Drainage Dept',
    assignedOfficer: 'Er. Mayur Joshi (West Zone Drainage)',
    beforeImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-31',
        timestamp: 'Sep 24, 06:10 AM',
        status: 'reported',
        note: 'Filed by Gotri Residents Welfare rep with video evidence.',
        actor: 'Jayesh Patel',
        actorRole: 'Neighborhood Leader'
      },
      {
        id: 't-32',
        timestamp: 'Sep 24, 08:00 AM',
        status: 'dispatched',
        note: 'Suction jetting machine machine unit #4 routed from Gorwa depot.',
        actor: 'Er. Mayur Joshi',
        actorRole: 'Drainage Officer'
      }
    ],
    reporterKarmaAwarded: 30
  },
  {
    id: 'issue-4',
    trackingNumber: 'BDQ-2026-8805',
    title: 'Illegal construction debris dumped along Vishwamitri buffer line',
    description: 'Approx 3 truckloads of broken concrete and tiles dumped near the river bank path. Blocks morning joggers and damages the riparian slope.',
    category: 'garbage',
    wardName: 'Fatehgunj',
    wardNumber: 8,
    landmark: 'Behind MSU Faculty of Technology Pavilion',
    address: 'Prof. C.C. Mehta Road, Fatehgunj, Vadodara 390002',
    lat: 22.3217,
    lng: 73.1901,
    status: 'verified',
    urgency: 'normal',
    upvotes: 53,
    userUpvoted: false,
    corroborationsCount: 22,
    createdAt: '2026-09-23T11:00:00Z',
    estimatedTurnaroundHours: 48,
    assignedDepartment: 'VMC Solid Waste Management Division',
    assignedOfficer: 'Shri B.K. Rathwa (Sanitation Inspector)',
    beforeImageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-41',
        timestamp: 'Sep 23, 11:00 AM',
        status: 'reported',
        note: 'Reported by MSU Nature Club volunteers.',
        actor: 'Nature Club MSU',
        actorRole: 'Citizen Group'
      },
      {
        id: 't-42',
        timestamp: 'Sep 23, 02:30 PM',
        status: 'verified',
        note: 'Sanitation team visited spot. Notice being drafted for nearby building contractor.',
        actor: 'Shri B.K. Rathwa',
        actorRole: 'Sanitation Inspector'
      }
    ],
    reporterKarmaAwarded: 25
  },
  {
    id: 'issue-5',
    trackingNumber: 'BDQ-2026-9188',
    title: 'Herd of unattended stray cattle roaming middle of Akota Bridge ramp',
    description: '6 to 8 cows resting on the flyover descent towards Dandia Bazar. Two cars had to brake violently. Urgent relocation needed.',
    category: 'stray_cattle',
    wardName: 'Akota',
    wardNumber: 2,
    landmark: 'East Descent of Akota-Dandia Bazar Flyover',
    address: 'Akota Bridge, Vadodara 390020',
    lat: 22.2965,
    lng: 73.167,
    status: 'in_progress',
    urgency: 'hazard',
    upvotes: 84,
    userUpvoted: true,
    corroborationsCount: 31,
    createdAt: '2026-09-24T14:15:00Z',
    estimatedTurnaroundHours: 4,
    assignedDepartment: 'VMC Cattle Nuisance Control Department (CNCD)',
    assignedOfficer: 'Inspector Mukesh Rabari',
    beforeImageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-51',
        timestamp: 'Sep 24, 02:15 PM',
        status: 'reported',
        note: 'Instant hazard alert raised with live GPS lock.',
        actor: 'Traffic Commuter Ananya',
        actorRole: 'Citizen'
      },
      {
        id: 't-52',
        timestamp: 'Sep 24, 02:35 PM',
        status: 'in_progress',
        note: 'CNCD Cattle impound truck #2 dispatched with tranquil team and ropes to shift cows to Khatamba gaushala.',
        actor: 'CNCD Flying Squad',
        actorRole: 'VMC Field Unit'
      }
    ],
    reporterKarmaAwarded: 40
  },
  {
    id: 'issue-6',
    trackingNumber: 'BDQ-2026-8740',
    title: 'Broken sandstone border on heritage promenade near Sursagar',
    description: 'Heritage carved balustrade damaged by parking truck. Pieces are loose and could fall into the lake perimeter walk.',
    category: 'heritage_parks',
    wardName: 'Raopura',
    wardNumber: 7,
    landmark: 'West bank of Sursagar Lake, opposite Music College',
    address: 'Sursagar West Walkway, Vadodara 390001',
    lat: 22.3023,
    lng: 73.204,
    status: 'resolved',
    urgency: 'normal',
    upvotes: 49,
    userUpvoted: false,
    corroborationsCount: 17,
    createdAt: '2026-09-19T10:00:00Z',
    resolvedAt: '2026-09-22T17:00:00Z',
    estimatedTurnaroundHours: 72,
    assignedDepartment: 'VMC Heritage Conservation & Gardens Cell',
    assignedOfficer: 'Architect Smita Pandya',
    beforeImageUrl: 'https://images.unsplash.com/photo-1590059390047-66a877549019?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-61',
        timestamp: 'Sep 19, 10:00 AM',
        status: 'reported',
        note: 'Reported by Heritage Walk guide Dharmesh Vora.',
        actor: 'Dharmesh Vora',
        actorRole: 'Heritage Guide'
      },
      {
        id: 't-62',
        timestamp: 'Sep 20, 11:30 AM',
        status: 'in_progress',
        note: 'Artisan stonemason procured matching Dhrangadhra stone for heritage restoration.',
        actor: 'Heritage Cell',
        actorRole: 'Specialist Crew'
      },
      {
        id: 't-63',
        timestamp: 'Sep 22, 05:00 PM',
        status: 'resolved',
        note: 'Restoration completed using lime mortar as per archaeological guidelines.',
        actor: 'Smita Pandya',
        actorRole: 'Heritage Officer'
      }
    ],
    reporterKarmaAwarded: 45
  },
  {
    id: 'issue-7',
    trackingNumber: 'BDQ-2026-9201',
    title: 'Defective countdown timer on pedestrian signal at Chakli Circle',
    description: 'Countdown stays stuck on 9 seconds while vehicles accelerate. Creates grave danger for senior citizens crossing from race course side.',
    category: 'traffic_signal',
    wardName: 'Alkapuri',
    wardNumber: 1,
    landmark: 'Chakli Circle East pedestrian crosswalk',
    address: 'Race Course Road, Alkapuri, Vadodara 390007',
    lat: 22.3142,
    lng: 73.1685,
    status: 'reported',
    urgency: 'high',
    upvotes: 29,
    userUpvoted: false,
    corroborationsCount: 9,
    createdAt: '2026-09-24T15:20:00Z',
    estimatedTurnaroundHours: 12,
    assignedDepartment: 'Vadodara Smart City Traffic Control (VCSCL)',
    assignedOfficer: 'Inspector K.M. Zala',
    beforeImageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-71',
        timestamp: 'Sep 24, 03:20 PM',
        status: 'reported',
        note: 'Submitted by commuter Devanshi Trivedi with timestamp video.',
        actor: 'Devanshi Trivedi',
        actorRole: 'Citizen'
      }
    ],
    reporterKarmaAwarded: 20
  },
  {
    id: 'issue-8',
    trackingNumber: 'BDQ-2026-9008',
    title: 'Underground drinking water pipeline leak flooding lane in Karelibaug',
    description: 'Clean municipal potable water gushing from cracked PVC joint since 6 AM. Wasting thousands of liters and reducing tap pressure in surrounding houses.',
    category: 'drainage',
    wardName: 'Karelibaug',
    wardNumber: 6,
    landmark: 'Lane opposite Amrapali Shopping Centre',
    address: 'Bahucharaji Road, Karelibaug, Vadodara 390018',
    lat: 22.3245,
    lng: 73.2045,
    status: 'in_progress',
    urgency: 'hazard',
    upvotes: 72,
    userUpvoted: false,
    corroborationsCount: 35,
    createdAt: '2026-09-24T07:15:00Z',
    estimatedTurnaroundHours: 8,
    assignedDepartment: 'VMC Water Works Department',
    assignedOfficer: 'Er. Pankaj Bhatt (North Zone)',
    beforeImageUrl: 'https://images.unsplash.com/photo-1527672809634-04ed36500acd?auto=format&fit=crop&w=800&q=80',
    timeline: [
      {
        id: 't-81',
        timestamp: 'Sep 24, 07:15 AM',
        status: 'reported',
        note: 'Reported by Karelibaug resident committee.',
        actor: 'Bharat Solanki',
        actorRole: 'Local Resident'
      },
      {
        id: 't-82',
        timestamp: 'Sep 24, 08:30 AM',
        status: 'verified',
        note: 'Main distribution valve throttled to prevent further freshwater loss.',
        actor: 'VMC Valve Operator',
        actorRole: 'Water Works'
      },
      {
        id: 't-83',
        timestamp: 'Sep 24, 10:00 AM',
        status: 'in_progress',
        note: 'Excavation team isolating damaged 150mm pipe section.',
        actor: 'Er. Pankaj Bhatt',
        actorRole: 'Water Works Engineer'
      }
    ],
    reporterKarmaAwarded: 40
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
        nameGujarati: 'કીર્તિ મંદિર',
        hint: 'Find the bronze sun medallion above the entrance courtyard.',
        lat: 22.3082,
        lng: 73.1952,
        historicalNote: 'Built in 1936 to mark the golden jubilee of Maharaja Sayajirao Gaekwad III, featuring murals by Nandalal Bose.'
      },
      {
        id: 's-2',
        name: 'Tambekar Wada',
        nameGujarati: 'તાંબેકર વાડા',
        hint: 'Inspect the 19th-century Maratha wood carvings and wall frescoes.',
        lat: 22.3015,
        lng: 73.2085,
        historicalNote: 'Residence of Bhaskar Vithal Tambekar, Diwan of Baroda (1849-54), renowned for tempera paintings depicting scenes from Mahabharata.'
      },
      {
        id: 's-3',
        name: 'Nyay Mandir (Temple of Justice)',
        nameGujarati: 'ન્યાય મંદિર',
        hint: 'Spot the statue of Maharani Chimnabai I in the central marble hall.',
        lat: 22.3018,
        lng: 73.2052,
        historicalNote: 'Commissioned by Maharaja Sayajirao in 1896, designed by British architect Robert Chisholm in Byzantine style.'
      },
      {
        id: 's-4',
        name: 'Mandvi City Gate',
        nameGujarati: 'માંડવી દરવાજો',
        hint: 'Walk beneath the Mughal-era arched pavilion at the exact crossways.',
        lat: 22.3005,
        lng: 73.2098,
        historicalNote: 'Historic center of old Vadodara where octroi taxes were levied during Sultanate rule.'
      },
      {
        id: 's-5',
        name: 'Laxmi Vilas Palace East Gate',
        nameGujarati: 'લક્ષ્મી વિલાસ પેલેસ',
        hint: 'Photograph the red Agra sandstone clock tower from the public avenue.',
        lat: 22.2938,
        lng: 73.1915,
        historicalNote: 'Four times the size of Buckingham Palace, completed in 1890 with Venetian mosaic floors and stained glass.'
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
        historicalNote: 'Gifted by Maharaja Sayajirao to the children of Baroda, operating on a 10-inch miniature gauge.',
        completed: true
      },
      {
        id: 'sb-2',
        name: 'Sardar Patel Planetarium & Floral Clock',
        hint: 'Verify the mechanical second hand on the living flower bed.',
        lat: 22.316,
        lng: 73.189,
        historicalNote: 'One of the first floral clocks established in India, powered by an underground clockwork mechanism.',
        completed: true
      },
      {
        id: 'sb-3',
        name: 'Vishwamitri River Suspension Footbridge',
        hint: 'Document the suspension wire cables and water level gauge.',
        lat: 22.3175,
        lng: 73.191,
        historicalNote: 'Pedestrian bridge connecting Sayaji Baug to the zoological park across the Vishwamitri river.',
        completed: false
      },
      {
        id: 'sb-4',
        name: 'Baroda Museum & Picture Gallery',
        hint: 'Locate the colossal blue whale skeleton in the natural history wing.',
        lat: 22.313,
        lng: 73.188,
        historicalNote: 'Founded in 1887, housing priceless European oil paintings and Akota bronzes from the 5th century CE.',
        completed: false
      }
    ]
  },
  {
    id: 'quest-sursagar',
    title: 'Sursagar Midnight Waterfront Stroll',
    titleGujarati: 'સૂરસાગર તળાવ સાંસ્કૃતિક પથ',
    subtitle: '2.1 km illuminated lake circuit in the heart of old Baroda',
    description: 'An evening walk around the iconic lake. Audit the perimeter waste bins, check solar illumination, and admire the majestic 120-ft Sarveshwar Mahadev.',
    distanceKm: 2.1,
    estMinutes: 30,
    startingPoint: 'Music College Corner, Sursagar',
    stopsCount: 3,
    karmaReward: 90,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    joined: false,
    progressPercent: 0,
    stops: [
      {
        id: 'ss-1',
        name: 'Faculty of Performing Arts (Music College)',
        hint: 'Look up at the timber eaves where Ustad Faiyaz Khan once sang.',
        lat: 22.303,
        lng: 73.203,
        historicalNote: 'Established under royal patronage to preserve classical Gwalior and Agra gharana vocal traditions.'
      },
      {
        id: 'ss-2',
        name: 'Sarveshwar Mahadev Lake Center Viewpoint',
        hint: 'Check the lake aerator fountain operation from the viewing deck.',
        lat: 22.3023,
        lng: 73.2045,
        historicalNote: 'The 120-foot bronze-plated idol stands at the exact center of Chandan Talav (Sursagar).'
      },
      {
        id: 'ss-3',
        name: 'Lehripura Gate Walkway',
        hint: 'Note the ancient wooden carved brackets under the third archway.',
        lat: 22.301,
        lng: 73.206,
        historicalNote: 'Built in 1558 as the western entrance to the citadel of Baroda.'
      }
    ]
  }
];

export const FOOD_HYGIENE_SPOTS: FoodHygieneSpot[] = [
  {
    id: 'food-1',
    name: 'Mahakali Sev Usal',
    area: 'Mandvi / Ghee Kanta',
    specialty: 'Spicy Tari Sev Usal with Bun & Spring Onion',
    hygieneRating: 4.8,
    cleanWaterVerified: true,
    dustbinAvailable: true,
    inspectedDate: 'Sep 22, 2026',
    crowdLevel: 'Brisk',
    verifiedCount: 142,
    recommendationNote: 'VMC Food Safety cell verified RO water dispensers and stainless steel serving counters. Proper waste segregation bin installed.',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'food-2',
    name: 'Shree Duliram Na Peda',
    area: 'Raopura',
    specialty: 'Pure Mawa Peda (Cardamom & Kesar)',
    hygieneRating: 4.9,
    cleanWaterVerified: true,
    dustbinAvailable: true,
    inspectedDate: 'Sep 20, 2026',
    crowdLevel: 'Packed',
    verifiedCount: 215,
    recommendationNote: 'Legacy establishment since 1928. Clean glass-enclosed prep area, hairnets and gloves worn by all staff. Grade A cleanliness.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'food-3',
    name: 'Payal Vadapav & Tea Stalls',
    area: 'Fatehgunj (Near MSU Arts)',
    specialty: 'Crispy Garlic Chutney Vadapav & Ginger Chai',
    hygieneRating: 4.6,
    cleanWaterVerified: true,
    dustbinAvailable: true,
    inspectedDate: 'Sep 23, 2026',
    crowdLevel: 'Packed',
    verifiedCount: 98,
    recommendationNote: 'Fresh oil rotation logged daily. Clean wet/dry dustbin pair outside stall maintained without litter spilling onto road.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'food-4',
    name: 'Jagdish Farshan & Sweets',
    area: 'Jubilee Baug / Sayajigunj',
    specialty: 'Bhakarwadi, Lilo Chevdo & Khandvi',
    hygieneRating: 4.9,
    cleanWaterVerified: true,
    dustbinAvailable: true,
    inspectedDate: 'Sep 18, 2026',
    crowdLevel: 'Moderate',
    verifiedCount: 180,
    recommendationNote: 'State-of-the-art food storage, zero single-use plastic bags. FSSAI grade 5-star hygiene rating certified.',
    imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b3d5ebcd94?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'food-5',
    name: 'Manmohan Samosa & Kachori',
    area: 'Kothi Char Rasta',
    specialty: 'Kothi Special Big Samosa with Mint Chutney',
    hygieneRating: 4.7,
    cleanWaterVerified: true,
    dustbinAvailable: true,
    inspectedDate: 'Sep 21, 2026',
    crowdLevel: 'Brisk',
    verifiedCount: 112,
    recommendationNote: 'Pavement kept scrubbed clean twice daily. Clean paper plates used with designated compost receptacle.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
  }
];

export const COMMUNITY_DRIVES: CommunityDrive[] = [
  {
    id: 'drive-1',
    title: 'Solar Convex Safety Mirrors for Blind Curves in Karelibaug Old Lanes',
    area: 'Karelibaug (Ward 6)',
    wardNumber: 6,
    description: 'Narrow intersections near Bahucharaji Road have caused repeated two-wheeler bumps. Installing 6 high-durability polycarbonate convex mirrors with anti-glare hoods.',
    targetAmount: 24000,
    raisedAmount: 24000,
    supportersCount: 48,
    status: 'completed',
    organizer: 'Karelibaug Residents Civic Forum',
    organizerRole: 'Citizen Committee',
    vmcPermitNumber: 'VMC-ENG-2026-M41',
    impactMetrics: '6 mirrors installed, 0 collisions reported in past 30 days',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80',
    userPledged: true
  },
  {
    id: 'drive-2',
    title: '150 Native Neem & Banyan Saplings for Vishwamitri River Green Buffer',
    area: 'Sayajigunj / Fatehgunj Border',
    wardNumber: 4,
    description: 'Planting deep-root native trees to strengthen riverbank soil, prevent monsoon erosion, and provide shade for the community morning jogger trail.',
    targetAmount: 32000,
    raisedAmount: 24500,
    supportersCount: 62,
    status: 'funding',
    organizer: 'MSU Green Alliance & Vadodara Cyclists Club',
    organizerRole: 'Youth Volunteer Group',
    vmcPermitNumber: 'VMC-GRN-2026-89',
    impactMetrics: '76% funded. Sapling plantation drive scheduled for this Sunday morning.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    userPledged: false
  },
  {
    id: 'drive-3',
    title: 'High-Visibility Reflective Collars for 150 Stray Dogs on Old Padra Road',
    area: 'Akota / OP Road (Ward 2)',
    wardNumber: 2,
    description: 'Fast moving traffic at night poses danger to community dogs and motorists alike. Providing water-resistant luminous orange collars fitted by trained animal caregivers.',
    targetAmount: 18000,
    raisedAmount: 15400,
    supportersCount: 44,
    status: 'funding',
    organizer: 'Vadodara Animal Rescue Coalition',
    organizerRole: 'Animal Welfare NGO',
    vmcPermitNumber: 'VMC-CNCD-REC-102',
    impactMetrics: '110 collars secured. Night collisions reduced by 70% in pilot lane.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    userPledged: false
  }
];

export const CITIZEN_CHAMPIONS: CitizenChampion[] = [
  {
    rank: 1,
    name: 'Dr. Hardik V. Shah',
    ward: 'Alkapuri (Ward 1)',
    karma: 1840,
    issuesResolved: 28,
    streakDays: 42,
    badge: 'Civic Guardian',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    rank: 2,
    name: 'Pooja Trivedi',
    ward: 'Fatehgunj (Ward 8)',
    karma: 1520,
    issuesResolved: 22,
    streakDays: 31,
    badge: 'Trail Leader',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    rank: 3,
    name: 'Rohan M. Patel',
    ward: 'Gotri (Ward 14)',
    karma: 1390,
    issuesResolved: 19,
    streakDays: 24,
    badge: 'Pothole Patrol',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    rank: 4,
    name: 'Farida Malek',
    ward: 'Raopura (Ward 7)',
    karma: 1180,
    issuesResolved: 16,
    streakDays: 18,
    badge: 'Heritage Scout',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    rank: 5,
    name: 'Er. Chirag Dave',
    ward: 'Karelibaug (Ward 6)',
    karma: 950,
    issuesResolved: 14,
    streakDays: 15,
    badge: 'Lighting Sentinel',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
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
    wardNumber: 3,
    name: 'Subhanpura & Gorwa',
    nameGujarati: 'શુભાનપુરા અને ગોરવા',
    officeAddress: 'VMC Ward 3 Office, Near BIDC Estate, Gorwa',
    engineerName: 'Er. Hitesh Barot',
    engineerPhone: '+91 265 228 1403',
    activeIssuesCount: 18,
    resolvedThisMonth: 71
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
    wardNumber: 5,
    name: 'Manjalpur & Tarsali',
    nameGujarati: 'માંજલપુર અને તરસાલી',
    officeAddress: 'VMC Ward 5 Office, Near Darbar Chokdi, Manjalpur',
    engineerName: 'Er. Bhavesh Gohil',
    engineerPhone: '+91 265 264 5502',
    activeIssuesCount: 16,
    resolvedThisMonth: 59
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
    nameGujarati: 'ગોત્રી અને હરિ区域નગર',
    officeAddress: 'VMC Ward 14 Office, Near Gotri Water Tank',
    engineerName: 'Er. Mayur Joshi',
    engineerPhone: '+91 265 237 0192',
    activeIssuesCount: 15,
    resolvedThisMonth: 68
  }
];

export const CATEGORY_DETAILS: Record<
  string,
  { label: string; iconName: string; color: string; description: string }
> = {
  pothole: {
    label: 'Roads & Potholes',
    iconName: 'Construction',
    color: '#F97316',
    description: 'Crater damage, broken asphalt, sunken utility trench'
  },
  streetlight: {
    label: 'Streetlights & Grid',
    iconName: 'Lightbulb',
    color: '#FBBF24',
    description: 'Blackout zones, flickering lamps, exposed feeder box'
  },
  drainage: {
    label: 'Drainage & Water',
    iconName: 'Droplets',
    color: '#38BDF8',
    description: 'Clogged gutter, pipe fracture, monsoon backflow'
  },
  garbage: {
    label: 'Waste & Sanitation',
    iconName: 'Trash2',
    color: '#A3E635',
    description: 'Overflowing dumpster, unauthorized debris dump'
  },
  stray_cattle: {
    label: 'Stray Cattle & Hazard',
    iconName: 'AlertTriangle',
    color: '#EF4444',
    description: 'Cattle on high-speed flyovers, injured animals'
  },
  heritage_parks: {
    label: 'Parks & Heritage',
    iconName: 'TreePine',
    color: '#34D399',
    description: 'Damaged garden benches, broken heritage monuments'
  },
  traffic_signal: {
    label: 'Traffic Signals',
    iconName: 'TrafficCone',
    color: '#FB7185',
    description: 'Broken timers, fallen signboards, blind intersection'
  }
};
