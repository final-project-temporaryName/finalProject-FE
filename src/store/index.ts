import { createArtworkSlice } from './artworkSlice';
import { create } from 'zustand';
import { createAuthSlice } from './authSlice';
import { createSearchSlice } from './searchSlice';
import { ArtworkState, AuthState, SearchState } from './zustand.types';

type SliceType = SearchState & AuthState & ArtworkState;

export const useStore = create<SliceType>()((...a) => ({
  ...createSearchSlice(...a),
  ...createAuthSlice(...a),
  ...createArtworkSlice(...a),
}));
