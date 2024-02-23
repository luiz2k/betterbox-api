import {
  user as User,
  movieWatched as MovieWatched,
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
