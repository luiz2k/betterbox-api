import prisma from '../database/database';

import type { GetProfileByUserIdReturn, Profile } from './profileRepository.d';

export default class ProfileRepository {
  async getProfileByUserId(
    data: Omit<Profile, 'picture' | 'bio'>,
  ): Promise<GetProfileByUserIdReturn | null> {
    return await prisma.profile.findUnique({ where: { userId: data.userId } });
  }

  async changePicture(data: Omit<Profile, 'bio'>): Promise<void> {
    await prisma.profile.update({
      where: { userId: data.userId },
      data: { picture: data.picture },
    });
  }

  async changeBio(data: Omit<Profile, 'picture'>): Promise<void> {
    await prisma.profile.update({
      where: { userId: data.userId },
      data: { bio: data.bio },
    });
  }
}
