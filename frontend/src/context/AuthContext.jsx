import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/auth.api';

const AuthContext = createContext(null);

// Wraps the whole app; owns the current user + token and exposes the
// small set of actions every screen needs (login, signup, logout).
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = useCallback(async () => {
    const token = localStorage.getItem('skillforge_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authApi.getMe();
      setUser(data.data.user);
    } catch {
      localStorage.removeItem('skillforge_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem('skillforge_token', data.data.token);
    setUser(data.data.user);
    return data.data.user;
  };

  const signup = async (payload) => {
    const { data } = await authApi.signup(payload);
    localStorage.setItem('skillforge_token', data.data.token);
    setUser(data.data.user);
    return data.data.user;
  };

  const logout = () => {
    localStorage.removeItem('skillforge_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
