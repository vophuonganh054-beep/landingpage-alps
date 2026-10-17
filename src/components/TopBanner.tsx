import React, { useState, useEffect } from 'react';

export const TopBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 2,
    seconds: 24,
    ms: 31,
  });

  const [viewers, setViewers] = useState(132);
  const [cartCount, setCartCount] = useState(26);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 118 ? 124 : next > 156 ? 142 : next;
      });
    }, 4500);

    const cartInterval = setInterval(() => {
      setCartCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next < 21 ? 25 : next > 39 ? 32 : next;
      });
    }, 7000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerInterval);
      clearInterval(cartInterval);
    };
  }, []);

  const formatNumber = (num: number, digits = 2) => String(num).padStart(digits, '0');

  return (
    <div className="bg-[#1f1914] text-white text-xs border-b border-[#725b38]/30 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-3 overflow-x-auto py-0.5 no-scrollbar text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-[#fedeb2] whitespace-nowrap">
            <span className="material-symbols-outlined text-sm text-red-400 animate-pulse">celebration</span>
            <span>ƯU ĐÃI NÀNG THƠ: GIẢM ĐẾN 40% &amp; TẶNG VOUCHER 100K</span>
          </span>

          <span className="hidden md:inline-block text-white/30">|</span>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-neutral-300 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span><strong className="text-white font-bold">{viewers}</strong> người đang xem</span>
          </span>

          <span className="hidden lg:inline-flex items-center gap-1.5 text-neutral-300 whitespace-nowrap">
            <span className="material-symbols-outlined text-[13px] text-red-400">shopping_cart_checkout</span>
            <span><strong className="text-white font-bold">{cartCount}</strong> khách đang chốt đơn</span>
          </span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2 shrink-0 text-[11px] sm:text-xs">
          <span className="text-amber-300/90 font-medium hidden xs:inline">Kết thúc sau:</span>
          <div className="flex items-center gap-1 font-mono font-bold text-amber-200 bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
            <span>{formatNumber(timeLeft.hours)}</span>
            <span className="text-amber-400 animate-pulse">:</span>
            <span>{formatNumber(timeLeft.minutes)}</span>
            <span className="text-amber-400 animate-pulse">:</span>
            <span>{formatNumber(timeLeft.seconds)}</span>
            <span className="text-amber-400 opacity-60">.</span>
            <span className="text-[10px] text-amber-300/80 w-4 inline-block">{formatNumber(timeLeft.ms)}</span>
          </div>

          <a
            href="#uu-dai"
            className="hidden sm:inline-flex items-center gap-1 bg-[#725b38] hover:bg-[#8d7146] text-[#fedeb2] px-2.5 py-0.5 rounded-full font-semibold transition-colors text-[11px]"
          >
            <span>Nhận quà</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
