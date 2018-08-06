import modelExtend from 'dva-model-extend'
import { query, create, update, remove, detail, changePermission } from './service'
import { pageModel } from 'utils/model'
import { organizePagaination } from 'utils'
import { message } from 'antd'

export default modelExtend(pageModel, {
  namespace: 'role',
  state: {
    roleDataList: [],
    roleData: {},
    queryRoleParams: {},
    modalVisible: false,
    modalType: 'create',
    roleDetail: {},
    permissionModalVisible: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/role') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload)

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
    },

    *changePermission({ payload }, { call, put }){
      const data = yield call(changePermission, payload)

      if(data.success){
        message.success('成功')
        yield put({ type: 'query' })
      }else {
        throw data
      }
    }
  },
})
