import { notification } from 'antd'

export default {
  onError(error, dispatch) {
    error.preventDefault()
    // 捕捉全局Exception
    if (error.statusCode === 401 || error.statusCode === 405 || error.code === 401) {
      //登录过期，直接提示2s，然后跳转界面到登录界面
      notification.error({
        message: "用户登录过期或无权限，2S 后跳转到登录界面",
        duration: 2,
        key: "401Notification"
      })

      // notification.error({
      //   message: "用户登录过期或无权限，2S 后跳转到登录界面",
      //   duration: 2
      // })

      setTimeout(function () {
        dispatch({
          type: 'app/logout'
        })
      }, 2000)
    } else if (error.code === 500) {
      // 服务器错误
      notification.error({
        message: (error.message !== undefined || error.message != null || error.message !== "") ? error.message : "服务器错误",
        duration: null,
      })
    } else {
      let errorMsg = "报错啦！";

      if (error.message !== null && error.message !== "") {
        errorMsg = error.message;
      }
      else if (error.content !== null && error.content !== "") {
        errorMsg = error.content;
      }
      else if (error.messages.length > 0) {
        errorMsg = error.messages.toString();
      }

      notification.error({
        message: errorMsg,
        duration: null,
        key: "other-network-error"
      })
    }
  },
}
