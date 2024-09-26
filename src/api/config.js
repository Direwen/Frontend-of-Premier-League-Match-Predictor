import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Updated to your Flask backend URL
});

// Add an interceptor to include the JWT token in the request header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Attach the token to Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
