import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createArtworkSlice } from './artworkSlice';
import { createAuthSlice } from './authSlice';
import { createSearchSlice } from './searchSlice';
import { ArtworkState, AuthState, SearchState } from './zustand.types';

type SliceType = SearchState & AuthState & ArtworkState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createSearchSlice(...a),
        ...createAuthSlice(...a),
        ...createArtworkSlice(...a),
      }),
      {
        name: 'store',
        partialize: (state) => ({
          userRole: state.userRole,
          userId: state.userId,
          userAccessToken: state.userAccessToken,
          userRefreshToken: state.userRefreshToken,
          isLogin: state.isLogin,
          clickedArtworkId: state.clickedArtworkId,
        }),
      },
    ),
  ),
);
