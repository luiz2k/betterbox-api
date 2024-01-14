import z from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, 'O usuário deve ter no minímo 2 caracteres.')
    .max(15, 'O usuário deve ter no maximo 15 caracteres.'),
  email: z
    .string()
    .email('Informe um e-mail válido.')
    .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
    .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
  password: z
    .string()
    .min(8, 'A senha deve ter no minímo 8 caracteres.')
    .max(128, 'A senha deve ter no maximo 128 caracteres.'),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido.')
    .min(5, 'O e-mail deve ter no mínimo 5 caracteres.')
    .max(254, 'O e-mail deve ter no máximo 254 caracteres.'),
  password: z
    .string()
    .min(8, 'A senha deve ter no minímo 8 caracteres.')
    .max(128, 'A senha deve ter no maximo 128 caracteres.'),
});
