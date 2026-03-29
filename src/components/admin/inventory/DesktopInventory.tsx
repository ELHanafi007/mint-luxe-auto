'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X,
  Camera,
  Save,
  Filter,
  Check,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DesktopInventory() {
  const { data: vehicles, error, isLoading } = useSWR('/api/admin/vehicles', fetcher);
  const { mutate } = useSWRConfig();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently remove this asset from the digital showroom?')) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/vehicles');
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
  };

  const filtered = vehicles?.filter((v: any) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                         v.brand.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-500 ${isFormOpen ? 'mr-[600px]' : ''} p-12`}>
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tight italic">Inventory Command</h1>
            <p className="text-white/30 text-sm mt-2 font-medium tracking-wide uppercase tracking-[0.1em]">Managing the Exceptional</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
              {['All', 'Available', 'Sold'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    statusFilter === status ? 'bg-[#C5A165] text-black shadow-lg' : 'text-white/40 hover:text-white'
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
                placeholder="Locate Asset..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#C5A165]/30 transition-all w-64 placeholder:text-white/10"
              />
            </div>
            <button 
              onClick={() => { setEditingVehicle(null); setIsFormOpen(true); }}
              className="flex items-center gap-3 px-8 py-3 bg-[#C5A165] text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_10px_20px_rgba(197,161,101,0.2)]"
            >
              <Plus size={18} strokeWidth={3} />
              New Injection
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white/5 rounded-[3rem] animate-pulse" />)
            ) : filtered?.length === 0 ? (
              <div className="col-span-full text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-white/20 text-lg font-serif italic uppercase tracking-widest">Showroom Floor is Vacant</p>
              </div>
            ) : filtered?.map((vehicle: any) => (
              <motion.div 
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#C5A165]/20 transition-all duration-500 relative shadow-2xl"
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8">
                     <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black">{vehicle.brand}</span>
                     <h2 className="text-3xl font-serif font-bold italic tracking-tight">{vehicle.name}</h2>
                  </div>
                  <div className={`absolute top-8 right-8 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                    vehicle.status === 'Available' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {vehicle.status}
                  </div>
                </div>
                
                <div className="p-10 flex justify-between items-center border-t border-white/5">
                  <div className="text-2xl font-mono text-[#C5A165] font-bold tracking-tighter">{vehicle.price}</div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setEditingVehicle(vehicle); setIsFormOpen(true); }}
                      className="p-4 bg-white/5 rounded-2xl hover:bg-[#C5A165] hover:text-black transition-all group/btn"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      className="p-4 bg-white/5 rounded-2xl hover:bg-red-500 transition-all group/btn"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Slide-over Side Panel */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[600px] bg-[#0A0A0A] border-l border-white/5 z-[60] shadow-[-40px_0_80px_rgba(0,0,0,0.5)] p-12 flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center mb-12 shrink-0">
                <div>
                  <h2 className="text-3xl font-serif font-bold italic">{editingVehicle ? 'Edit Masterpiece' : 'Inject New Asset'}</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black mt-1">Asset Authorization Panel</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white/40 hover:text-white border border-white/5"><X size={24} /></button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto pr-4 space-y-12 custom-scrollbar no-scrollbar">
                <div className="aspect-video bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-[#C5A165]/30 transition-all relative overflow-hidden">
                  {editingVehicle?.image ? (
                    <img src={editingVehicle.image} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                  ) : <Camera size={40} className="text-white/10 group-hover:text-[#C5A165]/40 transition-colors" />}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-black group-hover:text-white/40 transition-colors relative z-10">Link Asset Media</span>
                  <input type="hidden" name="image" defaultValue={editingVehicle?.image || "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"} />
                </div>

                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A165] font-black ml-1">Brand</label>
                      <input name="brand" placeholder="Ferrari" defaultValue={editingVehicle?.brand} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A165] font-black ml-1">Model Name</label>
                      <input name="name" placeholder="LaFerrari" defaultValue={editingVehicle?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-1">Year of Origin</label>
                      <input name="year" type="number" defaultValue={editingVehicle?.year} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-1">Asset Valuation</label>
                      <input name="price" defaultValue={editingVehicle?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all font-medium font-mono" required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-1">Current Status</label>
                    <select name="status" defaultValue={editingVehicle?.status || 'Available'} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#C5A165] transition-all appearance-none font-medium">
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-1">Curation Narrative</label>
                    <textarea name="description" rows={6} defaultValue={editingVehicle?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-[#C5A165] transition-all leading-relaxed" placeholder="The story of this machine..." />
                  </div>

                  <div className="bg-white/5 rounded-[3rem] p-10 border border-white/5 space-y-10">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                       <LayoutGrid size={20} className="text-[#C5A165]" />
                       <h3 className="text-sm uppercase tracking-[0.3em] text-white font-black">Engineering Specifications</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                       {['engine', 'power', 'acceleration', 'topSpeed', 'transmission', 'mileage', 'exteriorColor', 'interiorColor', 'driveTrain', 'fuelType'].map((spec) => (
                         <div key={spec} className="space-y-2">
                           <label className="text-[8px] uppercase tracking-widest text-white/20 font-black block capitalize ml-1">{spec.replace(/([A-Z])/g, ' $1')}</label>
                           <input 
                            name={spec} 
                            defaultValue={editingVehicle?.specs?.[spec]} 
                            className="w-full bg-transparent border-b border-white/10 py-2 text-sm focus:outline-none focus:border-[#C5A165] transition-all placeholder:text-white/5 font-medium" 
                            placeholder="..."
                           />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-8 bg-[#C5A165] text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-[0_30px_60px_rgba(197,161,101,0.2)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4 mb-8"
                >
                  <Save size={20} strokeWidth={3} />
                  Authorize Record Update
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
