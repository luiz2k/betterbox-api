export interface GetProfile {
  userId: number;
}

export interface UpdateProfile {
  userId: number;
  picture: string | null;
  bio: string | null;
}

export type GetProfileReturn = GetProfile & UpdateProfile;
