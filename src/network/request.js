//封装的request.js文件
import axios from 'axios';


export function post(config) {
  const instance = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1',
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => console.log(err)
  );

  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = window.sessionStorage.getItem(
        'token'
      );
      return config;
    },
    (err) => console.log(err)
  );

  return instance(config);
}

export function put(config) {
  const instance = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1',
    timeout: 5000,
    method: 'PUT',
  });

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => console.log(err)
  );

  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = window.sessionStorage.getItem(
        'token'
      );
      return config;
    },
    (err) => console.log(err)
  );
  return instance(config);
}

export function get(config) {
  const instance = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1',
    timeout: 5000,
    method: 'GET',
  });

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => console.log(err)
  );

  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = window.sessionStorage.getItem(
        'token'
      );
      return config;
    },
    (err) => console.log(err)
  );

  return instance(config);
}

export function del(config) {
  const instance = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1',
    timeout: 5000,
    method: 'delete',
  });

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => console.log(err)
  );

  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = window.sessionStorage.getItem(
        'token'
      );
      return config;
    },
    (err) => console.log(err)
  );
  return instance(config);
}
