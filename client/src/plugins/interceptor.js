import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.MODE === 'production' 
  ? '/api/' 
  : 'http://localhost:8000/api/';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
httpClient.interceptors.request.use(
  (config) => {
    // Note: Make sure this matches the cookie name you use during login ('access_token')
    const token = Cookies.get('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Variables to handle refreshing queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Auto-refresh on 401 Unauthorized
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401, request hasn't been retried yet, and isn't the refresh route itself
    if (
      error.response && 
      error.response.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url.includes('refresh')
    ) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get('refresh_token');

      if (!refreshToken) {
        // No refresh token found, clear cookies and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Request a new access token from Django SimpleJWT endpoint ('refresh')
        const response = await axios.post(`${baseUrl}refresh`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        // Save the new access token
        Cookies.set('access_token', newAccessToken, { expires: 1 });

        // Update headers and process queued requests
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh token has expired or is invalid -> Force logout
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;