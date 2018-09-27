import promiseFromWXCallback from './lib/promiseFromWXCallback';
import request from './lib/request';
import resource from './lib/resource';

const {
  ziru
} = require('./utils/tool.js');
const login = promiseFromWXCallback(wx.login);
const wxRequest = promiseFromWXCallback(wx.request);
// app.js

App({
  data: {
    
  },
  onLaunch() {
    this.getLoginInfo();
  },
  //获取登陆用户信息
  getLoginInfo() {
    let that = this;
    var code = null;
    return login()
      .then((res) => { 
        code = res.code;
        ziru.get("/wx/auth/login", {code: code}).then(data => {
          if (data.data.code === 0) {
            let token = data.data.data;
            wx.setStorage({
              key: "token",
              data: token
            });
          }  
        })
        })
  }
});