import resource from '../../lib/resource';

Page({
  data: {
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
  },
  navigateTo(e){
    let url = e.currentTarget.dataset.url;
    if(typeof url === "undefined"){
      return;
    }
    wx.redirectTo({
      url: "/" + url,
    })
  }
});
