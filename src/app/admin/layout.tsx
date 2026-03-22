'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/layout/Sidebar';
import TopBar from '@/components/admin/layout/TopBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#fff',
      fontFamily: 'inherit'
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <TopBar />
        <main style={{
          padding: '30px',
          flex: 1,
          overflowY: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
