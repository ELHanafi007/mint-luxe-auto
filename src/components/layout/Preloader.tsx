'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const duration = 2500; // Total loading time
    const interval = 20; // Update every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const words = ["MINT.", "LUXE.", "AUTO."];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className={styles.preloader}
          exit={{ 
            y: '-100%',
            transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.5 } 
          }}
        >
          <div className={styles.content}>
            <div className={styles.wordWrapper}>
              {words.map((word, i) => (
                <div key={i} className={styles.wordInner}>
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 1, 
                      ease: [0.19, 1, 0.22, 1], 
                      delay: 0.2 + (i * 0.1) 
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
            
            <div className={styles.counterWrapper}>
              <span className={styles.percentage}>{Math.round(counter)}%</span>
              <div className={styles.line}>
                <motion.div 
                  className={styles.progress}
                  style={{ width: `${counter}%` }}
                />
              </div>
              <motion.span 
                className={styles.status}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Curating Excellence
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
