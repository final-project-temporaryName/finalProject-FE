export interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl: string;
  status: 'FORSALE' | 'SHARE' | 'NOTFORSALE';
  totalLikeCount: number;
  totalViewCount: number;
  totalCommentCount: number;
  artistId: number;
  artistName: string;
  profileImageUrl: string;
  createdAt: string; // "2024-01-29T07:21:26.100Z"
  updatedAt: string; // "2024-01-29T07:21:26.100Z"
}

// size = 9, lastIdxId
export interface GetAllCardResponseType {
  hasNext: boolean;
  contents: CardType[];
}

export interface PostCardRequestType {
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl: string;
  status: 'FORSALE' | 'SHARE' | 'NOTFORSALE';
}

export interface PostCardResponseType extends CardType {}

export interface PutCardRequestType {
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl: string;
  status: 'FORSALE' | 'SHARE' | 'NOTFORSALE';
}

export interface PutCardResponseType extends CardType {}

export interface DeleteCardRequestType {}
