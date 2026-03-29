'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileInquiries from '@/components/admin/inquiries/MobileInquiries';

export default function InquiriesPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  if (isMobile) {
    return <MobileInquiries />;
  }

  // Fallback for desktop if needed, for now just show mobile-minimal version or a simple message
  return (
    <div className="flex min-h-screen bg-black items-center justify-center">
      <div className="text-white/20 font-serif italic text-2xl uppercase tracking-widest">
        Desktop Inquiry System Incoming
      </div>
    </div>
  );
}
