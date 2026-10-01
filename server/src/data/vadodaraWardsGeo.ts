import { WardBoundary } from '../models/types.js';

/**
 * Vadodara Municipal Corporation (VMC) 19 Administrative Ward Boundaries.
 * Polygons defined in [latitude, longitude] pairs covering Vadodara metropolitan area.
 */
export const VADODARA_WARDS_DATA: WardBoundary[] = [
  {
    wardNumber: 1,
    name: 'Alkapuri & RC Dutt Corridor',
    zone: 'West',
    executiveEngineer: 'Er. Rajesh V. Parmar',
    contactEmail: 'ee.ward1@vmc.gov.in',
    depotLocation: 'VMC West Zone Sub-Depot, RC Dutt Road, Alkapuri',
    polygon: [
      [22.305, 73.165],
      [22.318, 73.165],
      [22.318, 73.18],
      [22.305, 73.18]
    ]
  },
  {
    wardNumber: 2,
    name: 'Sayajigunj & Station Area',
    zone: 'West',
    executiveEngineer: 'Er. Manoj K. Solanki',
    contactEmail: 'ee.ward2@vmc.gov.in',
    depotLocation: 'Near Vadodara Central Railway Station, Sayajigunj',
    polygon: [
      [22.305, 73.18],
      [22.318, 73.18],
      [22.318, 73.195],
      [22.305, 73.195]
    ]
  },
  {
    wardNumber: 3,
    name: 'Fatehgunj & Camp Area',
    zone: 'North',
    executiveEngineer: 'Er. Neha P. Trivedi',
    contactEmail: 'ee.ward3@vmc.gov.in',
    depotLocation: 'Near Narhari Hospital Char Rasta, Fatehgunj',
    polygon: [
      [22.318, 73.18],
      [22.332, 73.18],
      [22.332, 73.195],
      [22.318, 73.195]
    ]
  },
  {
    wardNumber: 4,
    name: 'Mandvi, Nyay Mandir & Old City',
    zone: 'Central',
    executiveEngineer: 'Er. B.K. Rathwa',
    contactEmail: 'ee.ward4@vmc.gov.in',
    depotLocation: 'Khanderao Market Complex, Rajmahal Road',
    polygon: [
      [22.295, 73.195],
      [22.305, 73.195],
      [22.305, 73.212],
      [22.295, 73.212]
    ]
  },
  {
    wardNumber: 5,
    name: 'Raopura & Dandia Bazar',
    zone: 'Central',
    executiveEngineer: 'Er. Sanjay D. Patel',
    contactEmail: 'ee.ward5@vmc.gov.in',
    depotLocation: 'Near Jubilee Baug, Raopura',
    polygon: [
      [22.295, 73.18],
      [22.305, 73.18],
      [22.305, 73.195],
      [22.295, 73.195]
    ]
  },
  {
    wardNumber: 6,
    name: 'Akota, Mujmahuda & Flyover',
    zone: 'West',
    executiveEngineer: 'Er. Dipak S. Joshi',
    contactEmail: 'ee.ward6@vmc.gov.in',
    depotLocation: 'Akota Stadium Road Municipal Yard',
    polygon: [
      [22.292, 73.165],
      [22.305, 73.165],
      [22.305, 73.18],
      [22.292, 73.18]
    ]
  },
  {
    wardNumber: 7,
    name: 'Karelibaug & Bahucharaji Road',
    zone: 'North',
    executiveEngineer: 'Er. Chirag A. Dave',
    contactEmail: 'ee.ward7@vmc.gov.in',
    depotLocation: 'Near Water Tank, Karelibaug',
    polygon: [
      [22.318, 73.195],
      [22.332, 73.195],
      [22.332, 73.215],
      [22.318, 73.215]
    ]
  },
  {
    wardNumber: 8,
    name: 'Sama & Chhani Road',
    zone: 'North',
    executiveEngineer: 'Er. Amit M. Shah',
    contactEmail: 'ee.ward8@vmc.gov.in',
    depotLocation: 'Sama-Savli Road VMC North Division Office',
    polygon: [
      [22.332, 73.18],
      [22.355, 73.18],
      [22.355, 73.21],
      [22.332, 73.21]
    ]
  },
  {
    wardNumber: 9,
    name: 'Gorwa & Subhanpura',
    zone: 'West',
    executiveEngineer: 'Er. K.L. Chauhan',
    contactEmail: 'ee.ward9@vmc.gov.in',
    depotLocation: 'Near Gorwa Workshop, Industrial Area',
    polygon: [
      [22.318, 73.145],
      [22.335, 73.145],
      [22.335, 73.165],
      [22.318, 73.165]
    ]
  },
  {
    wardNumber: 10,
    name: 'Gotri & Harinagar',
    zone: 'West',
    executiveEngineer: 'Er. Hasmukh R. Patel',
    contactEmail: 'ee.ward10@vmc.gov.in',
    depotLocation: 'Gotri Lake Water Works Complex',
    polygon: [
      [22.305, 73.135],
      [22.32, 73.135],
      [22.32, 73.165],
      [22.305, 73.165]
    ]
  },
  {
    wardNumber: 11,
    name: 'Vasna & Bhayli Road',
    zone: 'West',
    executiveEngineer: 'Er. Pratik S. Vyas',
    contactEmail: 'ee.ward11@vmc.gov.in',
    depotLocation: 'Vasna-Bhayli Canal Road Civic Center',
    polygon: [
      [22.285, 73.135],
      [22.305, 73.135],
      [22.305, 73.165],
      [22.285, 73.165]
    ]
  },
  {
    wardNumber: 12,
    name: 'Manjalpur & Shreyas Crossing',
    zone: 'South',
    executiveEngineer: 'Er. Sunita K. Solanki',
    contactEmail: 'ee.ward12@vmc.gov.in',
    depotLocation: 'Near Manjalpur Sports Complex',
    polygon: [
      [22.275, 73.18],
      [22.292, 73.18],
      [22.292, 73.205],
      [22.275, 73.205]
    ]
  },
  {
    wardNumber: 13,
    name: 'Makarpura & GIDC Industrial Zone',
    zone: 'South',
    executiveEngineer: 'Er. R.C. Baria',
    contactEmail: 'ee.ward13@vmc.gov.in',
    depotLocation: 'Makarpura Main Road Sub-Station Depot',
    polygon: [
      [22.255, 73.18],
      [22.275, 73.18],
      [22.275, 73.205],
      [22.255, 73.205]
    ]
  },
  {
    wardNumber: 14,
    name: 'Tarsali & National Highway Bypass',
    zone: 'South',
    executiveEngineer: 'Er. Nilesh T. Parmar',
    contactEmail: 'ee.ward14@vmc.gov.in',
    depotLocation: 'Near Tarsali Char Rasta Fire Station',
    polygon: [
      [22.255, 73.205],
      [22.275, 73.205],
      [22.275, 73.23],
      [22.255, 73.23]
    ]
  },
  {
    wardNumber: 15,
    name: 'Waghodia Road & Parivar Char Rasta',
    zone: 'East',
    executiveEngineer: 'Er. Jayshree M. Vankar',
    contactEmail: 'ee.ward15@vmc.gov.in',
    depotLocation: 'Waghodia Road Civic Center & Solid Waste Depot',
    polygon: [
      [22.295, 73.212],
      [22.315, 73.212],
      [22.315, 73.24],
      [22.295, 73.24]
    ]
  },
  {
    wardNumber: 16,
    name: 'Ajwa Road & Sayaji Park',
    zone: 'East',
    executiveEngineer: 'Er. Paresh D. Chauhan',
    contactEmail: 'ee.ward16@vmc.gov.in',
    depotLocation: 'Ajwa Road Water Treatment Pumping Station',
    polygon: [
      [22.315, 73.215],
      [22.335, 73.215],
      [22.335, 73.25],
      [22.315, 73.25]
    ]
  },
  {
    wardNumber: 17,
    name: 'Harni & Airport Corridor',
    zone: 'North',
    executiveEngineer: 'Er. Vishal R. Bhatt',
    contactEmail: 'ee.ward17@vmc.gov.in',
    depotLocation: 'Harni Lake Civic Center & Aerodrome Yard',
    polygon: [
      [22.332, 73.21],
      [22.355, 73.21],
      [22.355, 73.245],
      [22.332, 73.245]
    ]
  },
  {
    wardNumber: 18,
    name: 'Atladra & Sun Pharma Road',
    zone: 'West',
    executiveEngineer: 'Er. Bhavna B. Zala',
    contactEmail: 'ee.ward18@vmc.gov.in',
    depotLocation: 'Atladra Swaminarayan Temple Road Depot',
    polygon: [
      [22.275, 73.15],
      [22.292, 73.15],
      [22.292, 73.175],
      [22.275, 73.175]
    ]
  },
  {
    wardNumber: 19,
    name: 'Kalali & Bill Canal Belt',
    zone: 'South',
    executiveEngineer: 'Er. Chetan P. Suthar',
    contactEmail: 'ee.ward19@vmc.gov.in',
    depotLocation: 'Kalali Railway Crossing Municipal Center',
    polygon: [
      [22.26, 73.15],
      [22.275, 73.15],
      [22.275, 73.18],
      [22.26, 73.18]
    ]
  }
];
