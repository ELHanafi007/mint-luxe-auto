'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import styles from './VehicleCard.module.css';

interface Props {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: Props) {
  return (
    <Link href={`/inventory/${vehicle.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={vehicle.image} 
          alt={vehicle.name}
          fill
          className={styles.image}
          unoptimized
        />
        <div className={`${styles.badge} ${styles[vehicle.status.toLowerCase()]}`}>
          {vehicle.status}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.brand}>{vehicle.brand}</span>
          <h3 className={styles.name}>{vehicle.name}</h3>
        </div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Power</span>
            <span className={styles.specValue}>{vehicle.specs.power}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Engine</span>
            <span className={styles.specValue}>{vehicle.specs.engine}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>0-60</span>
            <span className={styles.specValue}>{vehicle.specs.acceleration}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{vehicle.price}</span>
          <span className={styles.viewDetails}>View Details</span>
        </div>
      </div>
    </Link>
  );
}
