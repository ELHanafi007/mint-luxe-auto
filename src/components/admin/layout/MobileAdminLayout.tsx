'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, MessageSquare, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileAdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-[100]">
        <Link href="/admin/dashboard" className="font-serif text-xl font-bold tracking-tighter italic">
          MINT.ADMIN
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white/70 active:scale-90 transition-transform"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[90] pt-24 px-8 flex flex-col"
          >
            <nav className="flex-1 space-y-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-6 text-2xl font-bold tracking-tight ${
                    pathname === item.href ? 'text-[#C5A165]' : 'text-white/40'
                  }`}
                >
                  <item.icon size={28} />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="pb-12">
              <button className="flex items-center gap-4 text-white/20 text-lg font-bold">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16 pb-12">
        {children}
      </main>
    </div>
  );
}
