'use client';

import { useState, useEffect } from 'react';
import { History, User, Calendar, Clock } from 'lucide-react';

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Activity Logs</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Track administrative actions and system events.</p>
      </div>

      <div style={{
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>TIMESTAMP</th>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>USER</th>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading logs...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No logs available.</td>
                </tr>
              ) : logs.map((log) => {
                const date = new Date(log.timestamp);
                return (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                        <Calendar size={14} color="rgba(255,255,255,0.3)" />
                        <span>{date.toLocaleDateString()}</span>
                        <Clock size={14} color="rgba(255,255,255,0.3)" style={{ marginLeft: '5px' }} />
                        <span>{date.toLocaleTimeString()}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                        <User size={14} color="rgba(255,255,255,0.3)" />
                        <span>{log.user}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px 20px' }}>
                      <div style={{ 
                        fontSize: '13px', 
                        fontWeight: '500',
                        color: log.action.includes('Delete') ? '#ff4d4d' : log.action.includes('Create') ? '#10b981' : '#fff'
                      }}>
                        {log.action}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
