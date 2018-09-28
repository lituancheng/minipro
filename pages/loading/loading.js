const {
  ziru
} = require('../../utils/tool.js');
import promiseFromWXCallback from '../../lib/promiseFromWXCallback';
const login = promiseFromWXCallback(wx.login);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    if (token == "" || typeof token == "undefined") {
      this.toLogin();
    }else{
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },

  toLogin: function () {
    login()
      .then((res) => { return res.code; })
      .then((code) => {
        return code;
      }).then((code) => {
        ziru.get("/wx/auth/login", { "code": code }).then((res) => {
          let token = res.data.data;
          wx.setStorageSync('token', token);
          wx.redirectTo({
            url: '/pages/index/index',
          })
        })
      }, (promis) => {
      }, (p) => {
      });
  }
})