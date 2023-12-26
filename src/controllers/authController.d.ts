import { z } from 'zod';
import { signUpSchema, signInSchema } from '../validations/authValidation';

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;

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

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
