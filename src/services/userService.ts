import { API_BASE_URL } from '../utils/config';
import { API_ENDPOINTS } from '../utils/constants';
import { User } from '../models/userModel';

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('app_auth_token') : null;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getProfile(): Promise<ApiResult<User>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_PROFILE}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!res.ok) return { success: false, error: res.statusText };
    const data = (await res.json()) as User;
    return { success: true, data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function updateProfile(payload: Partial<User>): Promise<ApiResult<User>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_PROFILE}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false, error: res.statusText };
    const data = (await res.json()) as User;
    return { success: true, data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
