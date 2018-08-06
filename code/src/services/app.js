import { request, config } from 'utils'

const { api } = config
const { user, userInfo, userLogout, userLogin, changePwd } = api

export function login(params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export function logout(params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export function query(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export function profile(params) {
  return request({
    url: userInfo,
    method: 'get',
    data: params
  })
}

export function changePassword(params) {
  return request({
    url: changePwd,
    method: 'post',
    data: params
  })
}
