import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { DraggableModal } from 'utils'

const FormItem = Form.Item;

const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    }
}

const modal = ({
    userDetail = {},
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
                data['id'] = userDetail.id
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
                <FormItem label="登录名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('login_id', {
                        initialValue: userDetail.login_id,
                        rules: [
                            {
                                required: true,
                                message: '登录名不能为空'
                            }
                        ],
                    })(modalType === 'update' ? <Input disabled placeholder="登录名" /> : <Input placeholder="登录名" />)}
                </FormItem>

                <FormItem label="昵称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: userDetail.name,
                        rules: [
                            {
                                required: true,
                                message: '昵称不能为空'
                            }
                        ],
                    })(<Input placeholder="昵称" />)}
                </FormItem>

                <FormItem label="邮箱" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('email', {
                        initialValue: userDetail.email,
                        rules: [
                            {
                                required: true,
                                message: '邮箱不能为空'
                            }
                        ],
                    })(<Input placeholder="邮箱" />)}
                </FormItem>

                <FormItem label="密码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue: userDetail.password,
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
                        initialValue: userDetail.description,
                    })(<TextArea placeholder="描述" />)}
                </FormItem>
            </Form>
        </DraggableModal>
    )
}

modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    userDetail: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(modal)
