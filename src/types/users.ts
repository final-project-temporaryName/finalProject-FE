export interface UserType {
  userId: number;
  nickname: string;
  major: string;
  description: string;
  links: GetUserLinks[]; // Maximum Length 정해야할 듯 (3~5개?)
  profileImageUrl: string;
  totalLikeCount: number;
  followerCount: number;
}

// 팔로잉, 찜

export interface GetUserLinks {
  id: number;
  title: string;
  address: string;
}

export interface PostUserLinks {
  title: string;
  address: string;
}

export interface PostSignUpRequestType {
  userEmail: string;
  nickname: string; // Required 값
  major: string;
  description: string;
  profileImageUrl: string;
}

export interface PostSignUpResPonseType extends UserType {}

export interface PutUserInfoRequestType {
  nickname: string; // 변경 가능?
  major: string;
  description: string;
  links: PostUserLinks[];
  profileImageUrl: string;
}

export interface PutUserInfoResponseType extends UserType {}

export interface DeleteUserInfoRequestType {}
