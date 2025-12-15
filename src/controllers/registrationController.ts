import { RegistrationForm } from '../models/forms';
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from '../utils/validation';
import * as authService from '../services/authService';
import { UserModel } from '../models/userModel';

export interface ControllerResult {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
}

export async function handleRegister(form: RegistrationForm): Promise<ControllerResult> {
  const errors: Record<string, string> = {};
  const nameV = validateName(form.fullName);
  if (!nameV.isValid) errors.fullName = nameV.error || '';
  const emailV = validateEmail(form.email);
  if (!emailV.isValid) errors.email = emailV.error || '';
  const passV = validatePassword(form.password);
  if (!passV.isValid) errors.password = passV.error || '';
  const matchV = validatePasswordMatch(form.password, form.confirmPassword);
  if (!matchV.isValid) errors.confirmPassword = matchV.error || '';
  if (Object.keys(errors).length) return { success: false, errors };

  const res = await authService.register({ fullName: form.fullName, email: form.email, password: form.password });
  if (!res.success) return { success: false, error: res.error || 'Registration failed' };
  if (res.data?.user) {
    UserModel.setUser(res.data.user);
  }
  return { success: true };
}
