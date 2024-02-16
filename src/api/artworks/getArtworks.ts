import instance from '../axios';

export interface Props {
  size: number;
  lastIdxId: number | null;
}

export const getArtworks = async ({ size, lastIdxId }: Props) => {
  try {
    const response = await instance.get('/artworks', {
      params: {
        size: size,
        lastIdxId: lastIdxId,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
