const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: '仪表盘',
    route: '/dashboard',
  },
  {
    id: '2',
    name: '系统管理',
    icon: 'laptop',
    route: '/system',
  },
  {
    id: '21',
    mpid: '2',
    bpid: '2',
    name: '用户',
    icon: 'idcard',
    route: '/user',
  },
  {
    id: '22',
    mpid: '2',
    bpid: '2',
    name: '角色',
    icon: 'team',
    route: '/role',
  },
  {
    id: '23',
    mpid: '2',
    bpid: '2',
    name: '权限',
    icon: 'key',
    route: '/permission',
  },
  {
    id: '3',
    name: '数据流向',
    icon: 'fork',
    route: '/dataflow',
  },
  {
    id: '31',
    mpid: '3',
    bpid: '31',
    name: 'metadata管理',
    icon: 'book',
    route: '/metadata',
  },
  {
    id: '4',
    name: '监控',
    icon: 'line-chart',
    route: '/monitor',
  },
  {
    id: '41',
    mpid: '4',
    bpid: '41',
    name: 'NiFi',
    icon: 'swap',
    route: '/nifi',
  },
  
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
