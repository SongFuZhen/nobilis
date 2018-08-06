import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { getScrollWidth } from 'utils'
// import { DraggableConfirmModal } from 'utils'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
    
    // function handleUpdateClick(record) {
    //     onEditItem(record)
    // }
    
    // function handleDeleteClick(record) {
    //     DraggableConfirmModal({
    //         title: '删除',
    //         content: '确定要删除用户【'+ record.name + '】吗?',
    //         onOk() {
    //             onDeleteItem(record.id)
    //         }
    //     })
    // }

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
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            width: 150
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: 150
        },
        // {
        //     title: '操作',
        //     dataIndex: 'operate',
        //     key: 'operate',
        //     width: 150,
        //     render: (text, record) => {
        //         // 编辑、删除
        //         return (
        //             <div>
        //                 <Button icon="edit" className={styles.editIconBtn} onClick={() => handleUpdateClick(record)}>编辑</Button>

        //                 <Button icon="delete" className={styles.deleteIconBtn} onClick={() => handleDeleteClick(record)}>删除</Button>
        //             </div>
        //         )
        //     }
        // }
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