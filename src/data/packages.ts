import { PackageOption } from '../types';

export const PACKAGES: PackageOption[] = [
  {
    id: '1',
    name: '1 Chai 30ml',
    subtitle: 'GÓI TRẢI NGHIỆM',
    originalPrice: 600000,
    salePrice: 390000,
    saveAmount: 210000,
    items: [
      '1x ALPS Radiance Glow Serum (30ml)',
      'Cẩm nang dưỡng da chuyên sâu chuẩn Thụy Sĩ',
      'Miễn phí vận chuyển hỏa tốc toàn quốc',
      'Được kiểm tra hàng trước khi thanh toán',
    ],
    gifts: [
      'Tặng cẩm nang da liễu độc quyền',
    ],
    image: '/images/serum.png',
  },
  {
    id: '2',
    name: 'Combo Tái Sinh & Sáng Bóng (1 Serum + 1 Kem Dưỡng)',
    subtitle: 'COMBO BÁN CHẠY NHẤT · TIẾT KIỆM 37%',
    popular: true,
    badge: 'KHUYÊN DÙNG · TIẾT KIỆM 530.000đ',
    originalPrice: 1250000,
    salePrice: 720000,
    saveAmount: 530000,
    items: [
      '1x ALPS Radiance Glow Serum (30ml)',
      '1x ALPS Regenerating Face Cream (50g)',
      'Miễn phí vận chuyển hỏa tốc toàn quốc',
      'Bảo hành đổi trả hoàn tiền trong 30 ngày',
    ],
    gifts: [
      '1 Hộp Mặt Nạ Hydro-Lifting Alps trị giá 350.000đ',
      'Voucher 100.000đ giảm trực tiếp đơn này',
    ],
    image: '/images/cream.png',
  },
  {
    id: '3',
    name: 'Combo Hoàn Hảo Toàn Diện (Serum + Kem Dưỡng + Toner)',
    subtitle: 'TRỌN BỘ LIỆU TRÌNH SPA THỤY SĨ TẠI NHÀ',
    badge: 'TOÀN DIỆN NHẤT · TIẾT KIỆM 860.000đ',
    originalPrice: 1850000,
    salePrice: 990000,
    saveAmount: 860000,
    items: [
      '1x ALPS Radiance Glow Serum (30ml)',
      '1x ALPS Regenerating Face Cream (50g)',
      '1x ALPS Botanical Balancing Toner (120ml)',
      'Cố vấn da liễu 1:1 trong suốt quá trình sử dụng',
      'Miễn phí vận chuyển hỏa tốc toàn quốc',
    ],
    gifts: [
      '2 Hộp Mặt Nạ Hydro-Lifting Alps trị giá 700.000đ',
      'Cây lăn massage thạch anh hồng cao cấp',
      'Voucher 100.000đ giảm trực tiếp đơn này',
    ],
    image: '/images/toner.png',
  },
];
