import axios from 'axios';

const API_URL = "https://firstbank-investsmart-fb01b73cbf8c.herokuapp.com/api/"
if (!API_URL) {
  console.error('API URL is not defined in environment variables');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // Add this line
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Ensure withCredentials is always true for cross-origin requests
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle CORS preflight error specifically
    if (error.response?.status === 0 && error.message === 'Network Error') {
      console.error('CORS error detected:', error);
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          console.warn('No refresh token found, redirecting to login.');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Refresh access token
        const response = await axios.post(
          `${API_URL}/token/refresh/`, 
          { refresh: refreshToken },
          { withCredentials: true }  // Add withCredentials here too
        );
        
        const newAccessToken = response.data.access;

        localStorage.setItem('access_token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Test endpoint to verify CORS configuration
api.interceptors.request.use(request => {
  console.log('Starting Request:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    withCredentials: request.withCredentials
  });
  return request;
});

export default api;