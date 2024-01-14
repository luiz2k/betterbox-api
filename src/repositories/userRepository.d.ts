import { user as User } from '@prisma/client';

export type GetUserByIdReturn = {
  username: string;
  picture: string | null;
  bio: string | null;
};

export { User };
