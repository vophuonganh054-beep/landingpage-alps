import React from 'react';
import { ModalType } from '../types';

interface GuaranteesGridProps {
  onOpenModal: (type: ModalType) => void;
}

export const GuaranteesGrid: React.FC<GuaranteesGridProps> = ({ onOpenModal }) => {
  return (
    <section id="cam-ket" className="py-12 bg-[#f5f3f0] border-y border-[#d0c4be]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <button
            type="button"
            onClick={() => onOpenModal('refund')}
            className="bg-white p-5 rounded-2xl border border-[#d0c4be]/40 text-left hover:border-[#725b38] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#725b38] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">published_with_changes</span>
            </div>
            <h4 className="text-sm font-bold text-[#16120f] group-hover:text-[#725b38] transition-colors mb-1">
              100% Hoàn Tiền 30 Ngày
            </h4>
            <p className="text-xs text-[#4d4540] leading-relaxed">
              Nếu không hài lòng hoặc kích ứng, bạn được hoàn tiền không cần lý do phức tạp.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onOpenModal('derma')}
            className="bg-white p-5 rounded-2xl border border-[#d0c4be]/40 text-left hover:border-[#725b38] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#725b38] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">flag</span>
            </div>
            <h4 className="text-sm font-bold text-[#16120f] group-hover:text-[#725b38] transition-colors mb-1">
              Chính Hãng Thụy Sĩ
            </h4>
            <p className="text-xs text-[#4d4540] leading-relaxed">
              Nghiên cứu, kiểm định lâm sàng và chưng cất tại phòng lab chuyên sâu tại Zurich.
            </p>
          </button>

          <div className="bg-white p-5 rounded-2xl border border-[#d0c4be]/40 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#725b38] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
            <h4 className="text-sm font-bold text-[#16120f] mb-1">
              Giao Hỏa Tốc Miễn Phí
            </h4>
            <p className="text-xs text-[#4d4540] leading-relaxed">
              Nhận hàng nhanh 2-3 ngày, đóng gói chuẩn dược phẩm chống sốc nhiệt bảo quản serum.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenModal('terms')}
            className="bg-white p-5 rounded-2xl border border-[#d0c4be]/40 text-left hover:border-[#725b38] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#725b38] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">inventory_2</span>
            </div>
            <h4 className="text-sm font-bold text-[#16120f] group-hover:text-[#725b38] transition-colors mb-1">
              Kiểm Tra Trước Khi Trả
            </h4>
            <p className="text-xs text-[#4d4540] leading-relaxed">
              Mở hộp đồng kiểm tra tem niêm phong và mã QR xuất xứ trước khi nhận từ shipper.
            </p>
          </button>

        </div>
      </div>
    </section>
  );
};
