import {
  user as User,
  movieWatched,
  favoriteMovie as FavoriteMovie,
} from '@prisma/client';

export type UpdateUserData = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  picture?: string | null;
  bio?: string | null;
};

export type MovieWatched = movieWatched & { page: number };

export type GetAllWatchedMoviesReturn = {
  currentPage: number;
  totalPages: number;
  data: ?movieWatched[];
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

export { User, MovieWatched, FavoriteMovie };
