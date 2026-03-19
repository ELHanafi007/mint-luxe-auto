'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className={styles.preloader}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className={styles.content}>
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MINT.LUXE.AUTO
            </motion.div>
            <div className={styles.line}>
              <motion.div 
                className={styles.progress}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
