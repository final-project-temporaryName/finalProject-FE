import instance from '../axios';

export interface Props {
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
  pageParam?: number | null;
}

export const getMyArtworks = async ({ categoryType, pageParam = null }: Props) => {
  try {
    const response = await instance.get(`/users/artworks`, {
      params: {
        type: categoryType === '전체' ? 'ALL' : categoryType === '판매중' ? 'SELLING' : 'COLLECTION',
        size: 15,
        lastIdxId: pageParam,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
