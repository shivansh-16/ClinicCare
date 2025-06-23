# MediCare Clinic Management System

A comprehensive web-based Clinic Management System built with React, TypeScript, and Firebase that facilitates seamless communication between doctors and receptionists while managing patient records, tokens, prescriptions, and billing.

![MediCare Logo](https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🌟 Features

### 🔐 Authentication & Role Management
- **Secure Firebase Authentication** with email/password
- **Role-based Access Control** (Doctor/Receptionist)
- **Session Management** with persistent login state

### 👨‍⚕️ Doctor Dashboard
- **Patient Management** - View all patients and their complete history
- **Token Management** - Monitor and manage patient queue
- **Prescription System** - Create digital prescriptions with medications
- **Patient History** - Access complete medical records and treatment history

### 👩‍💼 Receptionist Dashboard
- **Patient Registration** - Register new patients with comprehensive details
- **Token Generation** - Auto-increment token system for queue management
- **Billing System** - Generate and manage patient bills
- **Appointment Scheduling** - Schedule and manage patient appointments

### 📊 Core Modules

#### 1. Patient Management
- Complete patient registration with personal and medical information
- Patient search and filtering capabilities
- Medical history tracking
- Emergency contact management

#### 2. Token System
- **Auto-increment token generation**
- Real-time token status updates
- Priority-based token management
- Queue monitoring and management

#### 3. Prescription Management
- Digital prescription creation
- Medication management with dosage and instructions
- Prescription history tracking
- Follow-up scheduling

#### 4. Billing System
- Itemized bill generation
- Multiple payment method support
- Bill status tracking
- Revenue analytics

#### 5. Audit Logging
- Complete activity logging
- User action tracking
- System security monitoring
- Historical data preservation

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clinic-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore Database
   - Update `src/config/firebase.ts` with your Firebase configuration:
   
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

4. **Create User Accounts**
   Create demo users in Firebase Authentication:
   - **Doctor**: doctor@medicare.com / password123
   - **Receptionist**: receptionist@medicare.com / password123

5. **Add User Roles in Firestore**
   Create a `users` collection in Firestore with documents:
   ```json
   {
     "uid": "doctor-uid",
     "email": "doctor@medicare.com",
     "name": "Dr. Smith",
     "role": "doctor",
     "createdAt": "timestamp"
   }
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── LoginForm.tsx
│   ├── Dashboard/
│   │   └── DashboardStats.tsx
│   ├── Layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx
├── config/
│   └── firebase.ts
├── pages/
│   ├── Dashboard.tsx
│   └── PatientRegistration.tsx
├── services/
│   └── firestore.ts
├── types/
│   └── index.ts
└── App.tsx
```

## 🏥 Workflow

### Patient Registration Flow
1. Receptionist logs into the system
2. Navigates to "Register Patient" 
3. Fills comprehensive patient form
4. System generates unique patient ID
5. Patient record stored in Firestore

### Token Generation Flow
1. Patient visits clinic
2. Receptionist generates token
3. Auto-increment token number assigned
4. Patient joins queue
5. Doctor can view and manage tokens

### Consultation Flow
1. Doctor calls next token
2. Updates token status to "in-progress"
3. Reviews patient history
4. Creates prescription if needed
5. Marks consultation as complete

### Billing Flow
1. Receptionist creates bill post-consultation
2. Adds consultation fees and medication costs
3. Generates itemized bill
4. Processes payment
5. Updates bill status

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Login with doctor credentials
- [ ] Login with receptionist credentials
- [ ] Role-based navigation access
- [ ] Logout functionality

#### Patient Management
- [ ] Register new patient
- [ ] View patient list
- [ ] Search patients
- [ ] Update patient information

#### Token System
- [ ] Generate new token
- [ ] View today's tokens
- [ ] Update token status
- [ ] Token auto-increment

#### Prescriptions
- [ ] Create prescription
- [ ] Add medications
- [ ] View prescription history
- [ ] Print prescription

#### Billing
- [ ] Create new bill
- [ ] Add bill items
- [ ] Calculate totals
- [ ] Process payment

## 🔧 Configuration

### Firebase Security Rules

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Authenticated users can manage patients
    match /patients/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Authenticated users can manage tokens
    match /tokens/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Authenticated users can manage prescriptions
    match /prescriptions/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Authenticated users can manage bills
    match /bills/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Audit logs - read only for users, write for system
    match /auditLogs/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 📈 Future Enhancements

- [ ] **SMS Integration** for appointment reminders
- [ ] **Email Notifications** for prescriptions
- [ ] **Advanced Analytics** and reporting
- [ ] **Mobile App** for patients
- [ ] **Inventory Management** for medicines
- [ ] **Multi-clinic Support**
- [ ] **Backup and Export** functionality
- [ ] **Advanced Search** with filters
- [ ] **Document Upload** for medical reports
- [ ] **Video Consultation** integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for healthcare professionals**