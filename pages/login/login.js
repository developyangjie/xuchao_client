const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
   
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.checkSession({
        success: function () {
          wx.navigateTo({
            url: '/pages/index/index'
          })
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success: res => {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: app.globalData.ghostUrl + '/?service=User.getSessionKey',
                  data: {
                    code: res.code
                  },
                  success: function (res) {
                    var open_id = res.data.data.open_id;
                    //缓存open_id
                    wx.setStorageSync('open_id', open_id);                  
                    wx.getUserInfo({
                      success: function (res) {
                        //userInfo
                        wx.setStorageSync('userInfo', res.userInfo);
                        var userInfo = wx.getStorageSync('userInfo')
                        //发起网络请求
                        wx.request({
                          url: app.globalData.ghostUrl + '/?service=User.addUserInfo',
                          data: {
                            'open_id': open_id,
                            'avatarUrl': userInfo.avatarUrl,
                            'nickName': userInfo.nickName,
                            'country': userInfo.country,
                            'province': userInfo.province,
                            'city': userInfo.city
                          },
                          success: function (res) {
                            console.log('更新用户数据成功')
                          }
                        })

                        //授权成功后，跳转进入小程序首页
                        wx.navigateTo({
                          url: '/pages/index/index'
                        })
                      }
                    });
                  }
                })
              } else {
                console.log('登录失败！')
              }
            }
          })
        }
      })
} else {
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
  },
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
