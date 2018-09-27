const {
  ziru
} = require('../../../utils/tool.js');
import resource from '../../../lib/resource';
//获取应用实例
const app = getApp()

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
    ziru.post("/api/mission/add", e.detail.value).then(data => {
      if (data.code === 0) {
        wx.showToast({ title: "添加成功", icon: "success", duration: 1000 })
        setTimeout(
          function () {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
          , 1000)
      }
    })
  }
})
