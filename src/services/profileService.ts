import ProfileRepository from '../repositories/profileRepository';

import type { Profile, GetProfile } from './profileService.d';

export default class ProfileService {
  private profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  async getProfile(data: Profile): Promise<GetProfile> {
    const getProfile: GetProfile | null =
      await this.profileRepository.getProfileByUserId({ ...data });

    if (!getProfile) throw new Error('Perfil do usuário não encontrado.');

    return getProfile;
  }
}
