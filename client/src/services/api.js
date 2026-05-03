import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('votepath_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getHealth = () => api.get('/health');

// Auth
export const authLogin = (credentials) => api.post('/auth/login', credentials);
export const authRegister = (userData) => api.post('/auth/register', userData);
export const authGoogleLogin = (token) => api.post('/auth/google', { token });
export const authGetMe = () => api.get('/auth/me');
export const authUpdateProfile = (profileData) => api.put('/auth/complete-profile', profileData);

// AI Features
export const sendChatMessage = (message) => api.post('/chat', { message });
export const getChatHistory = (userId) => api.get(`/chat/history/${userId}`);
export const getJourney = (userId) => api.get(`/journey/${userId}`);
export const getTimeline = (userId) => api.get(`/timeline/${userId}`);
export const getBoothGuide = (data) => api.post('/booth', data);
export const runScenario = (data) => api.post('/scenario', data);
export const getQuiz = () => api.get('/quiz');
export const submitQuiz = (data) => api.post('/quiz/submit', data);
export const translateText = (text, targetLanguage) => api.post('/translate', { text, targetLanguage });

// User data
export const getChecklist = (userId) => api.get(`/checklist/${userId}`);
export const updateChecklist = (data) => api.post('/checklist/update', data);

// Analytics
export const getUserInsights = (userId) => api.get(`/analytics/insights/${userId}`);
export const getRecommendations = (userId) => api.get(`/analytics/recommendations/${userId}`);

export default api;
