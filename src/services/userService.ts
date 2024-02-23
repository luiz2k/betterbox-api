import UserRepository from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

import type {
  ChangeUsername,
  GetUserById,
  GetUserByIdReturn,
  ChangeEmail,
  VerifyEmailAndPassord,
  User,
  ChangePassword,
  DeleteAccount,
  MovieWatched,
  GetAllWatchedMovies,
  GetAllFavoriteMovies,
  FavoriteMovie,
} from './userService.d';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private async verifyEmailAndPassord(
    data: VerifyEmailAndPassord,
  ): Promise<void> {
    const userByEmail: User | null =
      await this.userRepository.getUserDataByEmail({
        email: data.email,
      });

    if (!userByEmail) throw new Error('Usuário não encontrado.');

    const userById: User | null = await this.userRepository.getUserDataById({
      id: data.id,
    });

    if (userById?.email !== data.email)
      throw new Error('O e-mail informado não corresponde ao e-mail atual.');

    const comparePasswords: boolean = bcrypt.compareSync(
      data.password,
      userByEmail.password,
    );

    if (!comparePasswords)
      throw new Error('A senha informada não corresponde a senha atual.');
  }

  public async getUserById(data: GetUserById): Promise<GetUserByIdReturn> {
    const getUser: User | null = await this.userRepository.getUserDataById({
      id: data.id,
    });

    if (!getUser) throw new Error('Perfil do usuário não encontrado.');

    return {
      username: getUser.username,
      picture: getUser.picture,
      bio: getUser.bio,
    };
  }

  public async changeUsername(data: ChangeUsername): Promise<void> {
    const getUser: GetUserByIdReturn | null =
      await this.userRepository.getUserDataById({ id: data.id });

    if (getUser?.username === data.username)
      throw new Error('Impossível usar o mesmo nome de usuário.');

    await this.userRepository.updateUserData({
      id: data.id,
      username: data.username,
    });
  }

  public async changeEmail(data: ChangeEmail): Promise<void> {
    const userByEmail: User | null =
      await this.userRepository.getUserDataByEmail({
        email: data.newEmail,
      });

    if (userByEmail) throw new Error('Já existe um registro com esse e-mail.');

    await this.verifyEmailAndPassord({
      id: data.id,
      email: data.email,
      password: data.password,
    });

    await this.userRepository.updateUserData({
      id: data.id,
      email: data.newEmail,
    });
  }

  public async changePassword(data: ChangePassword): Promise<void> {
    await this.verifyEmailAndPassord({
      id: data.id,
      email: data.email,
      password: data.password,
    });

    const userById: User | null = await this.userRepository.getUserDataById({
      id: data.id,
    });

    if (!userById) throw new Error('Usuário não encontrado.');

    const comparePasswords: boolean = bcrypt.compareSync(
      data.newPassword,
      userById.password,
    );

    if (comparePasswords)
      throw new Error('A nova senha deve ser diferente da senha atual.');

    const hashPassword: string = bcrypt.hashSync(data.newPassword, 10);

    await this.userRepository.updateUserData({
      id: data.id,
      password: hashPassword,
    });
  }

  public async deleteAccount(data: DeleteAccount): Promise<void> {
    await this.verifyEmailAndPassord({
      id: data.id,
      email: data.email,
      password: data.password,
    });

    await this.userRepository.deleteAccount({ id: data.id, email: data.email });
  }

  public async getAllWatchedMovies(
    data: GetAllWatchedMovies,
  ): Promise<MovieWatched> {
    const moviesWatched: MovieWatched =
      await this.userRepository.getAllWatchedMovies({
        userId: data.userId,
        page: data.page,
      });

    return moviesWatched;
  }

  public async getAllFavoriteMovies(
    data: GetAllFavoriteMovies,
  ): Promise<FavoriteMovie> {
    const favoriteMovies: FavoriteMovie =
      await this.userRepository.getAllFavoriteMovies({
        userId: data.userId,
        page: data.page,
      });

    return favoriteMovies;
  }
}
