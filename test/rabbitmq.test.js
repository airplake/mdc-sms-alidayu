import test from 'ava';
import Alidayu from '../lib/sms';
import AmqpConnection from '../lib/rabbitmq'


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
test.before(t => {
  // this runs before all tests
//  alidayu = new Alidayu(clientOption, smsOption);
  amqpConnection = new AmqpConnection('amqp://localhost', {clientOption, smsOption});

});


test('amqpConnection connect ok', async t => {
  let res = await amqpConnection.connect();
  t.pass();
});
