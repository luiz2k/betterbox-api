import { user as User, movieWatched, favoriteMovie } from '@prisma/client';

export type GetUserById = {
  id: number;
};

export type GetUserByIdReturn = {
  id: number;
  username: string;
  picture: string | null;
  bio: string | null;
};

export type ChangeUsername = {
  id: number;
  username: string;
};

export type ChangeEmail = {
  id: number;
  email: string;
  password: string;
  newEmail: string;
};

export type ChangePassword = {
  id: number;
  email: string;
  password: string;
  newPassword: string;
};

export type VerifyEmailAndPassord = {
  id: number;
  email: string;
  password: string;
};

export type DeleteAccount = {
  id: number;
  email: string;
  password: string;
};

export type GetAllWatchedMovies = {
  userId: number;
  page: number;
};

export type GetAllFavoriteMovies = {
  userId: number;
  page: number;
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

export type ChangePicture = {
  userId: number;
  imageData: string;
};

export type DeletePicture = GetUserById;

export type GetPicture = GetUserById;

export { User };
