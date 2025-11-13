import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  // Runs BEFORE every request
  const token = localStorage.getItem('token');
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
})
// later to handle refresh tokens create another interceptor
// also need to save the refresh token


export default api;