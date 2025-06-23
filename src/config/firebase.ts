import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzLBwQCpVFsPsbwyoTb5DxAXRerH5hAoQ",
  authDomain: "clinic-management-system-1.firebaseapp.com",
  projectId: "clinic-management-system-1",
  storageBucket: "clinic-management-system-1.firebasestorage.app",
  messagingSenderId: "335434952299",
  appId: "1:335434952299:web:8820ca9432363bb25d0b2e",
  measurementId: "G-65PLGB14LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;