const AmqpConnection = require('../lib/rabbitmq')


let msg = {
    "tel": "18381334402", //电话
    "code": '小军，你sb' //模板参数
}

let amqpConnection = new AmqpConnection('amqp://localhost');
amqpConnection.publish("test", '', JSON.stringify(msg), 'fanout')
