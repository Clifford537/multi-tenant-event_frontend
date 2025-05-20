// types/auth.ts
export interface User {
  id: number;
  name: string;
  email: string;
  organization_id: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}