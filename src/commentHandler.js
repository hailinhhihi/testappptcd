const facebookClient = require('./facebookClient');
const { generateReply } = require('./replyGenerator');

// Xu ly 1 su kien binh luan that nhan duoc tu webhook Facebook.
// commentEvent co dang: { commentId, message, from, postId }
async function handleNewComment(commentEvent) {
  const { commentId, message, from } = commentEvent;

  if (!commentId || !message) {
    console.warn('[commentHandler] Bo qua su kien khong hop le', commentEvent);
    return null;
  }

  console.log('[commentHandler] Binh luan moi tu ' + (from && from.name ? from.name : 'khach') + ': ' + message);

  const replyText = await generateReply(message);

  // Luon co the tat auto reply va chi log ra de nhan vien tu duyet truoc khi gui,
  // bang cach doi bien moi truong AUTO_SEND=false (mac dinh true de demo).
  const autoSend = process.env.AUTO_SEND !== 'false';

  if (!autoSend) {
    console.log('[commentHandler] (Che do nhap) Goi y tra loi: ' + replyText);
    return { sent: false, suggested: replyText };
}

  const result = await facebookClient.replyToComment(commentId, replyText);
  console.log('[commentHandler] Da gui tra loi tu dong, id: ' + result.id);
  return { sent: true, reply: replyText, result };
}

module.exports = {
  handleNewComment
};
