export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  token?: string | null;
  user?: User | null;
}

class UserModelClass {
  private state: AuthState = { token: null, user: null };

  getUser(): User | null {
    return this.state.user || null;
  }

  setUser(user: User) {
    this.state.user = user;
    try {
      localStorage.setItem('app_user_data', JSON.stringify(user));
    } catch {}
  }

  getToken(): string | null {
    return this.state.token || null;
  }

  setToken(token: string | null) {
    this.state.token = token;
    try {
      if (token) localStorage.setItem('app_auth_token', token);
      else localStorage.removeItem('app_auth_token');
    } catch {}
  }

  clear() {
    this.state = { token: null, user: null };
    try {
      localStorage.removeItem('app_auth_token');
      localStorage.removeItem('app_user_data');
    } catch {}
  }
}

export const UserModel = new UserModelClass();
