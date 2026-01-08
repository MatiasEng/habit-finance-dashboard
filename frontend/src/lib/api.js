import axios from 'axios';

// Smart URL detection - works for both local and Railway
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:5050/api'
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise = null;

async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token');

  const response = await axios.post('/auth/refresh', {
    refreshToken
  }, {
    baseURL: API_BASE_URL  // Use same base URL
  });

  localStorage.setItem('accessToken', response.data.accessToken);
  if (response.data.refreshToken) {
    localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  return response.data.accessToken;
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url.includes('auth/login')) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = refreshToken().finally(() => {
        refreshPromise = null;
      });
    }

    try {
      await refreshPromise;
      const newToken = localStorage.getItem('accessToken');
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

export default api;
