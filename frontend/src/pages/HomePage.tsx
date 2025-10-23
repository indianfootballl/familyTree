import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Users, Heart, TreePine } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-full">
              <TreePine className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Family Tree Portal
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with your family, explore relationships, and build your family tree. 
            Discover who is related to whom and strengthen family bonds.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone-based Login</h3>
              <p className="text-gray-600">Secure authentication using your phone number</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Family Relationships</h3>
              <p className="text-gray-600">Add and manage family connections easily</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Family Stories</h3>
              <p className="text-gray-600">Share memories and comments on family profiles</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
