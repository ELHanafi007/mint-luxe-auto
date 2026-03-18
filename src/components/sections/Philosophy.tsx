'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Philosophy.module.css';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="philosophy" className={styles.philosophy} ref={containerRef}>
      <div className="container">
        <div className={styles.content}>
          <motion.p 
            className={styles.text}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            "True luxury is found in the silence of perfection. At Mint, we don't just sell cars; we curate the extraordinary, ensuring every detail reflects the standard of 'Mint' condition."
          </motion.p>
          <motion.p 
            className={styles.author}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            The Founding Principle
          </motion.p>
        </div>

        <div className={styles.imageSection}>
          <motion.div style={{ y }} className={styles.parallaxContainer}>
            <Image 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070" 
              alt="Luxury interior" 
              width={2070}
              height={1000}
              className={styles.image}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
