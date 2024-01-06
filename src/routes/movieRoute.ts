import { Router } from 'express';
import MovieController from '../controllers/movieController';

export default class MovieRoute {
  public router: Router;
  private movieController: MovieController;

  constructor() {
    this.router = Router();
    this.movieController = new MovieController();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      '/addToFavorites',
      this.movieController.addToWatched.bind(this.movieController),
    );
  }
}
