import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://youth-alb-1112492853.ap-northeast-2.elb.amazonaws.com',
});

export default instance;
