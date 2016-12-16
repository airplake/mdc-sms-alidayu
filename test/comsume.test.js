const AmqpConnection = require('../lib/rabbitmq')

const clientOption = {
    'appkey': '23569268',//appkey
    'appsecret': '57ddd04eebae351ec4afee97c8d75ac4',//appsecret
    'REST_URL': 'gw.api.taobao.com/router/rest'
}

const smsOption = {
    'extend': '', //可选
    'sms_type': 'normal', //短信类型，传入值请填写normal
    'sms_free_sign_name': '夜点',//短信签名
    'sms_template_code': 'SMS_34335476'//短信模板ID
}

let amqpConnection = new AmqpConnection('amqp://localhost',{
    clientOption,
    smsOption
});

amqpConnection.consume("test", 'task', 'test' , 'fanout')
