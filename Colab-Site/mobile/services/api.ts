import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('API_URL from env:', process.env.EXPO_PUBLIC_API_URL);

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('userToken');
      // Use the navigation service to redirect to Login
      // We need to import navigate from rootNavigation
      // But we can't import it here if it causes cycle? 
      // It should be fine as rootNavigation doesn't import api.
      const { navigate } = require('../navigation/rootNavigation');
      navigate('Login');
    }
    return Promise.reject(error);
  }
);

export default api;
