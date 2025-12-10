import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('ecom_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('ecom_user', JSON.stringify(user));
    else localStorage.removeItem('ecom_user');
  }, [user]);

  const login = (email) => {
    // Minimal "login" — in real app you'd call an API
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
