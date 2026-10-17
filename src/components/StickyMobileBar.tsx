import React, { useState, useEffect } from 'react';
import { PACKAGES } from '../data/packages';

interface StickyMobileBarProps {
  selectedPackageId: string;
  onScrollToCheckout: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  selectedPackageId,
  onScrollToCheckout,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#16120f]/95 backdrop-blur-md text-white border-t border-[#725b38]/40 px-4 py-2.5 shadow-2xl transition-all">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-xs text-red-400">local_fire_department</span>
            <span className="truncate">{currentPkg.subtitle.split('·')[0]}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-base font-bold text-white">
              {formatVND(currentPkg.salePrice)}
            </span>
            <span className="text-[10px] text-neutral-400 line-through">
              {formatVND(currentPkg.originalPrice)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onScrollToCheckout}
          className="lux-shimmer-btn bg-gradient-to-r from-[#725b38] to-[#a7611f] hover:from-[#8d7146] hover:to-[#bd7329] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <span>ĐẶT HÀNG NGAY</span>
          <span className="text-amber-200">↗</span>
        </button>
      </div>
    </div>
  );
};
