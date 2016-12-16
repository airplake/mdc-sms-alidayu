/**
 * 初始化rabbitmq
 * author: colin.xu
 * 2016.11.8
 */

const amqp = require('amqplib');

//define class
class AmqpConnection {
  constructor(connStr,sms) {
    this.connStr = connStr; //connection str
    this.clientOption = sms.clientOption
    this.smsOption = sms.smsOption
    this.sendOption = sms.sendOption
  }

  connect() {
    let self = this;
    return new Promise((resolve, reject) => {
      if (self.conn) return resolve(self.conn);
      amqp.connect(self.connStr).then((conn) => {
        console.log('连接rabbitmq成功');
        //If your program runs until interrupted, you can hook into the process signal handling to close the connection:
        process.once('SIGINT', conn.close.bind(conn));
        self.conn = conn;
        //监听连接关闭事件
        conn.on('close', () => {
          console.log('rabbimq连接关闭');
        })
        //监听连接错误事件
        conn.on('error', (err) => {
          console.error(`rabbimq连接出错:`, err);
        })
        //监听连接阻塞事件
        conn.on('blocked', (reason) => {
          console.error(`连接阻塞，原因:${reason}`);
        })
        //监听阻塞连接恢复正常事件
        conn.on('unblocked', () => {
          console.log('阻塞连接恢复正常');
        })
        resolve(conn);
      }).catch((err) => {
        console.error(`连接rabbitmq失败，`, err);
        reject(err);
      })
    })
  }

  createChannel() {
    let self = this;
    return new Promise((resolve, reject) => {
      //if (self.ch) return resolve(self.ch);
      self.connect()
        .then(() => {
          return self.conn.createChannel();
        })
        .then((ch) => {
          self.ch = ch;
          ch.on('close', () => {
            //console.log('channel关闭');
          })
          ch.on('error', (err) => {
            console.error(`channel出错:`, err);
          })
          ch.on('return', (msg) => {
            console.log(`channel return:${msg}`);
          })
          ch.on('drain', () => {
            console.error('drain event fired.');
          })
          resolve(ch);
        })
        .catch((err) => {
          console.error(`创建channel失败，`, err);
          reject(err);
        })
    })
  }

  /**
   * @param exchange
   * @param routingKey
   * @param msg 发送消息
   * @param type exchange类别:
   *       fanout:把所有发送到该Exchange的消息路由到所有与它绑定的Queue中。
   *       direct:把消息路由到那些binding key与routing key完全匹配的Queue中。
   *       topic: topic类型的Exchange在匹配规则上进行了扩展，它与direct类型的Exchage相似，也是将消息路由到binding key与routing key相匹配的Queue中，但这里的匹配规则有些不同，它约定：
   *              routing key为一个句点号“. ”分隔的字符串（我们将被句点号“. ”分隔开的每一段独立的字符串称为一个单词），如“stock.usd.nyse”、“nyse.vmw”、“quick.orange.rabbit”
   *              binding key与routing key一样也是句点号“. ”分隔的字符串
   *              binding key中可以存在两种特殊字符“*”和"#"，用于做模糊匹配，其中前面一个用于匹配一个单词，“#”用于匹配多个单词（可以是零个）
   *       headers:headers类型的Exchange不依赖于routing key与binding key的匹配规则来路由消息，而是根据发送的消息内容中的headers属性进行匹配。
   * @param option
   */
  publish(exchange, routingKey, msg, type, option) {
    if (!option) option = { durable: false };
    let ch;
    this.createChannel()
      .then((channel) => {
        ch = channel;
        return ch.assertExchange(exchange, type, option);
      })
      .then(() => {
        ch.publish(exchange, routingKey, new Buffer(msg));
        return ch.close();
      })
      .catch((err) => {
        console.error(`rabbitmq插入消息失败，`, err);
      })
  }

  consume(exchange, queue, bindingkey, type, option) {
    if (!option) option = { durable: false };
    let ch;
    this.createChannel()
      .then((channel) => {
        ch = channel;
        return ch.assertExchange(exchange, type, option);
      })
      .then(() => {
        //定义queue
        return ch.assertQueue(queue);
      })
      .then((ok) => {
        let q = ok.queue;
        ch.bindQueue(q, exchange, bindingkey);
        ch.consume(q, (msg) => {
          doWork(msg.content.toString());
        }, { noAck: true })
      })
  }
}

function doWork(msg) {
  //todo something...
  //console.log(msg)
  let alidayu = new Alidayu(this.clientOption, this.smsOption);
  Alidayu.send(this.sendOption)
}

module.exports = AmqpConnection;
