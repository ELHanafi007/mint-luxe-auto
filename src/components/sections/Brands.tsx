'use client';

import { motion } from 'framer-motion';
import styles from './Brands.module.css';

const brands = [
  { name: 'Ferrari', logo: 'FERRARI' },
  { name: 'Lamborghini', logo: 'LAMBORGHINI' },
  { name: 'Porsche', logo: 'PORSCHE' },
  { name: 'Rolls Royce', logo: 'ROLLS ROYCE' },
  { name: 'Aston Martin', logo: 'ASTON MARTIN' },
  { name: 'Mercedes-AMG', logo: 'MERCEDES-AMG' },
  { name: 'Bentley', logo: 'BENTLEY' },
  { name: 'Bugatti', logo: 'BUGATTI' },
];

export default function Brands() {
  return (
    <section className={styles.brands}>
      <div className="container">
        <header className={styles.header}>
          <span className="text-muted" style={{ letterSpacing: '0.4em', fontSize: '0.7rem', textTransform: 'uppercase' }}>Partners of Excellence</span>
        </header>
        
        <div className={styles.grid}>
          {brands.map((brand, i) => (
            <motion.div 
              key={brand.name}
              className={styles.brandCard}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <span className={styles.logoText}>{brand.logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
