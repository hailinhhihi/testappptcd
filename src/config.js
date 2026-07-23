require('dotenv').config();

function required(name, value) {
    if (!value) {
    console.warn('[config] Thieu bien moi truong ' + name + '. Vui long dien trong file .env');
    }
  return value;
}

const config = {
    pageAccessToken: required('PAGE_ACCESS_TOKEN', process.env.PAGE_ACCESS_TOKEN),
        pageId: required('PAGE_ID', process.env.PAGE_ID),
        verifyToken: required('VERIFY_TOKEN', process.env.VERIFY_TOKEN),
        port: process.env.PORT || 3000,
        aiApiKey: process.env.AI_API_KEY || '',
        autoReplyLabel: process.env.AUTO_REPLY_LABEL || '[Tro ly ao Fanpage]',
        graphApiVersion: 'v19.0'
      };

module.exports = config;
