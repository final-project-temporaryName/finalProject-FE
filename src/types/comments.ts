export interface CommentType {
  commentId: number;
  profileUrl: string;
  nickname: string;
  createdAt: string;
  contents: string;
  author: boolean;
}

export interface GetArtworkCommentsResponseType {
  contents: CommentType[];
  hasNext: boolean;
}
