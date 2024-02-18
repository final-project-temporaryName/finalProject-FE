import instance from '../axios';

type type = 'ALL' | 'SELLING' | 'COLLECTION';
type lastIdxId = number | '';

export const getMyArtworks = async (type: type, size: number, lastIdxId: lastIdxId) => {
  try {
    const response = await instance.get(`/users/artworks?type=${type}&size=${size}&lastIdxId=${lastIdxId}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
