Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  dashang(){
    wx.previewImage({
      urls: ['http://i1.bvimg.com/665124/bb51c8b74552988f.png']
    })
  },
  goBack(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})