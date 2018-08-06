/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import cloneDeep from 'lodash.clonedeep'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import { YQL, CORS } from './config'
import cookies from "react-cookies";
const autoConfigAPI = require("./autoConfig");

let CORSArray = [];
const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  axios.defaults.headers.common["Authorization"] = cookies.load(
    "zeus-auth-token"
  );
  
  options.credentials = "include";

  options.headers = {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json"
  };

  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domain] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domain.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }

    url = autoConfigAPI.autoConfigIP() + url;

    if (CORSArray.indexOf(autoConfigAPI.autoConfigIP()) === -1) {
      CORSArray = [...CORSArray, autoConfigAPI.autoConfigIP()];
    }

    // url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request(options) {
  if (options.url && options.url.indexOf('//') > -1) {
    // const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    // if (window.location.origin !== origin) {
    //   if (CORS && CORS.indexOf(origin) > -1) {
    //     options.fetchType = 'CORS'
    //   } else if (YQL && YQL.indexOf(origin) > -1) {
    //     options.fetchType = 'YQL'
    //   } else {
    //     options.fetchType = 'JSONP'
    //   }
    // }
    
    // 直接使用CORS方式进行
    options.fetchType = "CORS";
  }

  const excludeUrlArray = ["auth/v1/login"];

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }

    const currentUrl = response.config.url.split("/zeus/")[1].split("?")[0];

    if (
      excludeUrlArray.indexOf(currentUrl) === -1 &&
      data.code === 200 &&
      data.result &&
      data.message != null &&
      data.message !== "" &&
      data.message !== "查询成功" &&
      data.message !== "查询成功!" &&
      data.message !== "获取详情成功"
    ) {
      message.success(data.message);
    }

    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }

    // return Promise.resolve({
    //   success: true,
    //   message: statusText,
    //   statusCode: status,
    //   ...data,
    // })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }

    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
