'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  CheckCircle, 
  User, 
  Mail, 
  Calendar,
  X,
  ExternalLink,
  Phone,
  Clock,
  Filter,
  ChevronRight
} from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DesktopInquiries() {
  const { data: inquiries, error, isLoading } = useSWR('/api/admin/inquiries', fetcher);
  const { mutate } = useSWRConfig();
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const handleUpdateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    mutate('/api/admin/inquiries');
    if (selectedInquiry?.id === id) setSelectedInquiry({ ...selectedInquiry, status });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this inquiry from the ledger?')) return;
    await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/inquiries');
    setSelectedInquiry(null);
  };

  const filtered = inquiries?.filter((i: any) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || 
                         i.interest.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Main List Stage */}
      <div className={`flex-1 transition-all duration-500 ${selectedInquiry ? 'mr-[500px]' : ''} p-12`}>
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tight italic text-[#F9F9F9]">Inquiry Ledger</h1>
            <p className="text-white/30 text-sm mt-2 font-medium tracking-wide uppercase tracking-[0.1em]">Managing High-Net-Worth Leads</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
              {['All', 'New', 'Replied'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    filterStatus === status ? 'bg-[#C5A165] text-black shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Locate Lead..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#C5A165]/30 transition-all w-64 placeholder:text-white/10"
              />
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1,2,3,4,5].map(i => <div key={i} className="h-24 bg-white/5 rounded-3xl animate-pulse" />)
            ) : filtered?.length === 0 ? (
              <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
                <MessageSquare size={64} className="mx-auto mb-6 text-white/5" />
                <p className="text-white/20 text-lg font-serif italic">The ledger is currently silent.</p>
              </div>
            ) : filtered?.map((inquiry: any) => (
              <motion.div 
                key={inquiry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`group cursor-pointer p-8 rounded-[2rem] border transition-all duration-500 flex items-center justify-between overflow-hidden relative ${
                  selectedInquiry?.id === inquiry.id 
                    ? 'bg-[#C5A165]/10 border-[#C5A165]/30 shadow-[0_0_40px_rgba(197,161,101,0.1)]' 
                    : 'bg-[#0A0A0A] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-8 relative z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors ${
                    inquiry.status === 'New' ? 'bg-[#C5A165]/10 border-[#C5A165]/20 text-[#C5A165]' : 'bg-white/5 border-white/10 text-white/20'
                  }`}>
                    <User size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold italic group-hover:text-[#C5A165] transition-colors">{inquiry.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#C5A165]/60">{inquiry.interest}</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-[10px] text-white/20 font-mono italic">{new Date(inquiry.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 relative z-10">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    inquiry.status === 'New' 
                      ? 'bg-[#C5A165] text-black border-[#C5A165]' 
                      : 'bg-transparent text-white/30 border-white/10'
                  }`}>
                    {inquiry.status}
                  </div>
                  <ChevronRight size={20} className={`transition-all duration-500 ${selectedInquiry?.id === inquiry.id ? 'translate-x-2 text-[#C5A165]' : 'text-white/10 group-hover:text-white/30'}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Side Detail Panel */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[500px] bg-[#0A0A0A] border-l border-white/5 z-30 shadow-[-40px_0_80px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="p-12 border-b border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black">Lead Dossier</span>
                <h2 className="text-3xl font-serif font-bold italic mt-2">{selectedInquiry.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
              {/* Contact Grid */}
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#C5A165]/10 flex items-center justify-center text-[#C5A165]">
                      <Mail size={18} />
                    </div>
                    <div className="flex-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/20 font-black block">Encrypted Email</label>
                      <div className="text-sm font-medium">{selectedInquiry.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#C5A165]/10 flex items-center justify-center text-[#C5A165]">
                      <Phone size={18} />
                    </div>
                    <div className="flex-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/20 font-black block">Direct Line</label>
                      <div className="text-sm font-medium">{selectedInquiry.phone || 'Private Record'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Narrative */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-[#C5A165]" />
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-black">Client Transmission</label>
                </div>
                <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 relative italic text-lg leading-relaxed text-white/80 font-serif">
                  <div className="absolute top-6 left-6 text-4xl text-[#C5A165]/20 font-serif">“</div>
                  {selectedInquiry.message}
                  <div className="absolute bottom-6 right-6 text-4xl text-[#C5A165]/20 font-serif rotate-180">“</div>
                </div>
              </div>

              {/* Interest Unit */}
              <div className="bg-gradient-to-br from-[#C5A165]/10 to-transparent rounded-[2.5rem] p-10 border border-[#C5A165]/20">
                <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black mb-2 block">Acquisition Target</label>
                <div className="text-3xl font-serif font-bold italic tracking-tight">{selectedInquiry.interest}</div>
                <button className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-widest font-black text-white/40 hover:text-[#C5A165] transition-all">
                  <ExternalLink size={12} /> View Asset Data
                </button>
              </div>

              {/* Operations */}
              <div className="space-y-4">
                {selectedInquiry.status === 'New' && (
                  <button 
                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'Replied')}
                    className="w-full py-6 bg-[#C5A165] text-black rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(197,161,101,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <CheckCircle size={18} strokeWidth={3} />
                    Confirm Communication Dispatch
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="w-full py-6 bg-red-500/10 text-red-500 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  <Trash2 size={18} />
                  Purge from Ledger
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
