'use client';

import React from 'react';
import useSWR from 'swr';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopDashboard from '@/components/admin/DesktopDashboard';
import MobileDashboard from '@/components/admin/MobileDashboard';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { data, error, isLoading } = useSWR('/api/admin/dashboard', fetcher, {
    refreshInterval: 30000, // Refresh every 30s
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-10">
        <div className="w-full max-w-6xl space-y-8">
           <div className="flex justify-between items-center mb-12">
              <div className="space-y-3">
                <div className="h-8 w-64 bg-white/5 rounded-md animate-pulse" />
                <div className="h-4 w-40 bg-white/5 rounded-md animate-pulse" />
              </div>
              <div className="h-12 w-12 rounded-full bg-white/5 animate-pulse" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                   <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A165]/5 to-transparent"
                   />
                </div>
              ))}
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 h-[400px] bg-white/5 rounded-xl border border-white/5" />
              <div className="h-[400px] bg-white/5 rounded-xl border border-white/5" />
           </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/40 font-mono uppercase tracking-[0.2em]">
        System Error: Failed to establish secure uplink.
      </div>
    );
  }

  // The switch happens here - Two completely separate component structures
  return isMobile ? (
    <MobileDashboard data={data} />
  ) : (
    <DesktopDashboard data={data} />
  );
}
