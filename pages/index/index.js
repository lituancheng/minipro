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
    country: '',
    home_msg: null
  },
  onLoad: function () {
    this.getList();
    this.getHomeMsg();
    let phone = wx.getStorageSync('phone');
    if(phone == "" || typeof phone == "undefined"){
      this.getPhone();
    }
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
  },
  getPhone() {
    ziru.get("/api/user/get_phone", {}).then(
      data => {
        let phone = data.data;
        if(phone != null){
          wx.setStorageSync('phone', phone);
        }
      }
    )
  },
  getHomeMsg() {
    let that = this;
    ziru.get("/home_page_message/get", {}).then(
      data => {
        let homeMsg = data.data;
        console.log(homeMsg);
        if (homeMsg != null) {
          that.setData({
            home_msg: homeMsg
          })
        }
      }
    )
  },
  copyZfbCode(){
    wx.setClipboardData({
      data: this.data.home_msg.iMsg,
      success: function (res) {
        wx.showToast({ title: "复制成功", icon: "success", duration: 1000 });
      }
    })
  },
  onShareAppMessage(){
  }
})
