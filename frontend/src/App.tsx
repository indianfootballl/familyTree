import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import RelationshipsPage from './pages/RelationshipsPage';
import FamilyTreePage from './pages/FamilyTreePage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/relationships" 
              element={
                <ProtectedRoute>
                  <RelationshipsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/family-tree" 
              element={
                <ProtectedRoute>
                  <FamilyTreePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/search" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
