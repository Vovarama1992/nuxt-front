import { Api } from './Api';

export default (baseUrl: string) =>
  new Api<string>({
    baseApiParams: {
      secure: true
    },
    baseUrl,
    securityWorker: (token) =>
      token ? { headers: { Authorization: 'Bearer ' + token } } : {}
  });