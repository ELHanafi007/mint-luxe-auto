'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import VehicleCard from '@/components/sections/VehicleCard';
import styles from './InventoryPage.module.css';

export default function InventoryPage() {
  const [activeBrand, setActiveBrand] = useState('All');

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(vehicles.map(v => v.brand)));
    return ['All', ...uniqueBrands.sort()];
  }, []);

  const filteredVehicles = useMemo(() => {
    if (activeBrand === 'All') return vehicles;
    return vehicles.filter(v => v.brand === activeBrand);
  }, [activeBrand]);

  return (
    <main className={styles.inventoryPage}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.metadata}>Total Inventory: {vehicles.length} Units</span>
            <h1 className={styles.title}>Full Collection</h1>
          </div>

          <nav className={styles.filters}>
            {brands.map((brand) => (
              <button
                key={brand}
                className={`${styles.filterBtn} ${activeBrand === brand ? styles.active : ''}`}
                onClick={() => setActiveBrand(brand)}
              >
                {brand}
                {activeBrand === brand && (
                  <motion.div 
                    layoutId="inventoryFilterUnderline" 
                    className={styles.underline} 
                  />
                )}
              </button>
            ))}
          </nav>
        </header>

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
