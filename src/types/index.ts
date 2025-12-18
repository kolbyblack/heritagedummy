// User and Authentication Types
export type UserRole = 'admin' | 'homeowner' | 'maintenance';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Building and Apartment Types
export interface Building {
  id: string;
  name: string;
  address: string;
  floors: number;
  totalApartments: number;
  occupiedApartments: number;
}

export interface Apartment {
  id: string;
  buildingId: string;
  floor: number;
  unit: string;
  type: '1BR' | '2BR' | '3BR' | 'Studio' | 'Penthouse';
  homeownerId?: string;
  homeownerName?: string;
  deviceCount: number;
  status: 'occupied' | 'vacant' | 'maintenance';
}

// Device Types
export type DeviceType = 'thermostat' | 'light' | 'lock' | 'blinds' | 'camera' | 'sensor' | 'doorbell';
export type DeviceStatus = 'online' | 'offline' | 'idle' | 'error';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  apartmentId: string;
  room: string;
  batteryLevel?: number;
  lastActive: Date;
  capabilities: DeviceCapability[];
  currentValue?: number | string | boolean;
}

export interface DeviceCapability {
  id: string;
  name: string;
  type: 'range' | 'toggle' | 'select' | 'schedule';
  min?: number;
  max?: number;
  unit?: string;
  options?: string[];
  enabled: boolean;
}

// Work Order Types
export interface WorkOrder {
  id: string;
  deviceId?: string;
  apartmentId: string;
  type: 'repair' | 'maintenance' | 'installation' | 'move';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  assignedTo?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}
