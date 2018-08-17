
const config = require('./config')

//app.js
App({
  onLaunch: function () {

    var that = this
    var openId = wx.getStorageSync('openId');
    var userInfo = wx.getStorageSync('userInfo');
    if(!openId || !userInfo){
       wx.login({
          success:function(res_user){
             wx.showLoading({title:'加载中......'})

            wx.request({
               url:config.loginHost,
               data:{
                 code:res_user.code
               },
               method:'POST',
               header: {  
                "Content-Type": "application/x-www-form-urlencoded"  
               },
               success:function(res){
                  if(parseInt(res.data.data.code) == 100){
                    that.globalData.openId = res.data.data.open_id;
                    wx.setStorageSync('openId', res.data.data.open_id);
                    wx.hideLoading()
                    wx.redirectTo({
                      url: '/pages/login/login'
                    })
                  }else{
                    wx.hideLoading()
                    wx.showModal({
                      title: '提示',
                      content: '服务器错误，请联系管理员'
                    })
                  }
               }
            })

         }
       })
    }else{
            that.globalData.openId = openId;
            that.globalData.userInfo = userInfo
    }


  },


  globalData: {
    openId: null,
    userInfo: null,
    ghostUrl: 'http://www2.ghostapi.com'
  }
})