export default {
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
  }
};
