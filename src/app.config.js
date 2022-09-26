export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  plugins: {
    // 微信小程序插件配置
    // captcha: {
    //   version: '1.3.5',
    //   provider: 'wxefa63d84fe9f64a2'
    // }
    captcha: {
      version: "*",
      provider: "2021002124682563"
    }
  }
  
})
