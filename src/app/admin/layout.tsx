'use client';

import { usePathname } from 'next/navigation';
import styles from './AdminLayout.module.css';

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

  // We are moving layout responsibility to the individual page components 
  // to allow for completely separate Desktop and Mobile experiences.
  return (
    <div className="bg-black min-h-screen text-white">
      {children}
    </div>
  );
}
