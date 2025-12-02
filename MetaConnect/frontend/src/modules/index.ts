// APIs
export { authApi } from './auth/api';
export { usersApi } from './users/api';
export { testimonialsApi } from './testimonials/api';
export { articlesApi } from './articles/api';
export { leadsApi } from './leads/api';
export { teamApi } from './team/api';
export { uploadApi } from './upload/api';

// Sections
export { HeroSection } from './hero';
export { WorkersSection } from './team'; // team = workers (mesma coisa)
export { AreasAtuacaoSection } from './areas';
export { ProcessSection } from './process';
export { AboutSection } from './about';
export { BlogSection } from './articles'; // articles = blog (mesma coisa)
export { TestimonialsSection } from './testimonials';
export { FAQSection } from './faq';
export { CTASection } from './cta';

// Types
export type { User, LoginRequest, RegisterRequest, AuthResponse } from './auth/types';
export type { User as UserType, CreateUserRequest, UpdateUserRequest } from './users/types';
export type { Testimonial, CreateTestimonialRequest, UpdateTestimonialRequest } from './testimonials/types';
export type { Article, CreateArticleRequest, UpdateArticleRequest } from './articles/types';
export type { Lead, CreateLeadRequest, UpdateLeadStatusRequest, LeadStatus } from './leads/types';
export type { TeamMember, CreateTeamMemberRequest, UpdateTeamMemberRequest } from './team/types';
export type { UploadResponse } from './upload/types';
