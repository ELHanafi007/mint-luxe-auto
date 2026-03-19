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
  const vehicleIndex = vehicles.findIndex((v) => v.id === id);
  const vehicle = vehicles[vehicleIndex];

  if (!vehicle) {
    notFound();
  }

  const prevVehicle = vehicles[vehicleIndex - 1] || vehicles[vehicles.length - 1];
  const nextVehicle = vehicles[vehicleIndex + 1] || vehicles[0];

  return (
    <div className={styles.productPage}>
      {/* SUB-NAV */}
      <div className={styles.subArchiveNav}>
        <div className="container">
          <div className={styles.subArchiveInner}>
            <Link href="/inventory" className={styles.backBtn}>
              <span className={styles.backIcon}>←</span> Collection
            </Link>
            <div className={styles.productNav}>
              <Link href={`/inventory/${prevVehicle.id}`} className={styles.navItem}>Previous</Link>
              <span className={styles.navDivider}>/</span>
              <Link href={`/inventory/${nextVehicle.id}`} className={styles.navItem}>Next</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.mainGrid}>
          {/* LEFT: IMAGE & GALLERY */}
          <div className={styles.imageSection}>
            <motion.div 
              className={styles.mainImageWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image 
                src={vehicle.image} 
                alt={vehicle.name}
                fill
                className={styles.mainImage}
                priority
                unoptimized
              />
              <div className={`${styles.statusBadge} ${styles[vehicle.status.toLowerCase()]}`}>
                {vehicle.status}
              </div>
            </motion.div>
            
            <div className={styles.gallery}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image 
                    src={vehicle.image} 
                    alt={`${vehicle.name} detail ${i}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DATA & ACTIONS */}
          <div className={styles.infoSection}>
            <header className={styles.header}>
              <div className={styles.titleLine}>
                <span className={styles.brand}>{vehicle.brand}</span>
                <span className={styles.year}>{vehicle.year}</span>
              </div>
              <h1 className={styles.title}>{vehicle.name}</h1>
              <div className={styles.priceSection}>
                <span className={styles.priceLabel}>Valuation</span>
                <span className={styles.price}>{vehicle.price}</span>
              </div>
            </header>

            <div className={styles.actionGrid}>
              <Link href="/#inquiry" className={styles.primaryAction}>
                Request Consultation
              </Link>
              <button className={styles.secondaryAction}>
                Download Brochure
              </button>
            </div>

            {/* SPECS GRID */}
            <div className={styles.specsContainer}>
              <h3 className={styles.sectionLabel}>Technical Specifications</h3>
              <div className={styles.specsGrid}>
                {Object.entries(vehicle.specs).map(([label, value], i) => (
                  <div key={label} className={styles.specItem}>
                    <span className={styles.specLabel}>{label.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.narrativeSection}>
              <h3 className={styles.sectionLabel}>The Narrative</h3>
              <p className={styles.description}>{vehicle.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
