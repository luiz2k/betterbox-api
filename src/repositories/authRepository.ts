import prisma from '../database/database';
import type { User } from './authRepository.d';

export default class AuthRepository {
  public async getUserByEmail(
    data: Omit<User, 'id' | 'username' | 'password'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: data.email } });
  }

  public async createUser(
    data: Omit<User, 'id'>,
  ): Promise<Omit<User, 'email' | 'password'>> {
    return await prisma.user.create({
      data: { ...data },
      select: { id: true, username: true },
    });
  }
}
