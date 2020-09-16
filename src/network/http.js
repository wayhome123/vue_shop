//1是post请求，2是put请求,3是get请求
import { post, put, get, del } from './request';

//登录
export function toLogin(user) {
  return post({
    url: '/login',
    params: user,
  });
}

//获取菜单列表
export function getMenuList() {
  return post({
    url: '/menus',
  });
}

//用户列表
export function getUserList(queryInfo) {
  return get({
    url: '/users',
    method: 'get',
    params: queryInfo,
  });
}

//修改用户状态
export function changeUserState(uId, type) {
  return put({
    url: '/users/' + uId + '/state/' + type,
  });
}

//添加用户
export function addUsers(queryInfo) {
  return post({
    url: '/users',
    method: 'post',
    data: queryInfo,
  });
}

//查询用户
export function searchUsers(id) {
  return get({
    url: '/users/' + id,
  });
}

//编辑用户信息并提交
export function submitUsers(id, queryInfo) {
  return put({
    url: '/users/' + id,
    data: queryInfo,
  });
}

export function deleteUsers(id) {
  return del({
    url: '/users/' + id,
  });
}
