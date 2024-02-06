// 로그인, 회원가입 관련 타입

export interface GetMyToken {
  accessToken: string;
  refreshToken: string;
}

export interface PostSnSLoginInfo {
  snsUniqueId: string;
  snsType: string;
}

// 닉네임 중복 체크 API 는 nickname을 string query로
