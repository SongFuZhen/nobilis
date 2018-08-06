/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { parse } from 'qs'
import config from 'config'
import { logout, profile, changePassword } from 'services/app'
// import * as menusService from 'services/menus'
import cookies from 'react-cookies'

const { prefix } = config

const permissionsList = [
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
  {
    id: '5',
    name: '虚拟工厂',
    icon: 'swap',
    route: '/virtual_plant',
  },
]


export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
    userProfileData: {},
    profileModalVisible: false
  },
  subscriptions: {

    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    *query({payload}, { put }) {
      console.log(payload)
      
      var zeus_user_info = window.localStorage.getItem("zeus_user_info");
      if (zeus_user_info !== "" && zeus_user_info != null && zeus_user_info !== "null") {
        const { user, permissions } = JSON.parse(zeus_user_info)
        // const userPermissions = permissions

        // if (user != null && user) {
        //   let list = []
        //   for (var d in userPermissions) {
        //     if(userPermissions[d].nr == null || userPermissions[d].nr === "" ||  userPermissions[d].nr === 1){
        //       continue
        //     }

        //     let transferMenu = {
        //       id: userPermissions[d].nr,
        //       name: userPermissions[d].name,
        //     }

        //     transferMenu.icon = userPermissions[d].icon
        //     transferMenu.mpid = userPermissions[d].wmid !== -1 ? userPermissions[d].parentNr : "-1"
        //     transferMenu.bpid = userPermissions[d].parentNr
        //     transferMenu.route = userPermissions[d].urlStr

        //     list.push(transferMenu)
        //   }

          // let menu = list
          let menu = permissionsList

          // const permissions = {};
          // permissions.visit = list.map(item => item.id)

          permissions.visit = permissionsList.map(item => item.id)

          yield put({
            type: 'updateState',
            payload: {
              user,
              permissions,
              menu,
            },
          })

        // if (location.pathname === '/login') {
        //   yield put(routerRedux.push({
        //     pathname: '/dashboard',
        //   }))
        // }

        // }else{
        //   if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
        //     let from = location.pathname
        //     window.location = `${location.origin}/login?from=${from}`
        //   }
        // }
      }else{
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    *logout({ payload }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.result) {
        window.localStorage.setItem("zeus_user_info", "")
        cookies.remove('zeus-auth-token');
        
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    * changeNavbar( action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

    *userProfile ({ payload }, { call, put }) {
      const data = yield call(profile, payload)

      if(data.success) {
        // 展示User Profile
        yield put({
          type: 'updateState',
          payload: {
            userProfileData: data.data
          }
        })
      }else {
        throw data
      }
    },

    *changePassword({ payload }, { call, put }) {
      const data = yield call(changePassword, payload)

      if(data.success) {
        // 修改成功, 登出，重新登录
        yield put({
          type: 'updateState',
          payload: {
            changePasswordModalVisible: false
          }
        })
        yield put({ type: 'logout' }) 
      }else {
        throw data
      } 
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
