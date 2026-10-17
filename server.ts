import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google Gemini AI if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI();
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Comprehensive Knowledge Base synchronized directly with https://alps.id.vn/
const ALPS_SYSTEM_INSTRUCTION = `Bạn là Dược Sĩ & Chuyên Viên Da Liễu Cao Cấp của thương hiệu Alps Skincare • Pure Essence (Thương hiệu Dược mỹ phẩm thuần chay tế bào gốc sông băng Thụy Sĩ chưng cất tại Zurich - Website chính thức: https://alps.id.vn/).
Phong cách tư vấn: Ấm áp, tận tâm, chuyên nghiệp chuẩn chuyên gia da liễu Thụy Sĩ. Xưng hô "mình" hoặc "ALPS" và gọi khách là "bạn" hoặc "nàng". Trả lời mạch lạc, súc tích, giải thích khoa học dễ hiểu bằng tiếng Việt.

HỆ THỐNG THÔNG TIN ĐỒNG BỘ CHUẨN XÁC TỪ ALPS.ID.VN:

1. THÀNH PHẦN - SẢN PHẨM LÀM TỪ GÌ:
- Hoa Tuyết Nhung Thụy Sĩ (Swiss Edelweiss - Leontopodium Alpinum): Được canh tác hữu cơ trên độ cao 3.000m tại thung lũng tuyết Valais Thụy Sĩ. Chứa Leontopodic Acid tinh khiết có khả năng chống oxy hóa mạnh gấp 3 lần Vitamin C, bảo vệ tế bào da khỏi tia cực tím và stress oxy hóa.
- Tế bào gốc sông băng & Nước khoáng băng tan Zermatt: Nguồn nước tinh khiết giàu khoáng chất vi lượng (Magie, Kẽm, Canxi) dưới chân đỉnh Matterhorn huyền thoại giúp làm dịu và phục hồi tế bào da tổn thương.
- Bột ngọc trai hữu cơ Akoya: Tán mịn nano vi điểm, ức chế vận chuyển melanin, kích thích bắt sáng tự nhiên tạo hiệu ứng "Glass Skin" căng bóng trong veo chuẩn Thụy Sĩ.
- Niacinamide tinh khiết 10% (Vitamin B3 Dược điển Châu Âu): Độ tinh khiết 99.8% không lẫn acid nicotinic, thu nhỏ lỗ chân lông, kiềm dầu, làm mờ vết thâm mụn, đốm nâu và sạm nám sau 14 ngày.
- Phức hợp Tremella Mushroom (Nấm tuyết hữu cơ) & Triple Hyaluronic Acid (HA 5 tầng phân tử): Thẩm thấu đa tầng từ biểu bì đến hạ bì, khóa ẩm ngậm nước liên tục 72 giờ.
- Ceramide NP sinh học & Bơ hạt mỡ (trong kem dưỡng): Phục hồi màng bảo vệ lipid, chữa lành da mỏng đỏ, da treatment hoặc peel/laser.
- Tiêu chuẩn an toàn "6 KHÔNG": 0% Cồn khô, 0% Paraben, 0% Dầu khoáng, 0% Hương liệu nhân tạo, 0% Sulfate, 0% Chì/Thủy ngân/Corticoid. Chỉ số kích ứng lâm sàng đạt 0.0% (an toàn cho mọi loại da, mẹ bầu và phụ nữ sau sinh).

2. NGUỒN GỐC XUẤT XỨ & CHỨNG NHẬN:
- Nghiên cứu và điều chế bởi Viện Nghiên Cứu Dược Mỹ Phẩm Tế Bào Gốc Sông Băng tại Zurich, Thụy Sĩ (Swiss Glacial Stem Cell Research Lab, Zurich).
- Chứng nhận Thuần chay 100% quốc tế (The Vegan Society).
- Tiêu chuẩn sản xuất phòng sạch mỹ phẩm quốc tế ISO 22716 (GMP Thụy Sĩ).
- Nhập khẩu chính ngạch, có tem niêm phong chống hàng giả và số tiếp nhận đăng ký công bố của Cục Quản Lý Dược - Bộ Y Tế Việt Nam: Số ĐKCB: 2025/ALPS-VNDERMA.
- Trụ sở phân phối chính hãng tại Việt Nam: 30 Trịnh Đình Thảo, Phường Hòa Thạnh, Quận Tân Phú, TP. Hồ Chí Minh. Hotline dược sĩ 24/7: 0772 770 134.

3. HƯỚNG DẪN CÁCH SỬ DỤNG (ROUTINE CHUẨN Y KHOA THỤY SĨ):
- Routine Buổi Sáng:
  + Bước 1: Rửa mặt bằng sữa rửa mặt dịu nhẹ (pH 5.5).
  + Bước 2: Nước hoa hồng cân bằng (Balancing Toner) trong vòng 60 giây khi da còn ẩm.
  + Bước 3: Tinh chất Alps Radiance Glow Serum (lấy 1 ống bóp dropper khoảng 3-4 giọt chấm 5 điểm, vỗ nhẹ dồn dập trong 15 giây để kích hoạt tế bào gốc sông băng thẩm thấu).
  + Bước 4: Khóa ẩm bằng Kem dưỡng Alps Face Cream (dùng thìa bạc lấy 1 hạt ngô, thoa đều và áp nhẹ lòng bàn tay ấm).
  + Bước 5: Thoa kem chống nắng bảo vệ da ban ngày.
- Routine Buổi Tối:
  + Tẩy trang -> Rửa mặt -> Toner -> Đắp Mặt nạ Hydro-Lifting Alps (2-3 lần/tuần trong 15-20 phút, vỗ dưỡng chất không cần rửa lại) -> Serum Glow (3-4 giọt) -> Kem dưỡng Face Cream khóa ẩm qua đêm.
- Mẹo chuyên gia: Luôn kết hợp Serum và Kem dưỡng để màng Ceramide khóa chặt tế bào gốc tuyết nhung trong lớp biểu bì suốt đêm, tăng gấp đôi tốc độ mờ thâm nám.

4. CÁC GÓI ƯU ĐÃI & QUYỀN LỢI ĐẶC QUYỀN:
- Gói 1 (Trải Nghiệm): 1 Chai Serum 30ml = 390.000₫ (Giá gốc 600.000₫, tiết kiệm 210.000₫).
- Gói 2 (Best-Seller - Khuyên Dùng): 1 Serum + 1 Kem dưỡng Face Cream = 720.000₫ (Giá gốc 1.250.000₫, tiết kiệm 530.000₫) + TẶNG 1 Mặt nạ Hydro-Lifting Alps trị giá 350.000₫ + Freeship toàn quốc.
- Gói 3 (Spa Tại Nhà Toàn Diện): 1 Serum + 1 Kem dưỡng + 1 Toner = 990.000₫ (Giá gốc 1.850.000₫, tiết kiệm 860.000₫) + TẶNG 2 Mặt nạ Alps 700.000₫ + Cây lăn massage thạch anh hồng + Freeship hỏa tốc.
- Mã giảm giá tri ân: Nhập mã ALPS100K giảm thêm 100.000₫ trực tiếp.
- Thanh toán VietQR: Giảm thêm 20.000₫.
- Tặng thìa bạc vô trùng đi kèm mỗi hũ kem dưỡng.
- Chính sách cam kết 100%: Được mở hộp kiểm tra hàng và tem chống giả trước khi nhận (Đồng kiểm). Trong 30 ngày trải nghiệm nếu không hài lòng hoặc kích ứng, ALPS hoàn lại 100% tiền qua tài khoản ngân hàng trong 24 giờ mà không cần lý do phức tạp.`;

// Serve public static assets (tailwind.js, fonts.css, fonts/*, chat.js, interactions.js)
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// API endpoint for AI assistant chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ.' });
    }

    const lastMsg = messages[messages.length - 1];
    const userPrompt = String(lastMsg?.text || '').trim();

    if (!userPrompt) {
      return res.status(400).json({ error: 'Tin nhắn không được để trống.' });
    }

    const isValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 20 && !apiKey.includes(' '));
    if (aiClient && isValidKey) {
      try {
        const contents = messages.map((m: { role: string; text: string }) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

        // Timeout after 5 seconds to ensure instantaneous responses
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI response timeout')), 5000)
        );

        const aiPromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: ALPS_SYSTEM_INSTRUCTION,
            temperature: 0.65,
            maxOutputTokens: 1200,
          },
        });

        const response: any = await Promise.race([aiPromise, timeoutPromise]);
        const replyText = response?.text || '';
        if (replyText) {
          return res.json({ text: replyText });
        }
      } catch (aiErr) {
        console.warn('Gemini API call skipped or timed out, using synchronized knowledge base:', aiErr);
      }
    }

    // Intelligent domain fallback synchronized with https://alps.id.vn/
    const lower = userPrompt.toLowerCase();
    let fallbackText = '';

    // 1. Question about ingredients / What products are made from
    if (
      lower.includes('làm từ gì') ||
      lower.includes('thành phần') ||
      lower.includes('nguyên liệu') ||
      lower.includes('chất gì') ||
      lower.includes('thảo dược') ||
      lower.includes('chứa gì')
    ) {
      fallbackText = `ALPS Botanicals được chiết xuất từ các dược liệu quý hiếm của vùng núi cao Thụy Sĩ:\n\n` +
        `🌸 Hoa Tuyết Nhung Alps (Leontopodium Alpinum): Sinh trưởng ở độ cao 3.000m thung lũng tuyết Valais, chống oxy hóa mạnh gấp 3 lần Vitamin C, bảo vệ tế bào da khỏi tia cực tím.\n` +
        `💧 Nước sông băng Zermatt & Tế bào gốc thực vật: Chắt lọc từ nguồn nước tan sông băng Matterhorn giàu vi khoáng tự nhiên giúp phục hồi và làm dịu da tức thì.\n` +
        `✨ 10% Niacinamide tinh khiết & Bột ngọc trai hữu cơ Akoya: Thu nhỏ lỗ chân lông, làm mờ đốm thâm nám sau 14 ngày và tạo hiệu ứng Glass Skin trong suốt.\n` +
        `🍄 Nấm tuyết Tremella & Triple Hyaluronic Acid: Cấp nước đa tầng, khóa ẩm ngậm nước liên tục suốt 72 giờ.\n` +
        `🛡️ Phức hợp Ceramide NP sinh học: Củng cố hàng rào lipid bảo vệ da mỏng yếu.\n\n` +
        `Đặc biệt, ALPS cam kết công thức "6 KHÔNG" chuẩn Dược điển Châu Âu: Không cồn khô, không Paraben, không dầu khoáng, không hương liệu tổng hợp, không Sulfate và không chất kích ứng nàng hoàn toàn yên tâm nhé!`;
    }
    // 2. Question about Origin / Source
    else if (
      lower.includes('nguồn gốc') ||
      lower.includes('xuất xứ') ||
      lower.includes('ở đâu') ||
      lower.includes('sản xuất tại') ||
      lower.includes('thụy sĩ') ||
      lower.includes('zurich') ||
      lower.includes('chính hãng')
    ) {
      fallbackText = `Về nguồn gốc xuất xứ của ALPS:\n\n` +
        `🇨🇭 Nghiên cứu & Chưng cất: Sản phẩm được nghiên cứu, kiểm định lâm sàng và điều chế bởi Viện Nghiên Cứu Dược Mỹ Phẩm Tế Bào Gốc Sông Băng tại Zurich, Thụy Sĩ (Swiss Glacial Stem Cell Research Lab).\n` +
        `🏔️ Nguồn nguyên liệu: Hoa tuyết nhung hữu cơ từ thung lũng tuyết Valais (>3.000m) và nước băng tuyết Zermatt dưới chân đỉnh núi Matterhorn huyền thoại.\n` +
        `🏆 Chứng nhận quốc tế: Đạt chứng nhận 100% Thuần Chay (The Vegan Society) và chuẩn phòng sạch sản xuất mỹ phẩm ISO 22716 (GMP Thụy Sĩ).\n` +
        `📜 Pháp lý Việt Nam: Nhập khẩu chính ngạch, có tem chống hàng giả và số công bố chất lượng của Bộ Y Tế: Số ĐKCB: 2025/ALPS-VNDERMA.\n` +
        `📍 Trụ sở phân phối chính hãng tại Việt Nam: 30 Trịnh Đình Thảo, P. Hòa Thạnh, Q. Tân Phú, TP.HCM (Hotline Dược sĩ: 0772 770 134).`;
    }
    // 3. Question about Usage / Routine / How to use
    else if (
      lower.includes('cách dùng') ||
      lower.includes('cách sử dụng') ||
      lower.includes('routine') ||
      lower.includes('thứ tự') ||
      lower.includes('trước hay sau') ||
      lower.includes('hướng dẫn sử dụng') ||
      lower.includes('dùng sao')
    ) {
      fallbackText = `Quy trình chăm sóc da chuẩn Y khoa Thụy Sĩ từ ALPS nàng áp dụng như sau nhé:\n\n` +
        `☀️ Buổi Sáng:\n` +
        `1. Sữa rửa mặt dịu nhẹ pH 5.5.\n` +
        `2. Nước cân bằng Toner (thoa trong 60 giây sau rửa mặt khi da còn ẩm).\n` +
        `3. Tinh chất Alps Radiance Glow Serum: Lấy 3 - 4 giọt (1 ống dropper), chấm đều 5 điểm và vỗ nhẹ dồn dập 15 giây để kích hoạt tế bào gốc sông băng thẩm thấu.\n` +
        `4. Kem dưỡng Alps Face Cream: Lấy 1 hạt ngô bằng thìa bạc, thoa đều và áp nhẹ 2 lòng bàn tay ấm để khóa ẩm.\n` +
        `5. Kem chống nắng bảo vệ ban ngày.\n\n` +
        `🌙 Buổi Tối:\n` +
        `Tẩy trang → Rửa mặt → Toner → (Đắp Mặt nạ Hydro-Lifting 15-20 phút, 2-3 lần/tuần) → Serum Glow → Kem dưỡng Face Cream khóa ẩm qua đêm.\n\n` +
        `💡 Mẹo chuyên gia: Luôn thoa kem dưỡng sau serum để màng Ceramide khóa chặt tinh chất tuyết nhung trong biểu bì suốt đêm nàng nha!`;
    }
    // 4. Question about Promotions / Discounts / Combos / Prices
    else if (
      lower.includes('ưu đãi') ||
      lower.includes('khuyến mãi') ||
      lower.includes('giá') ||
      lower.includes('combo') ||
      lower.includes('bao nhiêu') ||
      lower.includes('voucher') ||
      lower.includes('quà tặng') ||
      lower.includes('gói')
    ) {
      fallbackText = `Hiện tại ALPS đang có chương trình Flash Sale ưu đãi đặc quyền với các gói combo tiết kiệm lớn:\n\n` +
        `✨ 1. Gói Trải Nghiệm (1 Chai Serum 30ml):\n` +
        `• Giá ưu đãi: 390.000₫ (Giá gốc: 600.000₫ - Tiết kiệm 210.000₫)\n\n` +
        `🌸 2. Combo Best-Seller (1 Serum 30ml + 1 Kem dưỡng Face Cream 50g):\n` +
        `• Giá ưu đãi: 720.000₫ (Giá gốc: 1.250.000₫ - Tiết kiệm 530.000₫)\n` +
        `• Quà tặng: TẶNG 1 Hộp Mặt nạ Hydro-Lifting Alps (350.000₫) + Freeship toàn quốc\n\n` +
        `💎 3. Combo Toàn Diện Spa At Home (Serum + Kem dưỡng + Toner):\n` +
        `• Giá ưu đãi: 990.000₫ (Giá gốc: 1.850.000₫ - Tiết kiệm 860.000₫)\n` +
        `• Quà tặng: TẶNG 2 Hộp Mặt nạ Alps (700.000₫) + Cây lăn massage thạch anh hồng + Freeship hỏa tốc\n\n` +
        `🎁 Đặc quyền thêm: Nhập mã ALPS100K giảm tiếp 100.000₫, chuyển khoản VietQR giảm thêm 20.000₫. Nàng được kiểm tra tem chống giả trước khi thanh toán và hoàn tiền 100% trong 30 ngày nhé!`;
    }
    // 5. Question about sensitive skin / irritation
    else if (
      lower.includes('nhạy cảm') ||
      lower.includes('kích ứng') ||
      lower.includes('mụn') ||
      lower.includes('treatment') ||
      lower.includes('bầu') ||
      lower.includes('sau sinh')
    ) {
      fallbackText = `Sản phẩm ALPS cực kỳ an toàn và được điều chế chuyên biệt cho da nhạy cảm:\n\n` +
        `• Chỉ số kích ứng lâm sàng tại Viện Da Liễu Zurich là 0.0%.\n` +
        `• Chiết xuất hoa tuyết nhung Alps và nước băng tan giúp làm dịu mẩn đỏ, giảm châm chích 43% chỉ sau 3 ngày.\n` +
        `• Bảng thành phần 100% thuần thực vật, không cồn, không paraben, không hương liệu nhân tạo.\n` +
        `• Hoàn toàn lành tính cho da sau nặn mụn, da đang treatment (BHA/Retinol), da mỏng đỏ và phụ nữ mang thai / sau sinh.\n\n` +
        `Đặc biệt ALPS có bảo hành 30 ngày: Nếu da không hợp hay có bất kỳ kích ứng nào, nàng được hoàn tiền 100% ngay nhé!`;
    }
    // 6. Question about Return policy / Money-back
    else if (
      lower.includes('hoàn tiền') ||
      lower.includes('đổi trả') ||
      lower.includes('bảo hành') ||
      lower.includes('cam kết')
    ) {
      fallbackText = `ALPS áp dụng chính sách Bảo Hộ Khách Hàng 30 Ngày:\n\n` +
        `1. Quyền lợi Đồng kiểm: Khi nhận hàng, bạn được mở hộp kiểm tra đầy đủ tem chống hàng giả Thụy Sĩ trước khi thanh toán cho shipper.\n` +
        `2. Trải nghiệm 30 ngày không rủi ro: Trong 30 ngày sử dụng, nếu bạn cảm thấy chưa hài lòng hoặc da không hợp, ALPS cam kết hoàn lại 100% số tiền qua tài khoản ngân hàng trong 24 giờ.\n` +
        `3. Không cần lý do phức tạp: Bạn chỉ cần liên hệ Hotline/Zalo 0772 770 134, đội ngũ chuyên viên sẽ hỗ trợ chuyển tiền ngay!`;
    }
    // General fallback
    else {
      fallbackText = `Chào nàng! Cảm ơn nàng đã nhắn tin cho ALPS Botanicals Thụy Sĩ.\n\nVề câu hỏi của nàng: "${userPrompt}", các sản phẩm của ALPS với chiết xuất Hoa Tuyết Nhung Alps, tế bào gốc sông băng Zermatt và 10% Niacinamide tinh khiết được thiết kế để phục hồi da nhạy cảm, mờ thâm nám và tái sinh làn da căng bóng chuẩn Glass Skin.\n\nNàng đang quan tâm đến thành phần, nguồn gốc xuất xứ, cách sử dụng routine hay các gói ưu đãi combo để mình hỗ trợ chi tiết nhất nhé!`;
    }

    return res.json({ text: fallbackText });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: error.message || 'Có lỗi xảy ra khi xử lý tin nhắn.' });
  }
});

// Setup Vite in Dev or Static files in Prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} [${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });
}

startServer();
