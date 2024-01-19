import { Request, Response, NextFunction } from 'express';

import type { CreateMovieBody, MovieData, Movie } from './createMovie.d';

import MovieRepository from '../repositories/movieRepository';

import axios from 'axios';
import { createMovieSchema } from '../validations/createMovieValidation';

export default class CreateMovie {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  public verifyMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { movieId }: CreateMovieBody = req.body;

    try {
      const validation = createMovieSchema.safeParse({ movieId });

      if (!validation.success) throw new Error(validation.error.message);

      const MovieData: MovieData = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        headers: { Authorization: `Bearer ${process.env.TMDB_AUTHORIZATION}` },
      });

      req.movie = { id: MovieData.data.id, name: MovieData.data.title };

      const existingFilm: Movie | null =
        await this.movieRepository.getMovieById({ id: MovieData.data.id });

      if (existingFilm) return next();

      await this.movieRepository.createMovie({
        id: MovieData.data.id,
        name: MovieData.data.title,
      });

      next();
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(401).send({ error: 'Erro interno do servidor.' })
        : res.status(401).send({ error: 'Erro interno do servidor.' });
    }
  };
}
