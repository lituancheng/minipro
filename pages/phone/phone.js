import tool from '../../utils/tool';
const {
  ziru
} = require('../../utils/tool.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  listenerPhoneInput(e) {
    this.data.phone = e.detail.value;
  },
  bindPhone: function() {
    let phone = tool.trim(this.data.phone);
    if(phone == ""){
      wx.showToast({ title: "手机号不能为空", icon: "none", duration: 1500 });
      return;
    }
    let phoneReg = /^1[34578]\d{9}$/;
    if (!tool.regTest(phone, phoneReg)) {
      wx.showToast({ title: "请输入正确的手机号", icon: "none", duration: 1500 });
      return;
    }
    let rqd = {
      phone: phone
    };
    ziru.get("/api/user/bind_phone", rqd).then(data => {
      wx.setStorageSync('phone', phone);
      wx.showToast({ title: "绑定成功", icon: "success", duration: 1000 })
      setTimeout(
        function () {
          wx.redirectTo({
            url: '/pages/user/user',
          })
        }
        , 1000)
    })
  }
})