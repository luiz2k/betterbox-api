import { profile as Profile } from '@prisma/client';

export interface GetProfileByUserIdReturn {
  userId: number;
  picture: string | null;
  bio: string | null;
}

export { Profile };
