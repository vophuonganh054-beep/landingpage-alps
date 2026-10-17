import React from 'react';
import { ModalType } from '../types';

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#efeeeb] py-12 md:py-16 border-t border-[#d0c4be]/40 text-[#4d4540]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="ALPS Pure Essence Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div>
              <span className="block font-headline text-lg font-bold text-[#16120f] leading-none">
                ALPS BOTANICALS
              </span>
              <span className="text-[11px] text-[#725b38] font-semibold">
                Dược Mỹ Phẩm Thuần Chay Thụy Sĩ · Zurich Lab
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onOpenModal('refund')}
              className="hover:text-[#16120f] transition-colors"
            >
              Cam Kết Hoàn Tiền 100%
            </button>
            <span className="text-[#d0c4be]">·</span>
            <button
              type="button"
              onClick={() => onOpenModal('derma')}
              className="hover:text-[#16120f] transition-colors"
            >
              Chứng Nhận Da Liễu
            </button>
            <span className="text-[#d0c4be]">·</span>
            <button
              type="button"
              onClick={() => onOpenModal('terms')}
              className="hover:text-[#16120f] transition-colors"
            >
              Điều Khoản Dịch Vụ
            </button>
            <span className="text-[#d0c4be]">·</span>
            <button
              type="button"
              onClick={() => onOpenModal('privacy')}
              className="hover:text-[#16120f] transition-colors"
            >
              Chính Sách Bảo Mật
            </button>
            <span className="text-[#d0c4be]">·</span>
            <button
              type="button"
              onClick={() => onOpenModal('contact')}
              className="hover:text-[#16120f] transition-colors"
            >
              Liên Hệ &amp; Tư Vấn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#d0c4be]/40 text-xs">
          <div>
            <span className="block font-bold text-[#16120f] mb-1">Trụ Sở Phân Phối Chính Hãng Việt Nam</span>
            <p className="text-[#4d4540] leading-relaxed">
              30 Trịnh Đình Thảo, Phường Hòa Thạnh, Quận Tân Phú, TP. Hồ Chí Minh
            </p>
          </div>

          <div>
            <span className="block font-bold text-[#16120f] mb-1">Đường Dây Nóng Hỗ Trợ 24/7</span>
            <p className="text-[#4d4540] leading-relaxed">
              Hotline Dược sĩ: <a href="tel:0772770134" className="font-bold text-[#16120f] hover:underline">0772770134</a>
              <br />
              Email: support@alps.id.vn
            </p>
          </div>

          <div>
            <span className="block font-bold text-[#16120f] mb-1">Tiêu Chuẩn Sản Xuất</span>
            <p className="text-[#4d4540] leading-relaxed">
              Tiêu chuẩn GMP Thụy Sĩ ISO 22716. Số ĐKCB Bộ Y Tế Việt Nam: 2025/ALPS-VNDERMA.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#d0c4be]/30 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[#725b38]">
          <p>© 2025 ALPS Pure Essence. All rights reserved. Bản quyền thuộc về ALPS Botanicals Switzerland.</p>
          <p className="font-mono text-[10px]">Zurich · Switzerland &amp; Ho Chi Minh City · Vietnam</p>
        </div>

      </div>
    </footer>
  );
};
