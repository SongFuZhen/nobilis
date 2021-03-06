import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {config} from 'utils'
import styles from './index.less'
import { Form, Row, Button, Input, Icon } from 'antd'

const FormItem = Form.Item
const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/login', payload: values})
    })
  }

  return (
    <div>
      <div className={styles.bg}></div>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.lock}/>
          <span>{config.name}</span>
        </div>
        <form >
          <FormItem hasFeedback>
            {getFieldDecorator('login_id', {
              rules: [
                {
                  required: true,
                  message: '请输入账号'
                }
              ]
            })(<Input addonBefore={<Icon type='user' />} onPressEnter={handleOk} placeholder="账号"/>)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                }
              ]
            })(<Input addonBefore={<Icon type='lock' />} type="password" onPressEnter={handleOk} placeholder="密码"/>)}
          </FormItem>
          <Row>
            <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
              登录
            </Button>
          </Row>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({loading}) => ({loading}))(Form.create()(Login))
