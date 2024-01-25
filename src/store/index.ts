import { SearchState } from '@/types/zustand';
import { create } from 'zustand';
import { createSearchSlice } from './searchSlice';

type SliceType = SearchState;

export const useStore = create<SliceType>()((...a) => ({
  ...createSearchSlice(...a),
}));
