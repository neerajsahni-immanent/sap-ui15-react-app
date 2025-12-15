export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileUpdateForm {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}
