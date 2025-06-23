import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Calendar, 
  Settings, 
  LogOut,
  Activity,
  UserPlus,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { currentUser, logout } = useAuth();

  const doctorNavItems = [
    { to: '/app/dashboard', icon: Activity, label: 'Dashboard' },
    { to: '/app/patients', icon: Users, label: 'Patients' },
    { to: '/app/tokens', icon: Clock, label: 'Tokens' },
    { to: '/app/prescriptions', icon: FileText, label: 'Prescriptions' },
    { to: '/app/settings', icon: Settings, label: 'Settings' }
  ];

  const receptionistNavItems = [
    { to: '/app/dashboard', icon: Activity, label: 'Dashboard' },
    { to: '/app/register-patient', icon: UserPlus, label: 'Register Patient' },
    { to: '/app/patients', icon: Users, label: 'Patients' },
    { to: '/app/tokens', icon: Clock, label: 'Tokens' },
    { to: '/app/billing', icon: CreditCard, label: 'Billing' },
    { to: '/app/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/app/settings', icon: Settings, label: 'Settings' }
  ];

  const navItems = currentUser?.role === 'doctor' ? doctorNavItems : receptionistNavItems;

  const handleLogout = async () => {
    try {
      await logout();
      if (onNavigate) onNavigate();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <div className="bg-white h-full shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">MediCare</h1>
            <p className="text-sm text-gray-500">Clinic Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="px-4 py-2 mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {currentUser?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;