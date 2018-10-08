const {
  ziru
} = require('../../utils/tool.js');

Page({
  data: {
    list: [],
    nick_name: '',
    gender: '',
    province: '',
    city: '',
    country: ''
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
      url: '/pages/mission/mission',
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
  },
  showDetail(e) {
    let missionId = e.currentTarget.dataset.missionid;
    wx.navigateTo({
      url: "/pages/mission/mission" + "?missionId=" + missionId
    })
  }
})
