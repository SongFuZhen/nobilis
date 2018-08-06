import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
// import { config } from 'utils'

import Left from './components/Left'
import Content from './components/Content'

// function VirtualPlant({ virtualPlant, loading, dispatch, location }) {
function VirtualPlant({ virtualPlant }) {
	const { } = virtualPlant
  	return ( 
	  	<div>
	  		虚拟工厂示意图
	  		<Row gutter={8}>
	  			<Col span={4}> 
	  				<Left />
	  			</Col>
	  			<Col span={20}> 
	  				<Content />
	  			</Col>
	  		</Row>
	  	</div>
	)
}

VirtualPlant.propTypes = {
  virtualPlant: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ virtualPlant, loading }) => ({ virtualPlant, loading }))(VirtualPlant)
