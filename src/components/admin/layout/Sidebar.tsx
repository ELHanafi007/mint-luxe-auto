'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Car, 
  FileText, 
  Settings, 
  History,
  LogOut,
  MessageSquare,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Vehicles', href: '/admin/vehicles', icon: Car },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Logs', href: '/admin/logs', icon: History },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    // Basic logout logic: clear cookie and redirect
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/admin/login';
  };

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#0a0a0a',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }}>
      <div style={{
        padding: '30px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            letterSpacing: '0.2em'
          }}>MINT.LUXE</div>
          <div style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.1em'
          }}>ADMIN DASHBOARD</div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            style={{
              display: 'none', // Hidden by default, show in CSS or media query if I had one for Sidebar
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer'
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 30px',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s',
                borderLeft: isActive ? '3px solid #fff' : '3px solid transparent'
              }}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div style={{
        padding: '20px',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,77,77,0.2)';
            e.currentTarget.style.color = '#ff4d4d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
