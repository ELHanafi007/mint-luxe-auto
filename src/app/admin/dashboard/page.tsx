'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopInventory from '@/components/admin/inventory/DesktopInventory';
import MobileDashboard from '@/components/admin/MobileDashboard';

export default function DashboardPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Two completely separate designs for the two types of users
  return isMobile ? (
    <MobileDashboard />
  ) : (
    <DesktopInventory />
  );
}
