import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createArtworkSlice } from './artworkSlice';
import { createAuthSlice } from './authSlice';
import { createModalSlice } from './modalSlice';
import { createSearchSlice } from './searchSlice';
import { ArtworkState, AuthState, ModalState, SearchState } from './zustand.types';

type SliceType = SearchState & AuthState & ArtworkState & ModalState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createSearchSlice(...a),
        ...createAuthSlice(...a),
        ...createArtworkSlice(...a),
        ...createModalSlice(...a),
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
