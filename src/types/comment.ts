export interface PostCommentsRequestType {
  artworkId: number;
  contents: string;
}

export interface DeleteCommentsRequestType {
  artworkId: number;
  CommentId: number;
}
