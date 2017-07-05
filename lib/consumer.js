/**
 * Filename: g:\project\airplake\mdc-sms-alidayu-v2\lib\consumer.js
 * Path: g:\project\airplake\mdc-sms-alidayu-v2
 * Created Date: Wed Jul 05 2017
 * Author: Wy
 *
 * Copyright (c) 2017 Your Company
 */

'use strict'

const EventEmitter = require('events').EventEmitter
const Alidayu = require('./sms')

/**
 *
 *
 * @class SmsConsumer
 * @extends {EventEmitter}
 */
class AlidayuSmsConsumer extends EventEmitter {
  constructor (conf) {
    super()

    const self = this
    this.conf = conf || {}

    this.alidayu = new Alidayu(conf.clientOption, conf.smsOption)

    this.on('message', function (message, callback) {
      self.send(message, function (err, info) {
        if (err) {
          console.error(err)
          return callback(err)
        }

        console.log('Sent.', info)
        return callback()
      })
    })
  }

  /**
   *
   *
   * @param {any} message
   * @param {any} callback
   * @memberof SmsConsumer
   */
  send (message, callback) {
    this.alidayu.send(JSON.parse(message)).then((res) => {
      if (res.result.success) {
        console.log('发送成功')
        return callback(null, res)
      }
      console.log('失败', res.result)
      return callback(new Error((res || {}).errmsg || '未知错误。'))
    }).catch((err) => {
      console.error('err', err)
      return callback(err, null)
    })
  }
}

module.exports = AlidayuSmsConsumer
