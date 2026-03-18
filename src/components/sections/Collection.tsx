'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section, Container } from '@/components/primitives/Layout';
import { vehicles } from '@/data/vehicles';
import styles from './Collection.module.css';

export default function Collection() {
  return (
    <Section id="collection" className={styles.collection}>
      <Container>
        <header className={styles.header}>
          <motion.span 
            className="label-metadata" 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Current Inventory
          </motion.span>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Selected Works
          </motion.h2>
        </header>

        <div className={styles.grid}>
          {vehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Image 
                src={vehicle.image} 
                alt={vehicle.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <div className={styles.cardContent}>
                  <p className={styles.brand}>{vehicle.brand}</p>
                  <h3 className={styles.name}>{vehicle.name}</h3>
                  <div className={styles.specs}>
                    <div className={styles.specItem}>
                      <span>{vehicle.specs.engine}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span>{vehicle.specs.power}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span>{vehicle.specs.acceleration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
