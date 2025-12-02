import { User, CreateUserRequest, UpdateUserRequest, UsersResponse, UserResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_KEY = 'your_secure_api_key_here_32_characters_long';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

export const usersApi = {
  // GET /user
  getAll: async (): Promise<UsersResponse> => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },

  // GET /user/{id}
  getById: async (id: string): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  },

  // POST /user
  create: async (data: CreateUserRequest): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return response.json();
  },

  // PUT /user/{id}
  update: async (id: string, data: UpdateUserRequest): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  },

  // DELETE /user/{id}
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return response.json();
  },
};
