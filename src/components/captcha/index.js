// eslint-disable-next-line no-undef
Component({
  props: {
    id: '',
    gt: '',
    challenge: '',
    offline: false,
    loadCaptcha: false,
    onSuccess: () => { },
    verify:'',
  },
  didMount() {
    this.captchaRegister()
  },

  methods: {
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
    captchaSuccess(obj) {
      this.props.onSuccess({
        type: 'success',
        currentTarget: {
          id: this.props.id,
          dataset: {
            ...obj
          }
        }
      })
    },
    onError(obj) {
      this.props.onError({
        type: 'error',
        currentTarget: {
          id: this.props.id,
          dataset: {
            ...obj
          }
        }
      })
    },
    onClose(obj) {
      this.props.onClose({
        type: 'close',
        currentTarget: {
          id: this.props.id,
          dataset: {
            ...obj
          }
        }
      })
    }
  }
})