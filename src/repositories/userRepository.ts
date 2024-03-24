import prisma from '../database/database';

import type {
  FavoriteMovie,
  GetAllFavoriteMoviesReturn,
  GetAllWatchedMoviesReturn,
  MovieWatched,
  Pagination,
  PaginationReturn,
  UpdateUserData,
  User,
} from './userRepository.d';

export default class UserRepository {
  private pagination(data: Pagination): PaginationReturn {
    const currentPage: number = data.currentPage;
    const take: number = 20;
    const skip = currentPage * take - take;
    const totalPages: number = Math.ceil(data.totalData / take);

    return { skip, take, currentPage, totalPages };
  }

  async getUserDataById(
    data: Omit<User, 'username' | 'email' | 'password'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: data.id } });
  }

  async getUserDataByEmail(
    data: Omit<User, 'id' | 'username' | 'password'>,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: data.email } });
  }

  async updateUserData(data: UpdateUserData): Promise<void> {
    await prisma.user.update({ where: { id: data.id }, data: { ...data } });
  }

  async deleteAccount(
    data: Omit<User, 'username' | 'password'>,
  ): Promise<void> {
    await prisma.user.delete({ where: { id: data.id, email: data.email } });
  }

  public async getAllWatchedMovies(
    data: Omit<MovieWatched, 'movieId' | 'watchedDate'>,
  ): Promise<GetAllWatchedMoviesReturn> {
    const totalMoviesWatched: number = await prisma.movieWatched.count();

    const pagination: PaginationReturn = this.pagination({
      currentPage: data.page,
      totalData: totalMoviesWatched,
    });

    const movies = await prisma.movieWatched.findMany({
      skip: pagination.skip,
      take: pagination.take,
      where: { userId: data.userId },
      orderBy: { watchedDate: 'desc' },
    });

    return {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      data: [...movies],
    };
  }

  public async getAllFavoriteMovies(
    data: Omit<FavoriteMovie, 'movieId' | 'favoriteDate'>,
  ): Promise<GetAllFavoriteMoviesReturn> {
    const totalMoviesWatched: number = await prisma.favoriteMovie.count();

    const pagination: PaginationReturn = this.pagination({
      currentPage: data.page,
      totalData: totalMoviesWatched,
    });

    const movies = await prisma.favoriteMovie.findMany({
      where: { userId: data.userId },
      orderBy: { favoriteDate: 'desc' },
    });

    return {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      data: [...movies],
    };
  }
}
