# mdc-sms-alidayu

Message Distributing Center (MDC) 专用微信模板消息适配器。

## 安装

```console
$ npm install --save mdc-sms-alidayu
```
or
```console
$ yarn add  mdc-sms-alidayu
```

## 使用

### 配置

在 MDC 配置文件中做好配置，如：

```javascript
{
  ...,
  "pubsub": {
    ...,
    "consumerAdapters": [{
      queueName: 'sms-alidayu',
      require: 'mdc-sms-alidayu',
      clientOption :{
      'appkey': '',//阿里大于appkey
      'appsecret': '',//阿里大于appsecret
      },
      smsOption :{
      'extend': '',//String     可选 公共回传参数，在“消息返回”中会透传回该参数；举例：用户可以传入自己下级的会员ID，在消息返回时，该会员ID会包含在内，用户可以根据该会员ID识别是哪位会员使用了你的应用
      'sms_type': '', //短信类型，传入值请填写normal
      'sms_free_sign_name': '',  //短信签名
      'sms_template_code': ''  //短信模板ID
      }
    }]
  }
}
```



### 消息格式

在生产者端生产消息的时候，注意使用这样的消息格式：

`发送消息`
```js
    {
      "tel": "XXXX",//短信接收号码
      "code": "hello world"  //短信模板变量
    }
```




### 贡献者 Contributors
老魏 @503945930
