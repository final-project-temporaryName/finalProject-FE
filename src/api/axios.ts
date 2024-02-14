import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
  baseURL: 'http://youth-alb-1112492853.ap-northeast-2.elb.amazonaws.com',
});

instance.interceptors.request.use(
  (config) => {
    const userAuth = localStorage.getItem('store');

    if (!userAuth) {
      return config;
    } else {
      const {
        state: { userAccessToken, userRefreshToken },
      } = JSON.parse(userAuth);

      config.headers.Authorization = `Bearer ${userAccessToken}`;
      config.headers['Authorization-refresh'] = `Bearer ${userRefreshToken}`;

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
      const userAuth = localStorage.getItem('store');

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
        localStorage.setItem('store', JSON.stringify(newParsedUserAuth));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
