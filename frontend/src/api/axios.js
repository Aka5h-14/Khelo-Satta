import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.khelo.100xdev.tech' 
  : 'https://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000
});

// Retry logic for 503 responses during cold start
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If the error is due to server initialization (503)
    if (error.response?.status === 503 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Wait for 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check server health
      try {
        await api.get('/api/health');
        // If health check passes, retry the original request
        return api(originalRequest);
      } catch (healthError) {
        // If health check fails, throw the original error
        throw error;
      }
    }
    
    throw error;
  }
);

export default api; 
