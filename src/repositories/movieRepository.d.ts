import {
  movie as Movie,
  movieWatched as MovieWatched,
  favoriteMovie as FavoriteMovie,
  movieComment as MovieComment,
  favoriteMovie as FavoriteMovie,
} from '@prisma/client';

export type GetAllComments = {
  comment: string;
  commentedAt: Date;
  editedAt: Date | null;
  user: {
    id: number;
    username: string;
  };
};

export { Movie, MovieWatched, FavoriteMovie, MovieComment, FavoriteMovie };
