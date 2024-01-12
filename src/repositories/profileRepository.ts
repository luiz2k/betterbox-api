import prisma from '../database/database';

import type { GetProfileByUserIdReturn, Profile } from './profileRepository.d';

export default class ProfileRepository {
  async getProfileByUserId(
    data: Omit<Profile, 'picture' | 'bio'>,
  ): Promise<GetProfileByUserIdReturn | null> {
    return await prisma.profile.findUnique({ where: { userId: data.userId } });
  }

  async updateProfile(data: Profile): Promise<void> {
    await prisma.profile.update({
      where: { userId: data.userId },
      data: { picture: data.picture, bio: data.bio },
    });
  }
}
