import { z } from 'zod';
import { signInSchema, signUpSchema } from '../validations/authValidation';

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;

export interface RefreshToken {
  refreshToken: string;
}

interface AccessAndRefreshToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
}

type SignOut = RefreshToken;

export interface User {
  id: number;
  username: string;
  picture: string | null;
  bio: string | null;
  email: string;
  password: string;
}

export interface CreateUser {
  id: number;
  username: string;
  picture: string | null;
  bio: string | null;
}

export type GenerateTokensReturn = AccessAndRefreshToken;

export type SignInReturn = AccessAndRefreshToken & {
  user: {
    id: number;
    username: string;
    picture: string | null;
    bio: string | null;
  };
};

export type SignUpReturn = AccessAndRefreshToken & {
  user: {
    id: number;
    username: string;
    picture: string | null;
    bio: string | null;
  };
};

export type RefreshTokenReturn = AccessAndRefreshToken;

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
