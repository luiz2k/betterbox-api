import prisma from '../database/database';
import type { User } from './authRepository.d';

export default class AuthRepository {
  public async getUserByEmail(
    data: Omit<User, 'id' | 'username' | 'password' | 'picture' | 'bio'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: data.email } });
  }

  public async createUser(
    data: Omit<User, 'id' | 'picture' | 'bio'>,
  ): Promise<Omit<User, 'email' | 'password'>> {
    return await prisma.user.create({
      data: { ...data },
      select: { id: true, username: true, picture: true, bio: true },
    });
  }
}
