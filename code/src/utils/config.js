const APIV1 = '/api/v1'
const APIV2 = '/zeus/v1'

module.exports = {
  name: 'Zeus',
  prefix: 'zeus',
  footerText: 'IFTECH © 2018 - 2019 ',
  logo: '/logo.png',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  loginBackground: '/background.jpg',
  icon: '/icon.ico',
  lock: '/lock.png',
  manIcon: '/man.png',
  workerIcon: '/worker.svg',
  rackIcon: '/rack.svg',
  workstationIcon: '/workstation.svg',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  defaultPage: 1,
  defaultPageSize: 20,
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV2}/login`,
    userLogout: `${APIV2}/logout`,

    changePwd: `${APIV1}/changePwd`,
    userInfo: `${APIV2}/user/info`,

    users: `${APIV2}/users`,
    user: `${APIV2}/user`,

    roles: `${APIV1}/roles`,
    role: `${APIV1}/role/:id`,

    permissions: `${APIV1}/permissions`,

    nifis: `${APIV1}/nifis`,
    nifi: `${APIV1}/nifi/:id`,

    metadatas: `${APIV1}/metadatas`,
    metadata: `${APIV1}/metadata/:id`,

    dashboard: `${APIV1}/dashboard`,
    
    menus: `${APIV1}/menus`,
  },
}
