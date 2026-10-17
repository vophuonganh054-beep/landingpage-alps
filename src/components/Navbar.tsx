import React, { useState } from 'react';
import { ModalType } from '../types';

interface NavbarProps {
  onOpenModal: (type: ModalType) => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#d0c4be]/40 sticky top-8 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <a href="#alps-hero" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="ALPS Pure Essence Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block text-left">
              <span className="block font-headline text-lg md:text-xl font-bold tracking-tight text-[#16120f] leading-none">
                ALPS BOTANICALS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#725b38] font-semibold">
                Pure Essence · Zurich Switzerland
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-medium text-[#4d4540]">
            <a href="#alps-hero" className="hover:text-[#725b38] transition-colors py-1">
              Về ALPS
            </a>
            <a href="#thanh-phan" className="hover:text-[#725b38] transition-colors py-1">
              Khoa Học Dược Liệu
            </a>
            <a href="#uu-dai" className="hover:text-[#725b38] transition-colors py-1 flex items-center gap-1 text-[#a7611f] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Gói Flash Sale</span>
            </a>
            <a href="#danh-gia" className="hover:text-[#725b38] transition-colors py-1">
              Đánh Giá Thực Tế
            </a>
            <button
              onClick={() => onOpenModal('refund')}
              className="hover:text-[#725b38] transition-colors py-1 text-left"
            >
              Hoàn Tiền 30 Ngày
            </button>
            <button
              onClick={() => onOpenModal('derma')}
              className="hover:text-[#725b38] transition-colors py-1 text-left"
            >
              Kiểm Định Thụy Sĩ
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#725b38] hover:bg-[#fedeb2]/40 rounded-full border border-[#725b38]/30 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Tư vấn da 1:1</span>
            </button>

            <a
              href="#uu-dai"
              className="lux-shimmer-btn inline-flex items-center gap-2 bg-[#16120f] hover:bg-[#2b2623] text-white text-xs font-bold px-4 md:px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              <span>NHẬN ƯU ĐÃI</span>
              <span className="text-[#fedeb2]">↗</span>
            </a>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#16120f] hover:bg-[#efeeeb] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f6] border-b border-[#d0c4be]/40 px-6 py-5 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 gap-2.5 text-sm font-medium text-[#16120f]">
            <a
              href="#alps-hero"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#efeeeb] rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Về ALPS Pure Essence</span>
              <span className="material-symbols-outlined text-sm text-[#725b38]">chevron_right</span>
            </a>
            <a
              href="#thanh-phan"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#efeeeb] rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Khoa Học Dược Liệu &amp; Thành Phần</span>
              <span className="material-symbols-outlined text-sm text-[#725b38]">chevron_right</span>
            </a>
            <a
              href="#uu-dai"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-amber-50 rounded-lg text-amber-900 font-bold transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm">local_fire_department</span>
                <span>Gói Ưu Đãi Flash Sale 20/10</span>
              </span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Giảm 40%</span>
            </a>
            <a
              href="#danh-gia"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-[#efeeeb] rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Đánh Giá Khách Hàng Thực Tế</span>
              <span className="material-symbols-outlined text-sm text-[#725b38]">chevron_right</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('refund');
              }}
              className="p-2 hover:bg-[#efeeeb] rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Chính Sách Hoàn Tiền 100% Trong 30 Ngày</span>
              <span className="material-symbols-outlined text-sm text-[#725b38]">verified_user</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('derma');
              }}
              className="p-2 hover:bg-[#efeeeb] rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Chứng Nhận Da Liễu &amp; Kiểm Định Thụy Sĩ</span>
              <span className="material-symbols-outlined text-sm text-[#725b38]">health_and_safety</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('contact');
              }}
              className="p-2 hover:bg-[#efeeeb] rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Trung Tâm Hỗ Trợ Khách Hàng ALPS</span>
              <span className="material-symbols-outlined text-sm text-[#725b38]">call</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#d0c4be]/40 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="flex-1 py-2.5 text-xs font-semibold text-[#725b38] bg-white border border-[#725b38]/40 rounded-full flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Chat Với Dược Sĩ</span>
            </button>
            <a
              href="#uu-dai"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-xs font-bold text-white bg-[#16120f] rounded-full flex items-center justify-center gap-1"
            >
              <span>Đặt Hàng Ngay</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
