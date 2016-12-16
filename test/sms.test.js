import test from 'ava';
import Alidayu from '../lib/sms';

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

let alidayu;
test.before(t => {
  // this runs before all tests
  alidayu = new Alidayu(clientOption, smsOption);

});




test('sms should ok', async t => {
  const res = await alidayu.send({
    tel: "13162991611",//电话
    code: 'sb'  //模板参数
  })

  t.true(res.result.success, true);


});
