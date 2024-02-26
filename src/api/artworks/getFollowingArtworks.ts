import instance from '../axios';

export interface Props {
  pageParam?: number | null;
}

export const getFollowingArtworks = async ({ pageParam = null }: Props) => {
  try {
    const response = await instance.get('/artworks/following', {
      params: {
        size: 15,
        lastIdxId: pageParam,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
