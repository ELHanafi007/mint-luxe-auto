'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function VehicleListPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/admin/vehicles');
      if (res.ok) {
        const data = await res.json();
        setVehicles(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const res = await fetch(`/api/admin/vehicles?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setVehicles(vehicles.filter(v => v.id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = 
      v.brand.toLowerCase().includes(search.toLowerCase()) || 
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.year.toString().includes(search);
    
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Inventory Management</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Manage your luxury vehicle collection.</p>
        </div>
        <Link href="/admin/vehicles/new" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          <Plus size={18} />
          Add Vehicle
        </Link>
      </div>

      <div style={{
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          gap: '20px'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#111',
            borderRadius: '6px',
            padding: '8px 15px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Search size={16} color="rgba(255,255,255,0.3)" />
            <input 
              type="text" 
              placeholder="Search by brand, model or year..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                marginLeft: '10px',
                fontSize: '13px',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={16} color="rgba(255,255,255,0.4)" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                backgroundColor: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: '#fff',
                padding: '8px 15px',
                borderRadius: '6px',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>VEHICLE</th>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>YEAR</th>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>PRICE</th>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>STATUS</th>
                <th style={{ padding: '15px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading vehicles...</td>
                </tr>
              ) : filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No vehicles found.</td>
                </tr>
              ) : filteredVehicles.map((v) => (
                <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '15px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '35px', 
                        backgroundColor: '#111', 
                        borderRadius: '4px',
                        backgroundImage: v.image ? `url(${v.image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{v.brand}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{v.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>{v.year}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', fontWeight: '600' }}>{v.price}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      backgroundColor: v.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : v.status === 'Sold' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: v.status === 'Available' ? '#10b981' : v.status === 'Sold' ? '#ef4444' : '#f59e0b',
                      textTransform: 'uppercase'
                    }}>
                      {v.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <Link href={`/inventory/${v.id}`} target="_blank" style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.6)',
                        transition: 'all 0.2s'
                      }}>
                        <ExternalLink size={16} />
                      </Link>
                      <Link href={`/admin/vehicles/${v.id}/edit`} style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.6)',
                        transition: 'all 0.2s'
                      }}>
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(v.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255,77,77,0.05)',
                          color: 'rgba(255,77,77,0.6)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          padding: '15px 20px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button disabled style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              color: 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'not-allowed'
            }}>
              <ChevronLeft size={16} />
            </button>
            <button disabled style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              color: 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'not-allowed'
            }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
