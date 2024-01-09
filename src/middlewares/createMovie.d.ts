interface CreateMovieBody {
  movieId: string;
}

interface Movie {
  id: number;
  name: string;
}

interface MovieData {
  data: {
    id: number;
    title: string;
  };
}

export { CreateMovieBody, Movie, MovieData };
