import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true, // Include cookies in requests
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("Attaching token to request:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
