import { z } from 'zod';
import { signUpSchema, signInSchema } from '../validations/authValidation';

export type SignUpBody = z.infer<typeof signUpSchema>;
export type SignInBody = z.infer<typeof signInSchema>;

type refreshToken = { refreshToken: string };

export type RefreshTokenBody = refreshToken;

export type SignOutBody = refreshToken;

export type SignUpSafeParse = SafeParseReturnType<
  {
    username: string;
    email: string;
    password: string;
  },
  {
    username: string;
    email: string;
    password: string;
  }
>;

export type SignInSafeParse = SafeParseReturnType<
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
>;

type tokens = {
  accessToken: string;
  refreshToken: string;
};

export type SignUpResponse = tokens;

export type SignInResponse = tokens;

export type RefreshTokenResponse = tokens;
