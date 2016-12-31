const soap = require('soap');
const crypto = require('crypto');
const request = require('request');
const parseString = require('xml2js').parseString;
const iconv = require('iconv-lite');

//md5加密方法
function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

class SDK {

    constructor(config) {
        this.sn = config.sn;
        this.pwd = config.pwd;
    }

    sendBySingle(mobile, content) {
        let self = this;
        content = encodeURIComponent(content);
        return new Promise((resolve, reject) => {
            let pwd = md5(self.sn + self.pwd).toString().toUpperCase();
            let url = `http://sdk.entinfo.cn:8061/webservice.asmx/mdsmssend?sn=${self.sn}&pwd=${pwd}&mobile=${mobile}&content=${content}&ext=&stime=&rrid=&msgfmt=`;
            request(url, function (error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    parseString(body, (err, result) => {
                        if (err) return reject(err);
                        if (parseInt(result.string._) < 0) {
                            console.log(result.string._);
                            reject();
                        } else {
                            resolve();
                        }
                    })
                }
            })
        })
    }
}
module.exports = SDK;
