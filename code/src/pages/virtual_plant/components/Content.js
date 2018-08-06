import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styles from 'themes/index.less'

const Content = ({  }) => {

  return (
    <Row gutter={8} className={styles.filterRow}>
        <span>内容显示区域</span>
        <Col>
        </Col>

    </Row>
  )
}

Content.propTypes = {
  form: PropTypes.object,
  onContentChange: PropTypes.func,
}

export default Content
