/*eslint-disable no-console*/
Page({
    data: {
        changeStatus: '',
        result: {},
        styleConfig: {
            color: '#2488FF',
            btnWidth: '120px'
        }
    },
    onLoad: function () {
        this.captchaRegister()
    },
    onReady: function () {
    },

    btnSubmit: function () {
        this.captchaValidate()
    },
    captchaRegister: function () {
        var that = this
        wx.request({
            // url: 'http://demo.gtapp.xyz/gt/register/98a460967a492ad8f4b2f8ec16b50e56435620c3bfb7cad720818a556366d115/4de561523fac0f76112ccf83784771fb?t=' + new Date().getTime(),
            url: 'https://www.geetest.com/demo/gt/register-slide' + '?t=' + new Date().getTime(),
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ loadCaptcha: true, gt: res.data.gt, challenge: res.data.challenge, offline: !res.data.success })
            },
            fail: function () {
                console.log('error')
            }
        })
    },
    captchaValidate: function () {
        var that = this
        var data = that.data.result
        if (!data || (data && !data.geetest_challenge)) {
            console.log('请先完成验证！')
            return
        }
        wx.request({
            // url: 'http://demo.gtapp.xyz/gt/validate/98a460967a492ad8f4b2f8ec16b50e56435620c3bfb7cad720818a556366d115/9c61dcfb9b296b02602639484171f7be?t=' + new Date().getTime(),
            url: 'https://www.geetest.com/demo/gt/validate-slide' + '?t=' + new Date().getTime(),

            method: 'POST',
            dataType: 'json',
            data: {
                geetest_challenge: data.geetest_challenge,
                geetest_validate: data.geetest_validate,
                geetest_seccode: data.geetest_seccode
            },
            success: function (res) {
                wx.showToast({
                    title: res.data.status
                })
            },
            fail: function () {
                console.log('error')
            }
        })
    },
    captchaSuccess: function (result) {
        console.log('captcha-Success!', result)
        this.setData({
            result: result.detail
        })
    },
    captchaReady: function () {
        console.log('captcha-Ready!')
    },
    captchaClose: function () {
        console.log('captcha-Close!')
    },
    captchaError: function (e) {
        console.log('captcha-Error!', e.detail)
        // 这里对challenge9分钟过期的机制返回做一个监控，如果服务端返回code:21,tips:not proof，则重新调用api1重置
        if (e.detail.code === 21) {
            var that = this
            // 需要先将插件销毁
            that.setData({ loadCaptcha: false })
            // 重新调用api1
            that.captchaRegister()
        }

    }
})
