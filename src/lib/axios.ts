import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://youth-alb-1112492853.ap-northeast-2.elb.amazonaws.com',
});

instance.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem('youth-accessToken');
  const refreshToken = window.localStorage.getItem('youth-refreshToken');

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default instance;
