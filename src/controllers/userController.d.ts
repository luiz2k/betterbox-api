import { favoriteMovie, movieWatched } from '@prisma/client';

export type GetUser = {
  id: number;
  username: string;
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

export type FavoriteMovie = {
  currentPage: number;
  totalPages: number;
  data: ?favoriteMovie[];
};
