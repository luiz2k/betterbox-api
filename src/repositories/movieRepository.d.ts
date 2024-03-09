import {
  movie as Movie,
  movieWatched as MovieWatched,
  favoriteMovie as FavoriteMovie,
  movieComment as MovieComment,
} from '@prisma/client';

export type GetAllComments = {
  comment: string;
  commentedAt: Date;
  editedAt: Date | null;
  user: {
    id: number;
    username: string;
    picture: string | null;
  };
};

export { Movie, MovieWatched, FavoriteMovie, MovieComment };
