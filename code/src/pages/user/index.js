import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { config } from 'utils'
import { baseModalProps } from 'utils'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'

const { defaultPage, defaultPageSize } = config

function User({ user, loading, dispatch, location }) {

 	const { list, pagination, queryUserParams, modalVisible, modalType, userDetail } = user
  	const { pageSize } = pagination

  	const filterProps = {
  		onFilterChange(value) {
	      	const payloadData = {
		        ...queryUserParams,
		        ...value,
		        page: defaultPage,
		        pageSize: pageSize || defaultPageSize
      		}

    		dispatch({
		        type: 'user/updateState',
		        payload: {
		          queryUserParams: payloadData
		        }
	      	})

	      	dispatch({type: 'user/query', payload: payloadData})
	    },

	    onCreateItem() {
	      dispatch({
	        type: 'user/updateState',
	        payload: {
	          modalVisible: true,
	          modalType: 'create',
	          userDetail: {}
	        }
	      })
	    }
  	}

  	const listProps = {
  		dataSource: list,
	    loading: loading.effects['user/query'],
	    pagination,
	    location,
	    onChange(page, filters, sorter) {
	      console.log(filters)

	      const payloadData = {
	        ...queryUserParams,
	        page: page.current,
	        pageSize: page.pageSize,
	        sortField: sorter.columnKey,
	        sortType: sorter.order
	      }

	      dispatch({
	        type: 'user/updateState',
	        payload: {
	          queryUserParams: payloadData
	        }
	      })

	      dispatch({type: 'user/query', payload: payloadData})
	    },

	    onEditItem(data) {
	      dispatch({
	        type: 'user/updateState',
	        payload: {
	          userDetail: data,
	          modalVisible: true,
	          modalType: 'update'
	        }
	      })
	    },

	    onDeleteItem(id) {
	      dispatch({
	        type: 'user/remove',
	        payload: {
	          id: id
	        }
	      })
	    },
  	}

  	const modalProps = {
  		...baseModalProps('modalVisible', 'creatOrUpdateUser', modalType === 'create' ? '新建用户' : '编辑用户', 'user/updateState', dispatch ),
  		visible: modalVisible,
	    modalType: modalType,
	    userDetail: userDetail,
	    confirmLoading: loading.effects[`user/${modalType}`],
	    onOk(data) {
	      dispatch({
	        type: `user/${modalType}`,
	        payload: data
	      })
	    }
  	}


  	return ( 
	  	<div>
	  		<Filter {...filterProps} />
	  		<List {...listProps} />
	  		{modalVisible && <Modal {...modalProps} />}
	  	</div>
	)
}

User.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({ user, loading }))(User)
