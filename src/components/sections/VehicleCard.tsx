'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/data/vehicles';
import { useLanguage } from '@/context/LanguageContext';
import styles from './VehicleCard.module.css';

interface Props {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: Props) {
  const { t } = useLanguage();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Available': return t.product.available;
      case 'Sold': return t.product.sold;
      case 'Reserved': return t.product.reserved;
      default: return status;
    }
  };

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
        <div className={`${styles.statusBadge} ${styles[vehicle.status.toLowerCase()]}`}>
          {getStatusLabel(vehicle.status)}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.brand}>{vehicle.brand}</span>
          <h3 className={styles.name}>{vehicle.name}</h3>
        </div>

        <div className={styles.footer}>
          <span className={styles.year}>{vehicle.year}</span>
          <span className={styles.price}>{vehicle.price}</span>
        </div>
      </div>
    </Link>
  );
}
