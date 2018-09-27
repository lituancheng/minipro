const { host } = require("./config");
let status_map = {
  500: "服务器错误",
  404: "地址错误",
  502: "服务器正在部署"
}

let config = {
  'content-type': 'application/x-www-form-urlencoded',
  token: wx.getStorageSync("token")
}
let success = function (data, resolve, reject) {
  // console.log(data);
  let status = data.statusCode;
  let msg = "错误代码：" + (status || "net") + "\t 错误信息：" + status_map[status] || "网络异常";
  // 解析http状态码
  if (status >= 200 && status < 400) {
    // 解析接口状态码
    let res = data.data;
    if (typeof res === "string") {
      res = JSON.parse(res)
    }
    if (res.code === 0) {
      // 数据正常
      resolve(res);
    } else if (res.code === -1) {
      // 内部错误
      wx.showToast({ title: "服务器内部错误", icon: "none", duration: 2000 })
    } else {
      // 定义的错误
      wx.showToast({ title: res.errMsg, icon: "none", duration: 2000 })
    }
  } else {
    wx.showToast({ title: msg, icon: "none", duration: 2000 })
  }
}
let fail = function (data, code, header) {
  console.log(data, code);
  wx.showToast({ title: data.errMsg, icon: "none", duration: 2000 })
}
let complete = function (e) {
  // wx.stopPullDownRefresh();
}
const ziru = {}
ziru.post = function (url, rqd) {
  rqd.token = config['token'];
  return new Promise((res, rej) => {
    let option = {
      url: host + url,
      data: rqd,
      method: "post",
      header: {
        'content-type': config['content-type']
      },
      success: function (data) {
        success(data, res, rej)
      },
      fail: fail,
      complete: complete
    }
    wx.request(option);
  })
}
ziru.get = function (url, rqd) {
  rqd.token = config['token'];
  return new Promise((res, rej) => {
    let option = {
      url: host + url,
      data: rqd,
      method: "get",
      header: {
        'content-type': config['content-type']
      },
      success: function (data) {
        success(data, res, rej)
      },
      fail: fail,
      complete: complete
    }
    wx.request(option);
  })
}

// 格式化日期
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  ziru: ziru,
  formatTime: formatTime
};