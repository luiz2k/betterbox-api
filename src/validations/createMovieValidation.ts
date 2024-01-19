import { z } from 'zod';

export const createMovieSchema = z.object({
  movieId: z
    .number()
    .int('O ID do filme deve ser um número inteiro.')
    .positive('O ID do filme deve ser positivo.')
    .max(7, 'O ID do filme deve ter no maximo 7 caracteres.'),
});
