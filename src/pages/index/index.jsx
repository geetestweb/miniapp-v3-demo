import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from "@tarojs/taro";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gt: null,
      challenge: null,
      verify:''
    };
  }
  componentWillMount () { }

  componentDidMount() { 
    var that = this;
    Taro.request({
      url:
        "https://www.geetest.com/demo/gt/register-slide" +
        "?t=" +
        new Date().getTime(),
      header: {
        "content-type": "application/json", // 默认值
      },
      success: function (res) {
        that.setState({
          gt: res.data.gt,
          challenge: res.data.challenge,
        });
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }
  
  captchaSuccess(result) {
    console.log("captcha-Success!", result);
  }
  openCaptcha() {
    this.setState({
      
      verify: Date.now()
    });
  }

  render () {
    let { gt = "", challenge = "",verify="" } = this.state;
    return (
      <View className='content'>
        <Text>Hello world!</Text>
        {gt ? (
          // eslint-disable-next-line react/react-in-jsx-scope
          <captcha
            gt={gt}
            verify={ verify}
            challenge={challenge}
            onsuccess={this.captchaSuccess}
            product="bind"
          ></captcha>
        ) : (
          ""
        )}
        <View className='btn' onClick={() => {this.openCaptcha() }}>打开</View>
      </View>
      
    );
  }
}
