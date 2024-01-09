declare namespace Express {
  interface Request {
    userId: number;
    movie: { id: number; name: string };
  }
}
