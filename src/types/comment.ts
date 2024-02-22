export interface CommentProps {
  commentId?: number;
  profileUrl: string;
  nickname: string;
  createdAt: string;
  contents: string;
  author: boolean;
}

export interface PostCommentsRequestType {
  artworkId: number;
  contents: string;
}

export interface DeleteCommentsRequestType {
  artworkId: number;
  commentId: number;
}

export interface GetCommentsResponse {
  contents: CommentProps[];
  hasNext: boolean;
}
