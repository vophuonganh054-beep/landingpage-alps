/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValueBar } from './components/ValueBar';
import { ScienceSection } from './components/ScienceSection';
import { FlashSaleSection } from './components/FlashSaleSection';
import { OrderForm } from './components/OrderForm';
import { ReviewsSection } from './components/ReviewsSection';
import { GuaranteesGrid } from './components/GuaranteesGrid';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { AIChatWidget } from './components/AIChatWidget';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ModalType, OrderData } from './types';

export default function App() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('2');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModal) setActiveModal(null);
        if (isChatOpen) setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, isChatOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  const handleScrollToCheckout = () => {
    const orderFormEl = document.getElementById('order-form');
    if (orderFormEl) {
      orderFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const inputName = document.getElementById('checkout-fullname');
        if (inputName) inputName.focus();
      }, 500);
    }
  };

  const handleOrderSuccess = (order: OrderData) => {
    setOrderData(order);
    setActiveModal('order-success');
  };

  const handleApplyVoucher = (code: string) => {
    setAppliedVoucher(code);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#16120f] font-body selection:bg-[#fedeb2] selection:text-[#16120f] relative pb-16 md:pb-0">
      
      {/* 1. Synchronized Top Live Bar */}
      <TopBanner />

      {/* 2. Sticky Luxury Navigation */}
      <Navbar
        onOpenModal={(type) => setActiveModal(type)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 3. Hero Section with Live Stock & 3D Botanical Visuals */}
      <HeroSection
        onOpenModal={(type) => setActiveModal(type)}
        onSelectPackage={(id) => {
          setSelectedPackageId(id);
          handleScrollToCheckout();
        }}
      />

      {/* 4. Value Pillars Bar */}
      <ValueBar
        onOpenModal={(type) => setActiveModal(type)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 5. Science & Clinical Ingredients Efficacy */}
      <ScienceSection
        onOpenModal={(type) => setActiveModal(type)}
        onSelectPackage={(id) => {
          setSelectedPackageId(id);
          handleScrollToCheckout();
        }}
      />

      {/* 6. Flash Sale Interactive Package Selector */}
      <FlashSaleSection
        selectedPackageId={selectedPackageId}
        onSelectPackage={(id) => setSelectedPackageId(id)}
        onScrollToCheckout={handleScrollToCheckout}
      />

      {/* 7. Conversion Checkout / Order Form */}
      <OrderForm
        selectedPackageId={selectedPackageId}
        onSelectPackage={(id) => setSelectedPackageId(id)}
        onOrderSuccess={handleOrderSuccess}
        onOpenChat={() => setIsChatOpen(true)}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={handleApplyVoucher}
      />

      {/* 8. Verified Reviews & Testimonials */}
      <ReviewsSection />

      {/* 9. Trust Guarantees Grid */}
      <GuaranteesGrid onOpenModal={(type) => setActiveModal(type)} />

      {/* 10. Brand Footer */}
      <Footer onOpenModal={(type) => setActiveModal(type)} />

      {/* 11. Interactive Policy & Welcome & Order Confirmation Modals */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        orderData={orderData}
        onApplyVoucher={handleApplyVoucher}
        onScrollToCheckout={handleScrollToCheckout}
      />

      {/* 12. Floating AI Dermatologist Assistant */}
      <AIChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
      />

      {/* 13. Mobile Sticky Purchase Bar */}
      <StickyMobileBar
        selectedPackageId={selectedPackageId}
        onScrollToCheckout={handleScrollToCheckout}
      />

    </div>
  );
}
