'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  Settings,
  ArrowUpRight,
  TrendingUp,
  User,
  MoreVertical
} from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface MobileDashboardProps {
  data: any;
}

export default function MobileDashboard({ data }: MobileDashboardProps) {
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => triggerHaptic(),
    onSwipedRight: () => triggerHaptic(),
    trackMouse: true
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#F9F9F9] pb-24 font-sans">
      {/* Top Header */}
      <header className="p-6 flex justify-between items-center bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div>
          <div className="font-serif text-lg tracking-widest font-bold">MINT.LUXE</div>
          <div className="text-[8px] text-[#C5A165] tracking-[0.2em] uppercase">Director Access</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <User size={18} className="text-white/60" />
        </div>
      </header>

      {/* Ticker Banner */}
      <div className="px-6 py-3 bg-[#C5A165]/10 border-b border-[#C5A165]/20 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A165] animate-pulse" />
          <span className="text-[10px] font-mono text-[#C5A165] tracking-widest uppercase">Live Portfolio:</span>
          <span className="text-[10px] font-mono font-bold text-[#C5A165] ml-auto">{data?.globalValuationTicker}</span>
        </div>
      </div>

      <main className="p-6 space-y-8">
        {/* Horizontal Stats Scroll */}
        <section>
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 ml-1">Key Performance</h2>
          <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
            {data?.stats?.map((stat: any) => (
              <div 
                key={stat.name}
                className="min-w-[200px] p-5 rounded-2xl bg-[#0A0A0A] border border-white/5 space-y-3"
              >
                <div className="text-[9px] uppercase tracking-widest text-white/40">{stat.name}</div>
                <div className="text-2xl font-serif text-[#C5A165]">{stat.value}</div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-[#10b981]">
                  <ArrowUpRight size={10} />
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <section className="space-y-4">
           <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/30 ml-1">Acquisition Trends</h2>
           <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
              <div className="flex items-end gap-2 h-32">
                {data?.weeklySales?.map((item: any, i: number) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.sales / 2300000) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-[#C5A165]/10 to-[#C5A165] rounded-t-sm"
                    />
                    <span className="text-[8px] text-white/20 font-mono">{item.day}</span>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Inquiries Section with Swipeable Cards */}
        <section className="space-y-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/30 ml-1">Priority Leads</h2>
          <div className="space-y-3">
            {data?.recentInquiries?.map((inquiry: any) => (
              <motion.div 
                key={inquiry.id}
                {...handlers}
                className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden active:scale-[0.98] transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold mb-1">{inquiry.name}</h3>
                    <p className="text-[10px] text-white/40 mb-3">{inquiry.interest}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/60 font-mono">{inquiry.status}</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/60 font-mono">1h ago</span>
                    </div>
                  </div>
                  <button className="p-2 text-white/20">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Status Breakdown */}
        <section className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
           <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-[#C5A165]" />
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/60">Inventory Status</h2>
           </div>
           <div className="grid grid-cols-2 gap-y-6">
              {Object.entries(data?.inventoryStatus || {}).map(([key, value]: any) => (
                <div key={key}>
                  <div className="text-[8px] uppercase tracking-widest text-white/30 mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                  <div className="text-lg font-mono font-bold">{value}</div>
                </div>
              ))}
           </div>
        </section>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A0A0A]/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 z-40">
        {[
          { icon: LayoutDashboard, label: 'Dash', active: true },
          { icon: Car, label: 'Inv', active: false },
          { icon: MessageSquare, label: 'Lead', active: false },
          { icon: Settings, label: 'Admin', active: false },
        ].map((item) => (
          <button 
            key={item.label}
            onClick={triggerHaptic}
            className={`flex flex-col items-center gap-1.5 transition-all ${item.active ? 'text-[#C5A165]' : 'text-white/30'}`}
          >
            <item.icon size={20} />
            <span className="text-[9px] font-medium tracking-tighter uppercase">{item.label}</span>
            {item.active && <div className="w-1 h-1 rounded-full bg-[#C5A165] absolute -bottom-1" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
