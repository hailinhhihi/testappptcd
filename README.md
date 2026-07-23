# Fanpage Reply Assistant (testappptcd)

Chatbot ho tro tra loi cac binh luan THAT cua khach hang tren Fanpage Facebook cua ban.

## Nguyen tac quan trong
- Chi doc va tra loi cac binh luan that, lay qua Facebook Graph API chinh thuc (webhook "feed"), khong scrape, khong tao binh luan gia.
- Moi cau tra loi tu dong deu duoc gan nhan ro rang (mac dinh la "[Tro ly ao Fanpage]") de khach hang biet day la phan hoi tu dong, dam bao minh bach.
- Ban can tu tao Facebook App va Page Access Token trong Meta for Developers (khong chia se token cho ai, khong commit token vao git).

## Cau truc thu muc
- src/config.js: doc cac bien moi truong (token, id trang, cong chay...)
- src/facebookClient.js: goi Graph API de lay binh luan va gui tra loi
- src/replyGenerator.js: sinh noi dung tra loi, tu dong them nhan minh bach
- src/commentHandler.js: xu ly 1 binh luan moi (sinh reply + goi Facebook API)
- src/webhookServer.js: server Express nhan webhook tu Facebook khi co binh luan moi
- src/index.js: diem khoi chay ung dung

## Cai dat
1. `npm install`
2. Sao chep `.env.example` thanh `.env` va tu dien:
   - PAGE_ACCESS_TOKEN: token trang cua ban (tu tao, khong chia se)
      - PAGE_ID: id fanpage
         - VERIFY_TOKEN: chuoi bat ky ban tu chon, dung de xac thuc webhook voi Facebook
            - AUTO_REPLY_LABEL: nhan hien thi truoc moi cau tra loi tu dong
            3. Trong Meta for Developers, cau hinh webhook cho App tro ve `https://<domain-cua-ban>/webhook`, subscribe field "feed".
            4. Chay `npm start`.

            ## Luu y an toan va minh bach
            - Nen co nguoi that theo doi/duyet lai cac tra loi quan trong hoac nhay cam truoc khi gui, dac biet la khieu nai/boi thuong.
            - Khong dung tool nay de tao tuong tac gia (binh luan ao, hoi thoai gia giua nhieu tai khoan). Muc dich duy nhat la ho tro cham soc khach hang that, cong khai va minh bach.
            
