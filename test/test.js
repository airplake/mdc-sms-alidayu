import test from 'ava';
import AmqpConnection from '../index'


const clientOption = {
  'appkey': '',
  'appsecret': '',
  'REST_URL': 'gw.api.taobao.com/router/rest'
}

const smsOption = {
  'extend': '',
  'sms_type': 'normal',
  'sms_free_sign_name': '',
  'sms_template_code': ''
}

let amqpConnection;
test.before(async t => {
  amqpConnection = new AmqpConnection('amqp://localhost');
  let status = await amqpConnection.connect();
  amqpConnection.consume({ clientOption, smsOption }, 'test exchange', 'sms queue', 'sms', 'direct'); //consume
});


test('publish msg', async t => {
  await sleep(3000)
  let result = await amqpConnection.publish('test exchange', 'sms', JSON.stringify({
    tel: "XXX",//电话
    code: 'hello world'  //模板参数
  }), 'direct');
  await sleep(3000)
  t.pass();
});

//settimeout because connet rabbitmq need some time
let sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  })
};
