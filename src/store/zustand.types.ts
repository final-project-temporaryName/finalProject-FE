export interface SearchState {
  searchWord: string;
  setSearchWord: (type: string) => void;
  clearSearchWord: () => void;
}

export interface AuthState {
  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
  userRole: string;
  setUserRole: (data: string) => void;
  userId: number;
  setUserId: (data: number) => void;
  userAccessToken: string;
  setUserAccessToken: (data: string) => void;
  userRefreshToken: string;
  setUserRefreshToken: (data: string) => void;
}

export interface ArtworkState {
  clickedArtworkId: number;
  setClickedArtworkId: (id: number) => void;
  clickedArtworkUrl: string;
  setClickedArtworkUrl: (path: string) => void;
  clickedUploadArtworkUrl: string;
  setClickedUploadArtworkUrl: (path: string) => void;
}
