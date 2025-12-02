export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  API_KEY: 'your_secure_api_key_here_32_characters_long',
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_CONFIG.API_KEY,
});

export const getPublicHeaders = () => ({
  'Content-Type': 'application/json',
});

export const getUploadHeaders = () => ({
  'x-api-key': API_CONFIG.API_KEY,
});
