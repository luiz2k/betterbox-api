import { Router } from 'express';
import AuthRoute from './authRoute';
import UserRoute from './userRoute';
import MovieRoute from './movieRoute';

import UserAuthentication from '../middlewares/userAuthentication';
import CreateMovie from '../middlewares/createMovie';

export default class Routes {
  public router: Router;
  private authRoute: AuthRoute;
  private userRoute: UserRoute;
  private movieRoute: MovieRoute;

  private userAuthentication: UserAuthentication;
  private createMovie: CreateMovie;

  constructor() {
    this.router = Router();
    this.authRoute = new AuthRoute();
    this.userRoute = new UserRoute();
    this.movieRoute = new MovieRoute();

    this.userAuthentication = new UserAuthentication();
    this.createMovie = new CreateMovie();

    this.routes();
  }

  private routes(): void {
    this.router.use('/auth', this.authRoute.router);

    this.router.use('/user', this.userRoute.router);

    this.router.use('/movie', this.movieRoute.router);
  }
}
