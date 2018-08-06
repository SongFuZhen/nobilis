import React from 'react'
import PropTypes from 'prop-types'
import Menus from './Menu'

const Sider = ({
  siderFold,
  darkTheme,
  location,
  navOpenKeys,
  changeOpenKeys,
  menu
}) => {
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys
  }
  return (
    <div>
      <Menus {...menusProps}/>
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func
}

export default Sider
