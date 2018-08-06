import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input } from 'antd'
import styles from 'themes/index.less'
import { hasPermission } from 'utils'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

const Filter = ({
  onFilterChange,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleReset = () => {
    resetFields()
    onFilterChange(getFieldsValue())
  }

  return (
    <Row gutter={8} className={styles.filterRow}>
      {
        hasPermission("/permission/search") ? 
        <div>
          <Col span={6}>
            <FilterItem
              {...formItemLayout}
              label="名称:">
              {getFieldDecorator('name')(<Input placeholder='名称' />)}
            </FilterItem>
          </Col>
          <Col span={6}>
            <FilterItem
              {...formItemLayout}
              label="编码:">
              {getFieldDecorator('nr')(<Input placeholder='编码' />)}
            </FilterItem>
          </Col>
        </div>
         : ''
      }

      {
        hasPermission("/permission/search") ? 
        <Col span={6} style={{textAlign: 'center'}}>
          <Button icon="search" type='primary' onClick={handleSubmit}>查询</Button>

          <Button icon="rollback" type='primary' className={styles.warningBtn} onClick={handleReset} style={{marginLeft: 10}}>重置</Button>
        </Col> : ''
      }
    </Row>
  )
}

Filter.propTypes = {
  onCreateItem: PropTypes.func,
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
