import { StateCreator } from 'zustand';
import { AuthState } from './zustand.types';

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isLogin: false,
  setLogin: () => set((state) => ({ ...state, isLogin: true })),
  setLogout: () => set((state) => ({ ...state, isLogin: false })),
  userRole: '',
  setUserRole: (data) => set((state) => ({ ...state, userRole: data })),
  userId: 0,
  setUserId: (data) => set((state) => ({ ...state, userId: data })),
  userAccessToken: '',
  setUserAccessToken: (data) => set((state) => ({ ...state, userAccessToken: data })),
  userRefreshToken: '',
  setUserRefreshToken: (data) => set((state) => ({ ...state, userRefreshToken: data })),
});
