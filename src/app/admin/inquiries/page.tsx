'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  User, 
  Mail, 
  Calendar, 
  Trash2, 
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries(inquiries.filter(i => i.id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)', padding: '40px', textAlign: 'center' }}>Loading inquiries...</div>;

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Inquiries Management</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Respond to client requests and consultations.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {inquiries.length === 0 ? (
          <div style={{ 
            backgroundColor: '#0a0a0a', 
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '12px', 
            padding: '60px', 
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)'
          }}>
            <MessageSquare size={48} style={{ marginBottom: '20px', opacity: 0.2 }} />
            <p>No inquiries found.</p>
          </div>
        ) : inquiries.map((inquiry) => (
          <div key={inquiry.id} style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '24px',
            position: 'relative',
            borderLeft: inquiry.status === 'New' ? '4px solid #fff' : '4px solid transparent'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                  <User size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{inquiry.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Mail size={14} />
                      {inquiry.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} />
                      {new Date(inquiry.timestamp).toLocaleDateString()}
                    </div>
                    <div style={{ 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      backgroundColor: inquiry.status === 'New' ? 'rgba(255,255,255,0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: inquiry.status === 'New' ? '#fff' : '#10b981',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                      {inquiry.status}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {inquiry.status === 'New' && (
                  <button 
                    onClick={() => updateStatus(inquiry.id, 'Replied')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 15px',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle size={16} />
                    Mark as Replied
                  </button>
                )}
                <button 
                  onClick={() => deleteInquiry(inquiry.id)}
                  style={{
                    padding: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.03)'
            }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Interest: <span style={{ color: '#fff' }}>{inquiry.interest}</span>
              </div>
              <div style={{ fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
                {inquiry.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
