import { Router } from 'express';
import AuthRoute from './authRoute';

import UserAuthentication from '../middlewares/userAuthentication';

export default class Routes {
  public router: Router;
  private authRoute: AuthRoute;

  private userAuthentication: UserAuthentication;

  constructor() {
    this.router = Router();
    this.authRoute = new AuthRoute();

    this.userAuthentication = new UserAuthentication();

    this.routes();
  }

  private routes(): void {
    this.router.use('/auth', this.authRoute.router);

    this.router.use(this.userAuthentication.verifyAutentication);
  }
}
