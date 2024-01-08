import { Request, Response } from 'express';
import axios from 'axios';

import MovieService from '../services/movieService';

import type { Comment, MovieId } from './movieController.d';

export default class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  public async addToWatched(req: Request, res: Response): Promise<Response> {
    const { movieId }: MovieId = req.body;
    const userId: number = req.userId;

    const authorization: string = process.env.TMDB_AUTHORIZATION;

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${authorization}` },
      });

      const responseFormat = {
        id: response.data.id,
        name: response.data.title,
      };

      await this.movieService.addToWatched(responseFormat, userId);

      return res
        .status(200)
        .send(`O filme ${responseFormat.name} foi adicionado aos assistidos.`);
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
    const { movieId }: MovieId = req.body;
    const userId: number = req.userId;

    const authorization: string = process.env.TMDB_AUTHORIZATION;

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${authorization}` },
      });

      const responseFormat = {
        id: response.data.id,
        name: response.data.title,
      };

      await this.movieService.removeFromWatched(responseFormat, userId);

      return res
        .status(200)
        .send(`O filme ${responseFormat.name} foi removido de assistidos.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async addToFavorite(req: Request, res: Response): Promise<Response> {
    const { movieId }: MovieId = req.body;
    const userId: number = req.userId;

    const authorization: string = process.env.TMDB_AUTHORIZATION;

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${authorization}` },
      });

      const formattedResponse = {
        id: response.data.id,
        name: response.data.title,
      };

      await this.movieService.addToFavorite(formattedResponse, userId);

      return res
        .status(200)
        .send(
          `O filme ${formattedResponse.name} foi adicionado aos favoritos.`,
        );
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
    const { movieId }: MovieId = req.body;
    const userId: number = req.userId;

    const authorization: string = process.env.TMDB_AUTHORIZATION;

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${authorization}` },
      });

      const formattedResponse = {
        id: response.data.id,
        name: response.data.title,
      };

      await this.movieService.removeFromFavorite(formattedResponse, userId);

      return res
        .status(200)
        .send(`O filme ${formattedResponse.name} foi removido dos favoritos.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async createComment(req: Request, res: Response): Promise<Response> {
    const { movieId, comment }: MovieId & Comment = req.body;
    const userId: number = req.userId;

    const authorization: string = process.env.TMDB_AUTHORIZATION;

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${authorization}` },
      });

      const formattedResponse = {
        id: response.data.id,
        name: response.data.title,
      };

      await this.movieService.createComment({
        userId,
        movieId: formattedResponse.id,
        comment,
        commentedAt: new Date(),
      });

      return res
        .status(201)
        .send(`Comentário adicionado ao filme ${formattedResponse.name}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async editComment(req: Request, res: Response): Promise<Response> {
    const { movieId, comment }: MovieId & Comment = req.body;
    const userId: number = req.userId;

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${process.env.TMDB_AUTHORIZATION}` },
      });

      const formattedResponse = {
        id: response.data.id,
        name: response.data.title,
      };

      await this.movieService.editComment({
        userId,
        movieId: formattedResponse.id,
        comment,
        editedAt: new Date(),
      });

      return res
        .status(200)
        .send(`Comentário editado no filme ${formattedResponse.name}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
