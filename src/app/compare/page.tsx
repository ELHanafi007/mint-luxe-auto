'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { vehicles, Vehicle } from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ComparePage.module.css';
import { motion, AnimatePresence } from 'framer-motion';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  
  const [selectedVehicles, setSelectedVehicles] = useState<(Vehicle | null)[]>([null, null, null, null]);

  useEffect(() => {
    const vIds = [
      searchParams.get('v1'),
      searchParams.get('v2'),
      searchParams.get('v3'),
      searchParams.get('v4')
    ];

    const newSelected = vIds.map(id => {
      if (!id) return null;
      return vehicles.find(v => v.id === id) || null;
    });

    setSelectedVehicles(newSelected);
  }, [searchParams]);

  const updateVehicle = (index: number, id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const paramKey = `v${index + 1}`;
    
    if (id) {
      params.set(paramKey, id);
    } else {
      params.delete(paramKey);
    }
    
    router.push(`/compare?${params.toString()}`, { scroll: false });
  };

  const clearVehicle = (index: number) => {
    updateVehicle(index, '');
  };

  return (
    <div className="container">
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t.compare.title}
      </motion.h1>

      <div className={styles.compareGrid}>
        {selectedVehicles.map((vehicle, index) => (
          <div key={index} className={styles.vehicleColumn}>
            <div className={styles.selectorWrapper}>
              <select 
                className={styles.selector}
                value={vehicle?.id || ''}
                onChange={(e) => updateVehicle(index, e.target.value)}
              >
                <option value="">{t.compare.selectVehicle} {index + 1}</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.brand} {v.name}</option>
                ))}
              </select>
            </div>

            <AnimatePresence mode="wait">
              {vehicle ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key={vehicle.id}
                  className={styles.vehicleData}
                >
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      fill 
                      className={styles.vehicleImage}
                      sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.vehicleInfo}>
                    <span className={styles.brand}>{vehicle.brand}</span>
                    <h2 className={styles.name}>{vehicle.name}</h2>
                    <p className={styles.price}>{vehicle.price}</p>
                  </div>
                  <div className={styles.specs}>
                    <table className={styles.specsTable}>
                      <tbody>
                        {Object.entries(vehicle.specs).map(([key, value]) => (
                          <tr key={key} className={styles.specRow}>
                            <td className={styles.specLabel}>
                              {(t.product.specsLabels as any)[key] || key}
                            </td>
                            <td className={styles.specValue}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button 
                    onClick={() => clearVehicle(index)}
                    className={styles.clearBtn}
                  >
                    Remove
                  </button>
                </motion.div>
              ) : (
                <div className={styles.emptyState}>
                  <span>Slot {index + 1}</span>
                  <p style={{ fontSize: '0.6rem', marginTop: '0.5rem' }}>Select a model to compare</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className={styles.comparePage}>
      <Suspense fallback={<div className="container">Loading comparison...</div>}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
