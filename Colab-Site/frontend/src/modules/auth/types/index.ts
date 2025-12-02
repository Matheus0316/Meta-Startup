export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthResponse {}
export interface RegisterResponse extends AuthResponse {}
