// Configuração centralizada das variáveis de ambiente

export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },

  // Authentication
  auth: {
    jwtSecret: import.meta.env.VITE_JWT_SECRET || 'default_secret',
    tokenExpiry: import.meta.env.VITE_TOKEN_EXPIRY || '24h',
  },

  // Application
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Site Demo',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_APP_ENV || 'development',
  },

  // Contact Information
  contact: {
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999',
    email: import.meta.env.VITE_EMAIL || 'nucleocolabufpb@gmail.com',
    phone: import.meta.env.VITE_PHONE || '(11) 99999-9999',
  },

  // Google Maps
  maps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  },

  // Upload Configuration
  upload: {
    maxFileSize: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880, // 5MB
    allowedTypes: import.meta.env.VITE_ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'application/pdf'
    ],
  },

  // Admin Configuration (sem credenciais hardcoded)
  // Usar auth API e tabela users para autenticação

  // Development
  dev: {
    mode: import.meta.env.VITE_DEV_MODE === 'true',
    debug: import.meta.env.VITE_DEBUG === 'true',
  },
};

// Helper para verificar se está em desenvolvimento
export const isDev = config.app.env === 'development';

// Helper para verificar se está em produção
export const isProd = config.app.env === 'production';

// Helper para logs de debug
export const debugLog = (...args: any[]) => {
  if (config.dev.debug) {
    console.log('[DEBUG]', ...args);
  }
};

export default config;
