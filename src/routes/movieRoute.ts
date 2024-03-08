import { Router } from 'express';
import MovieController from '../controllers/movieController';
import UserAuthentication from '../middlewares/userAuthentication';
import CreateMovie from '../middlewares/createMovie';

export default class MovieRoute {
  private userAuthentication: UserAuthentication;
  private createMovie: CreateMovie;

  public router: Router;
  private movieController: MovieController;

  constructor() {
    this.router = Router();
    this.movieController = new MovieController();

    this.userAuthentication = new UserAuthentication();
    this.createMovie = new CreateMovie();

    this.routes();
  }

  private routes(): void {
    this.router.use(this.createMovie.verifyMovie);

    this.router.post(
      '/getAllComments',
      this.movieController.getAllComments.bind(this.movieController),
    );

    this.router.use(this.userAuthentication.verifyAuthentication);

    this.router.post(
      '/addToWatched',
      this.movieController.addToWatched.bind(this.movieController),
    );

    this.router.post(
      '/removeFromWatched',
      this.movieController.removeFromWatched.bind(this.movieController),
    );

    this.router.post(
      '/getMovieWatched',
      this.movieController.getMovieWatched.bind(this.movieController),
    );

    this.router.post(
      '/addToFavorite',
      this.movieController.addToFavorite.bind(this.movieController),
    );

    this.router.post(
      '/removeFromFavorite',
      this.movieController.removeFromFavorite.bind(this.movieController),
    );

    this.router.post(
      '/getFavoriteMovie',
      this.movieController.getFavoriteMovie.bind(this.movieController),
    );

    this.router.post(
      '/createComment',
      this.movieController.createComment.bind(this.movieController),
    );

    this.router.post(
      '/editComment',
      this.movieController.editComment.bind(this.movieController),
    );

    this.router.post(
      '/deleteComment',
      this.movieController.deleteComment.bind(this.movieController),
    );
  }
}
