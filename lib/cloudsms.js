const moment = require('moment');
const request = require('request');
class CloudSms {
    constructor(config, option) {
        this.sid = config.sid;
        this.token = config.token;
        this.phonenumber = option.phonenumber;
        this.templateId = option.templateId;
    }

    initSinger(sid, stoken, timestr) {
        var pwd = sid + stoken + timestr;
        var result = md5(pwd);
        return result.toLocaleUpperCase();
    }

    initToken(sid, timestr) {
        var pwd = sid + ":" + timestr;
        var result = base64(pwd);
        return result;
    }

    base64(data) {
        var Buffer = require("buffer").Buffer;
        var buf = new Buffer(data);
        var str = buf.toString("base64");
        return str;
    }

    md5(data) {
        var Buffer = require("buffer").Buffer;
        var buf = new Buffer(data);
        var str = buf.toString("binary");
        var crypto = require("crypto");
        return crypto.createHash("md5").update(str).digest("hex");
    }

    sendSms(content) {
        let self = this;
        return new Promise((resolve, reject) => {
            let timestr = moment().format("YYYYMMDDHHmmss");
            let sid = self.sid;
            let stoken = self.token;
            let dataparam = {
                to: self.phonenumber,
                appId: sid,
                templateId: self.templateId,
                datas: content
            }
            let params = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": 'application/json;charset=utf-8',
                    "Content-Length": dataparam.length,
                    "Authorization": initToken(sid, timestr)
                },
                url: `https://app.cloopen.com:8883/2013-12-26/Accounts/${sid}/SMS/TemplateSMS?sig=` + initSinger(sid, stoken, timestr),
                method: 'POST',
                json: true,
                body: dataparam
            };
            request(params, function (error, response, body) {
                if (error) {
                    reject(error);
                } else if (response.statusCode == 200 && body.statusCode == '000000') {
                    resolve();
                } else {
                    reject(response.body.statusMsg);
                }
            });
        })
    }
}
module.exports = CloudSms;