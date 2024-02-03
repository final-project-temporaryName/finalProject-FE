import { create } from 'zustand';
import { createAuthSlice } from './authSlice';
import { createSearchSlice } from './searchSlice';
import { AuthState, SearchState } from './zustand.types';

type SliceType = SearchState & AuthState;

export const useStore = create<SliceType>()((...a) => ({
  ...createSearchSlice(...a),
  ...createAuthSlice(...a),
}));
