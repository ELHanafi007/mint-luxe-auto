'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Collection', href: '/inventory' },
  { name: 'Services', href: '/services' },
  { name: 'Heritage', href: '/about' },
  { name: 'Contact', href: '/contact' },
];


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

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
        backgroundColor: `rgba(0, 0, 0, ${isScrolled || !isHome ? 0.9 : 0})`,
        backdropFilter: `blur(${isScrolled || !isHome ? 20 : 0}px)`,
        padding: isScrolled ? '15px 0' : '30px 0',
        borderBottom: (isScrolled || !isHome) ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: isHome ? 3.5 : 0 }}
    >
      <div className="container">
        <div className={styles.navInner}>
          <div className={`${styles.logo} interactive`}>
            <Link href="/">
              <motion.span
                animate={{ letterSpacing: (isScrolled || !isHome) ? '0.4em' : '0.6em' }}
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
                initial={isHome ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isHome ? 3.8 + (i * 0.1) : 0, duration: 0.8 }}
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
