const {
  ziru
} = require('../../utils/tool.js');

Page({
  data: {
    list: []
  },
  onLoad: function () {
    var that = this;
    let timer = setInterval(function () {
      let token = wx.getStorageSync('token');
      if (token != "" && typeof token !== "undefined") {
        clearInterval(timer);
        that.getList();
      }
    }.bind(this), 500)
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
    ziru.get("/api/mission/list", {}).then(
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
