interface AddToWatched {
  id: number;
  name: string;
  userId: number;
}

interface RemoveFromWatched {
  id: number;
  userId: number;
}

interface MovieWatched {
  userId: number;
  movieId: number;
  watchedDate: Date;
}

interface AddToFavorite {
  id: number;
  name: string;
  userId: number;
}

interface RemoveFromFavorite {
  id: number;
  userId: number;
}

interface FavoriteMovie {
  userId: number;
  movieId: number;
}

interface CreateComment {
  userId: number;
  movieId: number;
  comment: string;
  commentedAt: Date;
}

interface Comment {
  userId: number;
  movieId: number;
  comment: string;
  commentedAt: Date;
  editedAt: Date | null;
}

interface EditComment {
  userId: number;
  movieId: number;
  comment: string;
  editedAt: Date;
}

interface DeleteComment {
  userId: number;
  movieId: number;
}

export {
  AddToWatched,
  RemoveFromWatched,
  MovieWatched,
  AddToFavorite,
  RemoveFromFavorite,
  FavoriteMovie,
  CreateComment,
  Comment,
  EditComment,
  DeleteComment,
};
