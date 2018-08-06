import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input  } from 'antd'
import { DraggableModal, DraggableConfirmModal } from 'utils'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    }
}

const ChangePassword = ({
    onOk,
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

            DraggableConfirmModal({
                title: '确定修改密码？',
                content: '确定要修改密码吗？',
                onOk() {
                    const data = getFieldsValue()
                    onOk(data)
                }
            })
        })
    }

    const modalOpts = {
        ...modalProps,
        onOk: handleOk
    }

    return (
        <DraggableModal {...modalOpts} >
            <Form layout="horizontal">
                <FormItem label="旧密码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('oldPwd', {
                        rules: [
                            {
                                required: true,
                                message: '旧密码不能为空'
                            }
                        ],
                    })(<Input type='password' placeholder="请输入当前密码" />)}
                </FormItem>

                <FormItem label="新密码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('newPwd', {
                        rules: [
                            {
                                required: true,
                                message: '新密码不能为空'
                            }
                        ],
                    })(<Input type='password' placeholder="请输入新密码" />)}
                </FormItem>
            </Form>
        </DraggableModal>
    )
}

ChangePassword.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    userProfile: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(ChangePassword)
