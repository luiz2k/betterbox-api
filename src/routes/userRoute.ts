import { Router } from 'express';
import UserController from '../controllers/userController';

export default class UserRoute {
  public router: Router;
  private UserController: UserController;

  constructor() {
    this.router = Router();
    this.UserController = new UserController();
    this.routes();
  }

  private routes(): void {
    this.router.get(
      '/getUserById',
      this.UserController.getUserById.bind(this.UserController),
    );

    this.router.patch(
      '/changeUsername',
      this.UserController.changeUsername.bind(this.UserController),
    );
  }
}
