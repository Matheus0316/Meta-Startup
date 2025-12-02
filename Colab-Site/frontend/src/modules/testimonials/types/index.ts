export interface Testimonial {
  id: string;
  content: string;
  author: string;
  position: string;
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialRequest {
  content: string;
  author: string;
  position: string;
  image?: string;
  active?: boolean;
}

export interface UpdateTestimonialRequest {
  content?: string;
  author?: string;
  position?: string;
  image?: string;
  active?: boolean;
}

export interface TestimonialsResponse {
  success: boolean;
  count: number;
  testimonials: Testimonial[];
}

export interface TestimonialResponse {
  success: boolean;
  testimonial: Testimonial;
}

export interface ToggleActiveResponse {
  success: boolean;
  message: string;
  testimonial: Testimonial;
}
