'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Vehicle, vehicles } from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ProductPage.module.css';
import VehicleCard from '@/components/sections/VehicleCard';

interface ProductPageClientProps {
  vehicle: Vehicle;
  prevVehicle: Vehicle;
  nextVehicle: Vehicle;
}

export default function ProductPageClient({ vehicle, prevVehicle, nextVehicle }: ProductPageClientProps) {
  const { t } = useLanguage();
  const relatedVehicles = vehicles
    .filter(v => (v.brand === vehicle.brand || v.id !== vehicle.id) && v.id !== vehicle.id)
    .slice(0, 3);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Available': return t.product.available;
      case 'Sold': return t.product.sold;
      case 'Reserved': return t.product.reserved;
      default: return status;
    }
  };

  return (
    <div className={styles.productPage}>
      {/* SUB-NAV */}
      <div className={styles.subArchiveNav}>
        <div className="container">
          <div className={styles.subArchiveInner}>
            <Link href="/inventory" className={styles.backBtn}>
              <span className={styles.backIcon}>←</span> {t.product.back}
            </Link>
            <div className={styles.productNav}>
              <Link href={`/inventory/${prevVehicle.id}`} className={styles.navItem}>{t.product.prev}</Link>
              <span className={styles.navDivider}>/</span>
              <Link href={`/inventory/${nextVehicle.id}`} className={styles.navItem}>{t.product.next}</Link>
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
                {getStatusLabel(vehicle.status)}
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
                <span className={styles.priceLabel}>{t.product.valuation}</span>
                <span className={styles.price}>{vehicle.price}</span>
              </div>
            </header>

            <div className={styles.actionGrid}>
              <Link href="/#inquiry" className={styles.primaryAction}>
                {t.product.requestConsultation}
              </Link>
              <Link href={`/compare?v1=${vehicle.id}`} className={styles.secondaryAction} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t.product.compareModel}
              </Link>
              <button className={styles.secondaryAction}>
                {t.product.downloadBrochure}
              </button>
            </div>

            {/* SPECS GRID */}
            <div className={styles.specsContainer}>
              <h3 className={styles.sectionLabel}>{t.product.specs}</h3>
              <div className={styles.specsGrid}>
                {Object.entries(vehicle.specs).map(([label, value]) => (
                  <div key={label} className={styles.specItem}>
                    <span className={styles.specLabel}>
                      {(t.product.specsLabels as any)[label] || label.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.narrativeSection}>
              <h3 className={styles.sectionLabel}>{t.product.narrative}</h3>
              <p className={styles.description}>{vehicle.description}</p>
            </div>
          </div>
        </div>

        {/* RELATED VEHICLES */}
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <span className={styles.labelMetadata}>{t.product.curation}</span>
            <h2 className={styles.relatedTitle}>{t.product.relatedTitle}</h2>
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
