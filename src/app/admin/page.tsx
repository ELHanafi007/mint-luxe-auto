'use client';

import { useState, useEffect, useCallback } from 'react';
import { Vehicle } from '@/data/vehicles';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock, KeyRound, ChevronRight, Car, Settings, Plus, BarChart3 } from 'lucide-react';
import VehicleList from '@/components/admin/VehicleList';
import VehicleModal from '@/components/admin/VehicleModal';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const fetchData = useCallback(async (currentPassword?: string) => {
    const authPassword = currentPassword || password;
    if (!authPassword) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/vehicles', {
        headers: { 'x-admin-password': authPassword }
      });
      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    const savedPassword = sessionStorage.getItem('admin_password');
    if (auth === 'true' && savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
      fetchData(savedPassword);
    }
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
        sessionStorage.setItem('admin_password', password);
        fetchData(password);
      } else {
        setError('Unauthorized access. Invalid credentials.');
        setPassword('');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError('Connection failure.');
    }
  };

  const handleSaveVehicle = async (formData: Partial<Vehicle>) => {
    const method = editingVehicle ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/vehicles', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsVehicleModalOpen(false);
        setEditingVehicle(null);
        fetchData();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to save vehicle'}`);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed: Connection error");
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm("Are you sure? This acquisition will be permanently removed.")) return;
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20 font-sans">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black"
          >
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-white/80 mb-2 border border-white/10">
                  <Lock size={28} strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl font-light tracking-tight text-white">Console Access</h1>
                <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-500">Authorized Personnel Only</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors" size={18} strokeWidth={1.5} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Security Key"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-xl focus:outline-none focus:border-white/20 transition-all text-sm tracking-[0.2em]"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="text-[10px] text-red-500 font-medium uppercase tracking-widest ml-4 italic">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-200 transition-colors duration-500 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Authenticate</span>
                  <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 space-y-16">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-500">Executive Dashboard</span>
                <h1 className="text-4xl font-light tracking-tighter italic">Fleet Management.</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => { setEditingVehicle(null); setIsVehicleModalOpen(true); }}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all"
                >
                  <Plus size={14} /> New Acquisition
                </button>
                <button className="p-3 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white transition-all">
                  <Settings size={18} strokeWidth={1.5} />
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Inventory', value: vehicles.length, icon: Car },
                { label: 'Asset Value', value: '$12.4M', icon: BarChart3 },
                { label: 'Inquiries (24h)', value: '14', icon: Settings },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <stat.icon size={20} strokeWidth={1.5} className="text-neutral-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Stat {i+1}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-light tabular-nums">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <Loader2 className="animate-spin text-white/20" size={32} strokeWidth={1.5} />
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold animate-pulse">Syncing Secure Database...</p>
              </div>
            ) : (
              <div className="space-y-12">
                <VehicleList 
                  vehicles={vehicles}
                  onEdit={(v) => { setEditingVehicle(v); setIsVehicleModalOpen(true); }}
                  onDelete={handleDeleteVehicle}
                />
              </div>
            )}
          </div>
        )}
      </AnimatePresence>

      <VehicleModal 
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSave={handleSaveVehicle}
        vehicle={editingVehicle}
      />

      {/* Admin Status */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl z-50">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">System Online</span>
      </div>
    </main>
  );
}
