import resource from '../../lib/resource';
//获取应用实例
const app = getApp()

Page({
  data: {
    sourceUrl: '',
    receiveEmail: ''
  },
  onLoad: function () {
  },
  listenerSourceUrlInput(e) {
    this.data.sourceUrl = e.detail.value;
  },
  listenerReceiveEmailInput(e) {
    this.data.receiveEmail = e.detail.value;
  },
  submitBtn(){
    resource.createMission(this.data.sourceUrl, this.data.receiveEmail).then(
      (res) => {
        let data = res.data;
        if(data.code === 0){
          console.log(data);
          resource.successToast(() =>         {
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 1000);
          })
        }else{
          resource.failToast(data.errMsg);
        }
      }
    );
  }
})
