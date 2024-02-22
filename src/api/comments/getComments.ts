import { PostCommentsRequestType } from '@/types/comment';
import instance from '../axios';

export const getComments = ({ artworkId }: PostCommentsRequestType) => {
  return instance.post(`/artworks/${artworkId}/comments`);
};
