'use client';

import { motion } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import VehicleCard from './VehicleCard';
import styles from './Collection.module.css';
import Link from 'next/link';

export default function Collection() {
  const bestSellers = vehicles.filter(v => v.isBestSeller).slice(0, 3);
  const latestInventory = vehicles.filter(v => !v.isBestSeller).slice(0, 4);

  return (
    <section id="collection" className={styles.collection}>
      <div className="container">
        {/* BEST SELLERS SECTION */}
        <div className={styles.sectionWrapper}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <span className={styles.metadata}>Curated Classics</span>
              <h2 className={styles.title}>Best Sellers</h2>
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
              <span className={styles.metadata}>Recent Acquisitions</span>
              <h2 className={styles.title}>Latest Inventory</h2>
            </div>
            <Link href="/inventory" className={styles.viewAllTop}>
              Explore Full Collection
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
              View All 150+ Masterpieces
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
