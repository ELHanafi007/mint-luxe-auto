'use client';

import { Vehicle } from '@/data/vehicles';
import Image from 'next/image';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

interface Props {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export default function VehicleList({ vehicles, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {vehicles.map((vehicle) => (
        <div 
          key={vehicle.id} 
          className="group relative flex items-center gap-6 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all duration-500"
        >
          <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
            <Image 
              src={vehicle.image} 
              alt={vehicle.name} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{vehicle.brand}</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{vehicle.year}</span>
            </div>
            <h3 className="text-lg font-light tracking-tight truncate">{vehicle.name}</h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{vehicle.price}</span>
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                vehicle.status === 'Available' ? 'bg-green-500/10 text-green-500' : 
                vehicle.status === 'Sold' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {vehicle.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(vehicle)}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all"
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={() => onDelete(vehicle.id)}
              className="p-2.5 bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-500 rounded-lg transition-all"
            >
              <Trash2 size={14} />
            </button>
            <a 
              href={`/inventory/${vehicle.id}`} 
              target="_blank"
              className="p-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
