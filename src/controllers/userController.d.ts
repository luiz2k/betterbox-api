import { favoriteMovie as FavoriteMovie, movieWatched } from '@prisma/client';

export type GetUser = {
  username: string;
  picture: string | null;
  bio: string | null;
};

export type ChangeUsernameBody = {
  newUsername: string;
};

export type ChangeEmailBody = {
  email: string;
  password: string;
  newEmail: string;
};

export type DeleteAccountBody = {
  email: string;
  password: string;
};

export type MovieWatched = {
  currentPage: number;
  totalPages: number;
  data: ?movieWatched[];
};

export { FavoriteMovie };
