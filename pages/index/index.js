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
  

// bindGetUserInfo: function (e) {
//     if (e.detail.userInfo) {
//       //用户按了允许授权按钮
//       var that = this;
//       //插入登录的用户的相关信息到数据库
//       wx.request({
//         url: getApp().globalData.urlPath + 'hstc_interface/insert_user',
//         data: {
//           openid: getApp().globalData.openid,
//           nickName: e.detail.userInfo.nickName,
//           avatarUrl: e.detail.userInfo.avatarUrl,
//           province: e.detail.userInfo.province,
//           city: e.detail.userInfo.city
//         },
//         header: {
//           'content-type': 'application/json'
//         },
//         success: function (res) {
//           //从数据库获取用户信息
//           that.queryUsreInfo();
//           console.log("插入小程序登录用户信息成功！");
//         }
//       });
//       //授权成功后，跳转进入小程序首页
//       wx.switchTab({
//         url: ''
//       })
//     } else {
//       //用户按了拒绝按钮
//       wx.showModal({
//         title: '警告',
//         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//         showCancel: false,
//         confirmText: '返回授权',
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击了“返回授权”')
//           }
//         }
//       })
//     }
//   },


  
})
