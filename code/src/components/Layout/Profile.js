import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, img, Tag, Alert, Icon } from 'antd'
import { DraggableModal, config } from 'utils'

const Profile = ({
    userProfile = {},
    ...modalProps }) => {

    const messageShow = (
        <span>
            最后一次登录时间：
            {userProfile.last_login_at}
        </span>
    )

    return (
        <DraggableModal {...modalProps} >
            <Row span={8}>
                <Col span={6}>
                    <img alt='用户头像' src={config.manIcon} style={{ width: 100, borderRadius: '50%', background: 'gainsboro'}} />
                </Col>

                <Col span={18}>
                    <p>
                        <b style={{fontSize: '1.5em', marginRight: 10}}>{userProfile.name}</b>
                        <Tag color="#87d068">Active</Tag> 
                    </p>
                    <p> <Icon type='lock' /> {userProfile.login_id}</p>

                    <p> <Icon type='mail' /> {userProfile.email}</p>

                    <Alert message={messageShow} type="success" />
                </Col>
            </Row>
        </DraggableModal>
    )
}

Profile.propTypes = {
    type: PropTypes.string,
    userProfile: PropTypes.object,
}

export default Profile
