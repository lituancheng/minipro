import promiseFromWXCallback from './lib/promiseFromWXCallback';
import request from './lib/request';
import resource from './lib/resource';

const login = promiseFromWXCallback(wx.login);
const getUserInfo = promiseFromWXCallback(wx.getUserInfo);
const wxRequest = promiseFromWXCallback(wx.request);
// app.js

App({
  data: {
    token: null,
  },
  onLaunch(){
     this.getLoginInfo();
  },
  //获取登陆用户信息
  getLoginInfo() {
    var code = null;
    var indexData = require("/data/config.js");
    this.globalData.shopInfo = indexData.configData;
    return login()
      .then((res) => { code = res.code; return this.getUserInfo(); })
      .then(({ userInfo }) => {
        var param = userInfo;   
        param.code = code;
        return resource.getUserInfo(param);
      }).then((promisData) => {
        let token = promisData.data.data.data;
        if (promisData.statusCode == 200) {
          wx.setStorage({
            key: "token",
            data: token
          });
          this.globalData.token = token;
          this.setData({ token: token });
        } else {
          console.log(promisData);
        }
        //return  request({path:'/config?shop_id' + this.globalData.shop_id});
      }, (promis) => {
      }, (p) => {
      });

  },
  getUserInfo() {
    return login()
      .then(() => getUserInfo())
      .then(({ userInfo }) => {
        this.globalData.userInfo = userInfo;
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(userInfo);
        }
        return userInfo;
      });
  },
  globalData: {
    userInfo: null,
    token: null
  },
});