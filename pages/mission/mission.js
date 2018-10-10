const {
  ziru
} = require('../../utils/tool.js');
import tool from '../../utils/tool';
import resource from '../../lib/resource';

Page({
  data: {
    sourceUrl: '',
    email: '',
    id: null
  },
  onLoad: function (options) {
    if (typeof options.missionId != "undefined"){
      var that = this;
      let rqd = {
        id: parseInt(options.missionId)
      };
      ziru.get("/api/mission/get", rqd).then(data => {
        let detail = data.data;
        that.setData({
          'sourceUrl': detail.sourceUrl,
          'email': detail.email,
          'id': detail.id
        });
      })
    }
  },
  listenerSourceUrlInput(e) {
    this.data.sourceUrl = e.detail.value;
  },
  listenerEmailInput(e) {
    this.data.email = e.detail.value;
  },
  saveMission(e) {
    let rqd = {};
    let sourceUrl = tool.trim(this.data.sourceUrl);
    let email = tool.trim(this.data.email);
    if(sourceUrl == "" || email == ""){
      wx.showToast({ title: "必填信息不能为空", icon: "none", duration: 1500 });
      return;
    }
    let emailReg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
    if (!tool.regTest(email, emailReg)){
      wx.showToast({ title: "邮箱格式不正确", icon: "none", duration: 1500 });
      return;
    }
    console.log(e.detail.formId);
    rqd.sourceUrl = sourceUrl;
    rqd.email = email;
    rqd.formId = e.detail.formId;
    wx.showLoading({
      title: '提交中',
    });
    let id = this.data.id;
    if (id == null){
      ziru.post("/api/mission/add", rqd).then(data => {
        wx.showToast({ title: "添加成功", icon: "success", duration: 1000 })
        setTimeout(
          function () {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
          , 1000)
      })
    }else{
      rqd.id = id;
      ziru.post("/api/mission/update", rqd).then(data => {
        wx.showToast({ title: "修改成功", icon: "success", duration: 1000 })
        setTimeout(
          function () {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
          , 1000)
      })
    }
  },
  deleteMission(e) {
    let id = this.data.id;
    wx.showModal({
      title: '',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          ziru.get("/api/mission/delete", {id: id}).then(data => {
            if(data.data){
              wx.showToast({ title: "删除成功", icon: "success", duration: 1000 })
              setTimeout(
                function () {
                  wx.redirectTo({
                    url: '/pages/index/index',
                  })
                }
                , 1000)
            }
          })
        }
      }.bind(this)
    })
  }
})
