import prisma from '../database/database';

import type { GetUserByIdReturn, User } from './userRepository.d';

export default class UserRepository {
  async getUserById(
    data: Omit<User, 'username' | 'email' | 'password' | 'picture' | 'bio'>,
  ): Promise<GetUserByIdReturn | null> {
    return await prisma.user.findUnique({
      where: { id: data.id },
      select: { username: true, picture: true, bio: true },
    });
  }
}
