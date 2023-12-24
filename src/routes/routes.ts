import { Router } from 'express';
import AuthRoute from './authRoute';

export default class Routes {
  public router: Router;
  private authRoute: AuthRoute;

  constructor() {
    this.router = Router();
    this.authRoute = new AuthRoute();
    this.routes();
  }

  private routes(): void {
    this.router.use('/auth', this.authRoute.router);
  }
}
