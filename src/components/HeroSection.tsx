import React, { useState, useEffect } from 'react';
import { ModalType } from '../types';

interface HeroSectionProps {
  onOpenModal: (type: ModalType) => void;
  onSelectPackage: (pkgId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal, onSelectPackage }) => {
  const [viewers, setViewers] = useState(132);
  const [cartAdd, setCartAdd] = useState(26);

  const [countdown, setCountdown] = useState({
    hours: 4,
    minutes: 2,
    seconds: 24,
    ms: 31,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let ms = prev.ms - 1;
        let s = prev.seconds;
        let m = prev.minutes;
        let h = prev.hours;

        if (ms < 0) {
          ms = 99;
          s -= 1;
        }
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          h = 4;
          m = 15;
          s = 30;
        }
        return { hours: h, minutes: m, seconds: s, ms };
      });
    }, 10);

    const vInterval = setInterval(() => {
      setViewers((prev) => Math.min(158, Math.max(120, prev + Math.floor(Math.random() * 5) - 2)));
    }, 4000);

    const cInterval = setInterval(() => {
      setCartAdd((prev) => Math.min(38, Math.max(19, prev + Math.floor(Math.random() * 3) - 1)));
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(vInterval);
      clearInterval(cInterval);
    };
  }, []);

  const format2 = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      id="alps-hero"
      className="relative pt-6 md:pt-10 pb-16 overflow-hidden bg-[#fff9ef]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 85% 30%, #ffd486 0%, transparent 45%),
          radial-gradient(ellipse at 10% 80%, #ffead0 0%, transparent 55%),
          #fff9ef
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Trust, Countdown & Offers */}
          <div className="lg:col-span-7 space-y-4">
            {/* Realtime badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold shadow-xs">
                <span className="material-symbols-outlined text-[15px] text-red-600 animate-pulse">celebration</span>
                <span>🌸 CHIẾN DỊCH 20/10: TÔN VINH NÀNG THƠ RẠNG RỠ</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-emerald-600">visibility</span>
                <span><strong className="font-bold text-emerald-950">{viewers}</strong> người đang xem</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-800 border border-red-200 rounded-full text-xs font-medium shadow-xs">
                <span className="material-symbols-outlined text-[14px] text-red-600">shopping_cart_checkout</span>
                <span><strong className="font-bold text-red-900">{cartAdd}</strong> khách đang thêm giỏ</span>
              </div>
            </div>

            {/* Brand Eyebrow */}
            <p className="font-sans tracking-[0.2em] text-xs font-bold text-[#8b632d] uppercase">
              ALPS PURE ESSENCE · THE GLOW EDIT
            </p>

            {/* Editorial Headline */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-[64px] font-normal text-[#302014] tracking-tight leading-[1.08]">
              Dành cho nàng.<br />
              <em className="text-[#a7611f] italic font-normal">Rạng rỡ</em> theo<br />
              cách riêng.
            </h1>

            {/* Subtitle description */}
            <p className="text-sm sm:text-base text-[#4d4540] max-w-xl leading-relaxed">
              Bột ngọc trai hữu cơ &amp; 10% Niacinamide tinh khiết giúp dưỡng sáng bật tông, mờ thâm sạm nám sau 14 ngày, chuẩn Glass Skin Thụy Sĩ.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#uu-dai"
                className="lux-shimmer-btn inline-flex items-center justify-center gap-2 min-h-[50px] px-6 py-3.5 bg-[#16120f] hover:bg-[#2b2623] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all shadow-lg hover:shadow-xl"
              >
                <span>KHÁM PHÁ COMBO ƯU ĐÃI</span>
                <span className="text-[#fedeb2]">↗</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenModal('welcome')}
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 bg-white/90 hover:bg-white text-[#725b38] border-2 border-[#725b38]/40 hover:border-[#725b38] rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-amber-600 text-lg">featured_seasonal_and_gifts</span>
                <span>Mở quà 20/10 ✧</span>
              </button>
            </div>

            {/* CONVERSION TRIGGER BOX */}
            <div className="p-4 sm:p-5 bg-white/90 backdrop-blur-xs rounded-2xl border-2 border-[#725b38]/40 shadow-xl space-y-3.5 max-w-xl">
              <div className="bg-gradient-to-br from-neutral-950 via-[#1f1914] to-neutral-900 text-white p-3.5 rounded-xl border border-[#725b38]/60 shadow-md">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-300">
                      ⚡ FLASH SALE KẾT THÚC SAU
                    </span>
                  </div>

                  <span className="text-[10px] text-neutral-400 bg-white/10 px-2 py-0.5 rounded-full font-medium">
                    Áp dụng mã 20/10
                  </span>
                </div>

                {/* Giant Digital Countdown */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-1.5">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-amber-300 leading-none">
                      {format2(countdown.hours)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400">Giờ</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-1.5">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-amber-300 leading-none">
                      {format2(countdown.minutes)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400">Phút</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-1.5">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-amber-300 leading-none">
                      {format2(countdown.seconds)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400">Giây</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-1.5">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-red-400 leading-none">
                      {format2(countdown.ms)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-red-300/80">Tích tắc</span>
                  </div>
                </div>
              </div>

              {/* Scarcity Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#16120f] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-red-600 animate-bounce">local_fire_department</span>
                    <span>Số lượng suất quà tặng ưu đãi:</span>
                  </span>
                  <span className="text-red-700 font-extrabold bg-red-50 border border-red-200 px-2 py-0.5 rounded-full text-[11px]">
                    Chỉ còn 14 / 100 suất
                  </span>
                </div>

                {/* Progress bar with animated stripes */}
                <div className="w-full bg-[#efeeeb] h-3 rounded-full overflow-hidden border border-[#d0c4be]/40 relative">
                  <div
                    className="scarcity-bar-stripes bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: '86%' }}
                  ></div>
                </div>
              </div>

              {/* Trust Micro-Row */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#d0c4be]/40 text-center text-[10px] sm:text-[11px] text-[#4d4540]">
                <button
                  type="button"
                  onClick={() => onOpenModal('refund')}
                  className="flex items-center justify-center gap-1 hover:text-[#725b38] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-[#725b38]">verified_user</span>
                  <span>Hoàn tiền 30 ngày</span>
                </button>
                <div className="flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#725b38]">local_shipping</span>
                  <span>Freeship toàn quốc</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal('terms')}
                  className="flex items-center justify-center gap-1 hover:text-[#725b38] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-[#725b38]">package_2</span>
                  <span>Đồng kiểm khi nhận</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: High-End Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Radial Warm Glow Aura */}
            <div className="alps-halo-breath absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-gradient-to-tr from-amber-300/40 via-[#fedeb2]/60 to-orange-200/40 blur-3xl pointer-events-none -z-0"></div>

            {/* Stage Container */}
            <div className="relative w-full max-w-[380px] sm:max-w-[430px] flex flex-col items-center">
              
              {/* Product Hero Image */}
              <div className="relative group">
                <img
                  id="main-hero-img"
                  src="/images/serum.png"
                  alt="ALPS Radiance Glow Serum"
                  className="alps-product-float w-full h-auto max-h-[460px] object-contain drop-shadow-[0_20px_35px_rgba(114,91,56,0.25)] transition-transform duration-700"
                />

                {/* Floating Tag 1: Edelweiss Alps */}
                <div className="absolute -top-2 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#fedeb2] shadow-lg rounded-full py-1.5 px-3 flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs">🏔️</span>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-[#16120f] uppercase tracking-wider">Edelweiss Alps 3.000m</span>
                    <span className="text-[9px] text-[#725b38]">Chống oxy hóa 3X Vitamin C</span>
                  </div>
                </div>

                {/* Floating Tag 2: Niacinamide 10% */}
                <div className="absolute top-1/2 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#fedeb2] shadow-lg rounded-full py-1.5 px-3 flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-transform">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✨</span>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-[#16120f] uppercase tracking-wider">Niacinamide 10% Tinh Khiết</span>
                    <span className="text-[9px] text-[#725b38]">Mờ thâm sạm sau 14 ngày</span>
                  </div>
                </div>

                {/* Floating Tag 3: Triple HA */}
                <div className="absolute -bottom-3 left-4 sm:left-6 bg-white/95 backdrop-blur-md border border-[#fedeb2] shadow-lg rounded-full py-1.5 px-3 flex items-center gap-2 transform -rotate-2 hover:rotate-0 transition-transform">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs">💧</span>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-[#16120f] uppercase tracking-wider">Triple Hyaluronic Acid</span>
                    <span className="text-[9px] text-[#725b38]">Khóa ẩm đa tầng 72H</span>
                  </div>
                </div>
              </div>

              {/* Floating Gift Action Button */}
              <div className="mt-8 w-full px-2">
                <button
                  type="button"
                  onClick={() => onOpenModal('welcome')}
                  className="alps-gift-wiggle w-full py-2.5 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white rounded-xl shadow-lg border border-white/30 flex items-center justify-between text-xs font-bold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">featured_seasonal_and_gifts</span>
                    <span>Tặng Set Quà 450K &amp; Voucher 100K</span>
                  </div>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                    Nhận ngay
                  </span>
                </button>
              </div>

              {/* Swiss Origin Ribbon */}
              <div className="mt-3 flex items-center gap-2 text-[11px] text-[#725b38] font-medium">
                <span className="material-symbols-outlined text-sm text-red-600">verified</span>
                <span>Chưng cất tại Zurich, Thụy Sĩ · Chứng nhận Thuần chay Vegan Society</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
