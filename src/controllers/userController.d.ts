export type GetUser = {
  username: string;
  picture: string | null;
  bio: string | null;
};

export type ChangeUsernameBody = {
  newUsername: string;
};

export type ChangeEmailBody = {
  email: string;
  password: string;
  newEmail: string;
};

export type DeleteAccountBody = {
  email: string;
  password: string;
};
