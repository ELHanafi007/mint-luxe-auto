'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  LayoutGrid, 
  List, 
  ChevronRight, 
  X,
  Camera,
  Check,
  ChevronDown
} from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MobileDashboard() {
  const { data: vehicles, error, isLoading } = useSWR('/api/admin/vehicles', fetcher);
  const { mutate } = useSWRConfig();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [search, setSearch] = useState('');

  // Handle CRUD actions
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this asset?')) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: 'DELETE' });
    mutate('/api/admin/vehicles');
    if (navigator.vibrate) navigator.vibrate(100);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    // Simplification for the example: nested specs
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

  const filtered = vehicles?.filter((v: any) => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#C5A165]/30">
      {/* Header with Search */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 px-6 pt-12 pb-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">Showroom</h1>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">Control Panel</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Admin" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C5A165] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C5A165]/30 transition-all placeholder:text-white/10"
          />
        </div>
      </header>

      {/* Main Inventory List */}
      <main className="p-6 pb-32">
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse" />)
            ) : filtered?.map((vehicle: any) => (
              <motion.div 
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group"
              >
                {/* Image & Main Info */}
                <div className="h-48 relative overflow-hidden">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A165] font-bold">{vehicle.brand}</span>
                    <h2 className="text-xl font-serif font-bold">{vehicle.name}</h2>
                  </div>
                  <div className={`absolute top-4 right-6 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 ${
                    vehicle.status === 'Available' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-white/5 text-white/40'
                  }`}>
                    {vehicle.status}
                  </div>
                </div>

                {/* Mobile-First Actions Bar */}
                <div className="px-6 py-5 flex justify-between items-center border-t border-white/5">
                  <div className="text-lg font-mono font-bold text-[#C5A165]">{vehicle.price}</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingVehicle(vehicle); setIsFormOpen(true); }}
                      className="p-3 bg-white/5 rounded-2xl active:bg-[#C5A165]/20 active:text-[#C5A165] transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      className="p-3 bg-red-500/10 text-red-500 rounded-2xl active:bg-red-500 active:text-white transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={() => { setEditingVehicle(null); setIsFormOpen(true); }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#C5A165] rounded-3xl shadow-[0_15px_30px_rgba(197,161,101,0.3)] flex items-center justify-center text-black active:scale-90 transition-transform z-50"
      >
        <Plus size={32} strokeWidth={2.5} />
      </button>

      {/* Mobile CRUD Bottom Sheet (Form) */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[92vh] bg-[#0A0A0A] rounded-t-[3rem] border-t border-white/10 z-[70] overflow-hidden flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Form Handle */}
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-4 shrink-0" />
              
              <div className="flex justify-between items-center px-8 mb-6 shrink-0">
                <h2 className="text-2xl font-serif font-bold italic">{editingVehicle ? 'Refine Asset' : 'Inject New Asset'}</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto px-8 pb-12 space-y-8 scroll-smooth no-scrollbar">
                {/* Visual Image Uploader (Simulated) */}
                <div className="aspect-[16/9] bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 active:border-[#C5A165]/50 transition-colors">
                  <Camera size={32} className="text-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Upload Showcase Image</span>
                  <input type="hidden" name="image" defaultValue={editingVehicle?.image || "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"} />
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A165] font-black mb-2 block">Brand & Model</label>
                    <div className="flex gap-3">
                      <input name="brand" placeholder="Ferrari" defaultValue={editingVehicle?.brand} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165] transition-colors" required />
                      <input name="name" placeholder="SF90 Spider" defaultValue={editingVehicle?.name} className="flex-[2] bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165] transition-colors" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-2 block">Year</label>
                      <input name="year" type="number" placeholder="2026" defaultValue={editingVehicle?.year} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165] transition-colors" required />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-2 block">Price Tag</label>
                      <input name="price" placeholder="$585,000" defaultValue={editingVehicle?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165] transition-colors" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-2 block">Curation Narrative</label>
                    <textarea name="description" placeholder="The narrative of the machine..." defaultValue={editingVehicle?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-[#C5A165] transition-colors" />
                  </div>

                  {/* Technical Specs Accordion (Simplified) */}
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-[#C5A165] font-bold mb-6 flex items-center gap-2">
                       <LayoutGrid size={14} /> Technical Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                       {['engine', 'power', 'acceleration', 'topSpeed', 'transmission', 'mileage', 'exteriorColor', 'interiorColor', 'driveTrain', 'fuelType'].map((spec) => (
                         <div key={spec}>
                           <label className="text-[8px] uppercase tracking-widest text-white/20 font-bold mb-1 block capitalize">{spec.replace(/([A-Z])/g, ' $1')}</label>
                           <input 
                            name={spec} 
                            placeholder="..." 
                            defaultValue={editingVehicle?.specs?.[spec]} 
                            className="w-full bg-black/30 border border-white/5 rounded-xl p-2 text-xs focus:outline-none focus:border-[#C5A165]" 
                           />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 bg-[#C5A165] text-black rounded-[2rem] font-bold text-lg shadow-[0_15px_30px_rgba(197,161,101,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {editingVehicle ? 'Authorize Update' : 'Finalize Injection'}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
