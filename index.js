/**
 * Filename: /home/wei/Desktop/yedian/mdc-weixin-customer/index.js
 * Path: /home/wei/Desktop/yedian/mdc-weixin-customer
 * Created Date: Tue May 23 2017
 * Author: wei
 *
 * Copyright (c) 2017 Airplake
 */

'use strict'

const AlidayuSmsConsumer = require('./lib/consumer')

module.exports.create = function (conf) {
  return new AlidayuSmsConsumer(conf)
}
