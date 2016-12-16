class Alidayu {

    constructor(clientOption, smsOption) {
        this.Client = require( './sdk/topClient' ).TopClient;
        this.clientOption = clientOption;
        this.smsOption = smsOption;
        this.client = new this.Client(clientOption);
    }

    send(tel, options) {
        let opt = {};

        if(typeof tel === 'object'){
            options = tel;
            tel = options.tel;
        }
        if(!tel){
            return console.log('需要一个手机号码')
        }
        if(options.tel) delete options.del;
        opt = Object.assign(opt, options);
        this.smsOption.rec_num = tel;

        this.smsOption.sms_param = JSON.stringify(opt);

        return new Promise((res, rej) => {
            this.client.execute('alibaba.aliqin.fc.sms.num.send', this.smsOption, function(error, response) {
                 error ? rej(error) : res(response)
            });
        })
    }
}

module.exports = Alidayu;
