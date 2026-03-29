'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopInquiries from '@/components/admin/inquiries/DesktopInquiries';
import MobileInquiries from '@/components/admin/inquiries/MobileInquiries';

export default function InquiriesPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // High-fidelity layout switching
  return isMobile ? (
    <MobileInquiries />
  ) : (
    <DesktopInquiries />
  );
}
