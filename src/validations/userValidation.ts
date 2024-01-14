import { z } from 'zod';

export const changeUsernameSchema = z.object({
  newUsername: z
    .string()
    .min(2, 'O usuário deve ter no minímo 2 caracteres.')
    .max(15, 'O usuário deve ter no maximo 15 caracteres.'),
});
