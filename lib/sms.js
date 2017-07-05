
/**
 *
 *
 * @class Alidayu
 */
class Alidayu {
  constructor (clientOption, smsOption) {
    this.Client = require('./sdk/topClient').TopClient
    this.clientOption = clientOption
    this.smsOption = smsOption
    this.client = new this.Client(clientOption)
  }

  send (tel, options) {
    let opt = {}

    if (typeof tel === 'object') {
      options = tel
      tel = options.tel
    }
    if (!tel) {
      return new Error(` phone number error`)
    }
    if (options.tel) delete options.del
    opt = Object.assign(opt, options)
    this.smsOption.rec_num = tel

    this.smsOption.sms_param = JSON.stringify(opt)

    return new Promise((resolve, reject) => {
      this.client.execute('alibaba.aliqin.fc.sms.num.send', this.smsOption, function (error, response) {
        error ? reject(error) : resolve(response)
      })
    })
  }
}

module.exports = Alidayu
