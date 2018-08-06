/* global window */
import cloneDeep from 'lodash.clonedeep'
import $ from 'jquery'
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Modal, Icon} from "antd";
export classnames from 'classnames'
export config from './config'
export request from './request'
export {color}
from './theme'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

/**
 * @param  name {String}
 * @return  {String}
 */
export function queryURL(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window
    .location
    .search
    .substr(1)
    .match(reg)
  if (r !== null) 
    return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray(array, key, keyAlias = 'key') {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  let data = cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 拖动Modal， 需要自定义 wrapClassName 类名; 将自定义的类型写在第一个，其他的可以写在后面，用一个空格进行分割
 */
export class DraggableModal extends React.Component {
  constructor(props) {
    super();
    const transform = props.style && props.style.transform
      ? props.style.transform
      : "translate(0, 0)";
    const startClientX = 0,
      startClientY = 0,
      pyTop = 0;
    this.state = {
      transform,
      startClientX,
      startClientY,
      pyTop
    };
  }
  handleDrag = e => {
    e.preventDefault();

    // 获取类名
    const clsName = this
      .props
      .wrapClassName
      .split(" ")[0];

    const beforeTranform = $("." + clsName + " .ant-modal-content")
      .parent()
      .css("transform");
    const beforeTranformArray = beforeTranform
      .replace(/[^0-9\-,]/g, "")
      .split(",");

    const width = $("." + clsName + " .ant-modal-content").outerWidth(true);
    const height = $("." + clsName + " .ant-modal-content").outerHeight(true);

    let x = parseFloat(parseFloat(beforeTranformArray[4]) + (e.clientX - this.state.startClientX)).toFixed(2);
    let y = parseFloat(parseFloat(beforeTranformArray[5]) + (e.clientY - this.state.startClientY)).toFixed(2);

    const transformWidth = parseFloat((window.innerWidth - width) / 2).toFixed(0);
    const transformHeight = parseFloat((window.innerHeight - height) / 2).toFixed(0);

    // 方案一：  不出界面的操作 const minTransformHeight = 20 - transformHeight +
    // this.state.pyTop const minTransformWidth = 20 - transformWidth const
    // maxTransformHeight = transformHeight - 30 + this.state.pyTop const
    // maxTransformWidth = transformWidth - 20 console.log("minTransformHeight =" +
    // minTransformHeight + ", minTransformWidth=" + minTransformWidth   + ",
    // maxTransformHeight = " + maxTransformHeight + ", maxTransformWidth= " +
    // maxTransformWidth + ",x =" + x + ", y =" + y) 方案二： 超出界面的操作
    const minTransformHeight = 20 - transformHeight + this.state.pyTop;
    const minTransformWidth = 100 - width - transformWidth;

    const maxTransformHeight = transformHeight + height - 20 + this.state.pyTop;
    const maxTransformWidth = transformWidth + width - 20;

    // 限制
    x = x < minTransformWidth
      ? minTransformWidth
      : x;
    y = y < minTransformHeight
      ? minTransformHeight
      : y;

    x = x > maxTransformWidth
      ? maxTransformWidth
      : x;
    y = y > maxTransformHeight
      ? maxTransformHeight
      : y;

    this.setState({
      transform: "translate(" + x + "px," + y + "px)"
    });
  };

  handleDragStart = e => {
    const clsName = this
      .props
      .wrapClassName
      .split(" ")[0];
    let PYTop = 0;
    if (!$("." + clsName).hasClass("vertical-center-modal")) {
      const height = $("." + clsName + " .ant-modal-content").outerHeight(true);
      PYTop = (window.innerHeight - height) / 2 - 100;
    }

    this.setState({startClientX: e.clientX, startClientY: e.clientY, pyTop: PYTop});
  };

  render() {
    const {
      title,
      style,
      ...otherProps
    } = this.props;
    const newTitle = (
      <div
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDrag}>
        {title}
      </div>
    );

    const newStyle = {
      ...style,
      transform: this.state.transform
    };

    return <Modal {...otherProps} title={newTitle} style={newStyle}/>;
  }
}


/**
 * 删除对话框
 * @param {*} props
 */
export function DraggableConfirmModal(props) {
  let div = document.createElement("div");
  document
    .body
    .appendChild(div);

  function destory() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div
        .parentNode
        .removeChild(div);
    }
  }

  const modalProps = {
    visible: true,
    maskClosable: false,
    title: props.title,
    width: props.width || 416,
    onOk: () => {
      props.onOk(); 
      destory();
    },
    wrapClassName: props.wrapClassName === undefined
      ? "deleteModal confirmModalClass"
      : props.wrapClassName + " confirmModalClass",
    onCancel: e => {
      console.log(e)
      destory();
    }
  };

  ReactDOM.render(
    <DraggableModal {...modalProps}>
    <Icon
      type="question-circle"
      style={{
      color: "#faad14",
      fontSize: 22
    }}/>
    <span style={{
      marginLeft: 10,
      fontSize: "1.1em"
    }}>{props.content}</span>
  </DraggableModal>, div);
};

export function organizePagaination(payload, total) {
  let page = 1, pageSize = 20

  if(payload !== undefined){
    if(payload.page !== undefined) page = payload.page

    if(payload.pageSize !== undefined) pageSize = payload.pageSize
  }

  return {
    current: page,
    page: page,
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [
      '1',
      '5',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '100',
      '200',
      '500',
      '1000',
      '2000'
    ],
    size: "small",
    showTotal: (total, range) => `当前${range[0]} -  ${range[1]}条，共${total}条`
  };
};

// 判断是否有权限
export function hasPermission(urlStr) {
  let result = false;
  const zeus_token = window
    .localStorage
    .getItem("zeus_token");
  if (zeus_token !== "" && zeus_token !== null && zeus_token !== "null") {
    const {permissions} = JSON.parse(zeus_token);

    for(var i = 0; i< permissions.length; i++) {
      if(permissions[i].urlStr === urlStr){
        result = true;
        break;
      }
    }
  }

  console.log(result)

  // return result;
  return true;
};

// get table cloumn width
export function getScrollWidth(finalColumns) {
  let scrollWidth = 0;

  for (var i = 0; i < finalColumns.length; i++) {
    scrollWidth += finalColumns[i].width;
  }

  return scrollWidth;
};

/**
 * [baseModalProps description]
 * @param  {[string]} modalVisible [显示开关]
 * @param  {[string]} cls          [类名]
 * @param  {[string]} title        [头]
 * @param  {[string]} url          [关闭url]
 * @param  {[func]} dispatch     [description]
 * @return {[object]}              [description]
 */
export function baseModalProps(modalVisible, cls, title, url, dispatch) {
  return {
    destroyOnClose: true,
    maskClosable: false,
    title: title,
    wrapClassName: cls + " vertical-center-modal",
    onCancel() {
      var payload = {};
      payload[modalVisible] = false;

      dispatch({
        type: url,
        payload: { ...payload }
      });
    }
  };
};