import { StateCreator } from 'zustand';
import { SearchState } from './zustand';

export const createSearchSlice: StateCreator<SearchState> = (set) => ({
  searchWord: '',
  setSearchWord: (type) => set((state) => ({ ...state, searchWord: type })),
  clearSearchWord: () => set(() => ({ searchWord: '' })),
});
