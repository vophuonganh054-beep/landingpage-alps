export interface PackageOption {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  popular?: boolean;
  originalPrice: number;
  salePrice: number;
  saveAmount: number;
  items: string[];
  gifts: string[];
  image: string;
}

export type ModalType = 'refund' | 'derma' | 'terms' | 'privacy' | 'contact' | 'welcome' | 'order-success' | null;

export interface OrderData {
  packageId: string;
  fullName: string;
  phone: string;
  address: string;
  note: string;
  voucherCode: string;
  discount: number;
  finalPrice: number;
  paymentMethod: 'cod' | 'bank';
  orderCode?: string;
}
