import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

function Dashboard({ dashboard  }) {
  const { } = dashboard
  return ( <span> 展示Dashboard监控界面 </span>  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
