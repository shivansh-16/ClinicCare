import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  increment,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Patient, Token, Prescription, Bill, AuditLog } from '../types';

// Patient operations
export const addPatient = async (patient: Omit<Patient, 'id'>) => {
  const docRef = await addDoc(collection(db, 'patients'), {
    ...patient,
    registeredAt: Timestamp.fromDate(patient.registeredAt)
  });
  return docRef.id;
};

export const getPatient = async (id: string): Promise<Patient | null> => {
  const docRef = doc(db, 'patients', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      registeredAt: data.registeredAt.toDate()
    } as Patient;
  }
  return null;
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'patients'), orderBy('registeredAt', 'desc'))
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    registeredAt: doc.data().registeredAt.toDate()
  })) as Patient[];
};

export const updatePatient = async (id: string, updates: Partial<Patient>) => {
  const docRef = doc(db, 'patients', id);
  await updateDoc(docRef, updates);
};

// Token operations
export const generateToken = async (tokenData: Omit<Token, 'id' | 'tokenNumber'>) => {
  // Get today's date for daily counter reset
  const today = new Date();
  const dateKey = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Get the daily token counter
  const counterRef = doc(db, 'counters', `tokens-${dateKey}`);
  const counterSnap = await getDoc(counterRef);
  
  let nextTokenNumber = 1;
  if (counterSnap.exists()) {
    nextTokenNumber = counterSnap.data().count + 1;
    await updateDoc(counterRef, {
      count: increment(1),
      lastUpdated: Timestamp.now()
    });
  } else {
    // Initialize daily counter if it doesn't exist
    await setDoc(counterRef, { 
      count: 1,
      date: dateKey,
      lastUpdated: Timestamp.now()
    });
  }
  
  // Create token
  const docRef = await addDoc(collection(db, 'tokens'), {
    ...tokenData,
    tokenNumber: nextTokenNumber,
    issuedAt: Timestamp.fromDate(tokenData.issuedAt)
  });
  
  return { id: docRef.id, tokenNumber: nextTokenNumber };
};

export const getToken = async (id: string): Promise<Token | null> => {
  const docRef = doc(db, 'tokens', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      issuedAt: data.issuedAt.toDate(),
      consultedAt: data.consultedAt?.toDate()
    } as Token;
  }
  return null;
};

export const getTodaysTokens = async (): Promise<Token[]> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const querySnapshot = await getDocs(
    query(
      collection(db, 'tokens'),
      where('issuedAt', '>=', Timestamp.fromDate(today)),
      where('issuedAt', '<', Timestamp.fromDate(tomorrow)),
      orderBy('issuedAt', 'asc')
    )
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    issuedAt: doc.data().issuedAt.toDate(),
    consultedAt: doc.data().consultedAt?.toDate()
  })) as Token[];
};

export const getAllTokens = async (): Promise<Token[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'tokens'), orderBy('issuedAt', 'desc'))
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    issuedAt: doc.data().issuedAt.toDate(),
    consultedAt: doc.data().consultedAt?.toDate()
  })) as Token[];
};

export const updateToken = async (id: string, updates: Partial<Token>) => {
  const docRef = doc(db, 'tokens', id);
  const updateData = { ...updates };
  
  if (updates.consultedAt) {
    updateData.consultedAt = Timestamp.fromDate(updates.consultedAt);
  }
  
  await updateDoc(docRef, updateData);
};

// Prescription operations
export const addPrescription = async (prescription: Omit<Prescription, 'id'>) => {
  const docRef = await addDoc(collection(db, 'prescriptions'), {
    ...prescription,
    createdAt: Timestamp.fromDate(prescription.createdAt),
    followUpDate: prescription.followUpDate ? Timestamp.fromDate(prescription.followUpDate) : null
  });
  return docRef.id;
};

export const getPrescriptionsByPatient = async (patientId: string): Promise<Prescription[]> => {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'prescriptions'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    )
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    followUpDate: doc.data().followUpDate?.toDate()
  })) as Prescription[];
};

export const getAllPrescriptions = async (): Promise<Prescription[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'prescriptions'), orderBy('createdAt', 'desc'))
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    followUpDate: doc.data().followUpDate?.toDate()
  })) as Prescription[];
};

// Bill operations
export const addBill = async (bill: Omit<Bill, 'id'>) => {
  const docRef = await addDoc(collection(db, 'bills'), {
    ...bill,
    createdAt: Timestamp.fromDate(bill.createdAt),
    paidAt: bill.paidAt ? Timestamp.fromDate(bill.paidAt) : null
  });
  return docRef.id;
};

export const getBill = async (id: string): Promise<Bill | null> => {
  const docRef = doc(db, 'bills', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      paidAt: data.paidAt?.toDate()
    } as Bill;
  }
  return null;
};

export const getAllBills = async (): Promise<Bill[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'bills'), orderBy('createdAt', 'desc'))
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    paidAt: doc.data().paidAt?.toDate()
  })) as Bill[];
};

export const updateBill = async (id: string, updates: Partial<Bill>) => {
  const docRef = doc(db, 'bills', id);
  const updateData = { ...updates };
  
  if (updates.paidAt) {
    updateData.paidAt = Timestamp.fromDate(updates.paidAt);
  }
  
  await updateDoc(docRef, updateData);
};

// Audit log operations
export const addAuditLog = async (log: Omit<AuditLog, 'id'>) => {
  await addDoc(collection(db, 'auditLogs'), {
    ...log,
    timestamp: Timestamp.fromDate(log.timestamp)
  });
};

// Sample data creation functions
export const createSamplePatients = async () => {
  const samplePatients = [
    {
      name: 'John Doe',
      age: 35,
      gender: 'male' as const,
      phone: '+1234567890',
      email: 'john.doe@email.com',
      address: '123 Main Street, City, State 12345',
      emergencyContact: '+1234567891',
      bloodGroup: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      medicalHistory: 'Hypertension, managed with medication',
      registeredAt: new Date(),
      registeredBy: 'system'
    },
    {
      name: 'Jane Smith',
      age: 28,
      gender: 'female' as const,
      phone: '+1234567892',
      email: 'jane.smith@email.com',
      address: '456 Oak Avenue, City, State 12345',
      emergencyContact: '+1234567893',
      bloodGroup: 'A+',
      allergies: ['Shellfish'],
      medicalHistory: 'No significant medical history',
      registeredAt: new Date(),
      registeredBy: 'system'
    },
    {
      name: 'Robert Johnson',
      age: 45,
      gender: 'male' as const,
      phone: '+1234567894',
      email: 'robert.johnson@email.com',
      address: '789 Pine Road, City, State 12345',
      emergencyContact: '+1234567895',
      bloodGroup: 'B+',
      allergies: ['Latex'],
      medicalHistory: 'Diabetes Type 2, controlled with diet and exercise',
      registeredAt: new Date(),
      registeredBy: 'system'
    }
  ];

  const patientIds = [];
  for (const patient of samplePatients) {
    const id = await addPatient(patient);
    patientIds.push(id);
  }
  return patientIds;
};

export const createSampleTokens = async (patientIds: string[], userUid: string) => {
  const sampleTokens = [
    {
      patientId: patientIds[0],
      patientName: 'John Doe',
      status: 'completed' as const,
      issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      issuedBy: userUid,
      consultedBy: userUid,
      consultedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      priority: 'normal' as const
    },
    {
      patientId: patientIds[1],
      patientName: 'Jane Smith',
      status: 'completed' as const,
      issuedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      issuedBy: userUid,
      consultedBy: userUid,
      consultedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      priority: 'urgent' as const
    },
    {
      patientId: patientIds[2],
      patientName: 'Robert Johnson',
      status: 'in-progress' as const,
      issuedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      issuedBy: userUid,
      consultedBy: userUid,
      consultedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      priority: 'normal' as const
    }
  ];

  const tokenIds = [];
  for (const token of sampleTokens) {
    const result = await generateToken(token);
    tokenIds.push(result.id);
  }
  return tokenIds;
};

// Initialize sample data
export const initializeSampleData = async (userUid: string) => {
  try {
    // Check if sample data already exists
    const patients = await getAllPatients();
    if (patients.length > 0) {
      console.log('Sample data already exists');
      return;
    }

    console.log('Creating sample data...');
    const patientIds = await createSamplePatients();
    const tokenIds = await createSampleTokens(patientIds, userUid);
    
    console.log('Sample data created successfully');
    return { patientIds, tokenIds };
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
};