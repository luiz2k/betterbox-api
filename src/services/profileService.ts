import ProfileRepository from '../repositories/profileRepository';

import type {
  GetProfile,
  GetProfileReturn,
  UpdateProfile,
} from './profileService.d';

export default class ProfileService {
  private profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  async getProfile(data: GetProfile): Promise<GetProfileReturn> {
    const getProfile: GetProfileReturn | null =
      await this.profileRepository.getProfileByUserId({ userId: data.userId });

    if (!getProfile) throw new Error('Perfil do usuário não encontrado.');

    return getProfile;
  }

  async updateProfile(data: UpdateProfile): Promise<void> {
    const getProfile: GetProfileReturn | null =
      await this.profileRepository.getProfileByUserId({ userId: data.userId });

    if (!getProfile) throw new Error('Perfil do usuário não encontrado.');

    await this.profileRepository.updateProfile({ ...data });
  }
}
