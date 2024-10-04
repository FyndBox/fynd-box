import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const publicRoutes = ['/auth/login', '/auth/signup'];

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.VITE_API_URL : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const isPublicRoute = publicRoutes.includes(config.url || '');

    if (!isPublicRoute) {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || 'An error occurred. Please try again.';
    return Promise.reject(new Error(errorMessage));
  },
);

export default apiClient;
