Page({
  onLoad(query) {
    // 页面加载
    this.captchaRegister()
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

  captchaRegister: function () {
    var that = this
    my.request({
        url: 'https://www.geetest.com/demo/gt/register-slide?t=' + new Date().getTime(),
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            // 获取到了challenge，开始初始化插件
            // 这里对初始化的量做一个统计
            that.setData({ loadCaptcha: true, gt: res.data.gt, challenge: res.data.challenge, offline: !res.data.success })
        },
        fail: function () {
            console.log('error')
        }
    })
},
verify:function(){
  this.setData({
      verify: Date.now()
  })
},
captchaValidate: function () {
    var that = this
    var data = that.data.result
    if (!data || (data && !data.geetest_challenge)) {
        console.log('请先完成验证！')
        return
    }
    my.request({
        url: 'https://www.geetest.com/demo/gt/validate-slide?t=' + new Date().getTime(),
        method: 'POST',
        dataType: 'json',
        data: {
            geetest_challenge: data.geetest_challenge,
            geetest_validate: data.geetest_validate,
            geetest_seccode: data.geetest_seccode
        },
        success: function (res) {
            my.showToast({
                type: 'success',
                content: res.data.status
            })
        },
        fail: function () {
            console.log('error')
        }
    })
},
captchaSuccess: function (result) {
  console.log('captcha-Success!',result)
  this.setData({
      result: result
  })
  this.captchaValidate()
},
captchaReady: function () {
  // 验证码加载成功
  // 这里对成功量做一个统计
  console.log('captcha-Ready!')
},
captchaClose: function () {
  console.log('captcha-Close!')
},
captchaError: function (e) {
  console.log('captcha-Error!', e)
  // 这里对challenge9分钟过期的机制返回做一个监控，如果服务端返回code:21,tips:not proof，则重新调用api1重置
  if (e.code === 21) {
      var that = this
      // 需要先将插件销毁
      that.setData({ loadCaptcha: false })
      // 重新调用api1
      that.captchaRegister()
  }
},
});
