import modelExtend from 'dva-model-extend'
import { query } from './service'
import { pageModel } from 'utils/model'
import { organizePagaination } from 'utils'

export default modelExtend(pageModel, {
  namespace: 'permission',
  state: {
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/permission') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    * query({ payload}, { call, put }) {
      const data = yield call(query, payload)
      
      if(data.result) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: organizePagaination(payload, data.total)
          }
        })
      }else {
        throw data
      }

    },
  },
})
