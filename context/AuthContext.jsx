import { useState, useEffect, createContext } from 'react';
import api from '../services/api';
import axios from 'axios'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log('API URL being used:', API_URL);

      const response = await api.post('login/', { email, password });
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
     const response = await axios.post(
      "https://firstbank-investsmart-fb01b73cbf8c.herokuapp.com/api/register/",
      { username, first_name, last_name, email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );return {
      success: true,
      message: 'Registration Successful',
    };
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Network error',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);

    return { success: true, message: 'Logout successful' };
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('current-user');
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
