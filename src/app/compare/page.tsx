'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { vehicles, Vehicle } from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ComparePage.module.css';
import { motion } from 'framer-motion';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  
  const [v1, setV1] = useState<Vehicle | null>(null);
  const [v2, setV2] = useState<Vehicle | null>(null);

  useEffect(() => {
    const id1 = searchParams.get('v1');
    const id2 = searchParams.get('v2');

    if (id1) {
      const vehicle = vehicles.find(v => v.id === id1);
      if (vehicle) setV1(vehicle);
    }
    if (id2) {
      const vehicle = vehicles.find(v => v.id === id2);
      if (vehicle) setV2(vehicle);
    }
  }, [searchParams]);

  const updateV1 = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('v1', id);
    } else {
      params.delete('v1');
    }
    router.push(`/compare?${params.toString()}`);
  };

  const updateV2 = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('v2', id);
    } else {
      params.delete('v2');
    }
    router.push(`/compare?${params.toString()}`);
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
        {/* Vehicle 1 */}
        <div className={styles.vehicleColumn}>
          <div className={styles.selectorWrapper}>
            <select 
              className={styles.selector}
              value={v1?.id || ''}
              onChange={(e) => updateV1(e.target.value)}
            >
              <option value="">{t.compare.selectVehicle}</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.brand} {v.name}</option>
              ))}
            </select>
          </div>

          {v1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={v1.id}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={v1.image} 
                  alt={v1.name} 
                  fill 
                  className={styles.vehicleImage}
                />
              </div>
              <div className={styles.vehicleInfo}>
                <span className={styles.brand}>{v1.brand}</span>
                <h2 className={styles.name}>{v1.name}</h2>
                <p className={styles.price}>{v1.price}</p>
              </div>
              <div className={styles.specs}>
                <table className={styles.specsTable}>
                  <tbody>
                    {Object.entries(v1.specs).map(([key, value]) => (
                      <tr key={key} className={styles.specRow}>
                        <td className={styles.specLabel}>{(t.product.specsLabels as any)[key]}</td>
                        <td className={styles.specValue}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className={styles.emptyState}>
              {t.compare.firstVehicle}
            </div>
          )}
        </div>

        {/* Vehicle 2 */}
        <div className={styles.vehicleColumn}>
          <div className={styles.selectorWrapper}>
            <select 
              className={styles.selector}
              value={v2?.id || ''}
              onChange={(e) => updateV2(e.target.value)}
            >
              <option value="">{t.compare.selectVehicle}</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.brand} {v.name}</option>
              ))}
            </select>
          </div>

          {v2 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={v2.id}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={v2.image} 
                  alt={v2.name} 
                  fill 
                  className={styles.vehicleImage}
                />
              </div>
              <div className={styles.vehicleInfo}>
                <span className={styles.brand}>{v2.brand}</span>
                <h2 className={styles.name}>{v2.name}</h2>
                <p className={styles.price}>{v2.price}</p>
              </div>
              <div className={styles.specs}>
                <table className={styles.specsTable}>
                  <tbody>
                    {Object.entries(v2.specs).map(([key, value]) => (
                      <tr key={key} className={styles.specRow}>
                        <td className={styles.specLabel}>{(t.product.specsLabels as any)[key]}</td>
                        <td className={styles.specValue}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className={styles.emptyState}>
              {t.compare.secondVehicle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className={styles.comparePage}>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
