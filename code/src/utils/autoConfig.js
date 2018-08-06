/**
 * 动态判断是哪个API请求; 通过输入的URL，进行动态判断
 * apiHost: API实际请求的地址
 * window.localhost.host: 输入的URL地址
 */

const autoConfigIP = () => {
  let apiHost = "";
  try {
    switch (window.location.host) {
      case "localhost:10002":
        apiHost = "47.96.97.244:10020";
        // apiHost = "192.168.1.50:10020";
        // apiHost = "localhost:10020";
        break;
      case "47.96.97.244:10001":
        apiHost = "47.96.97.244:10020";
        break;
      default:
        apiHost = window.location.host;
        break;
    }
  } catch (error) { }

  return "http://" + apiHost;
};

// module.exports = {   autoConfigIP };

exports.autoConfigIP = autoConfigIP;
