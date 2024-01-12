import { Request, Response } from 'express';

import ProfileService from '../services/profileService';

import { GetProfile } from './profileController.d';

export default class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;

    try {
      const getProfile: GetProfile | null =
        await this.profileService.getProfile({ userId });

      return res.status(200).send(getProfile);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
