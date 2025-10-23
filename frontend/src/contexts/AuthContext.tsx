import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  profilePhoto?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (phone: string, name: string, password: string, email?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (token) {
        const response = await api.get('/auth/me');
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem('auth-token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string, password: string) => {
    const response = await api.post('/auth/login', { phone, password });
    const { token, user: userData } = response.data;
    
    localStorage.setItem('auth-token', token);
    setUser(userData);
  };

  const register = async (phone: string, name: string, password: string, email?: string) => {
    const response = await api.post('/auth/register', { phone, name, password, email });
    const { token, user: userData } = response.data;
    
    localStorage.setItem('auth-token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
