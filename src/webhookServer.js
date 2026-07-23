const express = require('express');
const config = require('./config');
const { handleNewComment } = require('./commentHandler');

const app = express();
app.use(express.json());

// Buoc 1: Facebook goi GET de xac thuc webhook luc ban dang ky trong Meta for Developers
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === config.verifyToken) {
            console.log('[webhook] Xac thuc thanh cong');
                res.status(200).send(challenge);
                  } else {
                      res.sendStatus(403);
                        }
                        });

                        // Buoc 2: Facebook goi POST moi khi co su kien moi tren trang (vd co binh luan moi)
                        app.post('/webhook', async (req, res) => {
                          try {
                              const body = req.body;

                                  if (body.object === 'page') {
                                        for (const entry of body.entry || []) {
                                                for (const change of entry.changes || []) {
                                                          if (change.field === 'feed' && change.value && change.value.item === 'comment') {
                                                                      const value = change.value;

                                                                                  // Chi xu ly binh luan moi that su, bo qua binh luan bi xoa/sua de tranh spam tra loi
                                                                                              if (value.verb !== 'add') continue;

                                                                                                          await handleNewComment({
                                                                                                                        commentId: value.comment_id,
                                                                                                                                      message: value.message,
                                                                                                                                                    from: value.from,
                                                                                                                                                                  postId: value.post_id
                                                                                                                                                                              });
                                                                                                                                                                                        }
                                                                                                                                                                                                }
                                                                                                                                                                                                      }
                                                                                                                                                                                                            res.status(200).send('EVENT_RECEIVED');
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                      res.sendStatus(404);
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                console.error('[webhook] Loi xu ly su kien', err);
                                                                                                                                                                                                                                    res.sendStatus(500);
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                      module.exports = app;
                                                                                                                                                                                                                                      
