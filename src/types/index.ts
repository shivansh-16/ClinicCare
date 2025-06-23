export interface User {
  uid: string;
  email: string;
  role: 'doctor' | 'receptionist';
  name: string;
  createdAt: Date;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: string;
  emergencyContact: string;
  bloodGroup?: string;
  allergies?: string[];
  medicalHistory?: string;
  registeredAt: Date;
  registeredBy: string;
}

export interface Token {
  id: string;
  tokenNumber: number;
  patientId: string;
  patientName: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  issuedAt: Date;
  issuedBy: string;
  consultedBy?: string;
  consultedAt?: Date;
  priority: 'normal' | 'urgent';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  tokenId: string;
  medications: Medication[];
  diagnosis: string;
  symptoms: string;
  notes?: string;
  followUpDate?: Date;
  createdAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  tokenId: string;
  prescriptionId?: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'upi';
  createdAt: Date;
  createdBy: string;
  paidAt?: Date;
}

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: Date;
  ipAddress?: string;
}