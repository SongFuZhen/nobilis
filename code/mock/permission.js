const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const { apiPrefix } = config

let permissionsListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@cname',
      url_str: '@url',
      code: '200',
      nr: '@first',
      parent_nr: '@first',
      wmid: '@increment',
      parent_id: '@increment',
      description: '@csentence',
      createTime: '@datetime',
    },
  ],
})

let database = permissionsListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {
  [`GET ${apiPrefix}/permissions`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 20
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      result: true,
      message: '请求成功',
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })

  }
}
