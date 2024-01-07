interface AddToWatched {
  id: number;
  name: string;
}

interface RemoveFromWatched {
  id: number;
}

interface MovieWatched {
  userId: number;
  movieId: number;
  watchedDate: Date;
}

interface AddToFavorite {
  id: number;
  name: string;
}

interface RemoveFromFavorite {
  id: number;
}

interface FavoriteMovie {
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
};
