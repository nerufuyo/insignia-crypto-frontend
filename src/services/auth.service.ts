import { api } from './api';
import type { LoginRequest, LoginResponse } from '../types';

export const authService = {
  register: async (username: string, password: string): Promise<LoginResponse> => {
    console.log('[Auth Service] Calling register with:', { username });
    const response = await api.post<LoginResponse>('/register', { username, password });
    console.log('[Auth Service] Register response:', response.data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    console.log('[Auth Service] Calling login with:', { username: data.username });
    const response = await api.post<LoginResponse>('/login', data);
    console.log('[Auth Service] Login response:', response.data);
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
