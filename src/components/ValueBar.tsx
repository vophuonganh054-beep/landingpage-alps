import React from 'react';
import { ModalType } from '../types';

interface ValueBarProps {
  onOpenModal: (type: ModalType) => void;
  onOpenChat: () => void;
}

export const ValueBar: React.FC<ValueBarProps> = ({ onOpenModal, onOpenChat }) => {
  return (
    <section className="py-4 bg-[#fedeb2]/30 border-y border-[#725b38]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-between text-xs sm:text-sm font-medium text-[#16120f]">
          
          {/* Item 1 */}
          <button
            type="button"
            onClick={() => onOpenModal('refund')}
            className="flex items-center gap-2.5 text-left group hover:text-[#725b38] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#fedeb2] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#725b38] text-lg">verified_user</span>
            </div>
            <div>
              <span className="block font-bold">Hoàn tiền 100% trong 30 ngày</span>
              <span className="text-[11px] text-[#4d4540]">Không cần lý do phức tạp</span>
            </div>
          </button>

          {/* Item 2 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fedeb2] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#725b38] text-lg">local_shipping</span>
            </div>
            <div>
              <span className="block font-bold">Freeship Hỏa Tốc toàn quốc</span>
              <span className="text-[11px] text-[#4d4540]">Nhận hàng nhanh 2-3 ngày</span>
            </div>
          </div>

          {/* Item 3 */}
          <button
            type="button"
            onClick={() => onOpenModal('terms')}
            className="flex items-center gap-2.5 text-left group hover:text-[#725b38] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#fedeb2] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#725b38] text-lg">package_2</span>
            </div>
            <div>
              <span className="block font-bold">Kiểm tra hàng trước khi trả</span>
              <span className="text-[11px] text-[#4d4540]">Đồng kiểm tem niêm phong</span>
            </div>
          </button>

          {/* Item 4 */}
          <button
            type="button"
            onClick={onOpenChat}
            className="flex items-center gap-2.5 text-left group hover:text-[#725b38] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#fedeb2] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#725b38] text-lg">support_agent</span>
            </div>
            <div>
              <span className="block font-bold">Cố vấn Da liễu 1:1 miễn phí</span>
              <span className="text-[11px] text-[#4d4540]">Tư vấn routine chuẩn y khoa</span>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
};
