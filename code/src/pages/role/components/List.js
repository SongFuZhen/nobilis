import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { getScrollWidth } from 'utils';
import styles from 'themes/index.less'
import { DraggableConfirmModal } from 'utils'

const List = ({ location, onEditItem, onDeleteItem, onPermissionItem, onUserItem, ...tableProps }) => {
    
    function handleUpdateClick(record) {
        onEditItem(record)
    }
    
    function handleDeleteClick(record) {
        DraggableConfirmModal({
            title: '删除',
            content: '确定要删除角色【'+ record.name + '】吗?',
            onOk() {
                onDeleteItem(record.id)
            }
        })
    }

    /**
     * 添加、删除权限
     * @param  {参数}
     * @return {返回}
     */
    function handleChangePermission(record) {
        onPermissionItem(record)
    }

    function handleChangeUser(record) {
        onUserItem(record)
    }

    let columns = [
        {
            title: 'NO',
            width: 50,
            key: 'No',
            dataIndex: 'No',
            render: (text, render, index) => <span>{index + 1}</span>,
        },  
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: '代码',
            dataIndex: 'nr',
            key: 'nr',
            width: 150
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: 150
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: 150,
            render: (text, record) => {
                // 编辑、删除
                return (
                    <div>
                        <Button icon="edit" className={styles.editIconBtn} onClick={() => handleUpdateClick(record)}>编辑</Button>

                        <Button icon="delete" className={styles.deleteIconBtn} onClick={() => handleDeleteClick(record)}>删除</Button>

                        {/*添加权限、用户*/}

                        <Button icon="usergroup-add" className={styles.successIconBtn} onClick={() => handleChangePermission(record)}>权限</Button>

                        <Button icon="key" className={styles.nightIconBtn} onClick={() => handleChangeUser(record)}>用户</Button>
                    </div>
                )
            }
        }
    ]

    columns = columns.map((d, index) => ({
        ...d,
        sortIndex: (index + 1),
        sorter: true
    }));

    return (
        <div>
            <Table
                className={'roleTable'}
                bordered
                {...tableProps}
                columns={columns}
                scroll={{ x: getScrollWidth(columns), y: window.innerHeight - 275 }}
                rowKey={record => record.id}
            />
        </div>
    )
}

List.propTypes = {
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    location: PropTypes.object
}

export default List