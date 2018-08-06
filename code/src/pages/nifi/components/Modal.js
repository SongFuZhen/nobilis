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
    nifiDetail = {},
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
                data['id'] = nifiDetail.id
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
                <FormItem label="登录ID" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('login_id', {
                        initialValue: nifiDetail.login_id,
                        rules: [
                            {
                                required: true,
                                message: '登录ID不能为空'
                            }
                        ],
                    })(modalType == 'update' ? <Input disabled placeholder="登录ID" /> : <Input placeholder="登录ID" />)}
                </FormItem>

                <FormItem label="姓名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: nifiDetail.name,
                        rules: [
                            {
                                required: true,
                                message: '姓名不能为空'
                            }
                        ],
                    })(<Input placeholder="姓名" />)}
                </FormItem>

                <FormItem label="邮箱" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('email', {
                        initialValue: nifiDetail.email,
                        rules: [
                            {
                                required: false,
                                message: '邮箱不能为空'
                            }
                        ],
                    })(<Input placeholder="邮箱" />)}
                </FormItem>

                <FormItem label="密码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue: nifiDetail.email,
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空'
                            }
                        ],
                    })(<Input placeholder="密码" />)}
                </FormItem>

                <FormItem label="描述" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('description', {
                        initialValue: nifiDetail.description,
                    })(<Input placeholder="描述" />)}
                </FormItem>
            </Form>
        </DraggableModal>
    )
}

modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    nifiDetail: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(modal)
