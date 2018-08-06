// import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
// import { query } from './dashboard'
import { model } from 'utils/model'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    
  },
  subscriptions: {
    setup({ history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {

        }
      })
    },
  },
  effects: {
    // * query({
    //   payload,
    // }, { call, put }) {
    //   const data = yield call(query, parse(payload))
    //   yield put({
    //     type: 'updateState',
    //     payload: data,
    //   })
    // },
  },
})
