import { fetch } from '@/utils/Fetch';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [download, setDownload] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch.get('/auth/me');
        setUser(response.data);
        setDownload(false);
      } catch (error) {
        setUser(null);
      }
    }
    getUserData();
  }, [download]);

  const login = async (email, password) => {
    try {
      await fetch.post('/auth/login', {
        email, password
      });
      const response = await fetch.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    const response = await fetch.get('/auth/logout');
    if (response.status === 200) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, download, setDownload }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}
