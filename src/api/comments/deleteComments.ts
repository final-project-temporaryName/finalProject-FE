import instance from '@/api/axios';
import { DeleteCommentsRequestType } from '@/types/comment';

export const deleteComments = ({ artworkId, commentId }: DeleteCommentsRequestType) => {
  return instance.delete(`/artworks/${artworkId}/comments/${commentId}`);
};
