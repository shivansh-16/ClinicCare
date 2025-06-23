import React, { useEffect, useState } from 'react';
import { Users, Clock, FileText, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import { getTodaysTokens, getAllPatients, initializeSampleData } from '../../services/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  change?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, change }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {change && (
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" />
            <span className="text-sm text-green-600">{change}</span>
          </div>
        )}
      </div>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${color} flex items-center justify-center flex-shrink-0 ml-4`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    </div>
  </div>
);

const DashboardStats: React.FC = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayTokens: 0,
    activeTokens: 0,
    totalPrescriptions: 0,
    pendingBills: 0,
    todayRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Initialize sample data if needed
        if (currentUser?.uid) {
          await initializeSampleData(currentUser.uid);
        }

        const [patients, tokens] = await Promise.all([
          getAllPatients(),
          getTodaysTokens()
        ]);

        const activeTokens = tokens.filter(token => 
          token.status === 'waiting' || token.status === 'in-progress'
        ).length;

        setStats({
          totalPatients: patients.length,
          todayTokens: tokens.length,
          activeTokens,
          totalPrescriptions: 0, // Will be calculated when prescriptions are fetched
          pendingBills: 0, // Will be calculated when bills are fetched
          todayRevenue: 0 // Will be calculated when bills are fetched
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  const doctorStats = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Today\'s Tokens',
      value: stats.todayTokens,
      icon: Clock,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Active Consultations',
      value: stats.activeTokens,
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      title: 'Prescriptions',
      value: stats.totalPrescriptions,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+15%'
    }
  ];

  const receptionistStats = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Today\'s Tokens',
      value: stats.todayTokens,
      icon: Clock,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Pending Bills',
      value: stats.pendingBills,
      icon: CreditCard,
      color: 'bg-red-500'
    },
    {
      title: 'Today\'s Revenue',
      value: `₹${stats.todayRevenue}`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      change: '+22%'
    }
  ];

  const statsToShow = currentUser?.role === 'doctor' ? doctorStats : receptionistStats;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-300 rounded w-20 sm:w-24"></div>
                <div className="h-6 sm:h-8 bg-gray-300 rounded w-12 sm:w-16"></div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-lg ml-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsToShow.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;