import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { DraggableModal } from 'utils'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    }
}

const modal = ({
    roleDetail = {},
    onOk,
    modalType,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    }, ...modalProps }) => {

    const handleOk = () =>{
        validateFields((errors) => {
            if(errors){
                return
            }

            const data = getFieldsValue()

            if(modalType !== 'create'){
                data['id'] = roleDetail.id
            }

            onOk(data)
        })
    }

    const modalOpts = {
        ...modalProps,
        onOk: handleOk
    }

    return (
        <DraggableModal {...modalOpts} >
            <Form layout="horizontal">
                <FormItem label="角色编号" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('nr', {
                        initialValue: roleDetail.nr,
                        rules: [
                            {
                                required: true,
                                message: '角色编号不能为空'
                            }
                        ],
                    })(modalType === 'update' ? <Input disabled placeholder="角色编号" /> : <Input placeholder="角色编号" />)}
                </FormItem>

                <FormItem label="角色名称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: roleDetail.name,
                        rules: [
                            {
                                required: true,
                                message: '角色名称不能为空'
                            }
                        ],
                    })(<Input placeholder="角色名称" />)}
                </FormItem>

                <FormItem label="描述" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('description', {
                        initialValue: roleDetail.description,
                    })(<Input placeholder="描述" />)}
                </FormItem>

            </Form>
        </DraggableModal>
    )
}

modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    roleDetail: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(modal)