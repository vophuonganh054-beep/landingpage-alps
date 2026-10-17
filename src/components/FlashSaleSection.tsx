import React, { useState, useEffect } from 'react';
import { PACKAGES } from '../data/packages';
import { PackageOption } from '../types';

interface FlashSaleSectionProps {
  selectedPackageId: string;
  onSelectPackage: (pkgId: string) => void;
  onScrollToCheckout: () => void;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  selectedPackageId,
  onSelectPackage,
  onScrollToCheckout,
}) => {
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

    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => String(n).padStart(2, '0');

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleChoose = (pkg: PackageOption) => {
    onSelectPackage(pkg.id);
    onScrollToCheckout();
  };

  return (
    <section id="uu-dai" className="py-16 md:py-24 bg-[#f5f3f0] border-t border-[#d0c4be]/30 relative overflow-hidden">
      
      {/* Soft decorative floaters */}
      <div className="absolute top-10 left-5 w-48 h-48 bg-amber-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="material-symbols-outlined text-[15px] animate-pulse">local_fire_department</span>
            <span>FLASH SALE GIỚI HẠN · CHỈ CÒN DUY NHẤT HÔM NAY</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-[#16120f] tracking-tight">
            Chọn Gói Chăm Sóc Da Hoàn Hảo Của Bạn
          </h2>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#4d4540]">
            <span>Ưu đãi giá tốt nhất tháng sắp đóng lại trong:</span>
            <span className="font-mono font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded">
              {format2(countdown.hours)}:{format2(countdown.minutes)}:{format2(countdown.seconds)}:{format2(countdown.ms)}
            </span>
          </div>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-white border-2 border-[#725b38] shadow-2xl scale-[1.02] lg:-translate-y-2'
                    : 'bg-white/80 hover:bg-white border border-[#d0c4be]/50 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Popular / Best value badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#725b38] to-[#98602d] text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-300">star</span>
                    <span>COMBO BÁN CHẠY NHẤT · TIẾT KIỆM 530K</span>
                  </div>
                )}

                {pkg.id === '3' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">diamond</span>
                    <span>SPA TRỌN GÓI · TIẾT KIỆM 860K</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Card Header & Image */}
                  <div className="text-center space-y-2 pt-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#725b38] uppercase">
                      {pkg.subtitle}
                    </span>
                    <h3 className="font-headline text-xl sm:text-2xl text-[#16120f] font-normal leading-snug">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Product visual preview */}
                  <div className="h-44 flex items-center justify-center p-2 bg-[#fbf9f6] rounded-2xl relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="alps-product-float max-h-36 w-auto object-contain drop-shadow-md"
                    />
                    {pkg.saveAmount > 0 && (
                      <span className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                        -{Math.round((pkg.saveAmount / pkg.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Pricing block */}
                  <div className="text-center py-2 border-y border-[#efeeeb] space-y-1">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="font-headline text-3xl sm:text-4xl font-bold text-[#16120f]">
                        {formatVND(pkg.salePrice)}
                      </span>
                      <span className="text-xs text-[#4d4540] line-through">
                        {formatVND(pkg.originalPrice)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">
                      Tiết kiệm ngay {formatVND(pkg.saveAmount)}
                    </p>
                  </div>

                  {/* Included Items */}
                  <div className="space-y-2 text-xs text-[#16120f]">
                    <span className="block text-[11px] font-bold text-[#725b38] uppercase tracking-wider">
                      Sản phẩm bao gồm:
                    </span>
                    {pkg.items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-sm text-emerald-600 shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="leading-tight">{it}</span>
                      </div>
                    ))}
                  </div>

                  {/* Free Gifts */}
                  {pkg.gifts.length > 0 && (
                    <div className="p-3 bg-red-50/70 border border-red-200/60 rounded-xl space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-red-800 text-[11px] uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm text-red-600">redeem</span>
                        <span>Quà tặng đặc quyền hôm nay:</span>
                      </div>
                      {pkg.gifts.map((g, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-red-900 font-medium">
                          <span className="text-red-500 font-bold">✧</span>
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Choose button */}
                <div className="pt-6 mt-4">
                  <button
                    type="button"
                    onClick={() => handleChoose(pkg)}
                    className={`w-full py-3.5 px-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#725b38] text-white ring-2 ring-offset-2 ring-[#725b38]'
                        : pkg.popular
                        ? 'lux-shimmer-btn bg-[#16120f] hover:bg-[#2b2623] text-white'
                        : 'bg-[#efeeeb] hover:bg-[#16120f] hover:text-white text-[#16120f]'
                    }`}
                  >
                    <span>{isSelected ? '✓ ĐÃ CHỌN GÓI NÀY' : 'CHỌN GÓI NÀY'}</span>
                    <span className="text-amber-300">↗</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scarcity Bar below packages */}
        <div className="max-w-2xl mx-auto bg-white p-4 sm:p-5 rounded-2xl border border-[#d0c4be]/40 shadow-sm text-center space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#16120f]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-red-600 text-sm">local_fire_department</span>
              <span>Số lượng quà tặng 20/10 còn lại:</span>
            </span>
            <span className="text-red-700">Chỉ còn 14 suất</span>
          </div>

          <div className="w-full bg-[#efeeeb] h-2.5 rounded-full overflow-hidden relative">
            <div
              className="scarcity-bar-stripes bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-full rounded-full"
              style={{ width: '86%' }}
            ></div>
          </div>

          <p className="text-[11px] text-[#4d4540]">
            ⚡ Sau khi hết 100 suất, giá sẽ tự động quay về giá niêm yết ban đầu.
          </p>
        </div>

      </div>
    </section>
  );
};
