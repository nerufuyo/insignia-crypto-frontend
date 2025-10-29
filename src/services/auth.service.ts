import { api } from './api';
import type { LoginRequest, LoginResponse } from '../types';

export const authService = {
  register: async (username: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/register', { username });
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  getUsername: (): string | null => {
    return localStorage.getItem('username');
  },

  setAuth: (token: string, username: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
  },
};
