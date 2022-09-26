"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      loadCaptcha: false,
      gt: "",
      challenge: "",
      verify: false
    };
  },
  setup() {
    function onSuccess(data) {
      console.log(data);
    }
    return {
      onSuccess
    };
  },
  onLoad() {
    common_vendor.index.request({
      method: "GET",
      data: {},
      url: "https://www.geetest.com/demo/gt/register-slide?t=" + new Date().getTime(),
      success: (res) => {
        this.gt = res.data.gt;
        this.challenge = res.data.challenge;
        this.loadCaptcha = true;
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  methods: {
    captchaReady() {
      console.log("Ready");
    },
    captchaSuccess(data) {
      console.log(data);
    },
    openCaptcha() {
      this.verify = Date.now();
    }
  }
};
if (!Array) {
  const _component_captcha = common_vendor.resolveComponent("captcha");
  _component_captcha();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: $data.loadCaptcha
  }, $data.loadCaptcha ? {
    c: $data.gt,
    d: $data.challenge,
    e: common_vendor.o($options.captchaSuccess),
    f: $data.verify
  } : {}, {
    g: common_vendor.o((...args) => $options.openCaptcha && $options.openCaptcha(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/huangjundong/Documents/work/\u5C0F\u7A0B\u5E8Fdemo/uniapp/uniapp-cli/uniapp-vue3-vite-captcha3/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
