export interface Profile {
  userId: number;
}

export interface GetProfile {
  userId: number;
  picture: string | null;
  bio: string | null;
}
