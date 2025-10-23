import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ArrowLeft, Phone, Mail } from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  profilePhoto?: string;
  bio?: string;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get(`/user/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Search Family Members</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Family Members</h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or phone number..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {isSearching && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Searching...</p>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchQuery.length >= 2 && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({searchResults.length})
              </h3>
            </div>
            
            {searchResults.length === 0 ? (
              <div className="p-8 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No family members found</p>
                <p className="text-sm text-gray-500 mt-2">Try a different search term</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {searchResults.map((user) => (
                  <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Phone className="h-4 w-4" />
                            <span>{user.phone}</span>
                          </div>
                          {user.email && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Mail className="h-4 w-4" />
                              <span>{user.email}</span>
                            </div>
                          )}
                        </div>
                        {user.bio && (
                          <p className="text-sm text-gray-600 mt-2">{user.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search Tips */}
        {searchQuery.length < 2 && (
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Search Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Search by full name or partial name</li>
              <li>• Search by phone number</li>
              <li>• Use at least 2 characters to start searching</li>
              <li>• Results will show all matching family members</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
