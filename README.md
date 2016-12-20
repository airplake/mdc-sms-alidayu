# mdc-sms-alidayu
![](https://img.shields.io/badge/node-%3E%3Dv6.9.2-blue.svg)
![](https://img.shields.io/badge/test-2%2F2-green.svg)  
## introduction   
集成了[Rabbitmq](https://github.com/squaremo/amqp.node)和alidayu,使用者仅需传入mq和alidayu配置,
调用该包的publish和consume方法,即可实现:发送队列消息;消费队列消息并且发送短信,无需关心如何监听mq服务以及发送短信的过程。

## install

    npm install amqpsms --save


## Quick Start
```javascript
    //consume
    const AmqpConnection = require('mdc-sms-alidayu')

    const clientOption = {
      'appkey': '',//阿里大于appkey
      'appsecret': '',//阿里大于appsecret
      'REST_URL': 'gw.api.taobao.com/router/rest'
    }

    const smsOption = {
      'extend': '',//String    可选 公共回传参数，在“消息返回”中会透传回该参数；举例：用户可以传入自己下级的会员ID，在消息返回时，该会员ID会包含在内，用户可以根据该会员ID识别是哪位会员使用了你的应用
      'sms_type': 'normal',//短信类型，传入值请填写normal
      'sms_free_sign_name': '',//短信签名
      'sms_template_code': ''//短信模板ID
    }



    let amqpConnection = new AmqpConnection('amqp://localhost');
    amqpConnection.consume({ clientOption, smsOption },'test exchange', 'sms queue', 'sms', 'direct'); //consume


    //publish
    const AmqpConnection = require('amqpsms')


    let amqpConnection = new AmqpConnection('amqp://localhost');
    amqpConnection.publish('test exchange', 'sms', JSON.stringify({
      tel: "XXXX",//短信接收号码
      code: 'hello world'  //短信模板变量
    }), 'direct');
```
## API

1. publish(exchange, routingKey, msg, type, option)

 * exchange mq的exchange name
 * routingKey 路由key
 * msg 发送消息(应配合alidayu的短信模版发送消息)
 * type exchange类别:  

      *       fanout:把所有发送到该Exchange的消息路由到所有与它绑定的Queue中。
      *       direct:把消息路由到那些binding key与routing key完全匹配的Queue中。
      *       topic: topic类型的Exchange在匹配规则上进行了扩展，它与direct类型的Exchage相似，也是将消息路由到binding key与routing key相匹配的Queue中，但这里的匹配规则有些不同，它约定：
              *   routing key为一个句点号"."分隔的字符串（我们将被句点号"."分隔开的每一段独立的字符串称为一个单词），如"stock.usd.nyse"、"nyse.vmw"、"quick.orange.rabbit"
              *   binding key与routing key一样也是句点号". "分隔的字符串
              *  binding key中可以存在两种特殊字符" * "和"#"，用于做模糊匹配，其中前面一个用于匹配一个单词，"#"用于匹配多个单词（可以是零个）
      *       headers:headers类型的Exchange不依赖于routing key与binding key的匹配规则来路由消息，而是根据发送的消息内容中的headers属性进行匹配。
 *  option

2. consume(exchange, queue, bindingkey, type, option)  


* exchange mq的exchange name
* queue 队列
* bindingkey 队列绑定的key
* type exchange类别:同publish
* option


# Running test

    npm install --global ava
    将test.js中的配置改为自己的配置
    npm test


>更多参考

>[Rabbitmq-study](https://github.com/shadow88sky/Rabbitmq-study)  
>[rabbitmq](http://www.rabbitmq.com)  
>[amqp](https://github.com/squaremo/amqp.node)  
>[阿里大于API详情](https://api.alidayu.com/doc2/apiDetail.htm?spm=a3142.8062534.3.1.bNEw4j&apiId=25450)
