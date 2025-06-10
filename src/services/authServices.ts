import axios from 'axios'
import type { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../types/auth'

const API_URL = import.meta.env.VITE_API_BASE_URL; // or rename your .env variable


export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${API_URL}/api/register/`, data); 
  return response.data;
};



export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/api/login/`, data);
  return response.data;

}