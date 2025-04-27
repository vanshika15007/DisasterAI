import { Alert, Resource, EmergencyContact, PreparednessItem } from '../types';

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Flash Flood Warning',
    description: 'Flash flooding is occurring or imminent in the downtown area. Seek higher ground immediately.',
    type: 'flood',
    severity: 'high',
    region: 'Downtown',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    expiresAt: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
    actions: [
      {
        label: 'View Evacuation Routes',
        url: '/resources',
        type: 'primary'
      },
      {
        label: 'Report Issues',
        url: '/alerts',
        type: 'secondary'
      }
    ]
  },
  {
    id: 'alert-2',
    title: 'Wildfire Advisory',
    description: 'A wildfire is burning in the northern hills. Be prepared to evacuate if conditions worsen.',
    type: 'wildfire',
    severity: 'medium',
    region: 'North County',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    actions: [
      {
        label: 'Air Quality Updates',
        url: '/resources',
        type: 'primary'
      }
    ]
  },
  {
    id: 'alert-3',
    title: 'Severe Weather Alert',
    description: 'Thunderstorms with potential for tornadoes are expected this evening. Stay indoors and monitor updates.',
    type: 'tornado',
    severity: 'high',
    region: 'South County',
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    expiresAt: new Date(Date.now() + 28800000).toISOString(), // 8 hours from now
    actions: [
      {
        label: 'Find Shelter',
        url: '/resources',
        type: 'primary'
      },
      {
        label: 'Safety Tips',
        url: '/prepare',
        type: 'secondary'
      }
    ]
  },
  {
    id: 'alert-4',
    title: 'Earthquake Aftershock Risk',
    description: 'Moderate aftershocks are possible following the earlier earthquake. Be cautious around damaged buildings.',
    type: 'earthquake',
    severity: 'medium',
    region: 'City-wide',
    createdAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
    expiresAt: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
    actions: [
      {
        label: 'Damage Report',
        url: '/alerts',
        type: 'secondary'
      }
    ]
  },
  {
    id: 'alert-5',
    title: 'Boil Water Advisory',
    description: 'Water contamination has been detected in the east district. Boil water before consumption until further notice.',
    type: 'other',
    severity: 'medium',
    region: 'East District',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
    expiresAt: new Date(Date.now() + 259200000).toISOString(), // 72 hours from now
    actions: [
      {
        label: 'Water Distribution Points',
        url: '/resources',
        type: 'primary'
      }
    ]
  }
];

// Mock resources data
export const mockResources: Resource[] = [
  {
    id: 'resource-1',
    name: 'Central High School Shelter',
    type: 'shelter',
    address: '1234 Main Street',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    phone: '(555) 123-4567',
    website: 'https://www.centralhigh.edu/shelter',
    coordinates: {
      lat: 34.052235,
      lng: -118.243683
    },
    status: 'open',
    capacity: {
      total: 200,
      available: 125
    },
    details: 'Pet-friendly shelter with cots, food, and medical services available.'
  },
  {
    id: 'resource-2',
    name: 'Memorial Hospital',
    type: 'hospital',
    address: '5678 Health Avenue',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    phone: '(555) 987-6543',
    website: 'https://www.memorialhospital.org',
    coordinates: {
      lat: 34.056235,
      lng: -118.249683
    },
    status: 'open',
    details: 'Emergency services available 24/7. Increased capacity for disaster response.'
  },
  {
    id: 'resource-3',
    name: 'Community Food Bank',
    type: 'food',
    address: '910 Support Street',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    phone: '(555) 456-7890',
    coordinates: {
      lat: 34.048235,
      lng: -118.253683
    },
    status: 'open',
    details: 'Distributing emergency food packages from 8AM to 6PM daily.'
  },
  {
    id: 'resource-4',
    name: 'Westside Supply Center',
    type: 'supplies',
    address: '1122 Relief Road',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    phone: '(555) 234-5678',
    coordinates: {
      lat: 34.059235,
      lng: -118.262683
    },
    status: 'limited',
    details: 'Distributing water, hygiene kits, and basic emergency supplies. Limited stock remaining.'
  },
  {
    id: 'resource-5',
    name: 'Eastside Community Center',
    type: 'shelter',
    address: '3344 Community Drive',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    phone: '(555) 345-6789',
    coordinates: {
      lat: 34.062235,
      lng: -118.238683
    },
    status: 'closed',
    capacity: {
      total: 150,
      available: 0
    },
    details: 'Currently at full capacity. Redirecting to Central High School Shelter.'
  }
];

// Mock emergency contacts
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 'contact-1',
    name: 'Emergency Services',
    description: 'Police, Fire, Medical Emergencies',
    phone: '911',
    availability: '24/7'
  },
  {
    id: 'contact-2',
    name: 'Disaster Relief Hotline',
    description: 'Information and assistance for disaster victims',
    phone: '(800) 555-1234',
    website: 'https://www.disasterrelief.org',
    availability: '24/7 during active disasters'
  },
  {
    id: 'contact-3',
    name: 'Poison Control Center',
    description: 'Emergency poison information and treatment advice',
    phone: '(800) 222-1222',
    website: 'https://www.poison.org',
    availability: '24/7'
  },
  {
    id: 'contact-4',
    name: 'Mental Health Crisis Line',
    description: 'Mental health support and suicide prevention',
    phone: '(800) 273-8255',
    website: 'https://www.mentalhealth.gov',
    availability: '24/7'
  },
  {
    id: 'contact-5',
    name: 'Weather Information Service',
    description: 'Current weather alerts and forecasts',
    phone: '(800) 555-7890',
    website: 'https://www.weather.gov',
    availability: '24/7'
  }
];

// Mock preparedness items
export const mockPreparednessItems: PreparednessItem[] = [
  {
    id: 'item-1',
    category: 'Water',
    name: 'Bottled Water',
    description: 'One gallon per person per day for at least three days',
    priority: 'essential',
    quantity: 3,
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg'
  },
  {
    id: 'item-2',
    category: 'Food',
    name: 'Non-perishable Food',
    description: 'At least a three-day supply of non-perishable food',
    priority: 'essential',
    quantity: 3,
    image: 'https://images.pexels.com/photos/128865/pexels-photo-128865.jpeg'
  },
  {
    id: 'item-3',
    category: 'Medical',
    name: 'First Aid Kit',
    description: 'Comprehensive first aid kit with manual',
    priority: 'essential',
    quantity: 1,
    image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg'
  },
  {
    id: 'item-4',
    category: 'Tools',
    name: 'Battery-powered Radio',
    description: 'NOAA Weather Radio with tone alert, extra batteries',
    priority: 'recommended',
    quantity: 1,
    image: 'https://images.pexels.com/photos/3761878/pexels-photo-3761878.jpeg'
  },
  {
    id: 'item-5',
    category: 'Tools',
    name: 'Flashlight',
    description: 'Multiple flashlights with extra batteries',
    priority: 'essential',
    quantity: 2,
    image: 'https://images.pexels.com/photos/4226854/pexels-photo-4226854.jpeg'
  },
  {
    id: 'item-6',
    category: 'Medical',
    name: 'Prescription Medications',
    description: 'Seven-day supply of medications and medical items',
    priority: 'essential',
    quantity: 1,
    image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg'
  },
  {
    id: 'item-7',
    category: 'Sanitation',
    name: 'Hygiene Items',
    description: 'Moist towelettes, garbage bags, toilet paper, soap',
    priority: 'recommended',
    quantity: 1,
    image: 'https://images.pexels.com/photos/7656468/pexels-photo-7656468.jpeg'
  },
  {
    id: 'item-8',
    category: 'Documents',
    name: 'Important Documents',
    description: 'Copies of insurance policies, IDs, bank records in waterproof container',
    priority: 'recommended',
    quantity: 1,
    image: 'https://images.pexels.com/photos/9844457/pexels-photo-9844457.jpeg'
  },
  {
    id: 'item-9',
    category: 'Tools',
    name: 'Multi-tool or Wrench',
    description: 'To turn off utilities if necessary',
    priority: 'recommended',
    quantity: 1,
    image: 'https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg'
  },
  {
    id: 'item-10',
    category: 'Communication',
    name: 'Portable Battery Charger',
    description: 'For charging phones and essential devices',
    priority: 'essential',
    quantity: 1,
    image: 'https://images.pexels.com/photos/4816298/pexels-photo-4816298.jpeg'
  }
];