import React, { useState } from 'react';

export const ReviewsSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'sensitive' | 'oily' | 'aging'>('all');

  const reviews = [
    {
      id: 1,
      name: 'Hương Nguyễn',
      age: 32,
      location: 'TP. Hồ Chí Minh',
      avatar: '/images/avatar-huong.png',
      category: 'sensitive',
      badge: 'Da cực kỳ nhạy cảm, dễ đỏ ửng',
      product: 'Combo 2: Serum + Face Cream',
      quote:
        'Da mình thuộc nhóm cực kỳ nhạy cảm và dễ ửng đỏ khi thay đổi thời tiết. Dùng serum này sang ngày thứ 4 thấy dịu hẳn, sáng ngủ dậy da căng bóng mịn màng như vừa đi spa Thụy Sĩ về. Mấy đốm thâm mụn mới mờ siêu nhanh!',
      time: 'Đã dùng 3 tuần',
    },
    {
      id: 2,
      name: 'Mai Anh Lê',
      age: 28,
      location: 'Hà Nội',
      avatar: '/images/avatar-maianh.png',
      category: 'oily',
      badge: 'Da dầu mụn, lỗ chân lông to',
      product: 'Trọn bộ Toàn diện (3 món)',
      quote:
        'Chất serum mỏng nhẹ ngấm sâu trong 5 giây, không hề nhờn rít hay bết dính dù trời hè oi bức. Sau 2 tuần lỗ chân lông 2 bên cánh mũi thu nhỏ rõ, nền da sáng đều màu và tự nhiên không bị trắng ảo. Mùi thảo dược Alps thoang thoảng thư giãn cực kỳ.',
      time: 'Đã dùng 1 tháng',
    },
    {
      id: 3,
      name: 'Trần Thanh Hà',
      age: 41,
      location: 'Đà Nẵng',
      avatar: '/images/avatar-thanhha.png',
      category: 'aging',
      badge: 'Nám sạm sau sinh, rãnh nhăn',
      product: 'Combo Tái Sinh & Sáng Bóng',
      quote:
        'Dùng sang lọ thứ 2 kết hợp kem dưỡng Face Cream, các vết nám gò má mờ thấy rõ. Da lúc nào cũng ẩm mọng ngậm nước, nếp nhăn li ti khóe mắt giãn ra hẳn. Rất ưng chính sách cam kết hoàn tiền 100% nếu kích ứng nên ban đầu mình rất an tâm đặt thử.',
      time: 'Đã dùng 2 tháng',
    },
  ];

  const filtered = filterCategory === 'all' ? reviews : reviews.filter((r) => r.category === filterCategory);

  return (
    <section id="danh-gia" className="py-16 md:py-24 bg-[#fbf9f6] border-t border-[#d0c4be]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 text-[#725b38] rounded-full text-xs font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-[15px]">rate_review</span>
            <span>TRẢI NGHIỆM NGƯỜI DÙNG THỰC TẾ</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-[#16120f] tracking-tight">
            Những Khách Hàng Đã Trải Nghiệm Sản Phẩm
          </h2>

          <p className="text-xs sm:text-sm text-[#4d4540]">
            Ghi nhận thực tế từ những phụ nữ Việt Nam đã kiên trì sử dụng ALPS Radiance Glow Serum.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#16120f] text-white shadow-xs'
                  : 'bg-[#efeeeb] text-[#4d4540] hover:bg-[#fedeb2]/50'
              }`}
            >
              Tất cả phản hồi
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('sensitive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                filterCategory === 'sensitive'
                  ? 'bg-[#16120f] text-white shadow-xs'
                  : 'bg-[#efeeeb] text-[#4d4540] hover:bg-[#fedeb2]/50'
              }`}
            >
              Da nhạy cảm
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('oily')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                filterCategory === 'oily'
                  ? 'bg-[#16120f] text-white shadow-xs'
                  : 'bg-[#efeeeb] text-[#4d4540] hover:bg-[#fedeb2]/50'
              }`}
            >
              Da dầu thâm mụn
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('aging')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                filterCategory === 'aging'
                  ? 'bg-[#16120f] text-white shadow-xs'
                  : 'bg-[#efeeeb] text-[#4d4540] hover:bg-[#fedeb2]/50'
              }`}
            >
              Da nám sạm lão hóa
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#d0c4be]/40 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header with avatar & stars */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#fedeb2] shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#16120f]">{rev.name}</span>
                      <span className="text-[11px] text-[#4d4540] font-normal">({rev.age} tuổi)</span>
                    </div>
                    <span className="block text-[11px] text-[#725b38] font-medium">{rev.location}</span>
                  </div>
                </div>

                {/* Stars and verified badge */}
                <div className="flex items-center justify-between border-y border-[#efeeeb] py-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px] fill-icon">star</span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    <span>Đã mua hàng Thụy Sĩ</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#16120f] leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Bottom metadata */}
              <div className="pt-3 border-t border-[#efeeeb] text-[11px] space-y-1">
                <div className="flex justify-between text-[#4d4540]">
                  <span>Gói đã mua:</span>
                  <span className="font-bold text-[#16120f]">{rev.product}</span>
                </div>
                <div className="flex justify-between text-[#725b38]">
                  <span>Tình trạng:</span>
                  <span>{rev.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
