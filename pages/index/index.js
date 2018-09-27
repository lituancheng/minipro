import resource from '../../lib/resource';
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {

  },
  navigateTo(){
    wx.navigateTo({
      url: '/pages/mission/add/mission_add',
    })
  }
})
