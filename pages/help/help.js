const {
  ziru
} = require('../../utils/tool.js');
import tool from '../../utils/tool';
import promiseFromWXCallback from '../../lib/promiseFromWXCallback';
const login = promiseFromWXCallback(wx.login);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curr_speed: '低速',
    percent: 20,
    helper_list: [],
    havaHelp: false,
    missionId: 0,
    click_times: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中',
    })
    setTimeout(function(){
      wx.hideLoading()
    }, 2500)
    let missionId = options.missionId;
    if(missionId == "" || typeof missionId == "undefined"){
      wx.showToast({ title: "页面状态错误", icon: "none", duration: 1500 })
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }, 1500);
      return;
    }
    this.setData({
      missionId: parseInt(missionId)
    })
    let openid = wx.getStorageSync('openid');
    if (openid == "" || typeof openid == "undefined"){
      this.getOpenId(missionId);
    }else{
      this.getHelpInfo(missionId, openid);
    }
  },
  getHelpInfo(missionId, openid){
    let rqd = {
      missionId: parseInt(missionId),
      openid: openid
    };
    ziru.get("/api/help/get", rqd).then(data => {
      let detail = data.data;
      this.setData({
        helper_list: detail.helperInfoList,
        curr_speed: detail.currentSpeed,
        percent: detail.progressPercent,
        haveHelp: detail.haveHelp
      })
      wx.hideLoading();
    })
  },
  toHelp(){
    let click_times = this.data.click_times;
    if (click_times == 0) {
      this.setData({
        click_times: click_times + 1
      })
      wx.showToast({ title: "感谢您的助力", icon: "success", duration: 1500 })
      let missionId = this.data.missionId;
      let rqd = {
        missionId: missionId,
        packageNum: this.randomNum(2, 9),
        openid: wx.getStorageSync('openid')
      };
      ziru.post("/api/help/add", rqd).then(data => {
        let detail = data.data;
        this.setData({
          helper_list: detail.helperInfoList,
          curr_speed: detail.currentSpeed,
          percent: detail.progressPercent,
          haveHelp: detail.haveHelp
        })
      })
    }
  },
  iWantIt(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  getOpenId(missionId){
    let that = this;
    login()
      .then((res) => { return res.code; })
      .then((code) => {
        return code;
      }).then((code) => {
        ziru.get("/wx/auth/get_openid", { "code": code }).then((res) => {
          let openid = res.data.data;
          wx.setStorageSync('openid', openid);
          that.getHelpInfo(missionId, openid);
        })
      }, (promis) => {
      }, (p) => {
      });
  },
  randomNum(min, max){
    var Range = max - min;
    var Rand = Math.random();
    var num = min + Math.round(Rand * Range);
    return num;
  },
  onShareAppMessage: function () {
    let missionId = this.data.missionId;
    let path = '/pages/help/help?missionId=' + missionId + '';
    return {
      title: '我正在监控自如房源，求助力',
      imageUrl: '/images/help_cover.png',
      path: path
    }
  }
})