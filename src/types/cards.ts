export interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  imageUrl?: string; // optional? 논의 필요
  forSale: boolean;
  totalLikeCount: number;
  totalViewCount: number;
  totalCommentCount: number;
  userId: number;
  createdAt: string; // "2024-01-29T07:21:26.100Z"
  updatedAt: string; // "2024-01-29T07:21:26.100Z"
}

export interface GetAllCardResponseType {
  cursorId: number;
  totalCount: number;
  cards: CardType[];
}

export interface PostCardRequestType {
  assigneeUserId: number;
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl?: string; // optional? 논의 필요
  forSale: boolean;
}

export interface PostCardResponseType extends CardType {}

export interface PutCardRequestType {
  assigneeUserId: number;
  title: string;
  description: string;
  tags: string[]; // 논의 필요
  imageUrl?: string; // optional? 논의 필요
  forSale: boolean;
}

export interface PutCardResponseType extends CardType {}
