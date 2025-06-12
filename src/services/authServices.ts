import api from './api';
import type { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../types/auth';

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/api/auth/register/', data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/api/auth/login/', data);
    
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
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await api.post('/api/auth/logout/', { refresh: refreshToken });
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
    const response = await api.get('/api/auth/user/');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await api.post('/api/auth/token/refresh/', { refresh });
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (data: Partial<{
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}>) => {
  try {
    const response = await api.patch('/api/auth/user/', data);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (data: {
  old_password: string;
  new_password: string;
}) => {
  try {
    const response = await api.post('/api/auth/change-password/', data);
    return response.data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};