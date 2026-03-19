'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Collection', href: '#collection' },
  { name: 'Services', href: '#services' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Inquiry', href: '#inquiry' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Background opacity transitions from 0 to 0.8 as user scrolls
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const yOffset = useTransform(scrollY, [0, 100], [20, 0]);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  return (
    <motion.nav 
      className={styles.navbar}
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${isScrolled ? 0.8 : 0})`,
        backdropFilter: `blur(${isScrolled ? 20 : 0}px)`,
        padding: isScrolled ? '15px 0' : '30px 0'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 3.5 }}
    >
      <div className="container">
        <div className={styles.navInner}>
          <div className={`${styles.logo} interactive`}>
            <Link href="/">
              <motion.span
                animate={{ letterSpacing: isScrolled ? '0.4em' : '0.6em' }}
                transition={{ duration: 0.8 }}
              >
                MINT.LUXE
              </motion.span>
            </Link>
          </div>
          
          <div className={styles.navLinks}>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8 + (i * 0.1), duration: 0.8 }}
              >
                <Link 
                  href={link.href} 
                  className={`${styles.navLink} interactive`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <button className={`${styles.ctaBtn} interactive`}>
            Private Access
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
