import {
  refreshToken as RefreshToken,
  revokedToken as RevokedToken,
} from '@prisma/client';

interface Decoded {
  userId: number;
  iat: number;
  exp: number;
}

export { RefreshToken, RevokedToken, Decoded };
