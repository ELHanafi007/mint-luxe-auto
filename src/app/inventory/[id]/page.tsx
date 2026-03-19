'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import styles from './ProductPage.module.css';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className={styles.productPage}>
      <div className="container">
        <Link href="/#collection" className={styles.backBtn}>
          ← Back to Collection
        </Link>

        <div className={styles.mainGrid}>
          {/* IMAGE SECTION */}
          <div className={styles.imageSection}>
            <motion.div 
              className={styles.mainImageWrapper}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <Image 
                src={vehicle.image} 
                alt={vehicle.name}
                fill
                className={styles.mainImage}
                priority
                unoptimized
              />
            </motion.div>
            
            <div className={styles.gallery}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image 
                    src={vehicle.image} 
                    alt={`${vehicle.name} detail ${i}`}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.5 }}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className={styles.infoSection}>
            <header className={styles.header}>
              <motion.span 
                className={styles.brand}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {vehicle.brand}
              </motion.span>
              <motion.h1 
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {vehicle.name}
              </motion.h1>
              <motion.p 
                className={styles.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {vehicle.year} Edition
              </motion.p>
            </header>

            <motion.div 
              className={styles.priceCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.statusWrapper}>
                <span className={styles.statusLabel}>Availability</span>
                <span className={`${styles.statusValue} ${styles[vehicle.status.toLowerCase()]}`}>
                  {vehicle.status}
                </span>
              </div>
              
              <div className={styles.priceWrapper}>
                <span className={styles.priceLabel}>Current Valuation</span>
                <span className={styles.priceValue}>{vehicle.price}</span>
              </div>

              <Link href="/#inquiry" className={styles.inquiryBtn}>
                Request Private Consultation
              </Link>
            </motion.div>

            <div className={styles.specsGrid}>
              {Object.entries(vehicle.specs).map(([label, value], i) => (
                <motion.div 
                  key={label} 
                  className={styles.specItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  <span className={styles.specLabel}>{label}</span>
                  <span className={styles.specValue}>{value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className={styles.descriptionSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h3 className={styles.descTitle}>The Narrative</h3>
              <p className={styles.description}>{vehicle.description}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
