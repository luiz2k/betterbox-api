import {
  refreshToken as RefreshToken,
  revokedToken as RevokedToken,
} from '@prisma/client';

export type Decoded = {
  userId: number;
  iat: number;
  exp: number;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export { RefreshToken, RevokedToken };
