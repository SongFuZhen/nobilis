import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Switch, Row, Col, Divider, Icon } from 'antd'
import { DraggableModal } from 'utils'

const FormItem = Form.Item

const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    }
}

const modal = ({
    metadataDetail = {},
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
                data['id'] = metadataDetail.id
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
                <Row span={8}>
                    <Col span={12}>
                        <FormItem label="表名" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('tableName', {
                                initialValue: metadataDetail.tableName,
                                rules: [
                                    {
                                        required: true,
                                        message: '表名不能为空'
                                    }
                                ],
                            })(<Input placeholder="表名" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="库名" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('dbName', {
                                initialValue: metadataDetail.dbName,
                                rules: [
                                    {
                                        required: true,
                                        message: '库名不能为空'
                                    }
                                ],
                            })(<Input placeholder="库名" />)}
                        </FormItem>     
                    </Col>
                </Row>

                <Row span={8}>
                    <Col span={12}>
                         <FormItem label="存储" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('storage', {
                                initialValue: metadataDetail.storage,
                                rules: [
                                    {
                                        required: true,
                                        message: '存储不能为空'
                                    }
                                ],
                            })(<Input placeholder="存储" />)}
                        </FormItem>
                    </Col> 
                    <Col span={12}>
                        <FormItem label="来源" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('source', {
                                initialValue: metadataDetail.source,
                                rules: [
                                    {
                                        required: true,
                                        message: '来源不能为空'
                                    }
                                ],
                            })(<Input placeholder="来源" />)}
                        </FormItem>
                    </Col>
                </Row>

                <Row span={8}>
                    <Col span={12}>
                        <FormItem label="类型" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('type', {
                                initialValue: metadataDetail.type,
                            })(<Input placeholder="类型" />)}
                        </FormItem>
                    </Col> 
                    <Col span={12}>
                        <FormItem label="管理人" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('manager', {
                                initialValue: metadataDetail.manager,
                            })(<Input placeholder="管理人" />)}
                        </FormItem>
                    </Col>
                </Row>

                <Row span={8}>
                    <Col span={24}>
                        <FormItem label="是否是Master Data" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('master', {
                                initialValue: metadataDetail.master,
                            })(<Switch checkedChildren="是" unCheckedChildren="否" style={{marginRight: 30}} />)}
                        </FormItem>
                    </Col> 
                </Row>

                <Row span={8}>
                    <Col span={24}>
                        <FormItem label="描述" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('description', {
                                initialValue: metadataDetail.description,
                            })(<TextArea placeholder="描述" />)}
                        </FormItem>
                    </Col> 
                </Row>
            </Form>

            <Divider orientation="left">添加属性</Divider>
            {/*怎么添加属性？*/}
            <Row span={8}>
                <Col span={24}>
                    <Icon type='plus-circle-o' style={{color: '#40a9ff', fontSize: 20}} />
                </Col>
            </Row>

        </DraggableModal>
    )
}

modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    metadataDetail: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(modal)
