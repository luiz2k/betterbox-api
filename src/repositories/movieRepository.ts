import { favoriteMovie } from '@prisma/client';
import prisma from '../database/database';

import type {
  GetAllComments,
  Movie,
  MovieComment,
  MovieWatched,
} from './movieRepository.d';

export default class MovieRepository {
  public async getMovieById(data: Omit<Movie, 'name'>): Promise<Movie | null> {
    return await prisma.movie.findUnique({
      where: { ...data },
    });
  }

  public async createMovie(data: Movie): Promise<void> {
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
    data: Omit<favoriteMovie, 'favoriteDate'>,
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

  public async removeFromFavorite(
    data: Omit<favoriteMovie, 'favoriteDate'>,
  ): Promise<void> {
    await prisma.favoriteMovie.delete({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
    });
  }

  public async getCommentById(
    data: Omit<MovieComment, 'comment' | 'commentedAt' | 'editedAt'>,
  ): Promise<MovieComment | null> {
    return await prisma.movieComment.findUnique({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
    });
  }

  public async getAllComments(
    data: Omit<MovieComment, 'userId' | 'comment' | 'commentedAt' | 'editedAt'>,
  ): Promise<GetAllComments[]> {
    return await prisma.movieComment.findMany({
      where: { movieId: data.movieId },
      select: {
        comment: true,
        commentedAt: true,
        editedAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  public async createComment(
    data: Omit<MovieComment, 'editedAt'>,
  ): Promise<void> {
    await prisma.movieComment.create({
      data: { ...data },
    });
  }

  public async editComment(
    data: Omit<MovieComment, 'commentedAt'>,
  ): Promise<void> {
    await prisma.movieComment.update({
      where: { userId_movieId: { userId: data.userId, movieId: data.movieId } },
      data: { ...data },
    });
  }

  public async deleteComment(
    data: Omit<MovieComment, 'comment' | 'commentedAt' | 'editedAt'>,
  ): Promise<void> {
    await prisma.movieComment.delete({
      where: { userId_movieId: { ...data } },
    });
  }
}
