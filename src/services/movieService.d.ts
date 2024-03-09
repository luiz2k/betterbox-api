export type MovieComments = {
  comment: string;
  commentedAt: Date;
  editedAt: Date | null;
  user: {
    id: number;
    username: string;
    picture: string | null;
  };
};

export type AddToWatched = {
  id: number;
  name: string;
  userId: number;
};

export type RemoveFromWatched = {
  id: number;
  userId: number;
};

export type GetMovieWatched = {
  id: number;
  name: string;
  userId: number;
};

export type MovieWatched = {
  userId: number;
  movieId: number;
  watchedDate: Date;
};

export type AddToFavorite = {
  id: number;
  name: string;
  userId: number;
};

export type RemoveFromFavorite = {
  id: number;
  userId: number;
};

export type GetFavoriteMovie = {
  id: number;
  name: string;
  userId: number;
};

export type FavoriteMovie = {
  userId: number;
  movieId: number;
};

export type CreateComment = {
  userId: number;
  movieId: number;
  comment: string;
  commentedAt: Date;
};

export type Comment = {
  userId: number;
  movieId: number;
  comment: string;
  commentedAt: Date;
  editedAt: Date | null;
};

export type EditComment = {
  userId: number;
  movieId: number;
  comment: string;
  editedAt: Date;
};

export type DeleteComment = {
  userId: number;
  movieId: number;
};
