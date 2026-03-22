'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { vehicles, Vehicle } from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ComparePage.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  
  const [selectedVehicles, setSelectedVehicles] = useState<(Vehicle | null)[]>([]);

  useEffect(() => {
    const vIds = [
      searchParams.get('v1'),
      searchParams.get('v2'),
      searchParams.get('v3'),
      searchParams.get('v4')
    ].filter(Boolean);

    const newSelected = vIds.map(id => {
      return vehicles.find(v => v.id === id) || null;
    }).filter(Boolean) as Vehicle[];

    setSelectedVehicles(newSelected);
  }, [searchParams]);

  const updateVehicle = (index: number, id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const paramKey = `v${index + 1}`;
    
    if (id) {
      params.set(paramKey, id);
    } else {
      // Shift other params up if one is removed
      const currentIds = [
        searchParams.get('v1'),
        searchParams.get('v2'),
        searchParams.get('v3'),
        searchParams.get('v4')
      ].filter(Boolean);
      
      const removedId = selectedVehicles[index]?.id;
      const newIds = currentIds.filter(cid => cid !== removedId);
      
      // Clear all and re-set
      params.delete('v1');
      params.delete('v2');
      params.delete('v3');
      params.delete('v4');
      
      newIds.forEach((nid, i) => {
        params.set(`v${i + 1}`, nid!);
      });
    }
    
    router.push(`/compare?${params.toString()}`, { scroll: false });
  };

  const removeVehicle = (index: number) => {
    updateVehicle(index, '');
  };

  const addVehicleSlot = () => {
    if (selectedVehicles.length < 4) {
      // Just a trigger to show the selector if we were to use a different UI, 
      // but here we'll just ensure there's at least one empty slot shown if < 4
    }
  };

  const activeCount = selectedVehicles.length;
  const showAddSlot = activeCount < 4;

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

      <div className={`${styles.compareGrid} ${styles[`grid${activeCount + (showAddSlot ? 1 : 0)}`]}`}>
        <AnimatePresence mode="popLayout">
          {selectedVehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={styles.vehicleColumn}
            >
              <div className={styles.columnHeader}>
                <button 
                  onClick={() => removeVehicle(index)}
                  className={styles.removeBtn}
                >
                  <X size={14} />
                </button>
              </div>

              <div className={styles.imageWrapper}>
                <Image 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  fill 
                  className={styles.vehicleImage}
                  sizes="(max-width: 640px) 100vw, 50vw"
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
            </motion.div>
          ))}

          {showAddSlot && (
            <motion.div 
              key="add-slot"
              layout
              className={styles.addSlot}
            >
              <div className={styles.addContent}>
                <div className={styles.plusCircle}>
                  <Plus size={32} strokeWidth={1} />
                </div>
                <h3>{t.compare.selectVehicle}</h3>
                <div className={styles.selectorWrapper}>
                  <select 
                    className={styles.selector}
                    value=""
                    onChange={(e) => updateVehicle(activeCount, e.target.value)}
                  >
                    <option value="">{t.compare.selectVehicle}...</option>
                    {vehicles
                      .filter(v => !selectedVehicles.find(sv => sv.id === v.id))
                      .map(v => (
                        <option key={v.id} value={v.id}>{v.brand} {v.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
