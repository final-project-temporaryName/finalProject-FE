export interface SearchState {
  searchWord: string;
  setSearchWord: (type: string) => void;
  clearSearchWord: () => void;
}
