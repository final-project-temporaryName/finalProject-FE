import instance from '../axios';

export interface Props {
  searchWord?: string;
  pageParam?: number | null;
}

export const getSearchArtworks = async ({ searchWord, pageParam = null }: Props) => {
  try {
    const response = await instance.get('/artworks/search', {
      params: {
        keyword: searchWord,
        size: 15,
        lastIdxId: pageParam,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
