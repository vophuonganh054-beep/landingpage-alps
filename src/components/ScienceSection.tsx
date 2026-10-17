import React, { useState } from 'react';
import { ModalType } from '../types';

interface ScienceSectionProps {
  onOpenModal: (type: ModalType) => void;
  onSelectPackage: (pkgId: string) => void;
}

export const ScienceSection: React.FC<ScienceSectionProps> = ({ onOpenModal, onSelectPackage }) => {
  const [activeTab, setActiveTab] = useState<'tham' | 'nam' | 'kho'>('tham');

  const products = [
    {
      id: 'mask',
      name: 'Mặt Nạ Hydro-Lifting Alps',
      sub: 'Cấp Nước Vi Điểm & Nâng Cơ Tức Thì',
      img: '/images/mask.png',
      benefit: 'Dệt từ sợi tơ thực vật siêu mỏng, ôm khít gương mặt truyền 25ml dưỡng chất tuyết Alps giúp da ngậm nước căng bóng tức thì sau 15 phút.',
      active: 'Tảo Tuyết Alps & HA Vi Điểm',
      texture: 'Dưỡng chất lỏng trong suốt, mát lạnh dịu nhẹ',
      packageTarget: '3',
    },
    {
      id: 'cream',
      name: 'Kem Dưỡng Tái Sinh Căng Bóng',
      sub: 'Khóa Ẩm 72 Giờ & Tái Sinh Lipid',
      img: '/images/cream.png',
      benefit: 'Công nghệ Ceramide sinh học Thụy Sĩ mô phỏng hàng rào tự nhiên của da, phục hồi màng ẩm bảo vệ, ngăn ngừa thoát nước xuyên biểu bì.',
      active: 'Phức hợp Ceramide NP & Hoa Nhung Tuyết',
      texture: 'Chất kem velvet mềm mượt như lụa, không bí rít',
      packageTarget: '2',
    },
    {
      id: 'toner',
      name: 'Nước Cân Bằng Dưỡng Ẩm Thụy Sĩ',
      sub: 'pH Sinh Học 5.5 & Dịu Mẩn Đỏ',
      img: '/images/toner.png',
      benefit: 'Chiết xuất nước khoáng băng tan Thụy Sĩ cân bằng độ pH chuẩn 5.5, làm sạch sâu cặn bẩn còn sót và mở đường cho serum thẩm thấu sâu hơn gấp 3 lần.',
      active: 'Khoáng Băng Tan Alps & Rau Má Hữu Cơ',
      texture: 'Nước lỏng tươi mát, thẩm thấu ngay sau 3 giây',
      packageTarget: '3',
    },
    {
      id: 'serum',
      name: 'Tinh Chất Radiance Glow Serum',
      sub: 'Best Seller · Tái Sinh Làn Da Glass Skin',
      img: '/images/serum.png',
      benefit: 'Công thức độc bản kết hợp Hoa Tuyết Nhung Alps, 10% Niacinamide tinh khiết và Bột ngọc trai hữu cơ xóa mờ thâm nám, đều màu da và căng bóng tự nhiên.',
      active: 'Hoa Tuyết Nhung + 10% Niacinamide + Ngọc Trai',
      texture: 'Serum sánh mượt, ngấm nhanh, ráo mịn không dính',
      packageTarget: '2',
    },
  ];

  return (
    <section id="thanh-phan" className="py-16 md:py-24 bg-[#fbf9f6] relative overflow-hidden">
      {/* Background soft blur accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-orange-100/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-16 md:space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 text-[#725b38] rounded-full text-xs font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-[15px]">biotech</span>
            <span>Khoa Học Dược Liệu Chuẩn Thụy Sĩ</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-[#16120f] tracking-tight">
            3 Trụ Cột Tái Sinh Làn Da Tinh Khiết
          </h2>

          <p className="text-sm sm:text-base text-[#4d4540] leading-relaxed">
            Sự kết hợp hoàn hảo giữa thảo dược quý hiếm từ độ cao 3.000m trên dãy Alps cùng công nghệ sinh học thẩm thấu vi điểm đạt chuẩn phòng thí nghiệm Zurich.
          </p>
        </div>

        {/* 3 Scientific Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#d0c4be]/40 shadow-md hover:shadow-xl transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 text-2xl group-hover:scale-110 transition-transform">
              🏔️
            </div>
            
            <span className="inline-block text-[10px] font-bold tracking-widest text-[#725b38] uppercase">
              CHỐNG OXY HÓA GẤP 3X VITAMIN C
            </span>

            <h3 className="font-headline text-xl sm:text-2xl text-[#16120f] font-normal">
              Hoa Tuyết Nhung Alps
            </h3>

            <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
              Sinh trưởng ở độ cao 3.000m quanh năm băng giá, chiết xuất Edelweiss có khả năng trung hòa gốc tự do cực đại, ngăn chặn sắc tố melanin và bảo vệ tế bào da khỏi tia UV &amp; stress oxy hóa.
            </p>

            <div className="pt-3 border-t border-[#efeeeb] flex items-center justify-between text-xs">
              <span className="text-[#4d4540]">Hiệu quả bảo vệ:</span>
              <strong className="text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full">
                +89% Tế Bào Sống
              </strong>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#d0c4be]/40 shadow-md hover:shadow-xl transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 text-2xl group-hover:scale-110 transition-transform">
              💧
            </div>

            <span className="inline-block text-[10px] font-bold tracking-widest text-[#725b38] uppercase">
              CẤP NƯỚC ĐA TẦNG BIỂU BÌ
            </span>

            <h3 className="font-headline text-xl sm:text-2xl text-[#16120f] font-normal">
              Triple Hyaluronic Acid
            </h3>

            <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
              Phức hợp 3 kích cỡ phân tử HA: Đại phân tử tạo màng giữ ẩm; Trung phân tử củng cố liên kết gian bào; Vi phân tử thẩm thấu tận lớp trung bì giữ nước căng mọng suốt 72 giờ.
            </p>

            <div className="pt-3 border-t border-[#efeeeb] flex items-center justify-between text-xs">
              <span className="text-[#4d4540]">Thời gian khóa ẩm:</span>
              <strong className="text-blue-800 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">
                72 Giờ Ngậm Nước
              </strong>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#d0c4be]/40 shadow-md hover:shadow-xl transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 text-2xl group-hover:scale-110 transition-transform">
              ✨
            </div>

            <span className="inline-block text-[10px] font-bold tracking-widest text-[#725b38] uppercase">
              CHUẨN DƯỢC ĐIỂN THỤY SĨ
            </span>

            <h3 className="font-headline text-xl sm:text-2xl text-[#16120f] font-normal">
              Niacinamide 10% &amp; Ngọc Trai
            </h3>

            <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
              Độ tinh khiết 99.8% không lẫn acid nicotinic gây kích ứng, kết hợp bột ngọc trai hữu cơ ức chế chuyển hóa melanin, thu nhỏ lỗ chân lông và làm đều màu da bật tông rõ rệt sau 14 ngày.
            </p>

            <div className="pt-3 border-t border-[#efeeeb] flex items-center justify-between text-xs">
              <span className="text-[#4d4540]">Mờ thâm nám sau 14N:</span>
              <strong className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                94.2% Khách Hài Lòng
              </strong>
            </div>
          </div>

        </div>

        {/* 4 Flagship Products Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-headline text-2xl sm:text-3xl text-[#16120f]">
              Bộ Sưu Tập Chăm Sóc Da Hoàn Hảo ALPS
            </h3>
            <p className="text-xs sm:text-sm text-[#4d4540]">
              Từng sản phẩm đều được chiết xuất và chưng cất tỉ mỉ tại Zurich, mang đến giải pháp toàn diện cho làn da Á Đông.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#d0c4be]/40 p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  {/* Image container */}
                  <div className="relative h-48 flex items-center justify-center p-3 bg-[#f5f3f0] rounded-xl overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="alps-product-float max-h-40 w-auto object-contain transition-transform group-hover:scale-105 duration-500"
                    />
                    <span className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-white/90 px-2 py-0.5 rounded text-[#725b38] font-bold">
                      Zurich Lab
                    </span>
                  </div>

                  <div>
                    <h4 className="font-headline text-base font-bold text-[#16120f] group-hover:text-[#725b38] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#725b38] font-semibold mb-2">
                      {p.sub}
                    </p>
                    <p className="text-xs text-[#4d4540] leading-relaxed line-clamp-3">
                      {p.benefit}
                    </p>
                  </div>

                  <div className="bg-[#f5f3f0] p-2.5 rounded-lg space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-[#4d4540]">
                      <span className="font-medium">Hoạt chất chính:</span>
                      <span className="font-semibold text-[#16120f]">{p.active}</span>
                    </div>
                    <div className="text-[#725b38] text-[10px] italic">
                      {p.texture}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#efeeeb]">
                  <a
                    href="#uu-dai"
                    onClick={() => onSelectPackage(p.packageTarget)}
                    className="w-full py-2 px-3 text-xs font-bold text-center block rounded-lg bg-[#efeeeb] hover:bg-[#16120f] hover:text-white text-[#16120f] transition-colors"
                  >
                    Xem Trong Combo Ưu Đãi ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Results & Transformation Section */}
        <div id="hieu-qua" className="bg-[#1f1914] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Kiểm Định Lâm Sàng 1.200 Phụ Nữ Châu Á</span>
              </div>

              <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                Hiệu Quả Được Chứng Minh Y Khoa Tại Thụy Sĩ
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Nghiên cứu mù đôi ngẫu nhiên kéo dài 28 ngày trên 1.200 tình nguyện viên có tình trạng da nhạy cảm, sạm nám và lão hóa sớm tại Viện Da Liễu Zurich.
              </p>

              {/* Progress milestones */}
              <div className="space-y-3 pt-2 max-w-xl">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-neutral-200">Sau 3 ngày: Làm dịu mẩn đỏ, giảm châm chích</span>
                    <span className="text-amber-300">92.4%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '92.4%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-neutral-200">Sau 7 ngày: Tăng độ ẩm ngậm nước 72H</span>
                    <span className="text-amber-300">89.1%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '89.1%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-neutral-200">Sau 14 ngày: Thu nhỏ lỗ chân lông, mờ vết thâm sạm</span>
                    <span className="text-amber-300">94.2%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-neutral-200">Sau 28 ngày: Da sáng bật tông chuẩn Glass Skin</span>
                    <span className="text-amber-300">98.4%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-200 h-full rounded-full" style={{ width: '98.4%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Transformation Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                  Hồ Sơ Cải Thiện Tình Trạng Da
                </span>
                <span className="text-[11px] text-neutral-400">Ảnh thực tế khách hàng</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1.5 p-1 bg-black/30 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab('tham')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-semibold transition-all ${
                    activeTab === 'tham' ? 'bg-[#725b38] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Da thâm mụn
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('nam')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-semibold transition-all ${
                    activeTab === 'nam' ? 'bg-[#725b38] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Nám sạm tàn nhang
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('kho')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-semibold transition-all ${
                    activeTab === 'kho' ? 'bg-[#725b38] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Khô sần lão hóa
                </button>
              </div>

              {/* Dynamic Content */}
              <div className="bg-black/20 rounded-xl p-4 border border-white/5 space-y-3">
                {activeTab === 'tham' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-200">Ghi nhận: Chị Mai Anh (28 tuổi, Hà Nội)</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      "Sau 1 đợt mụn nội tiết, gò má mình chi chít vết thâm đỏ và đen. Dùng ALPS Radiance Glow Serum 12 ngày, thâm mờ đi thấy rõ khoảng 70-80%, da sáng khỏe đều màu và đặc biệt không lên mụn ẩn mới."
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Chỉ số dầu thừa giảm 52% sau 2 tuần</span>
                    </div>
                  </div>
                )}

                {activeTab === 'nam' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-200">Ghi nhận: Chị Thanh Hà (41 tuổi, Đà Nẵng)</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      "Mình bị nám mảng hai bên gò má sau sinh bé thứ hai. Kết hợp Serum cùng Kem dưỡng Face Cream của ALPS hơn 3 tuần, nền da trong vắt, các đốm nâu mờ dần và da căng bóng đàn hồi như hồi đôi mươi."
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Giảm hắc sắc tố Melanin vùng gò má 68%</span>
                    </div>
                  </div>
                )}

                {activeTab === 'kho' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-200">Ghi nhận: Chị Hương Nguyễn (32 tuổi, TP.HCM)</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      "Da mình ngồi điều hòa cả ngày khô căng, bong vảy ở khóe mũi. Chỉ sau 2 ngày dùng serum kết hợp toner, da như được bơm đầy nước, mềm mịn và lớp trang điểm tệp hẳn không bị mốc phấn."
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Tăng chỉ số ngậm nước biểu bì 89% sau 7 ngày</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onOpenModal('derma')}
                className="w-full py-2.5 text-xs font-bold text-amber-300 hover:text-white border border-amber-300/40 hover:border-amber-300 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">health_and_safety</span>
                <span>Xem Giấy Chứng Nhận Lâm Sàng &amp; Giấy Phép Bộ Y Tế</span>
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
