import { request, config } from 'utils'

const { api } = config
const { nifis, nifi } = api

export function query(params) {
  return request({
    url: nifis,
    method: 'get',
    data: params,
  })
}

export function detail(params) {
  return request({
    url: nifi,
    method: 'get',
    data: params,
  })
}

export function create(params) {
  return request({
    url: nifi.replace(':id', ''),
    method: 'post',
    data: params,
  })
}

export function update(params) {
  return request({
    url: nifi,
    method: 'patch',
    data: params,
  })
}

export function remove(params) {
  return request({
    url: nifi,
    method: 'delete',
    data: params,
  })
}