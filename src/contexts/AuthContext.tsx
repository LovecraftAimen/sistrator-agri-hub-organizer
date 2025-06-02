
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe usuário logado no localStorage
    const savedUser = localStorage.getItem('sistrator_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('sistrator_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let userData: User | null = null;
    
    // Verificar credenciais do Admin (Secretário)
    if (email === 'secagri@sistrator.com' && password === 'sis123456') {
      userData = {
        email: email,
        name: 'Secretário de Agricultura',
        role: 'admin'
      };
    }
    // Verificar credenciais do Prefeito
    else if (email === 'prefeito@sistrator.com' && password === 'pref123456') {
      userData = {
        email: email,
        name: 'Prefeito Municipal',
        role: 'prefeito'
      };
    }
    // Verificar credenciais do Vereador
    else if (email === 'vereador@sistrator.com' && password === 'ver123456') {
      userData = {
        email: email,
        name: 'Vereador Municipal',
        role: 'vereador'
      };
    }
    // Verificar credenciais da Secretária
    else if (email === 'secretaria@sistrator.com' && password === 'sec123456') {
      userData = {
        email: email,
        name: 'Secretária da Agricultura',
        role: 'secretaria'
      };
    }
    // Verificar credenciais do Tratorista
    else if (email === 'tratorista@sistrator.com' && password === 'trat123456') {
      userData = {
        email: email,
        name: 'João Silva Santos',
        role: 'tratorista'
      };
    }
    
    if (userData) {
      setUser(userData);
      localStorage.setItem('sistrator_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sistrator_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
