export interface UserType {
  userId: number;
  nickname: string;
  activityField: string;
  activityArea: string;
  description: string;
  profileImageUrl: string;
  totalLikeCount: number;
  followerCount: number;
  links: GetUserLinks[];
}

export interface GetMyInfo {
  userId: number;
  userRole: 'associate' | 'regular';
}

export interface GetUserLinks {
  linkId: number;
  title: string;
  address: string;
}

export interface PostUserLinks {
  title: string;
  url: string;
}

// userLink 삭제는 userId, linkId 를 query로 요청

export interface PostSignUpRequestType {
  nickname: string;
  activityField: string;
  activityArea: string;
  description: string;
  profileImageUrl: string;
}

export interface PostSignUpResPonseType extends UserType {}

export interface PutUserInfoRequestType {
  nickname: string;
  activityField: string;
  activityArea: string;
  description: string;
  profileImageUrl: string;
}

export interface PutUserInfoResponseType extends UserType {}

export interface DeleteUserInfoRequestType {}
