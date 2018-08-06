import { request, config } from 'utils'

const { api } = config
const { roles, role } = api

export function query(params) {
  return request({
    url: roles,
    method: 'get',
    data: params,
  })
}

export function detail(params) {
  return request({
    url: role,
    method: 'get',
    data: params,
  })
}

export function create(params) {
  return request({
    url: role.replace(':id', ''),
    method: 'post',
    data: params,
  })
}

export function update(params) {
  return request({
    url: role,
    method: 'patch',
    data: params,
  })
}

export function remove(params) {
  return request({
    url: role,
    method: 'delete',
    data: params,
  })
}

export function changePermission(params) {
  return request({
    url: role,
    method: 'post',
    data: params
  })
}