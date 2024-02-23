import instance from '../axios';

interface Props {
  artworkId: number;
  pageParam?: number | null;
}

export const getComments = async ({ artworkId, pageParam = null }: Props) => {
  try {
    const response = await instance.get(`/artworks/${artworkId}/comments`, {
      params: {
        size: 5,
        lastIdxId: pageParam,
      },
    });
    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
