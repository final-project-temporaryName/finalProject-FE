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
  likeId: number;
  followId: number;
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
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
  artworkImageResponse: GetArtworkImageResponse[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnailImageUrl: string;
  artistId: number;
  artistName: string;
  artistProfileImageUrl: string;
  createdAt: string; // "2024-01-29T07:21:26.100Z"
  updatedAt: string; // "2024-01-29T07:21:26.100Z"
}

export interface GetArtworkImageResponse {
  imageId: number;
  imageUrl: string;
}

export interface PostCardRequestType {
  imageIds: number[];
  title: string;
  description: string;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE';
}

export interface PutCardRequestType {
  artworkId: number;
  imageIds: number[] | undefined;
  title: string | undefined;
  description: string | undefined;
  artworkStatus: 'PUBLIC' | 'SELLING' | 'FREE' | undefined;
}

export interface DeleteCardRequestType {}
