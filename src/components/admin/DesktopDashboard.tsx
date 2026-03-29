'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  Settings, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DesktopDashboard() {
  const { data: vehicles, error, isLoading } = useSWR('/api/admin/vehicles', fetcher);
  const { mutate } = useSWRConfig();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently remove this asset?')) return;
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

  const filtered = vehicles?.filter((v: any) => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#F9F9F9] font-sans selection:bg-[#C5A165]/30">
      {/* Fixed Sidebar */}
      <aside className="w-[280px] border-r border-white/5 bg-[#0A0A0A] flex flex-col fixed h-screen z-20">
        <div className="p-10 border-b border-white/5">
          <div className="font-serif text-2xl tracking-[0.2em] font-bold italic">MINT.LUXE</div>
          <div className="text-[10px] text-white/40 tracking-[0.2em] mt-2 uppercase font-black">Command Center</div>
        </div>

        <nav className="flex-1 py-10 px-6 space-y-3">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'Inventory', icon: Car, active: false },
            { name: 'Inquiries', icon: MessageSquare, active: false },
            { name: 'Settings', icon: Settings, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group ${
                item.active ? 'bg-white/5 text-[#C5A165]' : 'text-white/20 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={item.active ? 'text-[#C5A165]' : 'text-inherit'} />
              <span className="text-sm font-bold tracking-widest uppercase">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[280px] p-12 relative">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tight italic">Asset Management</h1>
            <p className="text-white/30 text-sm mt-2 font-medium tracking-wide">Curating the exceptional at scale.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Global Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#C5A165]/30 transition-all w-80"
              />
            </div>
            <button 
              onClick={() => { setEditingVehicle(null); setIsFormOpen(true); }}
              className="flex items-center gap-3 px-6 py-3 bg-[#C5A165] text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_10px_20px_rgba(197,161,101,0.2)]"
            >
              <Plus size={18} strokeWidth={3} />
              Inject Asset
            </button>
          </div>
        </header>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {isLoading ? (
              [1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white/5 rounded-[2.5rem] animate-pulse" />)
            ) : filtered?.map((vehicle: any) => (
              <motion.div 
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#C5A165]/20 transition-all duration-500 relative"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-8">
                     <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A165] font-black">{vehicle.brand}</span>
                     <h2 className="text-2xl font-serif font-bold italic">{vehicle.name}</h2>
                  </div>
                </div>
                
                <div className="p-8 flex justify-between items-center border-t border-white/5">
                  <div className="text-xl font-mono text-[#C5A165] font-bold">{vehicle.price}</div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setEditingVehicle(vehicle); setIsFormOpen(true); }}
                      className="p-3 bg-white/5 rounded-xl hover:bg-[#C5A165] hover:text-black transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      className="p-3 bg-white/5 rounded-xl hover:bg-red-500 transition-all"
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

      {/* Slide-over Form Panel (Desktop) */}
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
              className="fixed right-0 top-0 bottom-0 w-[600px] bg-[#0A0A0A] border-l border-white/5 z-[60] shadow-2xl p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif font-bold italic">{editingVehicle ? 'Edit Masterpiece' : 'Inject New Asset'}</h2>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto pr-4 space-y-10 custom-scrollbar">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A165] font-black">Brand</label>
                      <input name="brand" placeholder="Ferrari" defaultValue={editingVehicle?.brand} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165]" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A165] font-black">Model Name</label>
                      <input name="name" placeholder="LaFerrari" defaultValue={editingVehicle?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165]" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Year</label>
                      <input name="year" type="number" defaultValue={editingVehicle?.year} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165]" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Valuation</label>
                      <input name="price" defaultValue={editingVehicle?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165]" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Curation Narrative</label>
                    <textarea name="description" rows={5} defaultValue={editingVehicle?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165]" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Showcase Image URL</label>
                    <input name="image" defaultValue={editingVehicle?.image} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#C5A165]" />
                  </div>

                  <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-[#C5A165] font-black">Technical Specifications</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                       {['engine', 'power', 'acceleration', 'topSpeed', 'transmission', 'mileage', 'exteriorColor', 'interiorColor', 'driveTrain', 'fuelType'].map((spec) => (
                         <div key={spec} className="space-y-1">
                           <label className="text-[8px] uppercase tracking-widest text-white/20 font-bold capitalize">{spec.replace(/([A-Z])/g, ' $1')}</label>
                           <input 
                            name={spec} 
                            defaultValue={editingVehicle?.specs?.[spec]} 
                            className="w-full bg-transparent border-b border-white/10 py-1 text-sm focus:outline-none focus:border-[#C5A165] transition-colors" 
                           />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 bg-[#C5A165] text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[0.99] transition-transform"
                >
                  <Save size={18} />
                  Confirm and Authorize
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
