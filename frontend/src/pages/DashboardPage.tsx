import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users, TreePine, LogOut, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TreePine className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Family Tree Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Manage your family tree and relationships</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/dashboard/profile"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">My Profile</h3>
                <p className="text-sm text-gray-600">Update your information</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/relationships"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">Relationships</h3>
                <p className="text-sm text-gray-600">Manage family connections</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/family-tree"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <TreePine className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">Family Tree</h3>
                <p className="text-sm text-gray-600">View family tree</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/search"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Search className="h-8 w-8 text-orange-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">Search</h3>
                <p className="text-sm text-gray-600">Find family members</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <TreePine className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity yet</p>
            <p className="text-sm text-gray-500 mt-2">Start by adding family relationships</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
