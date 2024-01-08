import MovieRepository from '../repositories/movieRepository';

import type {
  MovieWatched,
  AddToWatched,
  RemoveFromWatched,
  FavoriteMovie,
  AddToFavorite,
  RemoveFromFavorite,
  CreateComment,
  Comment,
  EditComment,
} from './movieService.d';

export default class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  public async addToWatched(data: AddToWatched, userId: number): Promise<void> {
    const movie = await this.movieRepository.getMovieById({ id: data.id });

    if (!movie)
      await this.movieRepository.createMovie({
        id: data.id,
        name: data.name,
      });

    await this.movieRepository.addToWatched({
      userId,
      movieId: data.id,
      watchedDate: new Date(),
    });
  }

  public async removeFromWatched(
    data: RemoveFromWatched,
    userId: number,
  ): Promise<void> {
    const movieWatched: MovieWatched | null =
      await this.movieRepository.getMovieWatched({
        userId,
        movieId: data.id,
      });

    if (!movieWatched)
      throw new Error('Impossível remover um filme que nunca foi assistido.');

    await this.movieRepository.removeFromWatched({
      userId,
      movieId: data.id,
    });
  }

  public async addToFavorite(
    data: AddToFavorite,
    userId: number,
  ): Promise<void> {
    const movie = await this.movieRepository.getMovieById({ id: data.id });

    if (!movie)
      await this.movieRepository.createMovie({
        id: data.id,
        name: data.name,
      });

    const favoriteMovie: FavoriteMovie | null =
      await this.movieRepository.getFavoriteMovie({
        userId,
        movieId: data.id,
      });

    if (favoriteMovie) throw new Error('Esse filme já está favoritdo.');

    await this.movieRepository.addToFavorite({
      userId,
      movieId: data.id,
    });
  }

  public async removeFromFavorite(
    data: RemoveFromFavorite,
    userId: number,
  ): Promise<void> {
    const favoriteMovie: FavoriteMovie | null =
      await this.movieRepository.getFavoriteMovie({
        userId,
        movieId: data.id,
      });

    if (!favoriteMovie)
      throw new Error('Impossível remover um filme que nunca foi favoritado.');

    await this.movieRepository.removeFromFavorite({
      userId,
      movieId: data.id,
    });
  }

  public async createComment(data: CreateComment): Promise<void> {
    const comment: Comment | null = await this.movieRepository.getCommentById({
      userId: data.userId,
      movieId: data.movieId,
    });

    if (comment)
      throw new Error('Só é possível fazer um comentário por filme.');

    await this.movieRepository.createComment({ ...data });
  }

  public async editComment(data: EditComment): Promise<void> {
    const comment: Comment | null = await this.movieRepository.getCommentById({
      userId: data.userId,
      movieId: data.movieId,
    });

    if (!comment)
      throw new Error('Impossível editar um comentário que não existe.');

    await this.movieRepository.editComment({
      ...data,
      editedAt: comment.commentedAt,
    });
  }
}
