'use client';

import VehicleForm from '@/components/admin/VehicleForm';

export default function NewVehiclePage() {
  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Add New Vehicle</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Fill in the details to add a new luxury car to your inventory.</p>
      </div>
      
      <VehicleForm />
    </div>
  );
}
