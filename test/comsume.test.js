const AmqpConnection = require('../lib/rabbitmq')

const clientOption = {
    'appkey': '23569268',
    'appsecret': '57ddd04eebae351ec4afee97c8d75ac4',
    'REST_URL': 'gw.api.taobao.com/router/rest'
}

const smsOption = {
    'extend': '',
    'sms_type': 'normal',
    'sms_free_sign_name': '夜点',
    'sms_param': '',
    'rec_num': '',
    'sms_template_code': 'SMS_34335476'
}

let amqpConnection = new AmqpConnection('amqp://localhost',{
    clientOption,
    smsOption
});

amqpConnection.consume("test", 'task', 'test' , 'fanout')
