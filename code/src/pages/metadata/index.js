import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { config } from 'utils'
import { baseModalProps } from 'utils'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'

const { defaultPage, defaultPageSize } = config
function Metadata({ metadata, loading, dispatch, location }) {
 	const { list, pagination, queryMetadataParams, modalVisible, modalType, metadataDetail } = metadata
  	const { pageSize } = pagination

  	const filterProps = {
  		onFilterChange(value) {
	      	const payloadData = {
		        ...queryMetadataParams,
		        ...value,
		        page: defaultPage,
		        pageSize: pageSize || defaultPageSize
      		}

    		dispatch({
		        type: 'metadata/updateState',
		        payload: {
		          queryMetadataParams: payloadData
		        }
	      	})

	      	dispatch({type: 'metadata/query', payload: payloadData})
	    },

	    onCreateItem() {
	      dispatch({
	        type: 'metadata/updateState',
	        payload: {
	          modalVisible: true,
	          modalType: 'create',
	          metadataDetail: {}
	        }
	      })
	    }
  	}

  	const listProps = {
  		dataSource: list,
	    loading: loading.effects['metadata/query'],
	    pagination,
	    location,
	    onChange(page, filters, sorter) {
	      console.log(filters)

	      const payloadData = {
	        ...queryMetadataParams,
	        page: page.current,
	        pageSize: page.pageSize,
	        sortField: sorter.columnKey,
	        sortType: sorter.order
	      }

	      dispatch({
	        type: 'metadata/updateState',
	        payload: {
	          queryMetadataParams: payloadData
	        }
	      })

	      dispatch({type: 'metadata/query', payload: payloadData})
	    },

	    onEditItem(data) {
	      dispatch({
	        type: 'metadata/updateState',
	        payload: {
	          metadataDetail: data,
	          modalVisible: true,
	          modalType: 'update'
	        }
	      })
	    },

	    onDeleteItem(id) {
	      dispatch({
	        type: 'metadata/remove',
	        payload: {
	          id: id
	        }
	      })
	    },
  	}

  	const modalProps = {
  		...baseModalProps('modalVisible', 'creatOrUpdateMetadata', modalType === 'create' ? '新建metadata' : '编辑metadata', 'metadata/updateState', dispatch ),
  		visible: modalVisible,
  		width: 1200,
	    modalType: modalType,
	    metadataDetail: metadataDetail,
	    confirmLoading: loading.effects[`metadata/${modalType}`],
	    onOk(data) {
	      dispatch({
	        type: `metadata/${modalType}`,
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

Metadata.propTypes = {
  metadata: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ metadata, loading }) => ({ metadata, loading }))(Metadata)
