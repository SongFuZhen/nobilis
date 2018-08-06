import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query, create, update, remove, detail } from './service'
import { pageModel } from 'utils/model'
import { organizePagaination } from 'utils'

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    modalType: 'create',
    modalVisible: false,
    queryUserParams: {},
    userDetail: {}
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/user') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      
      if(data.result){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.content,
            pagination: organizePagaination(payload, data.data.total)
          }
        })
      }else {
        throw data
      }
    },

    *detail({ payload }, { call, put }){
      const data = yield call(detail, payload)

      if(data.result) {
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

      if(data.result){
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

    *update({ payload }, { call, put, select }){
      const data = yield call(update, payload)

      if(data.result) {
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false
          }
        })

        const payloadData = yield select(({ user }) => user.queryUserParams)
        yield put({ type: 'user/query', payload: payloadData })

      }else {
        throw data
      }
    },

    *remove({ payload }, { call, put, select }){
      const data = yield call(remove, payload)

      if(data.result) {
        yield put({ type: 'query' })

        const payloadData = yield select(({ user }) => user.queryUserParams)
        yield put({ type: 'user/query', payload: payloadData })
      } else {
        throw data
      }
    }

  },
})
