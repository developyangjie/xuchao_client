const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
   
  },
  onShow:function(){
     var userInfo = wx.getStorageSync('userInfo');
     if(userInfo){
        wx.navigateTo({
          url: '/pages/index/index'
        })
     }
  },
  bindGetUserInfo: function (e) {
               
                    wx.getUserInfo({
                      success: function (res) {
                        //userInfo
                        app.globalData.userInfo = res.userInfo;
                        wx.setStorageSync('userInfo', res.userInfo);

                        //授权成功后，跳转进入小程序首页
                        wx.navigateTo({
                          url: '/pages/index/index'
                        })
                      },
                      fail:function(){
                            //用户按了拒绝按钮
                          wx.showModal({
                            title: '警告',
                            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                            showCancel: false,
                            confirmText: '返回授权',
                            success: function (res) {
                              if (res.confirm) {
                                console.log('用户点击了“返回授权”')
                              }
                            }
                          })
                        
                      }
                    });
                  }
          
  //获取用户信息接口
  // queryUsreInfo: function () {
  //   wx.request({
  //     url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
  //     data: {
  //       openid: getApp().globalData.openid
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data);
  //       getApp().globalData.userInfo = res.data;
  //     }
  //   }) 
  // },

})
