import { Router } from 'express';
import AuthController from '../controllers/authController';

export default class AuthRoute {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      '/signin',
      this.authController.signIn.bind(this.authController),
    );

    this.router.post(
      '/signup',
      this.authController.signUp.bind(this.authController),
    );
  }
}
