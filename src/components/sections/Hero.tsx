'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury performance car"
          fill
          priority
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }}
        >
          Curating the Exceptional
        </motion.p>
        
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 1 }}
        >
          Mint.<br />Luxe.<br />Auto.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <a href="#collection" className={styles.cta}>
            Explore the Collection
          </a>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.subtitle} style={{ fontSize: '0.6rem' }}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollLineActive} />
        </div>
      </div>
    </section>
  );
}
