'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.collection, href: '/inventory' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.compare, href: '/compare' },
    { name: t.nav.heritage, href: '/about' },
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
        backgroundColor: `rgba(0, 0, 0, ${isScrolled || !isHome ? 0.95 : 0.4})`,
        backdropFilter: `blur(${isScrolled || !isHome ? 20 : 0}px)`,
        padding: isScrolled ? '15px 0' : '30px 0',
        borderBottom: (isScrolled || !isHome) ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: isHome ? 3.5 : 0 }}
    >
      <div className="container">
        <div className={styles.navInner}>
          <div className={`${styles.logo} interactive`}>
            <Link href="/">
              <motion.div
                className={styles.logoWrapper}
                animate={{ letterSpacing: (isScrolled || !isHome) ? '0.4em' : '0.6em' }}
                transition={{ duration: 0.8 }}
              >
                <div className={styles.logoMain}>MINT.LUXE</div>
                <div className={styles.logoSub}>AUTO</div>
              </motion.div>
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
                  className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''} interactive`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <div 
              className={styles.conciergeTrigger}
              onMouseEnter={() => setShowConcierge(true)}
              onMouseLeave={() => setShowConcierge(false)}
            >
              <Link href="/contact" className={`${styles.navLink} interactive`}>
                {t.nav.contact}
              </Link>
              
              <AnimatePresence>
                {showConcierge && (
                  <motion.div 
                    className={styles.conciergeDropdown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.conciergeItem}>
                      <span>London</span>
                      <a href="tel:+442079460123">+44 20 7946 0123</a>
                      <a href="mailto:london@mint0lux.com" className={styles.conciergeEmail}>london@mint0lux.com</a>
                    </div>
                    <div className={styles.conciergeItem}>
                      <span>Dubai</span>
                      <a href="tel:+97143214567">+971 4 321 4567</a>
                      <a href="mailto:dubai@mint0lux.com" className={styles.conciergeEmail}>dubai@mint0lux.com</a>
                    </div>
                    <div className={styles.conciergeItem}>
                      <span>New York</span>
                      <a href="tel:+12125550198">+1 212 555 0198</a>
                      <a href="mailto:ny@mint0lux.com" className={styles.conciergeEmail}>ny@mint0lux.com</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.rightActions}>
            <div className={styles.langToggle}>
              <motion.div 
                className={styles.langSlider}
                animate={{ x: language === 'en' ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
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
