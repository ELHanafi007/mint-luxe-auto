'use client';

import { useState, useEffect } from 'react';
import { 
  Car, 
  DollarSign, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)', padding: '40px', textAlign: 'center' }}>Loading dashboard...</div>;

  const stats = data?.stats || [];
  const recentActivity = data?.recentActivity || [];
  const systemHealth = data?.systemHealth || { storage: 0, latency: 0, status: 'unknown' };

  const iconMap: any = {
    'Total Vehicles': Car,
    'Inventory Value': DollarSign,
    'Active Inquiries': MessageSquare,
    'Total Sales': TrendingUp,
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Dashboard Overview</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Welcome back to the Mint0lux administration panel.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {stats.map((stat: any) => {
          const Icon = iconMap[stat.name] || Car;
          return (
            <div key={stat.name} style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '24px',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle at top right, ${stat.color}15, transparent)`,
                zIndex: 0
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}>
                  <Icon size={22} />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : 'rgba(255,255,255,0.4)',
                  fontWeight: '600'
                }}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : stat.trend === 'down' ? <ArrowDownRight size={14} /> : <Minus size={14} />}
                  {stat.change}
                </div>
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{stat.name}</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px'
      }}>
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Administrative Activity</h2>
            <button 
              onClick={() => window.location.href = '/admin/logs'}
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >View All Logs</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>No recent activity</div>
            ) : recentActivity.map((activity: any) => (
              <div key={activity.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: activity.type === 'create' ? 'rgba(16, 185, 129, 0.1)' : activity.type === 'delete' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activity.type === 'create' ? '#10b981' : activity.type === 'delete' ? '#ef4444' : '#3b82f6'
                  }}>
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{activity.action}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                      by {activity.user} • {new Date(activity.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>System Health</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Storage Usage</span>
                <span>{systemHealth.storage}%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#111', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${systemHealth.storage}%`, height: '100%', backgroundColor: '#fff' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>API Latency</span>
                <span>{systemHealth.latency}ms</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#111', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '15%', height: '100%', backgroundColor: '#10b981' }} />
              </div>
            </div>
            <div style={{
              marginTop: '10px',
              padding: '15px',
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.1)',
              borderRadius: '8px',
              color: '#10b981',
              fontSize: '13px',
              textAlign: 'center'
            }}>
              {systemHealth.status === 'operational' ? 'All systems operational' : 'System experiencing issues'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
