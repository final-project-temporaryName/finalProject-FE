import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
  baseURL: 'http://youth-alb-1112492853.ap-northeast-2.elb.amazonaws.com',
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
        const { data } = await axios.post('/reissue', {
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
      window.alert('로그인이 만료되었습니다.');
      window.location.replace('/login');
    }
    if (status === 400) {
      if (error.response.data.message === 'JWT 토큰이 없습니다.') {
        window.alert('접근 권한이 없습니다. 로그인을 해주세요.');
        window.location.replace('/');
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
