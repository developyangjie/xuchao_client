//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    uid:null
  },
  
  onLoad: function () {
  },

  onShow:function(){
      var openId = app.globalData.openId;
      var userInfo = app.globalData.userInfo;
      this.setData({
          openId:openId,
          userInfo:userInfo
      })
  }
  


  
})
