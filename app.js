// app.js
const {
  ziru
} = require('./utils/tool.js');

App({
  onLaunch() {
    var that = this;
    wx.checkSession({
      success: function () {
        let token = wx.getStorageSync('token');
        if (token === "" || typeof token === "undefined") {
          ziru.login();
        }
      },
      fail: function () {
        ziru.login();
      }
    })
  }
});