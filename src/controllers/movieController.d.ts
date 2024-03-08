import { movieComment } from '@prisma/client';

export type MovieComments = movieComment;

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
