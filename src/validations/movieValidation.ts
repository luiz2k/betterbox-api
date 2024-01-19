import z from 'zod';

export const createCommentSchema = z.object({
  comment: z
    .string()
    .min(2, 'O comentário deve ter no minímo 2 caracteres.')
    .max(100, 'O comentário deve ter no maximo 100 caracteres.'),
});

export const editCommentSchema = z.object({
  newComment: z
    .string()
    .min(2, 'O comentário deve ter no minímo 2 caracteres.')
    .max(100, 'O comentário deve ter no maximo 100 caracteres.'),
});
