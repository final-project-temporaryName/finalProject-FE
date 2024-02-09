import { StateCreator } from 'zustand';
import { ArtworkState } from './zustand.types';

export const createArtworkSlice: StateCreator<ArtworkState> = (set) => ({
  clickedArtworkId: 0,
  setClickedArtworkId: (type) => set((state) => ({ ...state, clickedArtworkId: type })),
});
