import { routerRedux } from 'dva/router'
import { login } from './service'
import cookies from 'react-cookies'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.result) {
        cookies.save('zeus-auth-token', data.data.user.token, { path: '/' });
        window.localStorage.setItem("zeus_user_info", JSON.stringify(data.data))

        const { from } = locationQuery
        yield put({ type: 'app/query' })

        if (from && from !== '/' && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },

}
