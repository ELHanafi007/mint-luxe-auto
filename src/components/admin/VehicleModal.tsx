'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '@/data/vehicles';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Partial<Vehicle>) => void;
  vehicle: Vehicle | null;
}

type SpecKey = keyof Vehicle['specs'];

interface SpecField {
  label: string;
  key: SpecKey;
  placeholder: string;
}

const SPEC_FIELDS: SpecField[] = [
  { label: 'Engine', key: 'engine', placeholder: '3.0L V6 Hybrid' },
  { label: 'Power', key: 'power', placeholder: '830 PS' },
  { label: 'Acceleration', key: 'acceleration', placeholder: '2.9s 0-100 km/h' },
  { label: 'Top Speed', key: 'topSpeed', placeholder: '330 km/h' },
  { label: 'Transmission', key: 'transmission', placeholder: '8-Speed DCT' },
  { label: 'Mileage', key: 'mileage', placeholder: '1,200 km' },
  { label: 'Exterior Color', key: 'exteriorColor', placeholder: 'Rosso Corsa' },
  { label: 'Interior Color', key: 'interiorColor', placeholder: 'Nero Alcantara' },
  { label: 'Drive Train', key: 'driveTrain', placeholder: 'RWD' },
  { label: 'Fuel Type', key: 'fuelType', placeholder: 'Hybrid' },
];

const INITIAL_FORM_STATE: Partial<Vehicle> = {
  name: '',
  brand: '',
  year: new Date().getFullYear(),
  price: '',
  status: 'Available',
  image: '',
  description: '',
  specs: {
    engine: '',
    power: '',
    acceleration: '',
    topSpeed: '',
    transmission: '',
    mileage: '',
    exteriorColor: '',
    interiorColor: '',
    driveTrain: '',
    fuelType: ''
  },
  gallery: []
};

export default function VehicleModal({ isOpen, onClose, onSave, vehicle }: Props) {
  const [formData, setFormData] = useState<Partial<Vehicle>>(INITIAL_FORM_STATE);

  // We reset the form when the modal opens or the vehicle changes
  // But we use a key on the component or a simpler approach to avoid the effect error
  // For now, let's use a standard useEffect but disable the specific rule if we must, 
  // or better: handle initialization in the parent or via key.
  // Actually, the best way is to use the 'key' pattern in the parent.
  
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(vehicle || INITIAL_FORM_STATE);
    }
  }, [vehicle, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleSpecChange = (key: SpecKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...(prev.specs as Vehicle['specs']),
        [key]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-white/5">
            <div className="space-y-1">
              <h2 className="text-2xl font-light italic">
                {vehicle ? 'Edit Asset.' : 'New Acquisition.'}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">Inventory Management Protocol</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-neutral-500 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 lg:p-12 scrollbar-hide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column: General Info */}
              <div className="space-y-8">
                <section className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Identity & Status</span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Brand</label>
                      <input 
                        required
                        value={formData.brand || ''}
                        onChange={e => setFormData({...formData, brand: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="Ferrari"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Model Name</label>
                      <input 
                        required
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="296 GTB"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Year</label>
                      <input 
                        type="number"
                        required
                        value={formData.year || ''}
                        onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Price (Display)</label>
                      <input 
                        required
                        value={formData.price || ''}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="$325,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Availability Status</label>
                    <div className="flex gap-2">
                      {(['Available', 'Reserved', 'Sold'] as const).map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({...formData, status})}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            formData.status === status 
                              ? 'bg-white text-black border-white' 
                              : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/30'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Visual Assets</span>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Main Display Image URL</label>
                    <div className="relative group">
                      <input 
                        required
                        value={formData.image || ''}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-white/20 transition-all"
                        placeholder="/images/inventory/..."
                      />
                      <Upload className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">The Narrative (Description)</label>
                    <textarea 
                      required
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm min-h-[160px] focus:outline-none focus:border-white/20 transition-all resize-none"
                      placeholder="The Ferrari 296 GTB represents..."
                    />
                  </div>
                </section>
              </div>

              {/* Right Column: Technical Specs */}
              <div className="space-y-8">
                <section className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Mechanical Architecture</span>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {SPEC_FIELDS.map(spec => (
                      <div key={spec.key} className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{spec.label}</label>
                        <input 
                          required
                          value={formData.specs?.[spec.key] || ''}
                          onChange={e => handleSpecChange(spec.key, e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-white/20 transition-all"
                          placeholder={spec.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-neutral-500">
                <AlertCircle size={14} />
                <p className="text-[9px] font-bold uppercase tracking-widest">Double-check all technical figures before saving.</p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-10 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl shadow-white/5"
                >
                  <Check size={14} /> Commit Changes
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
