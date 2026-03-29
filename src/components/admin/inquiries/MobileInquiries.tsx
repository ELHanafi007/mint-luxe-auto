'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search, Trash2, CheckCircle, Mail, Phone, X, ChevronRight } from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';
import MobileAdminLayout from '../layout/MobileAdminLayout';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MobileInquiries() {
  const { data: inquiries, isLoading } = useSWR('/api/admin/inquiries', fetcher);
  const { mutate } = useSWRConfig();
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [search, setSearch] = useState('');

  const filtered = inquiries?.filter((i: any) => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.interest.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    mutate('/api/admin/inquiries');
    setSelectedInquiry(null);
  };

  return (
    <MobileAdminLayout>
      <div className="px-6 py-8">
        <h1 className="text-3xl font-serif font-bold italic mb-8">Client Leads</h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Locate lead..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none"
          />
        </div>

        <div className="space-y-3">
          {isLoading ? (
            [1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />)
          ) : filtered?.map((inquiry: any) => (
            <motion.div 
              key={inquiry.id}
              onClick={() => setSelectedInquiry(inquiry)}
              className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 flex items-center justify-between active:scale-[0.98] transition-transform"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm">{inquiry.name}</h3>
                  {inquiry.status === 'New' && <div className="w-1.5 h-1.5 rounded-full bg-[#C5A165]" />}
                </div>
                <div className="text-[10px] uppercase font-black text-white/20 tracking-widest">{inquiry.interest}</div>
              </div>
              <ChevronRight size={18} className="text-white/10" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedInquiry && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[110]" onClick={() => setSelectedInquiry(null)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-x-0 bottom-0 bg-[#0A0A0A] rounded-t-[3rem] border-t border-white/10 z-[120] p-10 pb-16 space-y-8">
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-4" />
              <div>
                <h2 className="text-2xl font-serif font-bold italic">{selectedInquiry.name}</h2>
                <p className="text-[10px] font-black uppercase text-[#C5A165] tracking-widest mt-1">Interest: {selectedInquiry.interest}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 italic text-sm text-white/60 leading-relaxed">
                "{selectedInquiry.message}"
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <Mail size={14} className="text-[#C5A165]" /> {selectedInquiry.email}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <Phone size={14} className="text-[#C5A165]" /> {selectedInquiry.phone || 'Private'}
                </div>
              </div>

              <div className="pt-4">
                {selectedInquiry.status === 'New' && (
                  <button onClick={() => handleUpdateStatus(selectedInquiry.id, 'Replied')} className="w-full py-5 bg-[#C5A165] text-black rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3">
                    <CheckCircle size={18} /> Mark Responded
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MobileAdminLayout>
  );
}
