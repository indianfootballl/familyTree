import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Search, User, ArrowLeft, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  profilePhoto?: string;
}

interface Relation {
  id: string;
  relationType: string;
  parent: User;
  child: User;
  createdAt: string;
}

const RelationshipsPage: React.FC = () => {
  const [relationships, setRelationships] = useState<Relation[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [relationType, setRelationType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const relationTypes = [
    'father',
    'mother',
    'brother',
    'sister',
    'son',
    'daughter',
    'cousin',
    'uncle',
    'aunt',
    'nephew',
    'niece',
    'grandfather',
    'grandmother',
    'grandson',
    'granddaughter',
    'spouse',
    'partner',
  ];

  useEffect(() => {
    loadRelationships();
  }, []);

  const loadRelationships = async () => {
    try {
      const response = await api.get('/relationships');
      setRelationships(response.data);
    } catch (error) {
      console.error('Error loading relationships:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get(`/user/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchUsers(query);
  };

  const handleAddRelationship = async () => {
    if (!selectedUser || !relationType) {
      toast.error('Please select a user and relation type');
      return;
    }

    try {
      await api.post('/relationships', {
        relatedUserId: selectedUser.id,
        relationType,
      });
      toast.success('Relationship added successfully!');
      setShowAddForm(false);
      setSelectedUser(null);
      setRelationType('');
      setSearchQuery('');
      setSearchResults([]);
      loadRelationships();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add relationship');
    }
  };

  const handleDeleteRelationship = async (relationId: string) => {
    if (!confirm('Are you sure you want to delete this relationship?')) {
      return;
    }

    try {
      await api.delete(`/relationships/${relationId}`);
      toast.success('Relationship deleted successfully!');
      loadRelationships();
    } catch (error: any) {
      toast.error('Failed to delete relationship');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-semibold text-gray-900">Family Relationships</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Relationship Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Relationship</span>
          </button>
        </div>

        {/* Add Relationship Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Relationship</h3>
            
            <div className="space-y-4">
              {/* Search for User */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search for Family Member
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name or phone number..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                    {searchResults.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user);
                          setSearchQuery(user.name);
                          setSearchResults([]);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3"
                      >
                        {user.profilePhoto ? (
                          <img
                            src={user.profilePhoto}
                            alt={user.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected User */}
              {selectedUser && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Selected:</p>
                  <div className="flex items-center space-x-3">
                    {selectedUser.profilePhoto ? (
                      <img
                        src={selectedUser.profilePhoto}
                        alt={selectedUser.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{selectedUser.name}</p>
                      <p className="text-sm text-gray-500">{selectedUser.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Relation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship Type
                </label>
                <select
                  value={relationType}
                  onChange={(e) => setRelationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select relationship type</option>
                  {relationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddRelationship}
                  disabled={!selectedUser || !relationType}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Relationship
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedUser(null);
                    setRelationType('');
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Relationships List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">My Family Relationships</h3>
          </div>
          
          {relationships.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No relationships added yet</p>
              <p className="text-sm text-gray-500 mt-2">Start by adding family members</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {relationships.map((relation) => (
                <div key={relation.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {relation.parent.profilePhoto ? (
                      <img
                        src={relation.parent.profilePhoto}
                        alt={relation.parent.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{relation.parent.name}</p>
                      <p className="text-sm text-gray-500">
                        {relation.relationType.charAt(0).toUpperCase() + relation.relationType.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteRelationship(relation.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RelationshipsPage;
