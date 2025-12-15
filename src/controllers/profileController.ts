import { ProfileUpdateForm } from '../models/forms';
import { validateName, validateEmail, validatePhone, validateAddress } from '../utils/validation';
import * as userService from '../services/userService';
import { UserModel } from '../models/userModel';

export interface ControllerResult {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
  data?: any;
}

export async function loadProfile(): Promise<ControllerResult> {
  const res = await userService.getProfile();
  if (!res.success) return { success: false, error: res.error || 'Failed to load profile' };
  if (res.data) UserModel.setUser(res.data);
  return { success: true, data: res.data };
}

export async function updateProfile(form: ProfileUpdateForm): Promise<ControllerResult> {
  const errors: Record<string, string> = {};
  const nameV = validateName(form.fullName);
  if (!nameV.isValid) errors.fullName = nameV.error || '';
  const emailV = validateEmail(form.email);
  if (!emailV.isValid) errors.email = emailV.error || '';
  const phoneV = validatePhone(form.phone);
  if (!phoneV.isValid) errors.phone = phoneV.error || '';
  const addressV = validateAddress(form.address);
  if (!addressV.isValid) errors.address = addressV.error || '';
  if (Object.keys(errors).length) return { success: false, errors };

  const res = await userService.updateProfile({ fullName: form.fullName, email: form.email, phone: form.phone, address: form.address });
  if (!res.success) return { success: false, error: res.error || 'Failed to update profile' };
  if (res.data) UserModel.setUser(res.data);
  return { success: true, data: res.data };
}
