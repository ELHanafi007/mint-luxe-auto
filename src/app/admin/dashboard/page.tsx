'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopDashboard from '@/components/admin/DesktopDashboard';
import MobileDashboard from '@/components/admin/MobileDashboard';

export default function DashboardPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // The switch happens here - Two completely separate component structures
  return isMobile ? (
    <MobileDashboard />
  ) : (
    <DesktopDashboard />
  );
}
