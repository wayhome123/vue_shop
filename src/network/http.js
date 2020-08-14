import { request1, request2 } from './request';

export function toLogin(user) {
  return request1({
    url: '/login',
    params: user,
  });
}

export function getMenuList() {
  return request1({
    url: '/menus',
  });
}

export function getUserList(queryInfo) {
  return request1({
    url: '/users',
    params: queryInfo,
  });
}

export function changeUserState(uId, type) {
  return request2({
    url: '/users/' + uId + '/state/' + type,
  });
}
