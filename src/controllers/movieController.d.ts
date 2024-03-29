export type MovieComments = {
  comment: string;
  commentedAt: Date;
  editedAt: Date | null;
  user: {
    id: number;
    username: string;
  };
};

export type CreateCommentBody = {
  comment: string;
};

export type EditCommentBody = {
  newComment: string;
};

export type Movie = {
  id: number;
  name: string;
};
