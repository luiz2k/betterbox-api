export type GetUser = {
  username: string;
  picture: string | null;
  bio: string | null;
};

export type ChangeUsernameBody = {
  newUsername: string;
};
