'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  LayoutGrid, 
  X,
  Camera,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MobileInventory() {
  const { data: vehicles, error, isLoading } = useSWR('/api/admin/vehicles', fetcher);
  const { mutate } = useSWRConfig();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently decommission this asset?')) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/vehicles');
    if (navigator.vibrate) navigator.vibrate(100);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    const vehicleData = {
      ...payload,
      year: parseInt(payload.year as string),
      specs: {
        engine: payload.engine,
        power: payload.power,
        acceleration: payload.acceleration,
        topSpeed: payload.topSpeed,
        transmission: payload.transmission,
        mileage: payload.mileage,
        exteriorColor: payload.exteriorColor,
        interiorColor: payload.interiorColor,
        driveTrain: payload.driveTrain,
        fuelType: payload.fuelType
      }
    };

    const method = editingVehicle ? 'PUT' : 'POST';
    const body = editingVehicle ? { ...vehicleData, id: editingVehicle.id } : vehicleData;

    await fetch('/api/admin/vehicles', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    mutate('/api/admin/vehicles');
    setIsFormOpen(false);
    setEditingVehicle(null);
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
  };

  const filtered = vehicles?.filter((v: any) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                         v.brand.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 px-6 pt-12 pb-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight italic">Showroom</h1>
            <p className="text-[10px] text-[#C5A165] uppercase tracking-[0.3em] mt-1 font-black underline decoration-1 underline-offset-4">Inventory Control</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setStatusFilter(prev => prev === 'Available' ? 'All' : 'Available')}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${
                statusFilter === 'Available' ? 'bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]' : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search the collection..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C5A165]/30 transition-all placeholder:text-white/10"
          />
        </div>
      </header>

      {/* Grid */}
      <main className="p-6 pb-32 space-y-6">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [1,2,3].map(i => <div key={i} className="h-72 bg-white/5 rounded-[2.5rem] animate-pulse" />)
          ) : filtered?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/20 text-sm italic tracking-widest uppercase">The floor is clear.</p>
            </div>
          ) : filtered?.map((vehicle: any) => (
            <motion.div 
              key={vehicle.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
              <div className="h-56 relative overflow-hidden">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-60 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A165] font-black">{vehicle.brand}</span>
                  <h2 className="text-2xl font-serif font-bold italic">{vehicle.name}</h2>
                </div>
                <div className={`absolute top-6 right-8 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10 ${
                  vehicle.status === 'Available' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-red-500/20 text-red-500'
                }`}>
                  {vehicle.status}
                </div>
              </div>

              <div className="px-8 py-6 flex justify-between items-center border-t border-white/5">
                <div className="text-xl font-mono font-bold text-[#C5A165] tracking-tighter">{vehicle.price}</div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => { setEditingVehicle(vehicle); setIsFormOpen(true); }}
                    className="p-4 bg-white/5 rounded-2xl active:bg-[#C5A165] active:text-black transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(vehicle.id)}
                    className="p-4 bg-red-500/10 text-red-500 rounded-2xl active:bg-red-500 active:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* FAB */}
      <button 
        onClick={() => { setEditingVehicle(null); setIsFormOpen(true); }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#C5A165] rounded-3xl shadow-[0_20px_40px_rgba(197,161,101,0.3)] flex items-center justify-center text-black active:scale-90 transition-transform z-50 border-4 border-black"
      >
        <Plus size={32} strokeWidth={3} />
      </button>

      {/* Form Sheet */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60]"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[92vh] bg-[#0A0A0A] rounded-t-[3.5rem] border-t border-white/10 z-[70] overflow-hidden flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-5 shrink-0" />
              
              <div className="flex justify-between items-center px-10 mb-8 shrink-0">
                <div>
                  <h2 className="text-3xl font-serif font-bold italic">{editingVehicle ? 'Refine Asset' : 'New Injection'}</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black mt-1">Showroom Database</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto px-10 pb-16 space-y-10 no-scrollbar">
                <div className="aspect-video bg-white/5 rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 active:border-[#C5A165]/50 transition-colors">
                  <Camera size={40} className="text-white/10" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black">Link High-Res Media</span>
                  <input type="hidden" name="image" defaultValue={editingVehicle?.image || "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"} />
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black ml-1 block">Identification</label>
                    <div className="flex gap-4">
                      <input name="brand" placeholder="Ferrari" defaultValue={editingVehicle?.brand} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                      <input name="name" placeholder="Purosangue" defaultValue={editingVehicle?.name} className="flex-[2] bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-1 block">Vintage</label>
                      <input name="year" type="number" placeholder="2026" defaultValue={editingVehicle?.year} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-1 block">Valuation</label>
                      <input name="price" placeholder="$425,000" defaultValue={editingVehicle?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-1 block">Status</label>
                    <select name="status" defaultValue={editingVehicle?.status || 'Available'} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all appearance-none font-medium">
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-1 block">Narrative</label>
                    <textarea name="description" placeholder="Describe the provenance and state of the machine..." defaultValue={editingVehicle?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[150px] focus:outline-none focus:border-[#C5A165] transition-all leading-relaxed" />
                  </div>

                  <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                       <LayoutGrid size={16} className="text-[#C5A165]" />
                       <h3 className="text-xs uppercase tracking-[0.2em] text-white font-black">Engineering Specifications</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                       {['engine', 'power', 'acceleration', 'topSpeed', 'transmission', 'mileage', 'exteriorColor', 'interiorColor', 'driveTrain', 'fuelType'].map((spec) => (
                         <div key={spec}>
                           <label className="text-[8px] uppercase tracking-[0.2em] text-white/20 font-black mb-2 block capitalize">{spec.replace(/([A-Z])/g, ' $1')}</label>
                           <input 
                            name={spec} 
                            placeholder="..." 
                            defaultValue={editingVehicle?.specs?.[spec]} 
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C5A165] transition-all" 
                           />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-6 bg-[#C5A165] text-black rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(197,161,101,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {editingVehicle ? 'Confirm Update' : 'Authorize Injection'}
                  <Check size={20} strokeWidth={3} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
