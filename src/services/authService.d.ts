import { z } from 'zod';
import { signInSchema, signUpSchema } from '../validations/authValidation';

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;

export interface RefreshToken {
  refreshToken: string;
}

export type SignOut = RefreshToken;

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface CreateUser {
  id: number;
}

export interface SignInReturn {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpReturn {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenReturn {
  accessToken: string;
  refreshToken: string;
}

export interface GetRevokedToken {
  id: number;
  token: string;
  revokedAt: Date;
  expiresAt: Date;
  userId: number;
}

export interface GetRefreshToken {
  id: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  userId: number;
}

export interface Decoded {
  userId: number;
  iat: number;
  exp: number;
}
