import prisma from '../database/database';
import type { RefreshToken, RevokedToken } from './tokenRepository.d';

export default class TokenRepository {
  public async getRefreshToken(
    data: Omit<RefreshToken, 'id' | 'createdAt' | 'expiresAt' | 'userId'>,
  ): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findFirst({
      where: { token: data.token },
    });
  }

  public async addRefreshToken(data: Omit<RefreshToken, 'id'>): Promise<void> {
    await prisma.refreshToken.create({
      data: {
        token: data.token,
        createdAt: data.createdAt,
        expiresAt: data.expiresAt,
        user: { connect: { id: data.userId } },
      },
    });
  }

  public async removeRefreshToken(
    data: Omit<RefreshToken, 'createdAt' | 'expiresAt' | 'userId'>,
  ): Promise<void> {
    await prisma.refreshToken.delete({
      where: { id: data.id, token: data.token },
    });
  }

  public async getRevokedToken(
    data: Omit<RevokedToken, 'id' | 'revokedAt' | 'expiresAt' | 'userId'>,
  ): Promise<RevokedToken | null> {
    return await prisma.revokedToken.findFirst({
      where: { token: data.token },
    });
  }

  public async addRevokedToken(data: Omit<RevokedToken, 'id'>): Promise<void> {
    await prisma.revokedToken.create({
      data: {
        token: data.token,
        revokedAt: data.revokedAt,
        expiresAt: data.expiresAt,
        user: { connect: { id: data.userId } },
      },
    });
  }

  public async removeRevokedToken(
    data: Omit<RevokedToken, 'createAt' | 'expiresAt' | 'userId'>,
  ): Promise<void> {
    await prisma.revokedToken.delete({
      where: { id: data.id, token: data.token },
    });
  }
}
