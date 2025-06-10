// src/types/auth.ts
export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user_id: number;
  email: string;
  username: string;
}
