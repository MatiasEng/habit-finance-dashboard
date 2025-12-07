import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api'
});

api.interceptors.request.use(config => {
  // Runs BEFORE every request
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

// later to handle refresh tokens create another interceptor
// also need to save the refresh token
let refreshPromise = null;

async function refreshToken() {

  console.log('attemping to refresh token');

  const refreshToken = localStorage.getItem('refreshToken');

  console.log(refreshToken);

  if (!refreshToken) {
    console.log('No refresh token');
    throw new Error('No refresh token');
  }

  const response = await axios.post('/auth/refresh', {
    refreshToken
  }, {
    baseURL: 'http://localhost:5050/api'
  });

  console.log('Refresh Successful')
  localStorage.setItem('accessToken', response.data.accessToken)
  if (response.data.refreshToken) {
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }
  return response.data.accessToken;

}


api.interceptors.response.use(
  response => {
    console.log('response receive')
    return response;
  },
  async error => {
    console.log('error detected in interceptor');
    const originalRequest = error.config;

    // Only handle 401 errors (unauthorized)
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't retry login requests
    if (originalRequest.url.includes('auth/login')) {
      return Promise.reject(error);
    }

    // If we're already refreshing, wait for it
    if (!refreshPromise) {
      refreshPromise = refreshToken()
        .finally(() => {
          refreshPromise = null;
        })
    }
    try {
      await refreshPromise;

      const newToken = localStorage.getItem('accessToken');
      originalRequest.headers.Authorization = `Bearer ${newToken}`

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
