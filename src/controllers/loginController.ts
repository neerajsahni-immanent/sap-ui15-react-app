import { LoginForm } from '../models/forms';
import { validateEmail, validatePassword } from '../utils/validation';
import * as authService from '../services/authService';
import { UserModel } from '../models/userModel';

export interface ControllerResult {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
}

export async function handleLogin(form: LoginForm): Promise<ControllerResult> {
  const errors: Record<string, string> = {};
  const emailV = validateEmail(form.email);
  if (!emailV.isValid) errors.email = emailV.error || '';
  const passV = validatePassword(form.password);
  if (!passV.isValid) errors.password = passV.error || '';
  if (Object.keys(errors).length) return { success: false, errors };

  const res = await authService.login({ email: form.email, password: form.password });
  if (!res.success) return { success: false, error: res.error || 'Login failed' };
  if (res.data) {
    UserModel.setToken(res.data.token);
    UserModel.setUser(res.data.user);
  }
  return { success: true };
}
