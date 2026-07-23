const config = require('./config');

// Mot vai mau tra loi don gian theo tinh huong, ban co the mo rong hoac noi voi AI that o day.
// Muc tieu: cau tra loi ngan gon, lich su, dung giong thuong hieu cua ban.
const TEMPLATES = {
    greeting: [
          'Cam on ban da quan tam den san pham/dich vu cua chung minh nhe.',
          'Chao ban, cam on ban da de lai binh luan cho fanpage.'
        ],
    question: [
          'Ban co the nhan tin rieng (inbox) de duoc ho tro chi tiet hon khong a.',
          'De duoc tu van chinh xac nhat, ban vui long de lai so dien thoai hoac inbox fanpage giup minh nhe.'
        ],
    complaint: [
          'Minh xin loi vi trai nghiem chua tot, ban vui long inbox de duoc ho tro xu ly som nhat.',
          'Cam on ban da phan hoi, fanpage se kiem tra va lien he lai voi ban qua inbox nhe.'
        ],
    default: [
          'Cam on ban da de lai binh luan, fanpage se phan hoi som nhat co the.'
        ]
  };

function detectIntent(commentText) {
    const text = (commentText || '').toLowerCase();
    if (/gia|bao nhieu|mua o dau|con hang|ship/.test(text)) return 'question';
    if (/loi|te|khong hai long|hong|cham/.test(text)) return 'complaint';
    if (/chao|hi|hello|xin chao/.test(text)) return 'greeting';
    return 'default';
  }

function pickTemplate(intent) {
    const list = TEMPLATES[intent] || TEMPLATES.default;
    return list[Math.floor(Math.random() * list.length)];
  }

// Ham chinh: sinh noi dung tra loi cho 1 binh luan that.
// Neu sau nay ban muon noi voi mot dich vu AI that (vd OpenAI, Gemini...), hay thay phan pickTemplate
// bang mot cuoc goi API that su dung config.aiApiKey, roi van giu nguyen buoc gan nhan minh bach ben duoi.
async function generateReply(commentText) {
    const intent = detectIntent(commentText);
    const body = pickTemplate(intent);
    return config.autoReplyLabel + ' ' + body;
  }

module.exports = {
    generateReply,
    detectIntent
  };
