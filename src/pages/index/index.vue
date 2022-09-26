<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>

      <!-- #ifdef MP-ALIPAY -->
      <captcha
        id="captcha"
        v-if="loadCaptcha"
        :gt="gt"
        :challenge="challenge"
        @Success="captchaSuccess"
        @Ready="captchaReady"
        :verify="verify"
        product="bind"
      />
      <!-- #endif -->

      <!-- #ifndef MP-ALIPAY -->
      <captcha
        id="captcha"
        v-if="loadCaptcha"
        :gt="gt"
        :challenge="challenge"
        @onSuccess="captchaSuccess"
        product="bind"
        :verify="verify"
      />
      <!-- #endif -->
    </view>
    <button class="submit" @click="openCaptcha">打开</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      loadCaptcha: false,
      gt: "",
      challenge: "",
      verify: false,
    };
  },
  setup() {
    function onSuccess(data) {
      console.log(data);
    }
    return {
      onSuccess,
    };
  },
  onLoad() {
    uni.request({
      method: "GET",
      data: {},
      url:
        "https://www.geetest.com/demo/gt/register-slide?t=" +
        new Date().getTime(), //仅为示例，并非真实接口地址。
      success: (res) => {
        this.gt = res.data.gt;
        this.challenge = res.data.challenge;
        this.loadCaptcha = true;
      },
      fail: (res) => {
        console.log(res);
      },
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
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.submit {
  width: 100%;
}
</style>
