export interface UserType {
  userId: number;
  nickname: string;
  major: string;
  description: string;
  links: UserLinks[]; // Maximum Length 정해야할 듯
  profileImageUrl: string;
  totalLikeCount: number;
  followerCount: number;
}

// 팔로잉, 찜

export interface UserLinks {
  id: number;
  title: string;
  address: string;
}

export interface PostSignUpRequestType {
  email: string; // 가능?
  nickname: string; // Required 값
  major: string;
  description: string;
  links: UserLinks[];
  profileImageUrl: string;
}

export interface PostSignUpResPonseType extends UserType {}

export interface PutUserInfoRequestType {
  userId: number;
  nickname: string; // 변경 가능?
  major: string;
  description: string;
  links: UserLinks[];
  profileImageUrl: string;
}

export interface PutUserInfoResponseType extends UserType {}

export interface DeleteUserInfoRequestType {
  userId: number;
}
