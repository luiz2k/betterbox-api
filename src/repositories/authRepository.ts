import prisma from '../database/database';
import type { User, UserWithProfile } from './authRepository.d';

export default class AuthRepository {
  public async getUserByEmail(
    data: Omit<User, 'id' | 'username' | 'password'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: data.email } });
  }

  public async createUser(
    data: Omit<UserWithProfile, 'id'>,
  ): Promise<Omit<User, 'username' | 'email' | 'password'>> {
    return await prisma.user.create({
      data: { ...data },
      select: { id: true },
    });
  }
}
