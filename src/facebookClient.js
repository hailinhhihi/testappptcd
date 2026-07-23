const axios = require('axios');
const config = require('./config');

const BASE_URL = 'https://graph.facebook.com/' + config.graphApiVersion;

// Lay danh sach binh luan cua 1 bai viet (chi de tham khao/quet dinh ky neu can)
async function getPostComments(postId) {
  const url = BASE_URL + '/' + postId + '/comments';
    const res = await axios.get(url, {
        params: {
              access_token: config.pageAccessToken,
                    fields: 'id,message,from,created_time'
                        }
                          });
                            return res.data.data;
                            }

                            // Gui tra loi cho 1 binh luan that, dung API chinh thuc cua Facebook
                            async function replyToComment(commentId, message) {
                              const url = BASE_URL + '/' + commentId + '/comments';
                                const res = await axios.post(url, null, {
                                    params: {
                                          access_token: config.pageAccessToken,
                                                message: message
                                                    }
                                                      });
                                                        return res.data;
                                                        }

                                                        module.exports = {
                                                          getPostComments,
                                                            replyToComment
                                                            };
                                                            
