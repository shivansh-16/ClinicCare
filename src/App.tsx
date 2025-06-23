import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/Layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Dashboard from './pages/Dashboard';
import PatientRegistration from './pages/PatientRegistration';
import Patients from './pages/Patients';
import Tokens from './pages/Tokens';
import Prescriptions from './pages/Prescriptions';
import Billing from './pages/Billing';
import Appointments from './pages/Appointments';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register-patient" element={
              <ProtectedRoute requiredRole="receptionist">
                <PatientRegistration />
              </ProtectedRoute>
            } />
            <Route path="patients" element={<Patients />} />
            <Route path="tokens" element={<Tokens />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="billing" element={
              <ProtectedRoute requiredRole="receptionist">
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="appointments" element={
              <ProtectedRoute requiredRole="receptionist">
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="settings" element={<div className="p-6 text-center text-gray-500">Settings page - Coming soon</div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;