'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Vehicle, vehicles } from '@/data/vehicles';
import styles from './ProductPage.module.css';
import VehicleCard from '@/components/sections/VehicleCard';

interface ProductPageClientProps {
  vehicle: Vehicle;
  prevVehicle: Vehicle;
  nextVehicle: Vehicle;
}

export default function ProductPageClient({ vehicle, prevVehicle, nextVehicle }: ProductPageClientProps) {
  const relatedVehicles = vehicles
    .filter(v => (v.brand === vehicle.brand || v.id !== vehicle.id) && v.id !== vehicle.id)
    .slice(0, 3);

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
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className={`${styles.statusBadge} ${styles[vehicle.status.toLowerCase()]}`}>
                {vehicle.status}
              </div>
            </motion.div>
            
            <div className={styles.gallery}>
              {(vehicle.gallery || [vehicle.image, vehicle.image, vehicle.image, vehicle.image]).map((img, i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image 
                    src={img} 
                    alt={`${vehicle.name} detail ${i}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 25vw, 15vw"
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
                {Object.entries(vehicle.specs).map(([label, value]) => (
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

        {/* RELATED VEHICLES */}
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <span className={styles.labelMetadata}>Curation</span>
            <h2 className={styles.relatedTitle}>Similar Acquisitions</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

