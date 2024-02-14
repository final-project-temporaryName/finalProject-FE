import axios from 'axios';

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

export default instance;
