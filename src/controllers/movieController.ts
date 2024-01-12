import { Request, Response } from 'express';

import MovieService from '../services/movieService';

import type { Comment, Movie } from './movieController.d';

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

      return res
        .status(200)
        .send(`O filme ${movie.name} foi adicionado aos assistidos.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
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

      return res
        .status(200)
        .send(`O filme ${movie.name} foi removido de assistidos.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async addToFavorite(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.addToFavorite({ ...movie, userId });

      return res
        .status(200)
        .send(`O filme ${movie.name} foi adicionado aos favoritos.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
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

      return res
        .status(200)
        .send(`O filme ${movie.name} foi removido dos favoritos.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async createComment(req: Request, res: Response): Promise<Response> {
    const { comment }: Comment = req.body;
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.createComment({
        userId,
        movieId: movie.id,
        comment,
        commentedAt: new Date(),
      });

      return res
        .status(201)
        .send(`Comentário adicionado ao filme ${movie.name}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async editComment(req: Request, res: Response): Promise<Response> {
    const { comment }: Comment = req.body;
    const userId: number = req.userId;
    const movie: Movie = req.movie;

    try {
      await this.movieService.editComment({
        userId,
        movieId: movie.id,
        comment,
        editedAt: new Date(),
      });

      return res.status(200).send(`Comentário editado no filme ${movie.name}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
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

      return res
        .status(200)
        .send(`Comentário removido do filme ${movie.name}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
