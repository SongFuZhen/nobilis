import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query, create, update, remove, detail } from './service'
import { pageModel } from 'utils/model'
import { organizePagaination } from 'utils'

export default modelExtend(pageModel, {
  namespace: 'metadata',
  state: {
    modalType: 'create',
    modalVisible: false,
    queryUserParams: {},
    metadataDetail: {}
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/metadata') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      
      if(data.success){
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

    *detail({ payload }, { call, put }){
      const data = yield call(detail, payload)

      if(data.success) {
        yield put({
          type: 'updateState',
          payload: {
            roleData: data.data
          }
        })
      }else {
        throw data
      }
    },

    *create({ payload }, { call, put }){
      const data = yield call(create, payload)

      if(data.success){
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false
          }
        })

        yield put({ type: 'query' })
      }else {
        throw data
      }
    },

    *update({ payload }, { call, put }){
      const data = yield call(update, payload)

      if(data.success) {
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false
          }
        })

        yield put({ type: 'query' })
      }else {
        throw data
      }
    },

    *remove({ payload }, { call, put }){
      const data = yield call(remove, payload)

      if(data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    }

  },
})
