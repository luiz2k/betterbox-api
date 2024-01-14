export type GetUserById = {
  id: number;
};

export type GetUserReturn = {
  username: string;
  picture: string | null;
  bio: string | null;
};
