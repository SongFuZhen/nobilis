import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { config, baseModalProps } from 'utils'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'
import PermissionModal from './components/PermissionModal'

import { message } from 'antd'

const {defaultPage, defaultPageSize} = config
function Role({ role, loading, dispatch, location }) {
  const { list, pagination, queryRoleParams, modalVisible, modalType, roleDetail, permissionModalVisible } = role
  const { pageSize } = pagination

  // Filter
  const filterProps = {
    onFilterChange(value) {
      const payloadData = {
        ...queryRoleParams,
        ...value,
        page: defaultPage,
        pageSize: pageSize || defaultPageSize
      }

      dispatch({
        type: 'role/updateState',
        payload: {
          queryRoleParams: payloadData
        }
      })

      dispatch({type: 'role/query', payload: payloadData})
    },

    onCreateItem() {
      dispatch({
        type: 'role/updateState',
        payload: {
          modalVisible: true,
          modalType: 'create',
          roleDetail: {}
        }
      })
    }
  }

  // List
  const listProps = {
    dataSource: list,
    loading: loading.effects['role/query'],
    pagination,
    location,
    onChange(page, filters, sorter) {
      console.log(filters)

      const payloadData = {
        ...queryRoleParams,
        page: page.current,
        pageSize: page.pageSize,
        sortField: sorter.columnKey,
        sortType: sorter.order
      }

      dispatch({
        type: 'role/updateState',
        payload: {
          queryRoleParams: payloadData
        }
      })

      dispatch({type: 'role/query', payload: payloadData})
    },

    onEditItem(data) {
      dispatch({
        type: 'role/updateState',
        payload: {
          roleDetail: data,
          modalVisible: true,
          modalType: 'update'
        }
      })
    },

    onDeleteItem(id) {
      dispatch({
        type: 'role/remove',
        payload: {
          id: id
        }
      })
    },

    onPermissionItem(data) {
      dispatch({
        type: 'role/updateState',
        payload: {
          permissionModalVisible: true,
          roleDetail: data
        }
      })
    },

    onUserItem(data) {
      message.success('点击更改用户按钮 -----> ' + data.name)
    }
  }

  // Modal
  const modalProps = {
    ...baseModalProps('modalVisible', 'createOrUpdateRole', modalType === 'create' ? '新建角色' : '编辑角色', 'role/updateState', dispatch),
    visible: modalVisible,
    modalType: modalType,
    roleDetail: roleDetail,
    confirmLoading: loading.effects[`role/${modalType}`],
    onOk(data) {
      dispatch({
        type: `role/${modalType}`,
        payload: data
      })
    }
  }

  // Permission Modal
  const permissionModalProps = {
    ...baseModalProps('permissionModalVisible', 'roleChangePermission', '修改【' + roleDetail.name + '】权限', 'role/updateState', dispatch),
    visible: permissionModalVisible,
    roleDetail: roleDetail,
    confirmLoading: loading.effects['role/changePermission'],
    onOk(data) {
      console.log("...... 修改权限......" + data)
    }
  }

  return (
    <div>
      <Filter {...filterProps}/>
      <List {...listProps}/>
      {modalVisible && <Modal {...modalProps} />}
      {permissionModalVisible && <PermissionModal {...permissionModalProps} />}
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  loading: PropTypes.object
}

export default connect(({role, loading}) => ({role, loading}))(Role)
