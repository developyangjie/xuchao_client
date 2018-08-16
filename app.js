//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'http://www2.ghostapi.com/?service=User.getSessionKey',
                data: {
                  code: res.code
                },
                success: function (res) {
                  var open_id = res.data.data.open_id;
                  //缓存open_id
                  wx.setStorageSync('open_id', open_id);
                  console.log('登录成功！')
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
    
  }
})







    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log('已授权')
              wx.setStorageSync('userInfo', res.userInfo);
            }
          });
        } else {
          wx.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'http://www2.ghostapi.com/?service=User.getSessionKey',
                  data: {
                    code: res.code
                  },
                  success: function (res) {
                    var open_id = res.data.data.open_id;
                    //缓存open_id
                    wx.setStorageSync('open_id', open_id);
                    console.log('登录成功！')
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          });
        }
      }
    })


  },

  



  globalData: {
    open_id: 0,
    userInfo: null,
    ghostUrl: 'http://www2.ghostapi.com'
  }
})