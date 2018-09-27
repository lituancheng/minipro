import request from '../lib/request';
import serviceData from '../data/config';
import Promise from '../lib/promiseEs6Fix';

const host = 'http://192.168.31.57:20008';
export default {
  createMission(sourceUrl, email) {
    return request({
      url: urlFor('/api/mission/add'),
      header: {
        'Content-Type': ' application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        sourceUrl: sourceUrl,
        email: email
      },
      method: 'post'
    })
  },
  getUserInfo(data){
    return request({
      url: urlFor('/wx/auth/login'),        data: {
        code: data.code,
      },
      method:'get'
      })
  },
  successToast(callback) {
    wx.showToast({
      title: '创建任务成功',
      icon: 'success',
      duartion: '80000',
      success: callback()
    });
  },
  failToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'fail',
      duartion: '80000'
    });
  },
  loadingToast() {
    wx.showToast({
      title: '设置中，请稍后',
      icon: 'loading'
    });
  },
  confirmToast(callback) {
    wx.showModal({
      title: '提示框',
      content: '确定要删除吗？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) callback();
      }
    });
  },
  //提示框
  showTips(event, msg) {
     event.setData({
      toast: {
        toastClass: 'yatoast',
        toastMessage: msg
      }
    });
    setTimeout(() => {
      event.setData({
        toast: {
          toastClass: '',
          toastMessage: ''
        }
      });
    }, 2000);
  },
  getUrl(path){
    return host + path;
  },
};
function urlFor(path) {
  return host + path;
}
