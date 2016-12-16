const AmqpConnection = require('../lib/rabbitmq')


let msg = {
    "tel": "18381334402", //短信接收号码。群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码。示例：18600000000,13911111111,13322222222
    "code": '小军，你sb' //短信模板变量
}

let amqpConnection = new AmqpConnection('amqp://localhost');
amqpConnection.publish("test", '', JSON.stringify(msg), 'fanout')
