import { request, config } from 'utils'

const { api } = config
const { users, user } = api

export function query(params) {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}

export function detail(params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export function create(params) {
  return request({
    url: user,
    method: 'post',
    data: params,
  })
}

export function update(params) {
  return request({
    url: user,
    method: 'put',
    data: params,
  })
}

export function remove(params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}