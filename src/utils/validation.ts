export type FieldValidation = { isValid: boolean; error?: string };

export function validateEmail(email: string): FieldValidation {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { isValid: false, error: 'Email is required' };
  if (!re.test(email)) return { isValid: false, error: 'Invalid email format' };
  return { isValid: true };
}

export function validatePassword(password: string): FieldValidation {
  if (!password) return { isValid: false, error: 'Password is required' };
  if (password.length < 8) return { isValid: false, error: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { isValid: false, error: 'Password must contain an uppercase letter' };
  if (!/[0-9]/.test(password)) return { isValid: false, error: 'Password must contain a number' };
  if (!/[!@#\$%\^&\*]/.test(password)) return { isValid: false, error: 'Password must contain a special character' };
  return { isValid: true };
}

export function validateName(name: string): FieldValidation {
  if (!name) return { isValid: false, error: 'Name is required' };
  if (name.length < 2) return { isValid: false, error: 'Name is too short' };
  return { isValid: true };
}

export function validatePhone(phone?: string): FieldValidation {
  if (!phone) return { isValid: true };
  const re = /^[0-9+\-()\s]{7,20}$/;
  if (!re.test(phone)) return { isValid: false, error: 'Invalid phone number' };
  return { isValid: true };
}

export function validateAddress(address?: string): FieldValidation {
  if (!address) return { isValid: true };
  if (address.length < 5) return { isValid: false, error: 'Address is too short' };
  return { isValid: true };
}

export function validatePasswordMatch(password: string, confirm: string): FieldValidation {
  if (password !== confirm) return { isValid: false, error: 'Passwords do not match' };
  return { isValid: true };
}
