'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.collection, href: '/inventory' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.compare, href: '/compare' },
    { name: t.nav.heritage, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

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

          <div className={styles.rightActions}>
            <div className={styles.langToggle}>
              <button 
                onClick={() => setLanguage('en')}
                className={`${styles.langBtn} ${language === 'en' ? styles.langBtnActive : ''}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('fr')}
                className={`${styles.langBtn} ${language === 'fr' ? styles.langBtnActive : ''}`}
              >
                FR
              </button>
            </div>
            <button className={`${styles.ctaBtn} interactive`}>
              {t.nav.privateAccess}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
