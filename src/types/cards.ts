export interface CardType {
  artworkId: number;
  title: string;
  description: string;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
  thumbnailImageUrl: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  artistId: number;
  artistName: string;
  artistProfileImageUrl: string;
  createdAt: string; // "2024-01-29T07:21:26.100Z"
  updatedAt: string; // "2024-01-29T07:21:26.100Z"
}

// size = 9, lastIdxId
export interface GetAllCardResponseType {
  hasNext: boolean;
  contents: CardType[];
}

export interface GetSpecificCardResponseType {
  artworkId: number;
  title: string;
  description: string;
  artworkStatus: 'FORSALE' | 'SHARE' | 'NOTFORSALE';
  thumbnailImageUrl: string;
  imageUrl: string[];
  likeCount: number;
  viewCount: number;
  commentCount: number;
  artistId: number;
  artistName: string;
  artistProfileImageUrl: string;
  createdAt: string; // "2024-01-29T07:21:26.100Z"
  updatedAt: string; // "2024-01-29T07:21:26.100Z"
}

// 확정 후 수정 예정
export interface PostCardRequestType {
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl: string;
  status: 'FORSALE' | 'SHARE' | 'NOTFORSALE';
}

export interface PostCardResponseType extends CardType {}

// 확정 후 수정 예정
export interface PutCardRequestType {
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl: string;
  status: 'FORSALE' | 'SHARE' | 'NOTFORSALE';
}

export interface PutCardResponseType extends CardType {}

export interface DeleteCardRequestType {}
