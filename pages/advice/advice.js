const {
  ziru
} = require('../../utils/tool.js');
import tool from '../../utils/tool';
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
  goBack() {
    wx.showModal({
      title: '',
      content: '您填写的意见不会保存，确认返回吗？',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/user/user',
          })
        }
      }
    })
  },
  submit(e) {
    let advice = tool.trim(e.detail.value.advice);
    if(advice == "" || typeof advice == "undefined"){
      wx.showToast({ title: "意见不能为空", icon: "none", duration: 1500 });
      return;
    }
    wx.showModal({
      title: '',
      content: '确定已填写完毕？',
      success: function (res) {
        if (res.confirm) {
          let rqd = {
            advice: advice
          };
          ziru.post("/api/advice/add", rqd).then(data => {
            wx.showToast({ title: "感谢您的意见~", icon: "success", duration: 1000 })
            setTimeout(
              function () {
                wx.redirectTo({
                  url: '/pages/user/user',
                })
              }
              , 1000)
          })
        }
      }
    })
  }
})