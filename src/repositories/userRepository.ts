import prisma from '../database/database';

import type {
  FavoriteMovie,
  MovieWatched,
  UpdateUserData,
  User,
} from './userRepository.d';

export default class UserRepository {
  async getUserDataById(
    data: Omit<User, 'username' | 'email' | 'password' | 'picture' | 'bio'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: data.id } });
  }

  async getUserDataByEmail(
    data: Omit<User, 'id' | 'username' | 'password' | 'picture' | 'bio'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: data.email } });
  }

  async updateUserData(data: UpdateUserData): Promise<void> {
    await prisma.user.update({ where: { id: data.id }, data: { ...data } });
  }

  async deleteAccount(
    data: Omit<User, 'username' | 'password' | 'picture' | 'bio'>,
  ): Promise<void> {
    await prisma.user.delete({ where: { id: data.id, email: data.email } });
  }

  public async getAllWatchedMovies(
    data: Omit<MovieWatched, 'movieId' | 'watchedDate'>,
  ) {
    return await prisma.movieWatched.findMany({
      where: {
        userId: data.userId,
      },
    });
  }

  public async getAllFavoriteMovies(data: Omit<FavoriteMovie, 'movieId'>) {
    return await prisma.favoriteMovie.findMany({
      where: {
        userId: data.userId,
      },
    });
  }
}
