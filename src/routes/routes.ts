import { Router } from 'express';
import AuthRoute from './authRoute';
import ProfileRoute from './userRoute';
import MovieRoute from './movieRoute';

import UserAuthentication from '../middlewares/userAuthentication';
import CreateMovie from '../middlewares/createMovie';

export default class Routes {
  public router: Router;
  private authRoute: AuthRoute;
  private profileRoute: ProfileRoute;
  private movieRoute: MovieRoute;

  private userAuthentication: UserAuthentication;
  private createMovie: CreateMovie;

  constructor() {
    this.router = Router();
    this.authRoute = new AuthRoute();
    this.profileRoute = new ProfileRoute();
    this.movieRoute = new MovieRoute();

    this.userAuthentication = new UserAuthentication();
    this.createMovie = new CreateMovie();

    this.routes();
  }

  private routes(): void {
    this.router.use('/auth', this.authRoute.router);

    this.router.use(this.userAuthentication.verifyAuthentication);

    this.router.use('/profile', this.profileRoute.router);

    this.router.use(this.createMovie.verifyMovie);

    this.router.use('/movie', this.movieRoute.router);
  }
}
