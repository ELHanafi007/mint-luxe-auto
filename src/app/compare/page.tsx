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
  
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const vIds = [
      searchParams.get('v1'),
      searchParams.get('v2'),
      searchParams.get('v3'),
      searchParams.get('v4')
    ].filter(Boolean);

    const newSelected = vIds.map(id => {
      return vehicles.find(v => v.id === id);
    }).filter((v): v is Vehicle => !!v);

    setSelectedVehicles(newSelected);
  }, [searchParams]);

  const updateURL = (newVehicles: Vehicle[]) => {
    const params = new URLSearchParams();
    newVehicles.forEach((v, i) => {
      params.set(`v${i + 1}`, v.id);
    });
    router.push(`/compare?${params.toString()}`, { scroll: false });
  };

  const addVehicle = (id: string) => {
    if (!id) return;
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle && selectedVehicles.length < 4) {
      const newList = [...selectedVehicles, vehicle];
      setSelectedVehicles(newList);
      updateURL(newList);
    }
  };

  const removeVehicle = (id: string) => {
    const newList = selectedVehicles.filter(v => v.id !== id);
    setSelectedVehicles(newList);
    updateURL(newList);
  };

  const availableVehicles = vehicles.filter(
    v => !selectedVehicles.find(sv => sv.id === v.id)
  );

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

      <motion.div layout className={styles.compareFlex}>
        <AnimatePresence mode="popLayout">
          {selectedVehicles.map((vehicle) => (
            <motion.div 
              key={vehicle.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={styles.vehicleCard}
            >
              <button 
                onClick={() => removeVehicle(vehicle.id)}
                className={styles.removeBtn}
                aria-label="Remove vehicle"
              >
                <X size={16} />
              </button>

              <div className={styles.imageWrapper}>
                <Image 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  fill 
                  className={styles.vehicleImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
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

          {selectedVehicles.length < 4 && (
            <motion.div 
              key="add-slot"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.addCard}
            >
              <div className={styles.addContent}>
                <div className={styles.plusCircle}>
                  <Plus size={32} strokeWidth={1} />
                </div>
                <h3 className={styles.addTitle}>{t.compare.selectVehicle}</h3>
                <div className={styles.selectorWrapper}>
                  <select 
                    className={styles.selector}
                    value=""
                    onChange={(e) => addVehicle(e.target.value)}
                  >
                    <option value="">{t.compare.selectVehicle}...</option>
                    {availableVehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.brand} {v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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
