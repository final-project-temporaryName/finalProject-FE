import { StateCreator } from 'zustand';
import { AuthState } from './zustand.types';

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isLogin: false,
  setLogin: () => set((state) => ({ ...state, isLogin: true })),
  setLogout: () => set((state) => ({ ...state, isLogin: false })),
});
