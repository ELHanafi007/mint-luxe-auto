'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  History, 
  LogOut,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Server,
  Bell,
  Search
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface DesktopDashboardProps {
  data: any;
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Inventory', icon: Car, active: false },
  { name: 'Inquiries', icon: MessageSquare, active: false },
  { name: 'Sales Performance', icon: TrendingUp, active: false },
  { name: 'System Logs', icon: History, active: false },
  { name: 'Settings', icon: Settings, active: false },
];

export default function DesktopDashboard({ data }: DesktopDashboardProps) {
  const [ticker, setTicker] = useState(data?.globalValuationTicker || "$47,200,000");

  // Simulate real-time ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const val = parseInt(ticker.replace(/[^0-9]/g, ''));
      const newVal = val + Math.floor(Math.random() * 500);
      setTicker(`$${newVal.toLocaleString()}`);
    }, 3000);
    return () => clearInterval(interval);
  }, [ticker]);

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#F9F9F9] font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0A0A0A] flex flex-col fixed h-screen z-20">
        <div className="p-8 border-b border-white/5">
          <div className="font-serif text-xl tracking-[0.2em] font-bold">MINT.LUXE</div>
          <div className="text-[10px] text-white/40 tracking-[0.1em] mt-1 uppercase">Admin Command Center</div>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                item.active ? 'bg-white/5 text-[#C5A165]' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={item.active ? 'text-[#C5A165]' : 'text-inherit'} />
              <span className="text-sm font-medium tracking-wide">{item.name}</span>
              {item.active && (
                <motion.div 
                  layoutId="activeNav" 
                  className="ml-auto w-1 h-4 bg-[#C5A165] rounded-full shadow-[0_0_8px_#C5A165]" 
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-4 px-4 py-3 text-white/40 hover:text-red-400 transition-colors w-full">
            <LogOut size={20} />
            <span className="text-sm font-medium">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-10 relative">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight mb-2">Portfolio Overview</h1>
            <p className="text-white/40 text-sm">Welcome back, Director Julian Vance.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">Live Valuation:</span>
              <span className="text-sm font-bold font-mono text-[#C5A165] tabular-nums">{ticker}</span>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-white/60 hover:text-white">
                <Search size={18} />
              </button>
              <button className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-white/60 hover:text-white relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C5A165] rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {data?.stats?.map((stat: any, i: number) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-xl bg-[#0A0A0A] border border-white/5 overflow-hidden group transition-all duration-500 hover:border-white/10"
            >
              {/* Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(197,161,101,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{stat.name}</span>
                  <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                    stat.trend === 'up' ? 'text-[#10b981] bg-[#10b981]/10' : 'text-white/40 bg-white/10'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold tracking-tight text-[#C5A165]">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Main Chart */}
          <div className="col-span-2 p-8 rounded-xl bg-[#0A0A0A] border border-white/5">
            <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#C5A165]" />
              Weekly Acquisition Velocity
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.weeklySales}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A165" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C5A165" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                  />
                  <YAxis 
                    hide 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#C5A165' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#C5A165" 
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 6, stroke: '#C5A165', strokeWidth: 0, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Brand Distribution */}
          <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/5">
            <h3 className="text-lg font-serif mb-6">Inventory by Brand</h3>
            <div className="space-y-4">
              {data?.inventoryByBrand?.map((item: any) => (
                <div key={item.brand} className="group">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">{item.brand}</span>
                    <span className="text-xs font-mono text-[#C5A165]">{item.count}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / 10) * 100}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-[#C5A165]/40 to-[#C5A165]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Active Inquiries */}
          <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-serif">High-Net-Worth Inquiries</h3>
              <button className="text-[10px] uppercase tracking-widest text-[#C5A165] hover:opacity-60 transition-opacity">View Portfolio</button>
            </div>
            <div className="space-y-4">
              {data?.recentInquiries?.map((inquiry: any) => (
                <div key={inquiry.id} className="p-4 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/[0.07] transition-all cursor-pointer">
                  <div>
                    <div className="text-sm font-semibold mb-0.5">{inquiry.name}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-tighter">Interest: <span className="text-white/60">{inquiry.interest}</span></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] text-white/30 font-mono italic">{inquiry.status}</div>
                    <ArrowUpRight size={14} className="text-white/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/5">
            <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#C5A165]" />
              Infrastructure Integrity
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-white/40">
                  <Server size={14} />
                  <span className="text-[10px] uppercase tracking-widest">Global Latency</span>
                </div>
                <div className="text-xl font-mono text-[#10b981]">{data?.systemHealth?.latency}ms</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-white/40">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] uppercase tracking-widest">Storage Efficiency</span>
                </div>
                <div className="text-xl font-mono">{data?.systemHealth?.storage}%</div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="text-xs font-medium text-[#10b981]/80">Discretion System Fully Operational</span>
              </div>
              <span className="text-[10px] text-[#10b981]/40 uppercase font-bold">Encrypted</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
