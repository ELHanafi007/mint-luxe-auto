'use client';

import { useState, useEffect, use } from 'react';
import VehicleForm from '@/components/admin/VehicleForm';
import { useRouter } from 'next/navigation';

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch('/api/admin/vehicles');
        if (res.ok) {
          const vehicles = await res.json();
          const found = vehicles.find((v: any) => v.id === id);
          if (found) {
            setVehicle(found);
          } else {
            router.push('/admin/vehicles');
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, router]);

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)', padding: '40px', textAlign: 'center' }}>Loading vehicle data...</div>;
  if (!vehicle) return null;

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Edit Vehicle</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Updating details for {vehicle.brand} {vehicle.name}.</p>
      </div>
      
      <VehicleForm initialData={vehicle} isEditing={true} />
    </div>
  );
}
