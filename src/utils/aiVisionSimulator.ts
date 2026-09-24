import { AiVisionAnalysis, IssueCategory, IssueUrgency } from '../types';

interface AiDetectionPreset {
  keywords: string[];
  category: IssueCategory;
  categoryLabel: string;
  defectSummary: string;
  technicalDescription: string;
  urgency: IssueUrgency;
  hazardScore: number;
  recommendedDepartment: string;
  estimatedResolutionHours: number;
  boundingBoxes: Array<{ x: number; y: number; width: number; height: number; label: string }>;
  suggestedTags: string[];
  defaultLandmark: string;
  defaultWard: { name: string; number: number; lat: number; lng: number };
}

export const AI_DETECTION_PRESETS: AiDetectionPreset[] = [
  {
    keywords: ['pothole', 'crater', 'road', 'asphalt', 'tarmac'],
    category: 'pothole',
    categoryLabel: 'Road Surface Fracture & Pothole',
    defectSummary: 'Severe tarmac crater with aggregate layer subsidence',
    technicalDescription:
      'Computer vision detected a deep asphalt depression (~14cm depth, ~75cm diameter) on high-density vehicular carriageway. Aggregate sub-base is exposed with edges eroding under traffic load. Immediate cold-mix or hot bituminous compaction required to prevent two-wheeler skid accidents.',
    urgency: 'hazard',
    hazardScore: 88,
    recommendedDepartment: 'VMC Roads & Bridges Engineering Division (West Zone)',
    estimatedResolutionHours: 24,
    boundingBoxes: [
      { x: 22, y: 35, width: 55, height: 42, label: 'Bitumen Crater (Conf: 96.4%)' }
    ],
    suggestedTags: ['Road Hazard', 'Tarmac Crater', 'Immediate Compaction', 'Two-Wheeler Risk'],
    defaultLandmark: 'RC Dutt Road, 100m West of Inox Cinema',
    defaultWard: { name: 'Alkapuri', number: 1, lat: 22.3105, lng: 73.1704 }
  },
  {
    keywords: ['cattle', 'cow', 'bull', 'animal'],
    category: 'stray_cattle',
    categoryLabel: 'Stray Cattle Roadway Obstruction',
    defectSummary: 'Unattended cattle herd blocking active vehicular lane',
    technicalDescription:
      'Vision model identified multiple livestock (bovine) obstructing fast-moving traffic lane. Herd is stationary near bridge descent without reflective gear or supervision, presenting a severe risk of high-speed vehicular collision, especially post-dusk.',
    urgency: 'hazard',
    hazardScore: 92,
    recommendedDepartment: 'VMC Cattle Nuisance Control Department (CNCD Flying Squad)',
    estimatedResolutionHours: 4,
    boundingBoxes: [
      { x: 18, y: 25, width: 62, height: 58, label: 'Bovine Obstruction (Conf: 98.1%)' }
    ],
    suggestedTags: ['Cattle Hazard', 'CNCD Dispatch', 'Bridge Safety', 'Urgent Impound'],
    defaultLandmark: 'Akota-Dandia Bazar Flyover East Ramp',
    defaultWard: { name: 'Akota', number: 2, lat: 22.2965, lng: 73.167 }
  },
  {
    keywords: ['garbage', 'trash', 'waste', 'dump', 'plastic'],
    category: 'garbage',
    categoryLabel: 'Municipal Waste Accumulation & Overflow',
    defectSummary: 'Overflowing commercial dumpster with street litter spillage',
    technicalDescription:
      'Visual analysis confirms open municipal refuse spill exceeding collection receptacle capacity by ~45%. Debris includes decomposing organic waste, single-use plastic, and construction rubble. Poses public hygiene risk and footpath encroachment.',
    urgency: 'normal',
    hazardScore: 64,
    recommendedDepartment: 'VMC Solid Waste Management Cell (Central Zone)',
    estimatedResolutionHours: 24,
    boundingBoxes: [
      { x: 15, y: 28, width: 68, height: 52, label: 'Waste Accumulation (Conf: 94.7%)' }
    ],
    suggestedTags: ['Waste Overflow', 'Compactor Truck Required', 'Sanitation Notice', 'Cleanliness'],
    defaultLandmark: 'Near Mandvi Gate Crossway, Old City',
    defaultWard: { name: 'Raopura', number: 7, lat: 22.3005, lng: 73.205 }
  },
  {
    keywords: ['light', 'dark', 'lamp', 'streetlight', 'night'],
    category: 'streetlight',
    categoryLabel: 'Streetlight Feeder Failure & Dark Zone',
    defectSummary: 'Cluster of public luminaires unlit along pedestrian corridor',
    technicalDescription:
      'Night-time lux and edge analysis indicates dark corridor spanning 180 meters. Feeder circuit tripping or luminaire LED driver burnout detected. Creates significant pedestrian vulnerability for commuters and university students.',
    urgency: 'high',
    hazardScore: 78,
    recommendedDepartment: 'VMC Public Lighting Cell & Electrical Division',
    estimatedResolutionHours: 18,
    boundingBoxes: [
      { x: 30, y: 15, width: 40, height: 65, label: 'Unlit Luminaire Pole (Conf: 91.8%)' }
    ],
    suggestedTags: ['Lighting Outage', 'Feeder Pillar Trip', 'Student Safety', 'Hydraulic Lift'],
    defaultLandmark: 'Dairy Den Circle to Railway Underpass Corridor',
    defaultWard: { name: 'Sayajigunj', number: 4, lat: 22.3114, lng: 73.1895 }
  },
  {
    keywords: ['wire', 'electric', 'cable', 'pole', 'spark'],
    category: 'live_wires',
    categoryLabel: 'Exposed Electrical Cable / Dangling Live Wire',
    defectSummary: 'Severed low-tension electrical cable hanging near footpath',
    technicalDescription:
      'Critical visual safety alert: Overhead utility cable rupture with exposed conductors hanging at pedestrian head level (~1.8m above sidewalk). High risk of electrical shock or short-circuit fire during ambient moisture conditions.',
    urgency: 'hazard',
    hazardScore: 97,
    recommendedDepartment: 'MGVCL & VMC Joint Emergency Electrical Unit',
    estimatedResolutionHours: 6,
    boundingBoxes: [
      { x: 25, y: 20, width: 50, height: 60, label: 'Exposed Live Cable (Conf: 97.5%)' }
    ],
    suggestedTags: ['Electrical Shock Risk', 'Emergency Disconnect', 'MGVCL Crew', 'Critical Hazard'],
    defaultLandmark: 'Bahucharaji Road, Opposite Amrapali Complex',
    defaultWard: { name: 'Karelibaug', number: 6, lat: 22.3245, lng: 73.2045 }
  },
  {
    keywords: ['water', 'pipe', 'leak', 'drain', 'flood'],
    category: 'water_leak',
    categoryLabel: 'Potable Water Pipeline Rupture & Road Flooding',
    defectSummary: 'Sub-surface pressurized pipeline fracture with freshwater loss',
    technicalDescription:
      'Acoustic and surface displacement analysis confirms clean municipal water surge from underground distribution main. Water is pooling along roadway curb, creating hydraulic erosion under asphalt and depleting water pressure in neighboring societies.',
    urgency: 'hazard',
    hazardScore: 89,
    recommendedDepartment: 'VMC Water Works Department (Distribution Cell)',
    estimatedResolutionHours: 12,
    boundingBoxes: [
      { x: 20, y: 35, width: 60, height: 45, label: 'Water Surge Fracture (Conf: 95.3%)' }
    ],
    suggestedTags: ['Water Main Burst', 'Freshwater Loss', 'Valve Throttling', 'Excavation Needed'],
    defaultLandmark: 'Harinagar Char Rasta, Near Gotri Water Tank',
    defaultWard: { name: 'Gotri', number: 14, lat: 22.3188, lng: 73.1432 }
  }
];

export async function analyzeCivicImage(imageIdentifier: string): Promise<{
  analysis: AiVisionAnalysis;
  landmark: string;
  ward: { name: string; number: number; lat: number; lng: number };
}> {
  // Simulate AI inference delay (600ms)
  await new Promise((res) => setTimeout(res, 600));

  const lower = imageIdentifier.toLowerCase();
  const matched = AI_DETECTION_PRESETS.find((p) =>
    p.keywords.some((kw) => lower.includes(kw))
  ) || AI_DETECTION_PRESETS[0];

  return {
    analysis: {
      detectedCategory: matched.category,
      categoryLabel: matched.categoryLabel,
      confidence: 94.8 + Math.random() * 4.5,
      defectSummary: matched.defectSummary,
      technicalDescription: matched.technicalDescription,
      urgency: matched.urgency,
      hazardScore: matched.hazardScore,
      recommendedDepartment: matched.recommendedDepartment,
      estimatedResolutionHours: matched.estimatedResolutionHours,
      boundingBoxes: matched.boundingBoxes,
      suggestedTags: matched.suggestedTags
    },
    landmark: matched.defaultLandmark,
    ward: matched.defaultWard
  };
}
