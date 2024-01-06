import { Request, Response } from 'express';
import axios from 'axios';

import MovieService from '../services/movieService';

export default class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  public async addToWatched(req: Request, res: Response) {
    const { movieId }: { movieId: number } = req.body;
    const userId: number = req.userId;

    const authorization = process.env.TMDB_AUTHORIZATION;

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

  public async removeFromWatched(req: Request, res: Response) {
    const { movieId }: { movieId: number } = req.body;
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
}
