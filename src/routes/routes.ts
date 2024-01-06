import { Router } from 'express';
import AuthRoute from './authRoute';
import MovieRoute from './movieRoute';

import UserAuthentication from '../middlewares/userAuthentication';

export default class Routes {
  public router: Router;
  private authRoute: AuthRoute;
  private movieRoute: MovieRoute;

  private userAuthentication: UserAuthentication;

  constructor() {
    this.router = Router();
    this.authRoute = new AuthRoute();
    this.movieRoute = new MovieRoute();

    this.userAuthentication = new UserAuthentication();

    this.routes();
  }

  private routes(): void {
    this.router.use('/auth', this.authRoute.router);

    this.router.use(this.userAuthentication.verifyAutentication);

    this.router.use('/movie', this.movieRoute.router);
  }
}
