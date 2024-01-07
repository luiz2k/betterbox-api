import { favoriteMovie } from '@prisma/client';
import prisma from '../database/database';

import type { Movie, MovieWatched } from './movieRepository.d';

export default class MovieRepository {
  public async getMovieById(data: Omit<Movie, 'name'>): Promise<Movie | null> {
    return await prisma.movie.findUnique({
      where: { ...data },
    });
  }

  public async addMovie(data: Movie): Promise<void> {
    await prisma.movie.create({
      data: { ...data },
    });
  }

  public async getMovieWatched(
    data: Omit<MovieWatched, 'watchedDate'>,
  ): Promise<MovieWatched | null> {
    return await prisma.movieWatched.findUnique({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
    });
  }

  public async addToWatched(data: MovieWatched): Promise<void> {
    await prisma.movieWatched.create({
      data: { ...data },
    });
  }

  public async removeFromWatched(
    data: Omit<MovieWatched, 'watchedDate'>,
  ): Promise<void> {
    await prisma.movieWatched.delete({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
    });
  }

  public async getFavoriteMovie(
    data: favoriteMovie,
  ): Promise<favoriteMovie | null> {
    return await prisma.favoriteMovie.findUnique({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
    });
  }

  public async addToFavorite(data: favoriteMovie): Promise<void> {
    await prisma.favoriteMovie.create({
      data: { ...data },
    });
  }

  public async removeFromFavorite(data: favoriteMovie): Promise<void> {
    await prisma.favoriteMovie.delete({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
    });
  }
}
