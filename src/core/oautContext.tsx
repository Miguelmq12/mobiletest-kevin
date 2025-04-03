import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  idUser: number;
  name: string;
  jwtToken: string;
}

interface Session {
  success: string;
  errorCode: string;
  errorMessage: string;
  data: UserData;
}

interface AuthContextType {
  session: Session | null;
  login: (sessionData: Session) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  const login = (sessionData: Session) => {
    setSession(sessionData);
    localStorage.setItem('session', JSON.stringify(sessionData));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('session');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
