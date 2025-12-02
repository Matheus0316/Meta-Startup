import { 
  Testimonial, 
  CreateTestimonialRequest, 
  UpdateTestimonialRequest, 
  TestimonialsResponse, 
  TestimonialResponse,
  ToggleActiveResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_KEY = 'your_secure_api_key_here_32_characters_long';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

export const testimonialsApi = {
  // GET /testimonials
  getAll: async (): Promise<Testimonial[]> => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    return response.json();
  },

  // GET /testimonials/{id}
  getById: async (id: string): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonial');
    }

    return response.json();
  },

  // POST /testimonials
  create: async (data: CreateTestimonialRequest): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create testimonial');
    }

    return response.json();
  },

  // PUT /testimonials/{id}
  update: async (id: string, data: UpdateTestimonialRequest): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update testimonial');
    }

    return response.json();
  },

  // PATCH /testimonials/{id}/toggle-active
  toggleActive: async (id: string): Promise<ToggleActiveResponse> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}/toggle-active`, {
      method: 'PATCH',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle testimonial status');
    }

    return response.json();
  },

  // DELETE /testimonials/{id}
  delete: async (id: string): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete testimonial');
    }

    return response.json();
  },
};
