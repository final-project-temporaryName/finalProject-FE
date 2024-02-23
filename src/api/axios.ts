import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
  baseURL: 'https://www.art-talktalk.store',
});

instance.interceptors.request.use(
  (config) => {
    const userAuth = window.localStorage.getItem('store');

    if (!userAuth) {
      console.log('request start', config);
      return config;
    } else {
      const {
        state: { userAccessToken, userRefreshToken },
      } = JSON.parse(userAuth);

      config.headers.Authorization = `${userAccessToken}`;
      config.headers['Authorization-refresh'] = `${userRefreshToken}`;

      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (Response) => {
    return Response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      const originalRequest = config;
      const userAuth = window.localStorage.getItem('store');

      if (userAuth) {
        const oldParsedUserAuth = JSON.parse(userAuth);
        const newParsedUserAuth = _.cloneDeep(oldParsedUserAuth);
        const { userAccessToken, userRefreshToken } = oldParsedUserAuth.state;
        const { data } = await instance.post('/reissue', {
          accessToken: userAccessToken,
          refreshToken: userRefreshToken,
        });
        const { accessToken: newAccessToken } = data;
        newParsedUserAuth.state.userAccessToken = newAccessToken;
        window.localStorage.setItem('store', JSON.stringify(newParsedUserAuth));

        originalRequest.headers.Authorization = `${newAccessToken}`;

        return axios(originalRequest);
      }
    }
    if (status === 403) {
      window.sessionStorage.setItem('errorMessage', error.response.data.message as string);
      window.localStorage.removeItem('store');
      window.location.replace('/NoAccess');
    }
    if (status === 400) {
      if (
        error.response.data.message === 'JWT 토큰이 없습니다.' ||
        error.response.data.message === '만료된 JWT 토큰입니다.'
      ) {
        window.sessionStorage.setItem('errorMessage', error.response.data.message as string);
        window.localStorage.removeItem('store');
        window.location.replace('/NoAccess');
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
