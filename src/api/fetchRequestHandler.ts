type RequestType = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: { [key: string]: any };
  body?: any;
};

/** request handler
 * @param url request url
 * @param method http method type
 * @param params request parameters
 * @param body request body
 */

export const request = async <T>({ url, method = 'GET', params, body }: RequestType) => {
  const baseURL = 'https://www.art-talktalk.store/';
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
    console.log(response.status);
  }

  return (await response.json()) as T;
};
