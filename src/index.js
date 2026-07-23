const config = require('./config');
const app = require('./webhookServer');

app.listen(config.port, () => {
  console.log('Fanpage Reply Assistant dang chay tren cong ' + config.port);
    console.log('Webhook endpoint: /webhook');
      console.log('Nhan: day la bot ho tro tra loi tu dong, moi phan hoi deu gan nhan "' + config.autoReplyLabel + '" de dam bao minh bach voi khach hang.');
      });
      
