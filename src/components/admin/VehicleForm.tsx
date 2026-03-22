'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus, Upload, Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const vehicleSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  name: z.string().min(1, 'Model name is required'),
  year: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.string().min(1, 'Price is required'),
  status: z.enum(['Available', 'Sold', 'Reserved']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  specs: z.object({
    engine: z.string().min(1, 'Engine spec is required'),
    power: z.string().min(1, 'Power spec is required'),
    acceleration: z.string().min(1, 'Acceleration spec is required'),
    topSpeed: z.string().min(1, 'Top speed spec is required'),
    transmission: z.string().min(1, 'Transmission spec is required'),
    mileage: z.string().min(1, 'Mileage spec is required'),
    exteriorColor: z.string().min(1, 'Exterior color spec is required'),
    interiorColor: z.string().min(1, 'Interior color spec is required'),
    driveTrain: z.string().min(1, 'Drive train spec is required'),
    fuelType: z.string().min(1, 'Fuel type spec is required'),
  }),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function VehicleForm({ initialData, isEditing = false }: VehicleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [galleryInput, setGalleryInput] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, setValue, control } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || {
      status: 'Available',
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
        fuelType: '',
      },
      gallery: []
    }
  });

  const gallery = watch('gallery') || [];

  const onSubmit = async (data: VehicleFormValues) => {
    setLoading(true);
    try {
      const url = '/api/admin/vehicles';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...data, id: initialData.id } : data;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push('/admin/vehicles');
        router.refresh();
      } else {
        alert('Failed to save vehicle');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addGalleryImage = () => {
    if (galleryInput && !gallery.includes(galleryInput)) {
      setValue('gallery', [...gallery, galleryInput]);
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    setValue('gallery', newGallery);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button 
          type="button" 
          onClick={() => router.back()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <ArrowLeft size={16} />
          Back to list
        </button>
        <button 
          type="submit" 
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          <Save size={18} />
          {isEditing ? 'Update Vehicle' : 'Create Vehicle'}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* General Info */}
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>General Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Brand</label>
                <input 
                  {...register('brand')}
                  placeholder="e.g. Ferrari"
                  style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
                {errors.brand && <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '5px' }}>{errors.brand.message}</p>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Model Name</label>
                <input 
                  {...register('name')}
                  placeholder="e.g. 296 GTB"
                  style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
                {errors.name && <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '5px' }}>{errors.name.message}</p>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Year</label>
                <input 
                  type="number"
                  {...register('year')}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
                {errors.year && <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '5px' }}>{errors.year.message}</p>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Price</label>
                <input 
                  {...register('price')}
                  placeholder="e.g. $385,000"
                  style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
                {errors.price && <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '5px' }}>{errors.price.message}</p>}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Description</label>
              <textarea 
                {...register('description')}
                rows={5}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', resize: 'vertical' }}
              />
              {errors.description && <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '5px' }}>{errors.description.message}</p>}
            </div>
          </div>

          {/* Specs */}
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>Technical Specifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Engine</label>
                <input {...register('specs.engine')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Power</label>
                <input {...register('specs.power')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Acceleration</label>
                <input {...register('specs.acceleration')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Top Speed</label>
                <input {...register('specs.topSpeed')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Transmission</label>
                <input {...register('specs.transmission')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Mileage</label>
                <input {...register('specs.mileage')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Exterior Color</label>
                <input {...register('specs.exteriorColor')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Interior Color</label>
                <input {...register('specs.interiorColor')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Drive Train</label>
                <input {...register('specs.driveTrain')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Fuel Type</label>
                <input {...register('specs.fuelType')} style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Status & Media */}
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>Status</h3>
            <div style={{ marginBottom: '30px' }}>
              <select 
                {...register('status')}
                style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>Main Image</h3>
            <div style={{ marginBottom: '30px' }}>
              <input 
                {...register('image')}
                placeholder="Image URL"
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', marginBottom: '10px' }}
              />
              {watch('image') && (
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '16/9', 
                  backgroundColor: '#111', 
                  borderRadius: '6px',
                  backgroundImage: `url(${watch('image')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
              )}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>Gallery</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <input 
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                placeholder="Image URL"
                style={{ flex: 1, padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              />
              <button 
                type="button"
                onClick={addGalleryImage}
                style={{ padding: '10px', backgroundColor: '#fff', color: '#000', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              >
                <Plus size={20} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {gallery.map((url, index) => (
                <div key={index} style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#111', borderRadius: '6px', overflow: 'hidden' }}>
                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'rgba(255,0,0,0.8)', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
