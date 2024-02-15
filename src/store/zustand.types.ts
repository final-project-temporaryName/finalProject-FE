export interface SearchState {
  searchWord: string;
  setSearchWord: (type: string) => void;
  clearSearchWord: () => void;
}

export interface AuthState {
  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export interface ArtworkState {
  clickedArtworkId: number;
  setClickedArtworkId: (id: number) => void;
  clickedArtworkUrl: string;
  setClickedArtworkUrl: (path: string) => void;
  clickedUploadArtworkUrl: string;
  setClickedUploadArtworkUrl: (path: string) => void;
}
