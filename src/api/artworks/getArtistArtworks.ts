import instance from '../axios';

export interface Props {
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
  userId?: string;
  pageParam?: number | null;
}

export const getArtistArtworks = async ({ categoryType, userId, pageParam = null }: Props) => {
  try {
    const response = await instance.get(`/users/${userId}/artworks`, {
      params: {
        type: categoryType === '전체' ? 'ALL' : 'SELLING',
        size: 15,
        lastIdxId: pageParam,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
