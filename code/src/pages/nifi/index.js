import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { config } from 'utils'
import { baseModalProps } from 'utils'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'

const { defaultPage, defaultPageSize } = config
function Nifi({ nifi, loading, dispatch, location }) {
 	const { list, pagination, queryNifiParams, modalVisible, modalType, nifiDetail } = nifi
  	const { pageSize } = pagination

  	const filterProps = {
  		onFilterChange(value) {
	      	const payloadData = {
		        ...queryNifiParams,
		        ...value,
		        page: defaultPage,
		        pageSize: pageSize || defaultPageSize
      		}

    		dispatch({
		        type: 'nifi/updateState',
		        payload: {
		          queryNifiParams: payloadData
		        }
	      	})

	      	dispatch({type: 'nifi/query', payload: payloadData})
	    },

	    onCreateItem() {
	      dispatch({
	        type: 'nifi/updateState',
	        payload: {
	          modalVisible: true,
	          modalType: 'create',
	          nifiDetail: {}
	        }
	      })
	    }
  	}

  	const listProps = {
  		dataSource: list,
	    loading: loading.effects['nifi/query'],
	    pagination,
	    location,
	    onChange(page, filters, sorter) {
	      console.log(filters)

	      const payloadData = {
	        ...queryNifiParams,
	        page: page.current,
	        pageSize: page.pageSize,
	        sortField: sorter.columnKey,
	        sortType: sorter.order
	      }

	      dispatch({
	        type: 'nifi/updateState',
	        payload: {
	          queryNifiParams: payloadData
	        }
	      })

	      dispatch({type: 'nifi/query', payload: payloadData})
	    },

	    onEditItem(data) {
	      dispatch({
	        type: 'nifi/updateState',
	        payload: {
	          nifiDetail: data,
	          modalVisible: true,
	          modalType: 'update'
	        }
	      })
	    },

	    onDeleteItem(id) {
	      dispatch({
	        type: 'nifi/remove',
	        payload: {
	          id: id
	        }
	      })
	    },
  	}

  	const modalProps = {
  		...baseModalProps('modalVisible', 'creatOrUpdateNifi', modalType === 'create' ? '新建用户' : '编辑用户', 'nifi/updateState', dispatch ),
  		visible: modalVisible,
	    modalType: modalType,
	    nifiDetail: nifiDetail,
	    confirmLoading: loading.effects[`nifi/${modalType}`],
	    onOk(data) {
	      dispatch({
	        type: `nifi/${modalType}`,
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

Nifi.propTypes = {
  nifi: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ nifi, loading }) => ({ nifi, loading }))(Nifi)
