import { Request, Response } from 'express';

import UserService from '../services/userService';

import {
  ChangeEmailBody,
  ChangeUsernameBody,
  DeleteAccountBody,
  FavoriteMovie,
  GetUser,
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

      return res
        .status(200)
        .send(`Nome de usuário alterado para ${newUsername}.`);
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
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

      return res.status(200).send('Email alterado com sucesso!');
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
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

      return res.status(200).send('Senha alterada com sucesso!');
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
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

      return res.status(200).send('Conta excluída com sucesso!');
    } catch (error) {
      console.error(error);

      return error instanceof Error
        ? res.status(400).send({ error: 'Erro interno do servidor.' })
        : res.status(400).send({ error: 'Erro interno do servidor.' });
    }
  }

  public async getAllWatchedMovies(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = req.userId;

    try {
      const moviesWatched = await this.userService.getAllWatchedMovies({
        userId,
      });

      return res.status(200).send({
        status: 'success',
        message: `Todos os filmes assistidos.`,
        data: [...moviesWatched],
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

    try {
      const favoriteMovies: FavoriteMovie[] =
        await this.userService.getAllFavoriteMovies({
          userId,
        });

      return res.status(200).send({
        status: 'success',
        message: `Todos os filmes favoritados.`,
        data: [...favoriteMovies],
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
