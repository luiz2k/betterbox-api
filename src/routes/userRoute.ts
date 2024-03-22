import { Router } from 'express';
import UserController from '../controllers/userController';
import UserAuthentication from '../middlewares/userAuthentication';

import ImageUploader from '../middlewares/imageUploader';

export default class UserRoute {
  private userAuthentication: UserAuthentication;
  public router: Router;
  private UserController: UserController;
  private ImageUploader: ImageUploader;

  constructor() {
    this.router = Router();
    this.UserController = new UserController();
    this.userAuthentication = new UserAuthentication();
    this.ImageUploader = new ImageUploader();

    this.routes();
  }

  private routes(): void {
    this.router.post(
      '/getPictureById',
      this.UserController.getPictureById.bind(this.UserController),
    );

    this.router.use(this.userAuthentication.verifyAuthentication);

    this.router.get(
      '/getUserById',
      this.UserController.getUserById.bind(this.UserController),
    );

    this.router.patch(
      '/changeUsername',
      this.UserController.changeUsername.bind(this.UserController),
    );

    this.router.patch(
      '/changeEmail',
      this.UserController.changeEmail.bind(this.UserController),
    );

    this.router.patch(
      '/changePassword',
      this.UserController.changePassword.bind(this.UserController),
    );

    this.router.get(
      '/getPicture',
      this.UserController.getPicture.bind(this.UserController),
    );

    this.router.patch(
      '/changePicture',
      this.ImageUploader.uploadSingle('imageFile'),
      this.UserController.changePicture.bind(this.UserController),
    );

    this.router.delete(
      '/deletePicture',
      this.UserController.deletePicture.bind(this.UserController),
    );

    this.router.delete(
      '/deleteAccount',
      this.UserController.deleteAccount.bind(this.UserController),
    );

    this.router.post(
      '/getAllWatchedMovies',
      this.UserController.getAllWatchedMovies.bind(this.UserController),
    );

    this.router.post(
      '/getAllFavoriteMovies',
      this.UserController.getAllFavoriteMovies.bind(this.UserController),
    );
  }
}
