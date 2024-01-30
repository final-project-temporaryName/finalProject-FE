import { create } from 'zustand';
import { createSearchSlice } from './searchSlice';
import { SearchState } from './zustand';

type SliceType = SearchState;

export const useStore = create<SliceType>()((...a) => ({
  ...createSearchSlice(...a),
}));
