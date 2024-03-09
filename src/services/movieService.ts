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
  DeleteComment,
  GetMovieWatched,
  GetFavoriteMovie,
  MovieComments,
} from './movieService.d';

type GetAllComments = {
  movieId: number;
};

export default class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  public async addToWatched(data: AddToWatched): Promise<void> {
    await this.movieRepository.addToWatched({
      userId: data.userId,
      movieId: data.id,
      watchedDate: new Date(),
    });
  }

  public async removeFromWatched(data: RemoveFromWatched): Promise<void> {
    const movieWatched: MovieWatched | null =
      await this.movieRepository.getMovieWatched({
        userId: data.userId,
        movieId: data.id,
      });

    if (!movieWatched)
      throw new Error('Impossível remover um filme que nunca foi assistido.');

    await this.movieRepository.removeFromWatched({
      userId: data.userId,
      movieId: data.id,
    });
  }

  public async getMovieWatched(
    data: GetMovieWatched,
  ): Promise<Omit<MovieWatched, 'movieId' | 'userId'>> {
    const movieWatched: MovieWatched | null =
      await this.movieRepository.getMovieWatched({
        userId: data.userId,
        movieId: data.id,
      });

    if (!movieWatched)
      throw new Error('O filme informado não está na lista de assistidos.');

    return { watchedDate: movieWatched.watchedDate };
  }

  public async addToFavorite(data: AddToFavorite): Promise<void> {
    const favoriteMovie: FavoriteMovie | null =
      await this.movieRepository.getFavoriteMovie({
        userId: data.userId,
        movieId: data.id,
      });

    if (favoriteMovie) throw new Error('Esse filme já está nos favoritos.');

    await this.movieRepository.addToFavorite({
      userId: data.userId,
      movieId: data.id,
      favoriteDate: new Date(),
    });
  }

  public async removeFromFavorite(data: RemoveFromFavorite): Promise<void> {
    const favoriteMovie: FavoriteMovie | null =
      await this.movieRepository.getFavoriteMovie({
        userId: data.userId,
        movieId: data.id,
      });

    if (!favoriteMovie)
      throw new Error('Impossível remover um filme que nunca foi favoritado.');

    await this.movieRepository.removeFromFavorite({
      userId: data.userId,
      movieId: data.id,
    });
  }

  public async getFavoriteMovie(data: GetFavoriteMovie): Promise<void> {
    const movieFavorite: FavoriteMovie | null =
      await this.movieRepository.getFavoriteMovie({
        userId: data.userId,
        movieId: data.id,
      });

    if (!movieFavorite)
      throw new Error('O filme informado não está na lista de favoritos.');
  }

  public async getAllComments(data: GetAllComments): Promise<MovieComments[]> {
    const comments = await this.movieRepository.getAllComments({
      movieId: data.movieId,
    });

    return comments;
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

  public async deleteComment(data: DeleteComment): Promise<void> {
    const comment: Comment | null = await this.movieRepository.getCommentById({
      userId: data.userId,
      movieId: data.movieId,
    });

    if (!comment)
      throw new Error('Impossível deletar um comentário que não existe.');

    await this.movieRepository.deleteComment({ ...data });
  }
}
