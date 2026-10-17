import React, { useState } from 'react';
import { ModalType, OrderData } from '../types';
import { PACKAGES } from '../data/packages';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  orderData: OrderData | null;
  onApplyVoucher: (code: string) => void;
  onScrollToCheckout: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  orderData,
  onApplyVoucher,
  onScrollToCheckout,
}) => {
  // Question form in contact modal
  const [questionSent, setQuestionSent] = useState(false);
  const [questionText, setQuestionText] = useState('');

  if (!activeModal) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleApplyWelcomeGift = () => {
    onApplyVoucher('ALPS100K');
    onClose();
    onScrollToCheckout();
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setQuestionText('');
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#d0c4be]/60 shadow-2xl relative text-[#16120f] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4d4540] hover:text-[#16120f] rounded-full hover:bg-[#efeeeb] transition-colors"
          aria-label="Đóng popup"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* 1. REFUND POLICY MODAL */}
        {activeModal === 'refund' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#725b38] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>ALPS CLIENT PROTECTION PROTOCOL</span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f]">
              Chính Sách Hoàn Tiền 100% Trong 30 Ngày
            </h3>

            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-700 text-xl shrink-0 mt-0.5">auto_awesome</span>
              <p className="leading-relaxed">
                Chúng tôi hoàn toàn tự tin vào chất lượng công nghệ Thụy Sĩ. Bạn được quyền trải nghiệm sản phẩm trong 30 ngày mà không phải chịu bất kỳ rủi ro nào.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#4d4540]">
              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">check_circle</span>
                  <span>1. Điều Kiện Áp Dụng</span>
                </h4>
                <p className="leading-relaxed">
                  Áp dụng cho mọi khách hàng đặt mua sản phẩm ALPS chính hãng. Dù bạn đã sử dụng một phần lọ serum hay toàn bộ chai nhưng cảm thấy không hài lòng về độ căng bóng hoặc có bất kỳ biểu hiện kích ứng nào.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">format_list_numbered</span>
                  <span>2. Quy Trình 3 Bước Đơn Giản</span>
                </h4>
                <p className="leading-relaxed">
                  • Bước 1: Nhắn tin tới Zalo hoặc Hotline Chăm sóc Khách hàng: 0772770134.<br />
                  • Bước 2: Chuyên viên ALPS tiếp nhận thông tin và hướng dẫn đóng gói gửi trả lại lọ.<br />
                  • Bước 3: ALPS thực hiện chuyển khoản 100% số tiền vào tài khoản ngân hàng của bạn trong vòng 24 giờ làm việc.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">lock_reset</span>
                  <span>3. Cam Kết "Không Cần Lý Do Phức Tạp"</span>
                </h4>
                <p className="leading-relaxed">
                  Không thủ tục rườm rà, không giải trình phiền toái. Sự an tâm và hài lòng của khách hàng là tôn chỉ hàng đầu của ALPS Botanicals.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#16120f] text-white rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#2b2623] transition-colors"
            >
              Tôi Đã Hiểu Và An Tâm Trải Nghiệm
            </button>
          </div>
        )}

        {/* 2. DERMA & CLINICAL CERTIFICATION MODAL */}
        {activeModal === 'derma' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#725b38] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">health_and_safety</span>
              <span>SWISS DERMATOLOGICAL STANDARD</span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f]">
              Chứng Nhận Da Liễu &amp; Kiểm Định Lâm Sàng
            </h3>

            {/* 4 badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#f5f3f0] p-2.5 rounded-xl border border-[#d0c4be]/40">
                <span className="block font-headline text-lg font-bold text-emerald-700">0.0%</span>
                <span className="text-[10px] text-[#4d4540]">Chỉ Số Kích Ứng</span>
              </div>
              <div className="bg-[#f5f3f0] p-2.5 rounded-xl border border-[#d0c4be]/40">
                <span className="block font-headline text-lg font-bold text-[#725b38]">98.4%</span>
                <span className="text-[10px] text-[#4d4540]">Hài Lòng 14N</span>
              </div>
              <div className="bg-[#f5f3f0] p-2.5 rounded-xl border border-[#d0c4be]/40">
                <span className="block font-headline text-lg font-bold text-emerald-700">100%</span>
                <span className="text-[10px] text-[#4d4540]">Thuần Thực Vật</span>
              </div>
              <div className="bg-[#f5f3f0] p-2.5 rounded-xl border border-[#d0c4be]/40">
                <span className="block font-headline text-lg font-bold text-[#16120f]">ISO 22716</span>
                <span className="text-[10px] text-[#4d4540]">GMP Thụy Sĩ</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#4d4540]">
              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">verified</span>
                  <span>Viện Kiểm Nghiệm Lâm Sàng Thụy Sĩ (Zurich Derma Lab)</span>
                </h4>
                <p className="leading-relaxed">
                  Công thức độc quyền ALPS Radiance Glow Serum được nghiên cứu và kiểm định lâm sàng khắt khe theo tiêu chuẩn Dược điển Châu Âu. Kết quả cho thấy sản phẩm tương thích sinh học tối ưu, an toàn trên cả da nhạy cảm và da sau peel / laser.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">eco</span>
                  <span>Bảng Thành Phần "6 KHÔNG" Tuyệt Đối An Toàn</span>
                </h4>
                <p className="leading-relaxed">
                  • 0% Paraben &amp; chất bảo quản hóa học độc hại.<br />
                  • 0% Cồn khô (Alcohol Denat) gây khô rát hàng rào ẩm.<br />
                  • 0% Dầu khoáng (Mineral Oil) gây bít tắc lỗ chân lông.<br />
                  • 0% Hương liệu tổng hợp nhân tạo (Fragrance-free).<br />
                  • 0% Sulfate chất tẩy rửa mạnh.<br />
                  • 0% Kim loại nặng (Chì, Thủy ngân, Asen).
                </p>
              </div>

              <div className="p-3 bg-[#f5f3f0] rounded-xl border border-[#d0c4be]/40">
                <span className="block text-[11px] font-bold text-[#16120f] mb-0.5">
                  Mã Số Công Bố Chất Lượng Mỹ Phẩm Bộ Y Tế:
                </span>
                <span className="font-mono text-xs font-bold text-[#725b38]">
                  Số ĐKCB: 2025/ALPS-VNDERMA
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#16120f] text-white rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#2b2623] transition-colors"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        )}

        {/* 3. TERMS & CONDITIONS MODAL */}
        {activeModal === 'terms' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#725b38] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">gavel</span>
              <span>TRANSPARENT CLIENT TERMS</span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f]">
              Điều Khoản Mua Hàng &amp; Dịch Vụ
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#4d4540]">
              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">verified</span>
                  <span>1. Quyền Lợi Đồng Kiểm (Mở Hộp Kiểm Tra)</span>
                </h4>
                <p className="leading-relaxed">
                  Mọi đơn hàng từ ALPS Botanicals đều được đồng kiểm trước khi thanh toán. Khách hàng có quyền yêu cầu shipper mở hộp kiểm tra đầy đủ số lượng chai, tem niêm phong chống giả Thụy Sĩ nguyên vẹn trước khi nhận.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">local_shipping</span>
                  <span>2. Thời Gian Giao Nhận Toàn Quốc</span>
                </h4>
                <p className="leading-relaxed">
                  Đơn hàng nội thành TP.HCM và Hà Nội: 1-2 ngày làm việc. Các tỉnh thành khác: 2-3 ngày. ALPS hỗ trợ miễn phí 100% cước vận chuyển toàn quốc cho toàn bộ combo ưu đãi.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">support_agent</span>
                  <span>3. Trách Nhiệm Chăm Sóc Khách Hàng</span>
                </h4>
                <p className="leading-relaxed">
                  Mỗi khách hàng đều có chuyên viên dược sĩ đồng hành theo dõi tiến trình thích ứng của da qua Zalo/Hotline, hỗ trợ điều chỉnh routine bất cứ lúc nào.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#16120f] text-white rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#2b2623] transition-colors"
            >
              Tôi Đã Nắm Rõ Quyền Lợi
            </button>
          </div>
        )}

        {/* 4. PRIVACY POLICY MODAL */}
        {activeModal === 'privacy' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#725b38] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">lock</span>
              <span>PRIVACY &amp; SECURITY PROTOCOL</span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f]">
              Chính Sách Bảo Mật Thông Tin Khách Hàng
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#4d4540]">
              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">database</span>
                  <span>1. Mục Đích Thu Thập Dữ Liệu</span>
                </h4>
                <p className="leading-relaxed">
                  Thông tin họ tên, số điện thoại và địa chỉ giao hàng chỉ được sử dụng duy nhất cho mục đích xử lý vận chuyển đơn hàng, kích hoạt bảo hành 30 ngày và cung cấp dịch vụ hỗ trợ da liễu cá nhân hóa.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">no_encryption_gmailerrorred</span>
                  <span>2. Cam Kết "Không Chia Sẻ Cho Bên Thứ Ba"</span>
                </h4>
                <p className="leading-relaxed">
                  ALPS cam kết không bán, không cho thuê hoặc chuyển nhượng dữ liệu khách hàng cho bất kỳ bên thứ ba nào với mục đích quảng cáo hoặc tiếp thị làm phiền.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#16120f] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-base">enhanced_encryption</span>
                  <span>3. Tiêu Chuẩn Bảo Mật Công Nghệ Cao</span>
                </h4>
                <p className="leading-relaxed">
                  Toàn bộ thông tin được mã hóa theo tiêu chuẩn SSL 256-bit chuẩn quốc tế và tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#16120f] text-white rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#2b2623] transition-colors"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        )}

        {/* 5. CONTACT & SUPPORT MODAL */}
        {activeModal === 'contact' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#725b38] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">contact_support</span>
              <span>24/7 DEDICATED SUPPORT</span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f]">
              Trung Tâm Tư Vấn &amp; Hỗ Trợ ALPS
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#4d4540]">
              <div className="p-3.5 bg-[#f5f3f0] rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#725b38]">call</span>
                <div>
                  <span className="block font-bold text-[#16120f]">Hotline Tư Vấn Dược Sĩ:</span>
                  <a href="tel:0772770134" className="font-bold text-[#725b38] hover:underline text-sm">
                    0772770134 (Hỗ trợ 24/7)
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-[#f5f3f0] rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#725b38]">location_on</span>
                <div>
                  <span className="block font-bold text-[#16120f]">Trụ Sở Phân Phối Chính Hãng Việt Nam:</span>
                  <span>30 Trịnh Đình Thảo, Phường Hòa Thạnh, Quận Tân Phú, TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>

            {/* Quick question form */}
            <form onSubmit={handleSendQuestion} className="space-y-3 pt-2 border-t border-[#efeeeb]">
              <label className="block text-xs font-bold text-[#16120f]">
                Gửi Nhanh Câu Hỏi Về Tình Trạng Da Của Bạn:
              </label>

              <textarea
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ví dụ: Da em đang có mụn ẩn và thâm đỏ sau nặn, có dùng được serum này không ạ?"
                className="w-full p-3 rounded-xl border border-[#d0c4be] text-xs outline-none focus:border-[#725b38] resize-none"
              />

              <button
                type="submit"
                disabled={questionSent}
                className="w-full py-3 bg-[#725b38] hover:bg-[#8d7146] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
              >
                {questionSent ? (
                  <>
                    <span className="material-symbols-outlined text-base">check</span>
                    <span>Đã Gửi Thành Công! Dược sĩ sẽ liên hệ ngay.</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>Gửi Câu Hỏi Cho Dược Sĩ</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* 6. WELCOME PROMO VOUCHER MODAL */}
        {activeModal === 'welcome' && (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">featured_seasonal_and_gifts</span>
              <span>🌸 ĐẠI TIỆC 20/10 - ĐẶC QUYỀN NÀNG THƠ</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f] leading-snug">
                TẶNG VOUCHER 100K &amp; SET QUÀ 450K
              </h3>
              <p className="text-xs sm:text-sm text-[#4d4540] max-w-md mx-auto">
                Chào mừng ngày Phụ nữ Việt Nam! ALPS Botanicals Thụy Sĩ gửi tặng riêng nàng món quà đặc biệt giúp đánh thức làn da rạng rỡ.
              </p>
            </div>

            {/* Gift visual */}
            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-left flex items-center gap-4">
              <img
                src="/images/mask.png"
                alt="Quà tặng Alps"
                className="w-20 h-20 object-contain drop-shadow-md"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest bg-red-100 px-2 py-0.5 rounded-full">
                  TRỊ GIÁ 450.000đ · MIỄN PHÍ
                </span>
                <span className="block font-bold text-xs text-[#16120f]">
                  Cây Lăn Massage Thạch Anh + Mặt Nạ Hydro-Lifting
                </span>
                <span className="block text-[11px] text-[#725b38]">
                  Tự động tặng kèm khi đặt Combo 2 hoặc Combo 3 hôm nay
                </span>
              </div>
            </div>

            {/* Voucher Code Box */}
            <div className="p-4 bg-[#1f1914] text-white rounded-2xl space-y-2">
              <span className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider block">
                MÃ GIẢM GIÁ ĐỘC QUYỀN:
              </span>
              <div className="font-mono text-2xl font-extrabold tracking-widest text-[#fedeb2] bg-white/10 py-2 rounded-xl border border-amber-400/40">
                ALPS100K
              </div>
              <p className="text-[11px] text-neutral-300">
                Giảm ngay 100.000đ trực tiếp vào đơn hàng + Miễn phí giao hàng hỏa tốc
              </p>
            </div>

            <button
              type="button"
              onClick={handleApplyWelcomeGift}
              className="lux-shimmer-btn w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xl"
            >
              KÍCH HOẠT VOUCHER 100K &amp; CHỌN GÓI NGAY ↗
            </button>
          </div>
        )}

        {/* 7. ORDER SUCCESS MODAL */}
        {activeModal === 'order-success' && orderData && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#725b38] font-bold">
                XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#16120f]">
                Cảm Ơn Nàng Đã Chọn ALPS!
              </h3>
              <p className="text-xs text-[#4d4540]">
                Mã đơn hàng: <strong className="font-mono text-[#a7611f] font-bold">{orderData.orderCode}</strong>
              </p>
            </div>

            {/* Order details summary */}
            <div className="bg-[#f5f3f0] p-4 sm:p-5 rounded-2xl border border-[#d0c4be]/40 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#d0c4be]/30 pb-2">
                <span className="text-[#4d4540]">Người nhận:</span>
                <span className="font-bold text-[#16120f]">{orderData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#d0c4be]/30 pb-2">
                <span className="text-[#4d4540]">Số điện thoại:</span>
                <span className="font-mono font-bold text-[#16120f]">{orderData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-[#d0c4be]/30 pb-2">
                <span className="text-[#4d4540]">Địa chỉ giao:</span>
                <span className="font-medium text-[#16120f] text-right max-w-[65%]">{orderData.address}</span>
              </div>
              <div className="flex justify-between border-b border-[#d0c4be]/30 pb-2">
                <span className="text-[#4d4540]">Gói đã đặt:</span>
                <span className="font-bold text-[#16120f]">
                  {PACKAGES.find((p) => p.id === orderData.packageId)?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#d0c4be]/30 pb-2">
                <span className="text-[#4d4540]">Phương thức:</span>
                <span className="font-bold text-[#16120f]">
                  {orderData.paymentMethod === 'cod' ? 'Thanh toán COD khi nhận' : 'Chuyển khoản VietQR'}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-bold text-[#16120f]">TỔNG THANH TOÁN:</span>
                <span className="font-headline text-lg font-bold text-[#a7611f]">
                  {formatVND(orderData.finalPrice)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed text-left">
              <strong className="block font-bold mb-0.5">📌 Lưu ý kiểm tra hàng:</strong>
              Khi shipper giao hàng tới, nàng vui lòng mở hộp kiểm tra đầy đủ tem chống hàng giả Thụy Sĩ trước khi thanh toán. Dược sĩ ALPS sẽ liên hệ qua điện thoại để hỗ trợ nàng theo dõi routine!
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-[#16120f] hover:bg-[#2b2623] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors"
            >
              Hoàn Tất &amp; Về Trang Chủ
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
