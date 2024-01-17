import { user as User } from '@prisma/client';

export type GetUserById = {
  id: number;
};

export type GetUserByIdReturn = {
  username: string;
  picture: string | null;
  bio: string | null;
};

export type ChangeUsername = {
  id: number;
  username: string;
};

export type ChangeEmail = {
  id: number;
  email: string;
  password: string;
  newEmail: string;
};

export type ChangePassword = {
  id: number;
  email: string;
  password: string;
  newPassword: string;
};

export type VerifyEmailAndPassord = {
  id: number;
  email: string;
  password: string;
};

export type DeleteAccount = {
  id: number;
  email: string;
  password: string;
};

export { User };
