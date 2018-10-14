Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  dashang() {
    wx.previewImage({
      urls: ['http://i2.bvimg.com/665124/6e79f2115ab9c311.png'],
    })
  },
  goBack() {
    wx.redirectTo({
      url: '/pages/user/user',
    })
  }
})