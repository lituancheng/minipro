const {
  ziru
} = require('../../../utils/tool.js');
import resource from '../../../lib/resource';

Page({
  data: {
    sourceUrl: '',
    email: ''
  },
  onLoad: function () {
  },
  listenerSourceUrlInput(e) {
    this.data.sourceUrl = e.detail.value;
  },
  listenerEmailInput(e) {
    this.data.email = e.detail.value;
  },
  add_mission(e) {
    wx.showLoading({
      title: '提交中',
    });
    let rqd = e.detail.value;
    rqd.token = wx.getStorageSync('token');
    ziru.post("/api/mission/add", rqd).then(data => {
      wx.showToast({ title: "添加成功", icon: "success", duration: 1000 })
      setTimeout(
        function () {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
        , 1000)
    })
  }
})
