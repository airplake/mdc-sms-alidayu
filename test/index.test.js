'use strict'

require('should')

const conf = require('./_conf')
// const mocha = require('mocha')
const AlidayuSmsConsumer = require('../')

describe('WechatConsumer', function () {
  it('should send', function (done) {
    const consumer = AlidayuSmsConsumer.create(conf.options)
    consumer.emit('message', conf.params, function () {
      done()
    })
  })
})
