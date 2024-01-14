import { user as User } from '@prisma/client';

export type UpdateUserData = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  picture?: string | null;
  bio?: string | null;
};

export { User };
