const {
  ziru
} = require('../../utils/tool.js');

Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.getList();
  },
  onShow: function () {

  },
  navigateTo() {
    if (this.data.list.length > 0) {
      wx.showToast({ title: "因服务器资源有限,现阶段每人只能添加一个监控任务", icon: "none", duration: 1500 });
      return;
    }
    wx.navigateTo({
      url: '/pages/mission/add/mission_add',
    })
  },
  getList() {
    var that = this;
    ziru.get("/api/mission/list", {'token': wx.getStorageSync('token')}).then(
      data => {
        that.setData(
          { 'list': data.data }
        );
      }
    )
  },
  onPullDownRefresh: function () {
    this.getList();
    wx.stopPullDownRefresh();
  }
})
