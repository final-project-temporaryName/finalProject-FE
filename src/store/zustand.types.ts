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
