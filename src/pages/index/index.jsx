import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { getCurrentInstance } from '@tarojs/taro'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount () { }

  componentDidMount() { 

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
  })
  }

  render () {
    return (
      <View className='content'>
        <Text id='a'>Hello world!</Text>
       
        <captcha onSuccess={this.captchaSuccess} id='captcha' verify={this.state.verify}></captcha>
 
        <View className='btn' onClick={() => {this.openCaptcha() }}>打开</View>
      </View>
      
    );
  }
}
