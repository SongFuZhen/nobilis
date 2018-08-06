import React from 'react'
import PropTypes from 'prop-types'
import { config} from 'utils'
import classnames from 'classnames'
import { Menu, Layout, Icon, Popover, Badge, Tooltip  } from 'antd'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu

const Header = ({
  user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu,
  onProfileItem, onChangePasswordItem, }) => {
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
 
  let handleClickMenu = e => {
    switch (e.key){
      case 'profile':
        // 用户资料，使用Modal显示
        onProfileItem()
        break;
      case 'changePwd':
        onChangePasswordItem()
        break;
      case 'logout': 
        logout()
        break;
      default: 
        break;
    }
  }

  return (
    <div>
      <Layout.Header className={styles.header}>
        {
          siderFold? 
          <div className={styles.iconShow} style={{width: 71, marginLeft: 10, paddingLeft: 10, paddingRight: 10, borderRight: '1px solid #f2f2f2', transition: 'background .3s, width .2s'}}>
            <img src={config.icon} alt='logo' />
          </div>
          :
          <div className={styles.iconShow} style={{width: 191, marginLeft: 10, paddingLeft: 10, paddingRight: 10, borderRight: '1px solid #f2f2f2'}}>
            <img src={config.icon} alt='logo' />
            宙斯监控管理
          </div>
        }
        
        <div className={classnames({'icon-fold-menu': siderFold, 'icon-unfold-menu': !siderFold})} >
          {isNavbar
            ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
              <div className={styles.button}>
                <Icon type="bars" />
              </div>
            </Popover>
            : <div
              className={styles.button}
              onClick={switchSider}
            >
            <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
          </div>}
        </div>
          
        <div className={styles.rightWarpper}>
          <Menu mode="horizontal" onClick={handleClickMenu}>
            <Menu.Item key="bell" style={{borderBottom: '1px solid #f2f2f2', margin: 0}}>
              <Tooltip title='警告' >
                <Badge count={5}>  
                    <Icon type='bell' style={{fontSize: 18}} />
                </Badge>
              </Tooltip>
            </Menu.Item>
            
            <Menu.Item key="notification" style={{borderBottom: '1px solid #f2f2f2', margin: 0}}>
              <Tooltip title='通知' >
                <Icon type='notification' style={{fontSize: 18}} />
              </Tooltip>
            </Menu.Item>

            <Menu.Item key="email" style={{borderBottom: '1px solid #f2f2f2', margin: 0}}>
              <Tooltip title='邮箱' >
                <Icon type='mail' style={{fontSize: 18}} />
              </Tooltip>
            </Menu.Item>

            <SubMenu
              style={{
                float: 'right'
              }}
              title={<span className={styles.iconShow}>
                <img alt='' src={config.manIcon} style={{background: '#999'}}/>
                {user.name}
                <Icon type='down' style={{fontSize: 16}} />
              </span>}
            >
              <Menu.Item key="profile" style={{borderBottom: '1px solid #f2f2f2', margin: 0}}>
                <Icon type='user' />
                个人资料
              </Menu.Item>
              <Menu.Item key="changePwd" style={{borderBottom: '1px solid #f2f2f2', margin: 0}}>
                <Icon type='lock' />
                修改密码
              </Menu.Item>
              <Menu.Item key="logout" style={{margin: 0}}>
                <Icon type='poweroff' />
                退出系统
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
