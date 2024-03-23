import { Request, Response } from 'express';

import UserService from '../services/userService';

import {
  ChangeEmailBody,
  ChangeUsernameBody,
  DeleteAccountBody,
  FavoriteMovie,
  GetUser,
  MovieWatched,
} from './userController.d';

import {
  changeEmailSchema,
  changePasswordSchema,
  changeUsernameSchema,
} from '../validations/userValidation';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const userId: number = req.userId;

    try {
      const getUser: GetUser = await this.userService.getUserById({
        id: userId,
      });

      return res.status(200).send(getUser);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  async changeUsername(req: Request, res: Response): Promise<Response> {
    const { newUsername }: ChangeUsernameBody = req.body;
    const userId: number = req.userId;

    try {
      const validation = changeUsernameSchema.safeParse({ newUsername });

      if (!validation.success) throw new Error(validation.error.message);

      await this.userService.changeUsername({
        id: userId,
        username: newUsername,
      });

      return res.status(200).send({
        status: 'success',
        message: `Nome de usuário alterado para ${newUsername}.`,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async changeEmail(req: Request, res: Response): Promise<Response> {
    const { email, password, newEmail }: ChangeEmailBody = req.body;
    const userId: number = req.userId;

    try {
      const validation = changeEmailSchema.safeParse({
        email,
        password,
        newEmail,
      });

      if (!validation.success) throw new Error(validation.error.message);

      await this.userService.changeEmail({
        id: userId,
        email,
        password,
        newEmail,
      });

      return res
        .status(200)
        .send({ status: 'success', message: 'Email alterado com sucesso!' });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async changePassword(req: Request, res: Response): Promise<Response> {
    const { email, password, newPassword } = req.body;
    const userId: number = req.userId;

    try {
      const validation = changePasswordSchema.safeParse({
        email,
        password,
        newPassword,
      });

      if (!validation.success) throw new Error(validation.error.message);

      await this.userService.changePassword({
        id: userId,
        email,
        password,
        newPassword,
      });

      return res
        .status(200)
        .send({ status: 'success', message: 'Senha alterada com sucesso!' });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async getPicture(req: Request, res: Response): Promise<Response> {
    const userId = req.userId;

    try {
      const picture = await this.userService.getPicture({ id: userId });

      return res.status(200).json({ picture });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async getPictureById(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;

    try {
      const picture = await this.userService.getPicture({ id: userId });

      return res.status(200).json({ picture });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async changePicture(req: Request, res: Response): Promise<Response> {
    const userId = req.userId;
    const imageData = req.file?.buffer.toString('base64');

    try {
      if (!imageData) throw new Error('Nenhuma imagem foi enviada');

      const picture = await this.userService.changePicture({
        userId,
        imageData: imageData,
      });

      return res.status(200).json({ picture });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async deletePicture(req: Request, res: Response): Promise<Response> {
    const userId = req.userId;

    try {
      await this.userService.deletePicture({
        id: userId,
      });

      return res.status(200).send({
        status: 'success',
        message: 'Foto de perfil deletada com sucesso!',
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  async deleteAccount(req: Request, res: Response): Promise<Response> {
    const { email, password }: DeleteAccountBody = req.body;
    const userId: number = req.userId;

    try {
      await this.userService.deleteAccount({
        id: userId,
        email,
        password,
      });

      return res
        .status(200)
        .send({ status: 'success', message: 'Conta excluída com sucesso!' });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async getAllWatchedMovies(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = req.userId;
    const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1;

    try {
      const moviesWatched: MovieWatched =
        await this.userService.getAllWatchedMovies({
          userId,
          page,
        });

      return res.status(200).send({
        status: 'success',
        message: `Todos os filmes assistidos pelo usuário.`,
        ...moviesWatched,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }

  public async getAllFavoriteMovies(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = req.userId;
    const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1;

    try {
      const favoriteMovies: FavoriteMovie =
        await this.userService.getAllFavoriteMovies({
          userId,
          page,
        });

      return res.status(200).send({
        status: 'success',
        message: `Todos os filmes favoritados pelo usuário.`,
        ...favoriteMovies,
      });
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' })
        : res
            .status(400)
            .send({ status: 'error', message: 'Erro interno do servidor.' });
    }
  }
}
