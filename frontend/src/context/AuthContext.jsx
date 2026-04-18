import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, getMe } from '../api/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('villa_token');
    if (token) {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch {
        localStorage.removeItem('villa_token');
        localStorage.removeItem('villa_user');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    localStorage.setItem('villa_token', res.data.token);
    localStorage.setItem('villa_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await registerApi({ name, email, password });
    localStorage.setItem('villa_token', res.data.token);
    localStorage.setItem('villa_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('villa_token');
    localStorage.removeItem('villa_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
