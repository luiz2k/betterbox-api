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

export { AddToWatched, RemoveFromWatched, MovieWatched };
