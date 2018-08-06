import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { getScrollWidth } from 'utils';
import styles from 'themes/index.less'
import { DraggableConfirmModal } from 'utils'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
    
    function handleUpdateClick(record) {
        onEditItem(record)
    }
    
    function handleDeleteClick(record) {
        DraggableConfirmModal({
            title: '删除',
            content: '确定要删除用户【'+ record.name + '】吗?',
            onOk() {
                onDeleteItem(record.id)
            }
        })
    }

    let columns = [
        {
            title: 'NO',
            width: 50,
            key: 'No',
            dataIndex: 'No',
            render: (text, record, index) => <span>{index + 1}</span>,
        },  
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: '登录名',
            dataIndex: 'login_id',
            key: 'login_id',
            width: 150
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 150
        }, 
        {
            title: '最后登录时间',
            dataIndex: 'last_login_at',
            key: 'last_login_at',
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