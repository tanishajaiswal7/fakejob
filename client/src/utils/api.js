import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const API = apiClient;

export const analyzeJob = async (jobData) => {
  try {
    const response = await apiClient.post('/analyze', jobData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw { success: false, message: error.message };
  }
};

export const getAnalysisHistory = async (limit = 10, riskLevel = null) => {
  try {
    const params = { limit };
    if (riskLevel) params.riskLevel = riskLevel;
    const response = await apiClient.get('/history', { params });
    return response.data;
  } catch (error) {
    throw { success: false, message: error.message };
  }
};

export const getAnalysisById = async (id) => {
  try {
    const response = await apiClient.get(`/analysis/${id}`);
    return response.data;
  } catch (error) {
    throw { success: false, message: error.message };
  }
};

export const getStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data;
  } catch (error) {
    throw { success: false, message: error.message };
  }
};

export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    return false;
  }
};

export default apiClient;
