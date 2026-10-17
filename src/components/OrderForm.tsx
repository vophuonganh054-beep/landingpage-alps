import React, { useState, useEffect } from 'react';
import { PACKAGES } from '../data/packages';
import { ModalType, OrderData } from '../types';

interface OrderFormProps {
  selectedPackageId: string;
  onSelectPackage: (pkgId: string) => void;
  onOrderSuccess: (order: OrderData) => void;
  onOpenChat: () => void;
  appliedVoucher: string;
  onApplyVoucher: (code: string) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  selectedPackageId,
  onSelectPackage,
  onOrderSuccess,
  onOpenChat,
  appliedVoucher,
  onApplyVoucher,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [voucherInput, setVoucherInput] = useState(appliedVoucher || '');
  const [voucherMessage, setVoucherMessage] = useState<string | null>(null);
  const [voucherSuccess, setVoucherSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [phoneError, setPhoneError] = useState('');

  // Sync external applied voucher
  useEffect(() => {
    if (appliedVoucher) {
      setVoucherInput(appliedVoucher);
      setVoucherSuccess(true);
      setVoucherMessage(`Đã áp dụng mã ${appliedVoucher}: Giảm 100.000đ!`);
    }
  }, [appliedVoucher]);

  const currentPackage = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherInput.trim().toUpperCase();
    if (!code) {
      setVoucherMessage('Vui lòng nhập mã giảm giá.');
      setVoucherSuccess(false);
      return;
    }

    if (['ALPS100K', 'GLOWSKIN', 'VIP2010', 'ALPS2010', 'SWISS100'].includes(code)) {
      onApplyVoucher(code);
      setVoucherSuccess(true);
      setVoucherMessage(`Áp dụng mã ${code} thành công: Giảm 100.000đ!`);
    } else {
      setVoucherSuccess(false);
      setVoucherMessage('Mã giảm giá không tồn tại hoặc đã hết hạn.');
    }
  };

  const voucherDiscount = voucherSuccess ? 100000 : 0;
  const paymentMethodDiscount = paymentMethod === 'bank' ? 20000 : 0;
  const finalPrice = Math.max(0, currentPackage.salePrice - voucherDiscount - paymentMethodDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number (Vietnam standard)
    const phoneRegex = /(?:0|\+84)[0-9\s]{9,12}/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      setPhoneError('Vui lòng nhập số điện thoại Việt Nam hợp lệ (ví dụ: 0912345678).');
      return;
    }
    setPhoneError('');

    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);
    const orderData: OrderData = {
      packageId: currentPackage.id,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim(),
      voucherCode: voucherSuccess ? voucherInput.toUpperCase() : '',
      discount: voucherDiscount + paymentMethodDiscount,
      finalPrice,
      paymentMethod,
      orderCode: `ALPS-${randomOrderNumber}`,
    };

    onOrderSuccess(orderData);
  };

  return (
    <div id="order-form" className="py-16 md:py-20 bg-[#fbf9f6] border-t border-[#d0c4be]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card wrapper */}
        <div className="bg-white rounded-3xl border-2 border-[#725b38]/40 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          
          {/* Top highlight bar */}
          <div className="text-center space-y-2 border-b border-[#efeeeb] pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#725b38] border border-amber-200/60 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-[15px]">shield</span>
              <span>ĐƠN HÀNG ĐƯỢC BẢO MẬT &amp; GIAO HỎA TỐC</span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-normal text-[#16120f]">
              Điền Thông Tin Nhận Hàng Nhanh
            </h3>

            <p className="text-xs sm:text-sm text-[#4d4540]">
              Kiểm tra tem chống giả Thụy Sĩ trước khi thanh toán. Không thích hoàn tiền 100% trong 30 ngày.
            </p>

            {/* Direct advice prompt */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#725b38]">
              <span>Cần tư vấn trực tiếp 1:1 trước khi đặt?</span>
              <button
                type="button"
                onClick={onOpenChat}
                className="font-bold underline hover:text-[#16120f] transition-colors flex items-center gap-1"
              >
                <span>Chat ngay với Dược sĩ</span>
                <span className="material-symbols-outlined text-sm">chat</span>
              </button>
            </div>
          </div>

          <form id="main-checkout-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Package Selector */}
            <div className="space-y-2">
              <label htmlFor="package-selector" className="block text-xs font-bold uppercase tracking-wider text-[#16120f]">
                1. Chọn Gói Sản Phẩm:
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => {
                  const active = pkg.id === selectedPackageId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => onSelectPackage(pkg.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        active
                          ? 'border-[#725b38] bg-[#fedeb2]/20 shadow-sm ring-1 ring-[#725b38]'
                          : 'border-[#d0c4be]/60 bg-[#fbf9f6] hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[11px] font-bold text-[#725b38]">{pkg.subtitle.split('·')[0]}</span>
                        {active && (
                          <span className="material-symbols-outlined text-base text-[#725b38]">check_circle</span>
                        )}
                      </div>
                      <span className="block font-headline text-sm font-bold text-[#16120f] leading-tight">
                        {pkg.name}
                      </span>
                      <span className="block mt-1 font-mono text-sm font-extrabold text-[#a7611f]">
                        {formatVND(pkg.salePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hidden select for fallback accessibility */}
              <select
                id="package-selector"
                value={selectedPackageId}
                onChange={(e) => onSelectPackage(e.target.value)}
                className="sr-only"
                aria-label="Chọn gói sản phẩm"
              >
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatVND(p.salePrice)}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Information Grid */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#16120f]">
                2. Thông Tin Người Nhận:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-fullname" className="block text-xs font-medium text-[#4d4540] mb-1">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Thùy Trang"
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded-xl border border-[#d0c4be]/80 focus:border-[#725b38] focus:ring-2 focus:ring-[#fedeb2] bg-white text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-medium text-[#4d4540] mb-1">
                    Số điện thoại nhận hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    placeholder="Ví dụ: 0987 654 321"
                    autoComplete="tel"
                    className="w-full px-4 py-3 rounded-xl border border-[#d0c4be]/80 focus:border-[#725b38] focus:ring-2 focus:ring-[#fedeb2] bg-white text-sm outline-none transition-all"
                  />
                  {phoneError && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{phoneError}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-medium text-[#4d4540] mb-1">
                  Địa chỉ giao hàng chi tiết <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  autoComplete="street-address"
                  className="w-full px-4 py-3 rounded-xl border border-[#d0c4be]/80 focus:border-[#725b38] focus:ring-2 focus:ring-[#fedeb2] bg-white text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="checkout-note" className="block text-xs font-medium text-[#4d4540] mb-1">
                  Ghi chú cho Dược sĩ hoặc giờ giao (không bắt buộc)
                </label>
                <textarea
                  id="checkout-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Da mình nhạy cảm đang trị thâm mụn / Giao giờ hành chính..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d0c4be]/80 focus:border-[#725b38] focus:ring-2 focus:ring-[#fedeb2] bg-white text-sm outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Voucher Code Box */}
            <div className="p-4 bg-[#f5f3f0] rounded-2xl border border-[#d0c4be]/50 space-y-2">
              <label htmlFor="checkout-voucher" className="block text-xs font-bold uppercase tracking-wider text-[#16120f]">
                3. Mã Ưu Đãi / Voucher Tri Ân 20/10:
              </label>
              
              <div className="flex gap-2">
                <input
                  id="checkout-voucher"
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  placeholder="Nhập mã voucher (Ví dụ: ALPS100K)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#d0c4be] bg-white text-sm uppercase tracking-wider outline-none focus:border-[#725b38]"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="px-4 py-2.5 bg-[#16120f] hover:bg-[#2b2623] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Áp Dụng
                </button>
              </div>

              {voucherMessage && (
                <p className={`text-xs font-medium ${voucherSuccess ? 'text-emerald-700' : 'text-red-600'}`}>
                  {voucherMessage}
                </p>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#16120f]">
                4. Phương Thức Thanh Toán:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#725b38] bg-[#fedeb2]/20 ring-1 ring-[#725b38]'
                      : 'border-[#d0c4be]/60 bg-white hover:bg-[#fbf9f6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl text-[#725b38]">local_atm</span>
                  <div>
                    <span className="block text-xs font-bold text-[#16120f]">Thanh toán khi nhận (COD)</span>
                    <span className="text-[11px] text-[#4d4540]">Mở hộp kiểm tra trước khi trả tiền</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-[#725b38] bg-[#fedeb2]/20 ring-1 ring-[#725b38]'
                      : 'border-[#d0c4be]/60 bg-white hover:bg-[#fbf9f6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl text-[#725b38]">qr_code_2</span>
                  <div>
                    <span className="block text-xs font-bold text-[#16120f]">Chuyển khoản VietQR</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Giảm thêm 20.000đ</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Real-time Order Summary */}
            <div id="order-summary" className="p-5 bg-[#fff9ef] rounded-2xl border border-[#725b38]/30 space-y-2 text-xs">
              <div className="flex justify-between text-[#4d4540]">
                <span>Gói sản phẩm ({currentPackage.name}):</span>
                <span className="font-semibold text-[#16120f]">{formatVND(currentPackage.salePrice)}</span>
              </div>

              {voucherDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Voucher tri ân ({voucherInput.toUpperCase()}):</span>
                  <span>-{formatVND(voucherDiscount)}</span>
                </div>
              )}

              {paymentMethodDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Ưu đãi chuyển khoản VietQR:</span>
                  <span>-{formatVND(paymentMethodDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#4d4540]">
                <span>Phí vận chuyển hỏa tốc:</span>
                <span className="font-semibold text-emerald-700">0đ (Miễn phí toàn quốc)</span>
              </div>

              <div className="pt-2 border-t border-[#725b38]/20 flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#16120f]">TỔNG THANH TOÁN DỰ KIẾN:</span>
                <span className="font-headline text-2xl font-bold text-[#a7611f]">
                  {formatVND(finalPrice)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                id="btn-submit-order"
                type="submit"
                className="cta-heartbeat-glow lux-shimmer-btn w-full min-h-[58px] py-4 px-6 bg-gradient-to-r from-[#16120f] via-[#2b2623] to-[#16120f] hover:from-black hover:to-neutral-900 text-white rounded-2xl text-sm sm:text-base font-bold tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>XÁC NHẬN ĐẶT HÀNG NHẬN ƯU ĐÃI</span>
                <span className="text-[#fedeb2] text-lg">↗</span>
              </button>

              <p className="text-[11px] text-center text-[#725b38] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
                <span>Bảo mật 100% · Không thích hoàn tiền trong 30 ngày · Đồng kiểm trước khi nhận</span>
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
