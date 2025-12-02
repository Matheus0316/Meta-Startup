import { 
  TeamMember, 
  CreateTeamMemberRequest, 
  UpdateTeamMemberRequest, 
  TeamResponse, 
  TeamMemberResponse,
  CreateTeamMemberResponse,
  ToggleActiveResponse,
  TeamStatisticsResponse 
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

export const teamApi = {
  // POST /api/team (ADMIN)
  create: async (data: CreateTeamMemberRequest): Promise<CreateTeamMemberResponse> => {
    const headers = getHeaders();
    console.log('Team API Headers:', headers);
    console.log('Team API Data:', data);
    
    const response = await fetch(`${API_BASE_URL}/team`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Team API Error:', response.status, errorText);
      throw new Error(`Failed to create team member: ${response.status} ${errorText}`);
    }

    return response.json();
  },

  // GET /api/team (ADMIN)
  getAll: async (): Promise<TeamResponse> => {
    const response = await fetch(`${API_BASE_URL}/team`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team members');
    }

    return response.json();
  },

  // GET /api/team/active (PUBLIC)
  getActive: async (): Promise<TeamResponse> => {
    const response = await fetch(`${API_BASE_URL}/team/active`, {
      method: 'GET',
      headers: getPublicHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch active team members');
    }

    return response.json();
  },

  // GET /api/team/statistics (ADMIN)
  getStatistics: async (): Promise<TeamStatisticsResponse> => {
    const response = await fetch(`${API_BASE_URL}/team/statistics`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team statistics');
    }

    return response.json();
  },

  // GET /api/team/{id} (ADMIN)
  getById: async (id: string): Promise<TeamMemberResponse> => {
    const response = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team member');
    }

    return response.json();
  },

  // PUT /api/team/{id} (ADMIN)
  update: async (id: string, data: UpdateTeamMemberRequest): Promise<TeamMemberResponse> => {
    const response = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update team member');
    }

    return response.json();
  },

  // PATCH /api/team/{id}/toggle-active (ADMIN)
  toggleActive: async (id: string): Promise<ToggleActiveResponse> => {
    const response = await fetch(`${API_BASE_URL}/team/${id}/toggle-active`, {
      method: 'PATCH',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle team member status');
    }

    return response.json();
  },

  // DELETE /api/team/{id} (ADMIN)
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete team member');
    }

    return response.json();
  },
};
