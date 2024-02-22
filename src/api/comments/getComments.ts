import { GetCommentsResponse } from '@/types/comment';
import instance from '../axios';

export const getComments = ({ artworkId }: GetCommentsResponse) => {
  return instance.get(`/artworks/${artworkId}/comments`);
};
