'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className={styles.hero}>
      <motion.div style={{ y, scale }} className={styles.background}>
        <Image
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury performance car"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay} />
      </motion.div>

      <motion.div style={{ opacity }} className={styles.content}>
        <header className={styles.header}>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
          >
            Curating the Exceptional
          </motion.p>
          
          <div className={styles.titleWrapper}>
            {['Mint.', 'Luxe.', 'Auto.'].map((word, i) => (
              <div key={word} className={styles.wordOverflow}>
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    ease: [0.19, 1, 0.22, 1], 
                    delay: 0.8 + (i * 0.1) 
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </header>

        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <a href="#collection" className={styles.ctaPrimary}>
            Discover Inventory
          </a>
          <a href="#services" className={styles.ctaSecondary}>
            Our Services
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.scrollIndicator}>
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={styles.mouse}
        >
          <div className={styles.wheel} />
        </motion.div>
      </div>
    </section>
  );
}
