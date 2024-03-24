import { user as User, movieWatched, favoriteMovie } from '@prisma/client';

export type UpdateUserData = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
};

export type MovieWatched = movieWatched & { page: number };
export type FavoriteMovie = favoriteMovie & { page: number };

export type GetAllWatchedMoviesReturn = {
  currentPage: number;
  totalPages: number;
  data: ?movieWatched[];
};

export type GetAllFavoriteMoviesReturn = {
  currentPage: number;
  totalPages: number;
  data: ?favoriteMovie[];
};

export type Pagination = {
  currentPage: number;
  totalData: number;
};

export type PaginationReturn = {
  skip: number;
  take: number;
  currentPage: number;
  totalPages: number;
};

export { User };
