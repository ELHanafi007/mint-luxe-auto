'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, User, Menu } from 'lucide-react';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/vehicles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header style={{
      height: '70px',
      backgroundColor: '#0a0a0a',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'none' // Show only on mobile
            }}
            className="mobile-menu-btn"
          >
            <Menu size={24} />
          </button>
        )}
        <form onSubmit={handleSearch} className="search-wrapper" style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#111',
          borderRadius: '6px',
          padding: '8px 15px',
          width: '300px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Search size={16} color="rgba(255,255,255,0.3)" />
          <input 
            type="text" 
            placeholder="Global search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              marginLeft: '10px',
              fontSize: '13px',
              outline: 'none',
              width: '100%'
            }}
          />
        </form>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ff4d4d',
            borderRadius: '50%',
            border: '2px solid #0a0a0a'
          }} />
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          paddingLeft: '20px'
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>Admin</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Super User</div>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
