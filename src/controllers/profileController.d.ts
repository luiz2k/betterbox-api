export interface GetProfile {
  userId: number;
  picture: string | null;
  bio: string | null;
}

export interface UpdateProfileBody {
  picture: string | null;
  bio: string | null;
}
