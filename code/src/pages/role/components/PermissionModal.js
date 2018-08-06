import React from 'react'
import PropTypes from 'prop-types'
import { Tree, Icon } from 'antd'
import { DraggableModal } from 'utils'

const TreeNode = Tree.TreeNode;
const modal = ({
    roleDetail = {},
    onOk,
    ...modalProps }) => {

    console.log(roleDetail)

    const treeData = [
        {
            title: '仪表盘',
            key: '仪表盘',
        },
        {
            title: '系统管理',
            key: '系统管理',
            children: [{
                title: '用户管理',
                key: '用户管理',
                children: [
                  { title: '用户管理-查询', key: '用户管理-查询' },
                  { title: '用户管理-新建', key: '用户管理-新建' },
                  { title: '用户管理-编辑', key: '用户管理-编辑' },
                  { title: '用户管理-删除', key: '用户管理-删除' },
                ],
            }, 
            {
                title: '角色管理',
                key: '角色管理',
                children: [
                    { title: '角色管理-查询', key: '角色管理-查询' },
                    { title: '角色管理-新建', key: '角色管理-新建' },
                    { title: '角色管理-编辑', key: '角色管理-编辑' },
                    { title: '角色管理-删除', key: '角色管理-删除' },
                ],
            }, 
            {
                title: '权限管理',
                key: '权限管理',
                children: [
                    { title: '权限管理-查询', key: '权限管理-查询' },
                    { title: '权限管理-新建', key: '权限管理-新建' },
                    { title: '权限管理-编辑', key: '权限管理-编辑' },
                    { title: '权限管理-删除', key: '权限管理-删除' },
                ],
            }]
        }
    ];

    const renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item} selectable={false} icon={<Icon type='lock' style={{fontSize: '16px'}} />} >
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} selectable={false}  icon={<Icon type='key' style={{fontSize: '16px'}} />} />;
        });
    }

    return (
        <DraggableModal {...modalProps}>
            <div style={{ maxHeight: 600, overflow: 'auto' }}>
                <Tree checkable showIcon autoExpandParent={true} >
                    {renderTreeNodes(treeData)}
                </Tree>
            </div>
        </DraggableModal>
    )
}

modal.propTypes = {
    type: PropTypes.string,
    roleDetail: PropTypes.object,
    onOk: PropTypes.func,
}

export default modal