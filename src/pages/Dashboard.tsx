import React from 'react';
import { Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/Dashboard/DashboardStats';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening at your clinic today.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  icon: Users,
                  color: 'bg-blue-100 text-blue-600',
                  title: 'New patient registered',
                  description: 'John Doe has been registered',
                  time: '5 minutes ago'
                },
                {
                  icon: Clock,
                  color: 'bg-green-100 text-green-600',
                  title: 'Token #15 issued',
                  description: 'Token issued to Sarah Johnson',
                  time: '12 minutes ago'
                },
                {
                  icon: Calendar,
                  color: 'bg-purple-100 text-purple-600',
                  title: 'Prescription created',
                  description: 'Prescription for patient ID #1234',
                  time: '25 minutes ago'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {currentUser?.role === 'receptionist' ? (
                <>
                  <button 
                    onClick={() => handleQuickAction('/app/register-patient')}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left group"
                  >
                    <Users className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Register Patient</p>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('/app/tokens')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left group"
                  >
                    <Clock className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Issue Token</p>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('/app/appointments')}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left group"
                  >
                    <Calendar className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Schedule Appointment</p>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('/app/billing')}
                    className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left group"
                  >
                    <AlertTriangle className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Generate Bill</p>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleQuickAction('/app/patients')}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left group"
                  >
                    <Users className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">View Patients</p>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('/app/tokens')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left group"
                  >
                    <Clock className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Manage Tokens</p>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('/app/prescriptions')}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left group"
                  >
                    <Calendar className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Write Prescription</p>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('/app/patients')}
                    className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left group"
                  >
                    <AlertTriangle className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-800">Patient History</p>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;