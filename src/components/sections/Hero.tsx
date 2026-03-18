'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { revealSubtle, MINT_EASE } from '@/lib/motion-primitives';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear' }}
          className={styles.imageContainer}
        >
          <Image
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
            alt="Luxury performance car"
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        </motion.div>
      </div>

      <div className={styles.content}>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.8, ease: MINT_EASE, delay: 3.2 }}
        >
          Curating the Exceptional
        </motion.p>
        
        <motion.h1 
          className={styles.title}
        >
          {['Mint.', 'Luxe.', 'Auto.'].map((line, i) => (
            <motion.span 
              key={line}
              style={{ display: 'block' }}
              initial="hidden"
              animate="visible"
              variants={revealSubtle}
              custom={35 + (i * 3)} // Results in 3.5s, 3.8s, 4.1s delays
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 5.5, ease: MINT_EASE }}
        >
          <a href="#collection" className={styles.cta}>
            Explore the Collection
          </a>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to Discover</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollLineActive} />
        </div>
      </div>
    </section>
  );
}
