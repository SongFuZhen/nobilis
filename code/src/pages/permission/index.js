import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { config } from 'utils'
import Filter from './components/Filter'
import List from './components/List'

function Permission({ permission, loading, dispatch, location }) {
  	const { list, pagination, queryPermissionParams } = permission
 	const { pageSize } = pagination
	const { defaultPage, defaultPageSize } = config

	// Filter
	const filterProps = {
		onFilterChange(value) {
		  const payloadData = {
		    ...queryPermissionParams,
		    ...value,
		    page: defaultPage,
		    pageSize: pageSize || defaultPageSize
		  }

		  dispatch({
		    type: 'permission/updateState',
		    payload: {
		      queryPermissionParams: payloadData
		    }
		  })

		  dispatch({type: 'permission/query', payload: payloadData})
		}
	}

	// List 

	const listProps = {
		dataSource: list,
	    loading: loading.effects['permission/query'],
	    pagination,
	    location,
	    onChange(page, filters, sorter) {
	      console.log(filters)

	      const payloadData = {
	        ...queryPermissionParams,
	        page: page.current,
	        pageSize: page.pageSize,
	        sortField: sorter.columnKey,
	        sortType: sorter.order
	      }

	      dispatch({
	        type: 'permission/updateState',
	        payload: {
	          queryPermissionParams: payloadData
	        }
	      })

	      dispatch({type: 'permission/query', payload: payloadData})
	    }
	}

	return (
		<div>	    
			<Filter {...filterProps}/>
		  	<List {...listProps}/> 
		</div>
	)
}

Permission.propTypes = {
  permission: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ permission, loading }) => ({ permission, loading }))(Permission)
