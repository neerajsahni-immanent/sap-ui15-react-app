import { API_BASE_URL } from '../utils/config';
import { API_ENDPOINTS } from '../utils/constants';
import { User } from '../models/userModel';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function login(payload: LoginRequest): Promise<ApiResult<LoginResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: text || res.statusText };
    }
    const data = (await res.json()) as LoginResponse;
    return { success: true, data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export async function register(payload: RegisterRequest): Promise<ApiResult<RegisterResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: text || res.statusText };
    }
    const data = (await res.json()) as RegisterResponse;
    return { success: true, data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function logout(): Promise<ApiResult<null>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGOUT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return { success: false, error: res.statusText };
    return { success: true, data: null };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
