import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { getScrollWidth } from 'utils'
import styles from 'themes/index.less'
import { DraggableConfirmModal } from 'utils'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
    
    function handleUpdateClick(record) {
        onEditItem(record)
    }
    
    function handleDeleteClick(record) {
        DraggableConfirmModal({
            title: '删除',
            content: '确定要删除metadata【'+ record.tableName + '】吗?',
            onOk() {
                onDeleteItem(record.id)
            }
        })
    }

    let columns = [
        {
            title: 'NO',
            width: 100,
            key: 'No',
            dataIndex: 'No',
            render: (text, render, index) => <span>{index + 1}</span>,
        },  
        {
            title: '表名称',
            dataIndex: 'tableName',
            key: 'tableName',
            width: 150
        },
        {
            title: '库名称',
            dataIndex: 'dbName',
            key: 'dbName',
            width: 150
        },
        {
            title: '存储',
            dataIndex: 'storage',
            key: 'storage',
            width: 150
        },
        {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            width: 150
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 150
        },
        {
            title: '管理人',
            dataIndex: 'manager',
            key: 'manager',
            width: 150
        },
        {
            title: '是否是master data',
            dataIndex: 'master',
            key: 'master',
            width: 150
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: 250
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: 150,
            fixed: 'right',
            render: (text, record) => {
                // 编辑、删除
                return (
                    <div>
                        <Button icon="edit" className={styles.editIconBtn} onClick={() => handleUpdateClick(record)}>编辑</Button>

                        <Button icon="delete" className={styles.deleteIconBtn} onClick={() => handleDeleteClick(record)}>删除</Button>
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