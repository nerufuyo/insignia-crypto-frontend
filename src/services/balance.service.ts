import { api } from './api';
import type { Balance, TopupRequest } from '../types';

export const balanceService = {
  getBalance: async (): Promise<Balance> => {
    const response = await api.get<Balance>('/balance');
    return response.data;
  },

  topup: async (data: TopupRequest): Promise<void> => {
    await api.post('/balance/topup', data);
  },
};
