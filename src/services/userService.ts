import UserRepository from '../repositories/userRepository';

import type { GetUserById, GetUserReturn } from './userService.d';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(data: GetUserById): Promise<GetUserReturn> {
    const getUser: GetUserReturn | null = await this.userRepository.getUserById(
      { id: data.id },
    );

    if (!getUser) throw new Error('Perfil do usuário não encontrado.');

    return getUser;
  }
}
