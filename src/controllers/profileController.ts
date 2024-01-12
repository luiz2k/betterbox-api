import { Request, Response } from 'express';

import ProfileService from '../services/profileService';

import { GetProfile, UpdateProfileBody } from './profileController.d';

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

  async updateProfile(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;
    const { picture, bio }: UpdateProfileBody = req.body;

    try {
      await this.profileService.updateProfile({ userId, picture, bio });

      return res.status(200).send('Perfil do usuário atualizado.');
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }
}
