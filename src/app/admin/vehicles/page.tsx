'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopInventory from '@/components/admin/inventory/DesktopInventory';
import MobileInventory from '@/components/admin/inventory/MobileInventory';

export default function VehiclesPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Direct injection of the high-fidelity inventory engine
  return isMobile ? (
    <MobileInventory />
  ) : (
    <DesktopInventory />
  );
}
