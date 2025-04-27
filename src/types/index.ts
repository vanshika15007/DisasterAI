export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'hurricane' | 'flood' | 'wildfire' | 'earthquake' | 'tornado' | 'other';
  severity: 'low' | 'medium' | 'high';
  region: string;
  createdAt: string;
  expiresAt?: string;
  actions?: AlertAction[];
}

export interface AlertAction {
  label: string;
  url: string;
  type: 'primary' | 'secondary';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'shelter' | 'hospital' | 'food' | 'supplies' | 'other';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'closed' | 'limited';
  capacity?: {
    total: number;
    available: number;
  };
  details?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  website?: string;
  availability: string;
}

export interface PreparednessItem {
  id: string;
  category: string;
  name: string;
  description: string;
  priority: 'essential' | 'recommended' | 'optional';
  quantity: number;
  image?: string;
}