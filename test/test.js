import test from 'ava';
import AmqpConnection from '../index'


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

let amqpConnection;
test.before(async t => {
  amqpConnection = new AmqpConnection('amqp://admin:EiTUT7uexsBO@localhost:5672', { clientOption, smsOption });
  let status = await amqpConnection.connect();
  amqpConnection.consume('test exchange', 'sms queue', 'sms', 'direct'); //consume
});


test('publish msg', async t => {
  await sleep(3000)
  let result = await amqpConnection.publish('test exchange', 'sms', JSON.stringify({
    tel: "13706207323",//电话
    code: '徐晨,你好'  //模板参数
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
