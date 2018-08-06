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
  // onCreateItem,
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

  // const handleCreate = () => {
  //   onCreateItem()
  // }

  return (
    <Row gutter={8} className={styles.filterRow}>
      {
        hasPermission("/nifi/search") ? 
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
              label="状态:">
              {getFieldDecorator('state')(<Input placeholder='状态' />)}
            </FilterItem>
          </Col>
        </div>
         : ''
      }

      {
        hasPermission("/nifi/search") ? 
        <Col span={6} style={{textAlign: 'center'}}>
          <Button icon="search" type='primary' onClick={handleSubmit}>查询</Button>

          <Button icon="rollback" type='primary' className={styles.warningBtn} onClick={handleReset} style={{marginLeft: 10}}>重置</Button>
        </Col> : ''
      }

     {/* {
        hasPermission("/nifi/create") ? 
        <Col span={6} style={{textAlign: 'center'}}>
          <Button icon="plus" type='primary' className={styles.primaryBtn} onClick={handleCreate}>新建</Button>
        </Col> : ''
      }*/}

    </Row>
  )
}

Filter.propTypes = {
  onCreateItem: PropTypes.func,
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
