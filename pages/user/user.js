import resource from '../../lib/resource';

const app = getApp();

Page({
  data: {
    userInfo: {},
    order: {
      icon: 'images/order.png',
      text: '我的任务',
      tip: '',
      url: 'pages/index/index'
    },
    list: [
      {
        icon: 'images/tel.png',
        text: '客服微信',
        tip: 'lituancheng',
      }
    ]
  },
  //点击触发
  onShow(){
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  navigateTo(e){
    let url = e.currentTarget.dataset.url;
    if(typeof url === "undefined"){
      return;
    }
    wx.switchTab({
      url: "/" + url,
    })
  }
});
