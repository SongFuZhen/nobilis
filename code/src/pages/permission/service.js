import { request, config } from 'utils'

const { api } = config
const { permissions } = api

export function query(params) {
  return request({
    url: permissions,
    method: 'get',
    data: params,
  })
}
