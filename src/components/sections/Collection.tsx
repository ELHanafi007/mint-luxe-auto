'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { vehicles, Vehicle } from '@/data/vehicles';
import styles from './Collection.module.css';

export default function Collection() {
  const [activeBrand, setActiveBrand] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(vehicles.map(v => v.brand)));
    return ['All', ...uniqueBrands.sort()];
  }, []);

  const filteredVehicles = useMemo(() => {
    if (activeBrand === 'All') return vehicles;
    return vehicles.filter(v => v.brand === activeBrand);
  }, [activeBrand]);

  return (
    <section id="collection" className={styles.collection}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <motion.span 
              className="text-muted" 
              style={{ textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.7rem' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              The Repository
            </motion.span>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Masterpieces in Motion
            </motion.h2>
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
                    layoutId="filterUnderline" 
                    className={styles.underline} 
                  />
                )}
              </button>
            ))}
          </nav>
        </header>

        <motion.div 
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div 
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className={`${styles.card} interactive`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <div className={styles.imageContainer}>
                  <Image 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.cardImage}
                    unoptimized
                  />
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardHeader}>
                      <span className={styles.year}>{vehicle.year}</span>
                      <span className={styles.price}>{vehicle.price}</span>
                    </div>
                    
                    <div className={styles.cardFooter}>
                      <p className={styles.brand}>{vehicle.brand}</p>
                      <h3 className={styles.name}>{vehicle.name}</h3>
                      
                      <div className={styles.specsGrid}>
                        <div className={styles.spec}>
                          <span className={styles.specLabel}>Engine</span>
                          <span className={styles.specValue}>{vehicle.specs.engine}</span>
                        </div>
                        <div className={styles.spec}>
                          <span className={styles.specLabel}>Power</span>
                          <span className={styles.specValue}>{vehicle.specs.power}</span>
                        </div>
                        <div className={styles.spec}>
                          <span className={styles.specLabel}>0-60</span>
                          <span className={styles.specValue}>{vehicle.specs.acceleration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedVehicle(null)}>×</button>
              
              <div className={styles.modalGrid}>
                <div className={styles.modalImageWrapper}>
                  <Image 
                    src={selectedVehicle.image} 
                    alt={selectedVehicle.name}
                    fill
                    className={styles.modalImage}
                    unoptimized
                  />
                </div>
                
                <div className={styles.modalInfo}>
                  <div className={styles.modalHeader}>
                    <p className={styles.modalBrand}>{selectedVehicle.brand}</p>
                    <h2 className={styles.modalTitle}>{selectedVehicle.name}</h2>
                    <p className={styles.modalYear}>{selectedVehicle.year} Edition</p>
                  </div>
                  
                  <div className={styles.modalPriceSection}>
                    <span className={styles.modalPriceLabel}>Valuation</span>
                    <span className={styles.modalPrice}>{selectedVehicle.price}</span>
                  </div>

                  <div className={styles.modalSpecsDetailed}>
                    {Object.entries(selectedVehicle.specs).map(([label, value]) => (
                      <div key={label} className={styles.modalSpecItem}>
                        <span className={styles.modalSpecLabel}>{label}</span>
                        <span className={styles.modalSpecValue}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <p className={styles.modalDescription}>
                    {selectedVehicle.description || "A masterpiece of automotive engineering, representing the pinnacle of performance and luxury in its class."}
                  </p>

                  <button className={styles.inquiryBtn} onClick={() => {
                    setSelectedVehicle(null);
                    window.location.href = '#inquiry';
                  }}>
                    Inquire About Acquisition
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
