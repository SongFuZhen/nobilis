import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styles from 'themes/index.less'
import leftStyles from './Left.less'

const Left = ({  }) => {

  return (
    <Row gutter={8} className={styles.filterRow}>
        <span>请选择模型</span>

        <Col span={24}> 
          <div className={leftStyles.template}>
            <svg class="icon" width="200px" height="193.94px" viewBox="0 0 1056 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M12.8 601.6h992v51.2H12.8v-51.2z m0 0M12.8 902.4h992v51.2H12.8v-51.2zM12.8 307.2h992v51.2H12.8z" fill="#101010" /><path d="M409.6 921.6H147.2s-6.4 0-6.4-6.4l-6.4-6.4v-179.2c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8v179.2c0 6.4-6.4 12.8-12.8 12.8z m-243.2-32H384v-140.8H166.4v140.8z m454.4 12.8M838.4 921.6H576s-6.4 0-6.4-6.4l-6.4-6.4v-179.2c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8v179.2c0 6.4-6.4 12.8-12.8 12.8z m-236.8-32h217.6v-140.8H601.6v140.8z m448 12.8M416 627.2H153.6s-6.4 0-6.4-6.4l-6.4-6.4V435.2c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8v179.2c0 6.4-6.4 12.8-12.8 12.8z m-236.8-32h217.6V454.4H179.2v140.8z m448 12.8M844.8 627.2H582.4s-6.4 0-6.4-6.4l-6.4-6.4V435.2c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8v179.2c0 6.4-6.4 12.8-12.8 12.8z m-236.8-32h217.6V454.4H608v140.8z m448 12.8M416 326.4H153.6s-6.4 0-6.4-6.4l-6.4-6.4V134.4c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8v179.2c0 6.4-6.4 12.8-12.8 12.8z m-236.8-32h217.6V153.6H179.2v140.8z m448 12.8M844.8 326.4H582.4S576 326.4 576 320l-6.4-6.4V134.4c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8v179.2c0 6.4-6.4 12.8-12.8 12.8z m-236.8-32h217.6V153.6H608v140.8z m448 12.8" fill="#101010" /></svg>
          </div>
        </Col>
        
        <Col span={24}> 
          <div className={leftStyles.template}>
            <svg viewBox="0 0 200 200" width="100px" height="80px">
<path d="M53.6,200c-6.7-1.6-30.9-11.2-33-24.7c-1.4-8.8,2-17.3,9.5-23.6c5.6-4.7,19.7-13.6,25.5-16.6c2.2-1.1,5.3-2.3,8.1-3.6
  c8-3.4,11.1-5,11.9-6.4c0.9-2.2,0.9-3.8,0.2-8v-0.3l-0.3-0.3c-3.3-3.4-11.2-13.1-13.3-19.1s-4.2-18-4.4-23.4v-1.2H41.6
  C41.9,70.3,43,65,44.7,62c2.5-4.4,6.4-8.1,7-8.4l0.6-0.3v-1.1c0-3.6,2-16.1,11.1-25.2C74.4,16.1,89.7,8.3,99.7,8.3h0.6
  c10,0,25.3,8,36.3,18.8c9.1,9.1,11.1,21.6,11.1,25.2V53l0.6,0.3c0.6,0.3,4.5,4.1,7,8.4c1.7,3,2.7,8.3,3.1,10.8H142v1.2
  c0,5.5-2.3,17.5-4.4,23.4s-10,15.6-13.3,19.1l-0.3,0.3v0.3c-0.8,4.2-0.9,5.8,0.2,8c0.6,1.6,3.8,3,11.9,6.4c2.8,1.3,5.8,2.5,8.1,3.6
  c5.9,3,19.8,11.9,25.5,16.6c7.5,6.2,10.9,14.8,9.5,23.6c-2.2,13.4-26.2,23.1-33,24.7c-5-1.7-31.9-4.1-41.4-4.1H102
  c-0.6,0-1.3,0.2-2.2,0.2c-0.8,0-1.6-0.2-2.2-0.2h-2.8C85.5,195.9,58.6,198.3,53.6,200L53.6,200z M144.8,192.3l0.5-0.2
  c2.3-0.5,23.6-5.3,26.6-20.5c1.6-8.6-8.4-16.1-13.3-19.5c-3.3-2.5-6.1-4.2-9.7-6.1l-1.6-0.8l-8.1,45.8l1.3,0.2
  c2,0.3,3.4,0.6,3.9,0.8L144.8,192.3L144.8,192.3z M50.9,146.1c-4.2,2.2-6.9,4.1-9.7,6.1c-4.8,3.6-14.8,11.1-13.3,19.5
  c3,15.2,24.1,20,26.6,20.5l0.5,0.2l0.3-0.3c0.5-0.2,2-0.5,3.9-0.8l1.2-0.2l-8.1-45.8L50.9,146.1L50.9,146.1z M102.8,188.3
  c8.9,0.2,17,0.6,23.3,1.2l1.3,0.2l7.2-50.3l-1.6-0.8c-1.3-0.6-2.7-1.1-4.1-1.7c-5.3-2.2-10.8-4.4-13-12c-0.3-1.4-0.5-2.8-0.3-4.4
  c0.2-1.9,0.8-3.4,1.4-5.5c0.2-0.8,0.5-1.4,0.8-2.3c3.6-3.1,8.8-10.6,11.4-15.8l1.7-3.6c1.2-3.3,2.3-10.9,3-16.7l0.2-1.4H65.8
  l0.2,1.4c0.9,8.4,2,14.1,3,16.7l1.7,3.6c2.8,5.3,8,12.8,11.6,15.9c0.3,0.8,0.5,1.6,0.8,2.2c0.6,1.9,1.2,3.6,1.4,5.5
  c0.2,1.6,0.2,3-0.3,4.4c-2.2,7.7-7.7,9.8-13,12c-1.4,0.6-2.8,1.1-4.1,1.7l-1.6,0.8l7.2,50.3l1.2-0.2c6.4-0.6,14.4-1.1,23.3-1.2
  H102.8z M60,54.8c-1.2,0.6-3.1,1.7-5.2,5.2c-1.1,1.7-1.2,3.1-1.4,4.1l-0.2,1.4h93.1l-0.2-1.4c0-0.9-0.3-2.2-1.3-4.1
  c-2-3.4-4.1-4.5-5.2-5.2c0-4.5,0.2-13.6-8.1-21.9C120.9,22,108.9,15.6,100,15.6c-11.9,0-23.9,9.5-31.7,17.3C60,41.3,60,50.5,60,54.8
  z"/>
</svg>
          </div>
        </Col>

        <Col span={24}> 
          <div className={leftStyles.template}>
            <svg class="icon" width="200px" height="196.36px" viewBox="0 0 1043 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M387.550852 86.489109a114.309636 114.309636 0 0 0-221.705053 0l-165.013911 0.259113v56.077455l164.918448-0.259113a114.309636 114.309636 0 0 0 221.705054 0h654.000586V86.489109z m-110.859345 86.434559a58.423107 58.423107 0 0 1 0-116.737113 58.423107 58.423107 0 0 1 0 116.737113z m404.393181 229.178411a114.555111 114.555111 0 0 0-110.804795 86.434559H0v56.077455h570.225342a114.295999 114.295999 0 0 0 221.664141 0h248.625505v-56.077455H791.889483a114.555111 114.555111 0 0 0-110.804795-86.434559z m0 172.814568a58.314007 58.314007 0 0 1-58.314007-57.373018l-0.095462-0.940989 0.095462-0.940988a58.368557 58.368557 0 1 1 58.314007 59.268633z m114.555111-58.314007c0 2.727503-0.245475 5.386818-0.450038 8.018858 0.150013-2.727503 0.354575-5.332268 0.354576-8.018858s-0.204563-5.386818-0.354576-8.182508a73.301634 73.301634 0 0 1 0.436401 8.168871zM119.028216 794.876099a114.555111 114.555111 0 1 0 110.859345 142.512013h813.73678v-56.077454H229.887561a114.636937 114.636937 0 0 0-110.859345-86.434559z m0 172.85548a58.464019 58.464019 0 0 1 0-116.832576 58.464019 58.464019 0 0 1 0 116.832576z" /></svg>
          </div>
        </Col>
    </Row>
  )
}

Left.propTypes = {
  onCreateItem: PropTypes.func,
  form: PropTypes.object,
  onLeftChange: PropTypes.func,
}

export default Left