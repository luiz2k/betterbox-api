import { z } from 'zod';
import { signInSchema, signUpSchema } from '../validations/authValidation';

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;

export interface SignOut {
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface CreateUser {
  id: number;
}

export interface SignUpReturn {
  accessToken: string;
  refreshToken: string;
}

export interface SignInReturn {
  accessToken: string;
  refreshToken: string;
}

export interface RevokedToken {
  id: number;
  token: string;
  revokedAt: Date;
  expiresAt: Date;
  userId: number;
}

export interface RefreshToken {
  id: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  userId: number;
}
