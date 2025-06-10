import api from './api';
import type { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../types/auth';

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/api/register/', data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/api/login/', data);
  
  // Store tokens and user data
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user', JSON.stringify({
      id: response.data.user_id,
      email: response.data.email,
      username: response.data.username,
    }));
  }
  
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await api.post('/api/logout/', { refresh: refreshToken });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of API call success
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user/profile/');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await api.post('/api/token/refresh/', { refresh });
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};