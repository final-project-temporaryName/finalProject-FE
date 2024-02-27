import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createArtworkSlice } from './artworkSlice';
import { createAuthSlice } from './authSlice';
import { createModalSlice } from './modalSlice';
import { ArtworkState, AuthState, ModalState } from './zustand.types';

type SliceType = AuthState & ArtworkState & ModalState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
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
