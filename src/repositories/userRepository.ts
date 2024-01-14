import prisma from '../database/database';

import type { UpdateUserData, User } from './userRepository.d';

export default class UserRepository {
  async getUserDataById(
    data: Omit<User, 'username' | 'email' | 'password' | 'picture' | 'bio'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: data.id } });
  }

  async updateUserData(data: UpdateUserData): Promise<void> {
    await prisma.user.update({ where: { id: data.id }, data: { ...data } });
  }
}
