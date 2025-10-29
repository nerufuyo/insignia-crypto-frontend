export interface User {
  username: string;
  token: string;
  balance?: number;
}

export interface Balance {
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'topup' | 'transfer';
  amount: number;
  username?: string;
  from_username?: string;
  to_username?: string;
  created_at: string;
}

export interface TopUser {
  username: string;
  transacted_value: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface TopupRequest {
  amount: number;
}

export interface TransferRequest {
  to_username: string;
  amount: number;
}

export interface ApiResponse<T = void> {
  data?: T;
  message?: string;
  error?: string;
}
