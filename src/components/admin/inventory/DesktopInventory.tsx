'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Search, X, Camera, Save, Filter, ChevronRight, LayoutDashboard, MessageSquare, Settings, LogOut } from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DesktopInventory() {
  const { data: vehicles, isLoading } = useSWR('/api/admin/vehicles', fetcher);
  const { mutate } = useSWRConfig();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently remove this asset?')) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/vehicles');
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    await fetch('/api/admin/vehicles', {
      method: editingVehicle ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingVehicle ? { ...editingVehicle, ...data, year: parseInt(data.year as string) } : { ...data, year: parseInt(data.year as string) })
    });
    
    mutate('/api/admin/vehicles');
    setIsFormOpen(false);
  };

  const filtered = vehicles?.filter((v: any) => 
    v.name.toLowerCase().includes(search.toLowerCase()) || v.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Static Sidebar for Desktop */}
      <aside className="w-72 border-r border-white/5 bg-[#0A0A0A] flex flex-col fixed h-screen">
        <div className="p-10 border-b border-white/5">
          <div className="font-serif text-2xl font-bold tracking-tight italic text-[#C5A165]">MINT.LUXE</div>
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mt-2">Administrative Command</div>
        </div>
        <nav className="flex-1 py-10 px-6 space-y-2">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 text-[#C5A165] font-bold tracking-widest uppercase text-xs">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/30 hover:text-white transition-all font-bold tracking-widest uppercase text-xs">
            <MessageSquare size={18} /> Inquiries
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/30 hover:text-white transition-all font-bold tracking-widest uppercase text-xs">
            <Settings size={18} /> Settings
          </button>
        </nav>
        <div className="p-8 border-t border-white/5">
          <button className="flex items-center gap-4 text-white/20 hover:text-red-500 transition-colors font-bold uppercase text-[10px] tracking-widest">
            <LogOut size={16} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ml-72 p-12 transition-all duration-500 ${isFormOpen ? 'mr-[500px]' : ''}`}>
        <header className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-serif font-bold italic tracking-tight">Showroom Control</h1>
            <p className="text-white/30 text-sm mt-3 uppercase tracking-[0.2em] font-medium">Curating the Exceptional</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                placeholder="Search inventory..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-8 text-sm focus:outline-none focus:border-[#C5A165]/30 w-80 transition-all"
              />
            </div>
            <button onClick={() => { setEditingVehicle(null); setIsFormOpen(true); }} className="bg-[#C5A165] text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
              <Plus size={18} strokeWidth={3} /> Inject New Asset
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10">
          {isLoading ? (
            [1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-white/5 rounded-[3rem] animate-pulse" />)
          ) : filtered?.map((v: any) => (
            <motion.div key={v.id} layout className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] overflow-hidden group hover:border-[#C5A165]/20 transition-all duration-700 shadow-2xl relative">
              <div className="h-72 relative overflow-hidden">
                <img src={v.image} className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
                <div className="absolute bottom-8 left-10">
                  <div className="text-[10px] uppercase font-black text-[#C5A165] tracking-[0.3em] mb-1">{v.brand}</div>
                  <div className="text-3xl font-serif font-bold italic tracking-tight">{v.name}</div>
                </div>
              </div>
              <div className="p-10 flex justify-between items-center border-t border-white/5 bg-white/[0.01]">
                <div className="text-2xl font-mono font-bold text-[#C5A165] tracking-tighter">{v.price}</div>
                <div className="flex gap-4">
                  <button onClick={() => { setEditingVehicle(v); setIsFormOpen(true); }} className="p-4 bg-white/5 rounded-2xl hover:bg-[#C5A165] hover:text-black transition-all"><Edit3 size={20} /></button>
                  <button onClick={() => handleDelete(v.id)} className="p-4 bg-white/5 rounded-2xl hover:bg-red-500 transition-all"><Trash2 size={20} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Slide-over Side Panel */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]" onClick={() => setIsFormOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-[500px] bg-[#0A0A0A] border-l border-white/5 z-[60] shadow-2xl p-12 overflow-y-auto no-scrollbar flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-3xl font-serif font-bold italic tracking-tight">{editingVehicle ? 'Refine Asset' : 'New Injection'}</h2>
                <button onClick={() => setIsFormOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/5"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-10 pb-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black text-[#C5A165] tracking-widest block ml-1">Asset Media URL</label>
                  <input name="image" defaultValue={editingVehicle?.image} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A165] transition-all" required />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Brand</label>
                    <input name="brand" defaultValue={editingVehicle?.brand} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A165] transition-all" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Model</label>
                    <input name="name" defaultValue={editingVehicle?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A165] transition-all" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Year</label>
                    <input name="year" type="number" defaultValue={editingVehicle?.year} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A165] transition-all" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Valuation</label>
                    <input name="price" defaultValue={editingVehicle?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A165] transition-all font-mono" required />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Narrative</label>
                  <textarea name="description" rows={6} defaultValue={editingVehicle?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-[#C5A165] transition-all leading-relaxed" />
                </div>

                <button type="submit" className="w-full py-6 bg-[#C5A165] text-black rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4">
                  <Save size={20} strokeWidth={3} /> Authorize Record Update
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
