import { Router } from 'express';
import AuthController from '../controllers/authController';
import UserAuthentication from '../middlewares/userAuthentication';

export default class AuthRoute {
  public router: Router;
  private authController: AuthController;

  private userAuthentication: UserAuthentication;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.userAuthentication = new UserAuthentication();
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

    this.router.post(
      '/refreshToken',
      this.authController.refreshToken.bind(this.authController),
    );

    this.router.use(this.userAuthentication.verifyAuthentication);

    this.router.post(
      '/signout',
      this.authController.signOut.bind(this.authController),
    );
  }
}
