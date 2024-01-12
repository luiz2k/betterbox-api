import { Router } from 'express';
import ProfileController from '../controllers/profileController';

export default class ProfileRoute {
  public router: Router;
  private ProfileController: ProfileController;

  constructor() {
    this.router = Router();
    this.ProfileController = new ProfileController();
    this.routes();
  }

  private routes(): void {
    this.router.get(
      '/getProfile',
      this.ProfileController.getProfile.bind(this.ProfileController),
    );
  }
}
