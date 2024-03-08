import { Request, Response } from 'express';

import MovieService from '../services/movieService';

import type {
  CreateCommentBody,
  EditCommentBody,
  Movie,
  MovieComments,
} from './movieController.d';

import {
  createCommentSchema,
  editCommentSchema,
} from '../validations/movieValidation';

export default class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  public async addToWatched(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.addToWatched({ ...movie, userId });

      return res.status(200).send({
        status: 'success',
        message: `O filme ${movie.name} foi adicionado aos assistidos.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async removeFromWatched(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.removeFromWatched({ ...movie, userId });

      return res.status(200).send({
        status: 'success',
        message: `O filme ${movie.name} foi removido de assistidos.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async getMovieWatched(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      const movieWatched = await this.movieService.getMovieWatched({
        ...movie,
        userId,
      });

      return res.status(200).send({
        status: 'success',
        message: `O filme ${movie.name} está na lista de assistidos.`,
        data: { ...movieWatched },
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async addToFavorite(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.addToFavorite({ ...movie, userId });

      return res.status(200).send({
        status: 'success',
        message: `O filme ${movie.name} foi adicionado aos favoritos.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async removeFromFavorite(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;
    try {
      await this.movieService.removeFromFavorite({ ...movie, userId });

      return res.status(200).send({
        status: 'success',
        message: `O filme ${movie.name} foi removido dos favoritos.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async getFavoriteMovie(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.getFavoriteMovie({
        ...movie,
        userId,
      });

      return res.status(200).send({
        status: 'success',
        message: `O filme ${movie.name} está na lista de favoritos.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async getAllComments(req: Request, res: Response): Promise<Response> {
    const movie: Movie = req.movie;

    try {
      const movieComments: MovieComments[] =
        await this.movieService.getAllComments({
          movieId: movie.id,
        });

      return res.status(201).send({
        status: 'success',
        message: `Obteve todos os comentários do filme ${movie.name}.`,
        data: [...movieComments],
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async createComment(req: Request, res: Response): Promise<Response> {
    const { comment }: CreateCommentBody = req.body;
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      const validation = createCommentSchema.safeParse({ comment });

      if (!validation.success) throw new Error(validation.error.message);

      await this.movieService.createComment({
        userId,
        movieId: movie.id,
        comment,
        commentedAt: new Date(),
      });

      return res.status(201).send({
        status: 'success',
        message: `Comentário adicionado ao filme ${movie.name}.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async editComment(req: Request, res: Response): Promise<Response> {
    const { newComment }: EditCommentBody = req.body;
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      const validation = editCommentSchema.safeParse({ newComment });

      if (!validation.success) throw new Error(validation.error.message);

      await this.movieService.editComment({
        userId,
        movieId: movie.id,
        comment: newComment,
        editedAt: new Date(),
      });

      return res.status(200).send({
        status: 'success',
        message: `Comentário editado no filme ${movie.name}.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async deleteComment(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.deleteComment({
        userId,
        movieId: movie.id,
      });

      return res.status(200).send({
        status: 'success',
        message: `Comentário removido do filme ${movie.name}.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }
}
