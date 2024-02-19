import { GetSpecificCardResponseType } from '@/types/cards';
import { request } from '../fetchRequestHandler';

export const getArtwork = async (artworkId: number) => {
  const url = `artworks/${artworkId}`;

  const response = await request<GetSpecificCardResponseType>({ url });
  return response;
};
