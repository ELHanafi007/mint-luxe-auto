'use client';

import { motion } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import VehicleCard from './VehicleCard';
import styles from './Collection.module.css';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Collection() {
  const { t } = useLanguage();
  const bestSellers = vehicles.filter(v => v.isBestSeller).slice(0, 3);
  const latestInventory = vehicles.filter(v => !v.isBestSeller).slice(0, 4);

  return (
    <section id="collection" className={styles.collection}>
      <div className="container">
        {/* BEST SELLERS SECTION */}
        <div className={styles.sectionWrapper}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <span className={styles.metadata}>{t.collection.exceptionalClassics}</span>
              <h2 className={styles.title}>{t.collection.mustHaves}</h2>
            </div>
          </header>

          <div className={styles.bestSellersGrid}>
            {bestSellers.map((vehicle, i) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* LATEST INVENTORY SECTION */}
        <div className={styles.sectionWrapper}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <span className={styles.metadata}>{t.collection.recentAcquisitions}</span>
              <h2 className={styles.title}>{t.collection.latestNews}</h2>
            </div>
            <Link href="/inventory" className={styles.viewAllTop}>
              {t.collection.exploreFull}
            </Link>
          </header>

          <div className={styles.latestGrid}>
            {latestInventory.map((vehicle, i) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>

          <div className={styles.footerAction}>
            <Link href="/inventory" className={styles.viewAllBtn}>
              {t.collection.viewAll}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
