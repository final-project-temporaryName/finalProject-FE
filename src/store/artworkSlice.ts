import { StateCreator } from 'zustand';
import { ArtworkState } from './zustand.types';

export const createArtworkSlice: StateCreator<ArtworkState> = (set) => ({
  clickedArtworkId: 0,
  setClickedArtworkId: (id) => set((state) => ({ ...state, clickedArtworkId: id })),
  clickedArtworkUrl: '',
  setClickedArtworkUrl: (path) => set((state) => ({ ...state, clickedArtworkUrl: path })),
  clickedUploadArtworkUrl: '',
  setClickedUploadArtworkUrl: (path) => set((state) => ({ ...state, clickedUploadArtworkUrl: path })),
});
