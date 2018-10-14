import resource from '../../lib/resource';

Page({
  data: {
    order: {
      icon: 'images/order.png',
      text: '我的任务',
      tip: '',
      url: 'pages/index/index',
      has_acor: true
    },
    list: [
      {
        icon: 'images/phone.png',
        text: '我的手机号',
        tip: '',
        url: 'pages/phone/phone',
        has_acor: true
      },
      {
        icon: 'images/dashang.png',
        text: '赞赏一下',
        url: 'pages/dashang/dashang',
        has_acor: true
      },
      {
        icon: 'images/advice.png',
        text: '意见or建议',
        url: 'pages/advice/advice',
        has_acor: true
      },
      {
        icon: 'images/tel.png',
        text: '客服微信',
        tip: 'lyytc962464',
        has_acor: false
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
