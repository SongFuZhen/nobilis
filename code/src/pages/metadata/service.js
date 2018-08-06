import { request, config } from 'utils'

const { api } = config
const { metadatas, metadata } = api

export function query(params) {
  return request({
    url: metadatas,
    method: 'get',
    data: params,
  })
}

export function detail(params) {
  return request({
    url: metadata,
    method: 'get',
    data: params,
  })
}

export function create(params) {
  return request({
    url: metadata.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function update(params) {
  return request({
    url: metadata,
    method: 'patch',
    data: params,
  })
}

export function remove(params) {
  return request({
    url: metadata,
    method: 'delete',
    data: params,
  })
}