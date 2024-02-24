import { GetSpecificCardResponseType } from '@/types/cards';
import instance from '../axios';

export const getArtwork = async (artworkId: number) => {
  const response = await instance.get<GetSpecificCardResponseType>(`artworks/${artworkId}`);
  return response.data;
};
