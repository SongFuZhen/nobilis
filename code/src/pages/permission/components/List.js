import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { getScrollWidth } from 'utils';

const List = ({ location, ...tableProps }) => {
    
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
            width: 250
        },
        {
            title: '编码',
            dataIndex: 'nr',
            key: 'nr',
            width: 150
        },
        {
            title: '父级编码',
            dataIndex: 'parent_nr',
            key: 'parent_nr',
            width: 150
        },
        {
            title: 'URL',
            dataIndex: 'url_str',
            key: 'url_str',
            width: 150
        },
        // {
        //     title: 'Code',
        //     dataIndex: 'code',
        //     key: 'code',
        //     width: 150
        // },
        // {
        //     title: 'wmid',
        //     dataIndex: 'wmid',
        //     key: 'wmid',
        //     width: 50
        // },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: 150
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
                className={'permissionTable'}
                bordered
                {...tableProps}
                columns={columns}
                scroll={{ x: getScrollWidth(columns), y: window.innerHeight - 270 }}
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