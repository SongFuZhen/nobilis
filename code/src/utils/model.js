import modelExtend from 'dva-model-extend'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {},
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload

      return {
        ...state,
        list,
        pagination: pagination
      }
    },

    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

})
