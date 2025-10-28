import { api } from './api';
import type { Transaction, TopUser } from '../types';

export const transactionService = {
  getUserTopTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions/user/top');
    return response.data;
  },

  getTopUsers: async (): Promise<TopUser[]> => {
    const response = await api.get<TopUser[]>('/transactions/top-users');
    return response.data;
  },
};
