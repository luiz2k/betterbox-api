import UserRepository from '../repositories/userRepository';

import type {
  ChangeUsername,
  GetUserById,
  GetUser,
  GetUserByIdReturn,
} from './userService.d';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(data: GetUserById): Promise<GetUserByIdReturn> {
    const getUser: GetUser | null = await this.userRepository.getUserDataById({
      id: data.id,
    });

    if (!getUser) throw new Error('Perfil do usuário não encontrado.');

    return {
      username: getUser.username,
      picture: getUser.picture,
      bio: getUser.bio,
    };
  }

  async changeUsername(data: ChangeUsername): Promise<void> {
    const getUser: GetUserByIdReturn | null =
      await this.userRepository.getUserDataById({ id: data.id });

    if (getUser?.username === data.username)
      throw new Error('Impossível usar o mesmo nome de usuário.');

    await this.userRepository.updateUserData({
      id: data.id,
      username: data.username,
    });
  }
}
