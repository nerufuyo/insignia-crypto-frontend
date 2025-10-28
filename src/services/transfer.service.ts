import { api } from './api';
import type { TransferRequest } from '../types';

export const transferService = {
  transfer: async (data: TransferRequest): Promise<void> => {
    await api.post('/transfer', data);
  },
};
