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
  ChevronRight,
  Phone
} from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MobileInquiries() {
  const { data: inquiries, error, isLoading } = useSWR('/api/admin/inquiries', fetcher);
  const { mutate } = useSWRConfig();
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const handleUpdateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    mutate('/api/admin/inquiries');
    if (selectedInquiry?.id === id) setSelectedInquiry({ ...selectedInquiry, status });
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this inquiry?')) return;
    await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/inquiries');
    setSelectedInquiry(null);
    if (navigator.vibrate) navigator.vibrate(100);
  };

  const filtered = inquiries?.filter((i: any) => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.interest.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 px-6 pt-12 pb-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">Leads</h1>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">Inquiry Management</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#C5A165]/10 border border-[#C5A165]/20 flex items-center justify-center">
             <MessageSquare size={18} className="text-[#C5A165]" />
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C5A165]/30 transition-all placeholder:text-white/10"
          />
        </div>
      </header>

      {/* Leads List */}
      <main className="p-6 space-y-4 pb-32">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [1,2,3,4].map(i => <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />)
          ) : filtered?.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare size={48} className="mx-auto mb-4 text-white/5" />
              <p className="text-white/20 text-sm italic tracking-widest">No matching inquiries found.</p>
            </div>
          ) : filtered?.map((inquiry: any) => (
            <motion.div 
              key={inquiry.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedInquiry(inquiry)}
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 active:scale-[0.98] transition-transform relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold">{inquiry.name}</h2>
                    {inquiry.status === 'New' && (
                      <div className="w-2 h-2 rounded-full bg-[#C5A165] animate-pulse" />
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C5A165] font-black opacity-80 mb-3">{inquiry.interest}</p>
                  
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded bg-white/5 text-[8px] font-mono uppercase tracking-tighter ${
                      inquiry.status === 'New' ? 'text-white' : 'text-white/30'
                    }`}>
                      {inquiry.status}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/20 font-mono">
                      {new Date(inquiry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-white/10 mt-1" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedInquiry && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
              onClick={() => setSelectedInquiry(null)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[85vh] bg-[#0A0A0A] rounded-t-[3rem] border-t border-white/10 z-[70] overflow-hidden flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-4 shrink-0" />
              
              <div className="flex justify-between items-center px-8 mb-8 shrink-0">
                <div>
                  <h2 className="text-2xl font-serif font-bold italic">{selectedInquiry.name}</h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A165] font-black mt-1">Lead Analysis</p>
                </div>
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 pb-12 space-y-8 no-scrollbar">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <label className="text-[8px] uppercase tracking-widest text-white/20 font-black mb-2 block">Contact Email</label>
                    <div className="flex items-center gap-2 text-xs truncate">
                      <Mail size={12} className="text-[#C5A165]" />
                      {selectedInquiry.email}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <label className="text-[8px] uppercase tracking-widest text-white/20 font-black mb-2 block">Phone Line</label>
                    <div className="flex items-center gap-2 text-xs truncate">
                      <Phone size={12} className="text-[#C5A165]" />
                      {selectedInquiry.phone || 'Not Provided'}
                    </div>
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/20 font-black">Transmission</label>
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 italic text-sm leading-relaxed text-white/80">
                    "{selectedInquiry.message}"
                  </div>
                </div>

                {/* Interest Spec */}
                <div className="bg-[#C5A165]/5 rounded-3xl p-6 border border-[#C5A165]/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <label className="text-[8px] uppercase tracking-widest text-[#C5A165] font-black mb-1 block">Vehicle Interest</label>
                      <div className="text-xl font-serif font-bold italic">{selectedInquiry.interest}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#C5A165]/40 italic">Ref: {selectedInquiry.id}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                  {selectedInquiry.status === 'New' && (
                    <button 
                      onClick={() => handleUpdateStatus(selectedInquiry.id, 'Replied')}
                      className="w-full py-5 bg-[#C5A165] text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                      <CheckCircle size={18} strokeWidth={3} />
                      Authorize Response Marker
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="w-full py-5 bg-red-500/10 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-transform border border-red-500/20"
                  >
                    <Trash2 size={18} />
                    Purge Record
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
