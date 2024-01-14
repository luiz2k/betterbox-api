export type GetUserById = {
  id: number;
};

export type GetUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  picture: string | null;
  bio: string | null;
};

export type GetUserByIdReturn = {
  username: string;
  picture: string | null;
  bio: string | null;
};

export type ChangeUsername = {
  id: number;
  username: string;
};
