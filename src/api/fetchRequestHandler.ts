type AuthBasedRequestType = {
  url: string;
  token: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: { [key: string]: any };
  body?: any;
};

type RequestType = Omit<AuthBasedRequestType, 'token'>;

/** token based request handler
 * @param url request url
 * @param token auth token
 * @param method http method type
 * @param params request parameters
 * @param body request body
 */

export const authBasedRequest = async <T>({ url, token, method = 'GET', params, body }: AuthBasedRequestType) => {
  const baseURL = 'http://youth-alb-1112492853.ap-northeast-2.elb.amazonaws.com/';
  const queryString = new URLSearchParams(params).toString();

  const fullUrl = queryString ? `${baseURL}${url}?${queryString}` : `${baseURL}${url}`;

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Only include body if it exists and if the method is not GET
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    // 가장 가까운 Error Boundary의 error.tsx를 활성화 시킴
    throw new Error('error occurred');
  }

  return (await response.json()) as T;
};

/** request handler
 * @param url request url
 * @param method http method type
 * @param params request parameters
 * @param body request body
 */

export const request = async <T>({ url, method = 'GET', params, body }: RequestType) => {
  const baseURL = 'http://youth-alb-1112492853.ap-northeast-2.elb.amazonaws.com/';
  const queryString = new URLSearchParams(params).toString();

  const fullUrl = queryString ? `${baseURL}${url}?${queryString}` : `${baseURL}${url}`;

  const options: RequestInit = {
    method,
  };

  // Only include body if it exists and if the method is not GET
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    // 가장 가까운 Error Boundary의 error.tsx를 활성화 시킴
    throw new Error('error occurred');
  }

  return (await response.json()) as T;
};
