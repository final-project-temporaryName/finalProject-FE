export interface CommentProps {
  commentId?: number;
  profileUrl: string;
  nickname: string;
  createdAt: string;
  contents: string;
  author: boolean;
  setValue?: any;
  enterEditMode?: any;
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

export interface PutCommentsRequestType {
  artworkId: number;
  commentId: number;
  contents: string;
}
