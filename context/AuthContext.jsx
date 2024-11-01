import { useState, useEffect, createContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Common config for all requests
  const requestConfig = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  // Add token to headers if it exists
  const getAuthConfig = () => {
    const token = localStorage.getItem('access_token');
    return {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        Authorization: token ? `Bearer ${token}` : '',
      }
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('login/', 
        { email, password },
        requestConfig
      );
      
      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify({ username: email }));

      setUser({ username: email });

      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Network error',
      };
    }
  };

  const register = async (username, first_name, last_name, email, password) => {
    try {
      const response = await api.post(
        "register/",
        { username, first_name, last_name, email, password },
        requestConfig
      );
      return {
        success: true,
        message: 'Registration Successful',
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Network error',
      };
    }
  };

  const logout = async () => {
    try {
      // If you have a logout endpoint
      await api.post('logout/', {}, getAuthConfig());
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
    }
    return { success: true, message: 'Logout successful' };
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('current-user/', getAuthConfig());
      setCurrentUser(response.data);
    } catch (error) {
      console.log('Error fetching the user:', error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    fetchCurrentUser,
    currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;