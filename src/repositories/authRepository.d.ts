import { user as User } from '@prisma/client';

export interface UserWithProfile extends User {
  profile: {
    create: {
      picture?: string;
      bio?: string;
    };
  };
}

export { User };
