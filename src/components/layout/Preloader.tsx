'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Standard loading time for cinematic entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
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
                      delay: 0.5 + (i * 0.2) 
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
            
            <motion.div 
              className={styles.lineWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className={styles.line}>
                <motion.div 
                  className={styles.progress}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
              <motion.span 
                className={styles.status}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Curating Excellence
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
