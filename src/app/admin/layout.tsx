'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/layout/Sidebar';
import TopBar from '@/components/admin/layout/TopBar';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isFullAppPage = ['/admin/dashboard', '/admin/inquiries', '/admin/vehicles'].includes(pathname);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Dashboard and Inquiries have their own internal layout management (Separate Mobile/Desktop)
  if (isFullAppPage) {
    return <div className="bg-[#050505] min-h-screen">{children}</div>;
  }

  return (
    <div className={styles.adminLayout}>
      <div className={`${styles.sidebarWrapper} ${isSidebarOpen ? styles.open : ''}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 90
          }}
        />
      )}

      <div className={styles.contentWrapper}>
        <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
