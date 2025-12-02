import { 
  Lead, 
  CreateLeadRequest, 
  UpdateLeadStatusRequest, 
  LeadsResponse, 
  LeadResponse,
  CreateLeadResponse,
  LeadStatisticsResponse,
  StatusOptionsResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_KEY = 'your_secure_api_key_here_32_characters_long';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

const getPublicHeaders = () => ({
  'Content-Type': 'application/json',
});

export const leadsApi = {
  // POST /leads (PUBLIC)
  create: async (data: CreateLeadRequest): Promise<CreateLeadResponse> => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: getPublicHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create lead');
    }

    return response.json();
  },

  // GET /leads (ADMIN)
  getAll: async (): Promise<LeadsResponse> => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }

    return response.json();
  },

  // GET /leads/statistics (ADMIN)
  getStatistics: async (): Promise<LeadStatisticsResponse> => {
    const response = await fetch(`${API_BASE_URL}/leads/statistics`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lead statistics');
    }

    return response.json();
  },

  // GET /leads/{id} (ADMIN)
  getById: async (id: string): Promise<LeadResponse> => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lead');
    }

    return response.json();
  },

  // PUT /leads/{id}/status (ADMIN)
  updateStatus: async (id: string, data: UpdateLeadStatusRequest): Promise<LeadResponse> => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update lead status');
    }

    return response.json();
  },

  // DELETE /leads/{id} (ADMIN)
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete lead');
    }

    return response.json();
  },

  // GET /leads/status/options (PUBLIC)
  getStatusOptions: async (): Promise<StatusOptionsResponse> => {
    const response = await fetch(`${API_BASE_URL}/leads/status/options`, {
      method: 'GET',
      headers: getPublicHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch status options');
    }

    return response.json();
  },
};
