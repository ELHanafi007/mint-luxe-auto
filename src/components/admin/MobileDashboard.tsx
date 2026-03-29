'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, Edit2, Trash2, ExternalLink, X, Save, ArrowLeft } from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';
import MobileAdminLayout from '../layout/MobileAdminLayout';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const brands = [
  { name: 'Ferrari', logo: 'https://www.carlogos.org/logo/Ferrari-logo-640x480.png' },
  { name: 'Lamborghini', logo: 'https://www.carlogos.org/logo/Lamborghini-logo-640x480.png' },
  { name: 'Rolls-Royce', logo: 'https://www.carlogos.org/logo/Rolls-Royce-logo-640x480.png' },
  { name: 'Bentley', logo: 'https://www.carlogos.org/logo/Bentley-logo-640x480.png' },
  { name: 'Aston Martin', logo: 'https://www.carlogos.org/logo/Aston-Martin-logo-640x480.png' },
  { name: 'Bugatti', logo: 'https://www.carlogos.org/logo/Bugatti-logo-640x480.png' },
  { name: 'McLaren', logo: 'https://www.carlogos.org/logo/McLaren-logo-640x480.png' },
  { name: 'Porsche', logo: 'https://www.carlogos.org/logo/Porsche-logo-640x480.png' },
];

export default function MobileDashboard() {
  const { data: vehicles, isLoading } = useSWR('/api/admin/vehicles', fetcher);
  const { mutate } = useSWRConfig();
  
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filtered = vehicles?.filter((v: any) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.brand.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand ? v.brand === selectedBrand : true;
    return matchesSearch && matchesBrand;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete asset?')) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/vehicles');
    setIsPopupOpen(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    await fetch('/api/admin/vehicles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...selectedVehicle, ...data, year: parseInt(data.year as string) })
    });
    
    mutate('/api/admin/vehicles');
    setIsEditMode(false);
    setIsPopupOpen(false);
  };

  if (isEditMode) {
    return (
      <div className="min-h-screen bg-black text-white p-6 pt-12">
        <button onClick={() => setIsEditMode(false)} className="flex items-center gap-2 text-white/40 mb-8 font-bold uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-serif font-bold italic mb-8">Refine Asset</h1>
        
        <form onSubmit={handleUpdate} className="space-y-8 pb-20">
          <div className="space-y-4">
            <label className="block text-[10px] uppercase font-black text-[#C5A165] tracking-widest">Visual Representative</label>
            <div className="aspect-video rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <img src={selectedVehicle?.image} className="w-full h-full object-cover" alt="" />
            </div>
            <input name="image" defaultValue={selectedVehicle?.image} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-[#C5A165] outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Brand</label>
              <input name="brand" defaultValue={selectedVehicle?.brand} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Model</label>
              <input name="name" defaultValue={selectedVehicle?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Year</label>
              <input name="year" type="number" defaultValue={selectedVehicle?.year} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Price</label>
              <input name="price" defaultValue={selectedVehicle?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-white/20 tracking-widest block ml-1">Narrative</label>
            <textarea name="description" rows={4} defaultValue={selectedVehicle?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none" />
          </div>

          <button type="submit" className="w-full py-5 bg-[#C5A165] text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
            <Save size={18} /> Authorize Record
          </button>
        </form>
      </div>
    );
  }

  return (
    <MobileAdminLayout>
      <div className="px-6 py-8">
        {/* Brand Scroll - 2 vertical, expanding horizontal */}
        <div className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 ml-1">Portfolio Brands</h2>
          <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            <button 
              onClick={() => setSelectedBrand(null)}
              className={`min-w-[100px] h-20 rounded-2xl border flex items-center justify-center transition-all ${
                selectedBrand === null ? 'bg-white/10 border-[#C5A165]' : 'bg-white/5 border-white/5 opacity-40'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">All</span>
            </button>
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`min-w-[100px] h-20 rounded-2xl border flex items-center justify-center p-4 transition-all ${
                  selectedBrand === brand.name ? 'bg-white/10 border-[#C5A165]' : 'bg-white/5 border-white/5 opacity-40'
                }`}
              >
                <img src={brand.logo} className="w-full h-full object-contain brightness-0 invert" alt={brand.name} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 3 per row */}
        <div className="grid grid-cols-3 gap-3">
          {isLoading ? (
            [1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-white/5 rounded-xl animate-pulse" />)
          ) : filtered?.map((v: any) => (
            <motion.div 
              key={v.id}
              onClick={() => { setSelectedVehicle(v); setIsPopupOpen(true); }}
              className="aspect-square bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden relative active:scale-95 transition-transform"
            >
              <img src={v.image} className="w-full h-full object-cover opacity-60" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-[6px] uppercase font-black text-[#C5A165] truncate tracking-tighter">{v.brand}</div>
                <div className="text-[8px] font-bold truncate leading-none mt-0.5">{v.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[110]"
              onClick={() => setIsPopupOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="fixed inset-x-0 bottom-0 bg-[#0A0A0A] rounded-t-[3rem] border-t border-white/10 z-[120] p-10 pb-16 space-y-4"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <img src={selectedVehicle?.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-[#C5A165] tracking-[0.2em]">{selectedVehicle?.brand}</div>
                  <div className="text-2xl font-serif font-bold italic">{selectedVehicle?.name}</div>
                </div>
              </div>
              
              <button onClick={() => { setIsEditMode(true); setIsPopupOpen(false); }} className="w-full py-5 bg-white/5 rounded-2xl flex items-center gap-4 px-6 text-sm font-bold active:bg-white/10 transition-colors">
                <Edit2 size={18} className="text-[#C5A165]" /> Edit Masterpiece
              </button>
              <button onClick={() => window.open(`/inventory/${selectedVehicle?.id}`, '_blank')} className="w-full py-5 bg-white/5 rounded-2xl flex items-center gap-4 px-6 text-sm font-bold active:bg-white/10 transition-colors">
                <ExternalLink size={18} className="text-[#C5A165]" /> View on Public Site
              </button>
              <button onClick={() => handleDelete(selectedVehicle?.id)} className="w-full py-5 bg-red-500/5 text-red-500 border border-red-500/10 rounded-2xl flex items-center gap-4 px-6 text-sm font-bold active:bg-red-500/10 transition-colors">
                <Trash2 size={18} /> Purge Asset
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MobileAdminLayout>
  );
}
