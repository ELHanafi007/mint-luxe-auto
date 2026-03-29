'use client';

import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';
import { Globe, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Close menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname, isMenuOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // --- Animation Variants ---

  const menuVariants: Variants = {
    closed: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }
    },
    open: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const linkWrapperVariants: Variants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  const linkItemVariants: Variants = {
    closed: {
      y: 80,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const footerVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <>
    <motion.nav 
      className={styles.navbar}
      style={{ 
        backgroundColor: isMenuOpen ? 'transparent' : `rgba(0, 0, 0, ${isScrolled || !isHome ? 0.95 : 0.4})`,
        backdropFilter: isMenuOpen ? 'none' : `blur(${isScrolled || !isHome ? 20 : 0}px)`,
        padding: isScrolled ? '15px 0' : '30px 0',
        borderBottom: (isMenuOpen || isScrolled || !isHome) ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: isMenuOpen ? 2100 : 1000
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
          
          {/* Desktop Navigation */}
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

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuToggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburgerContainer}>
              <span className={styles.hamburgerLabel} style={{ opacity: isMenuOpen ? 0 : 0.6 }}>
                {isMenuOpen ? '' : 'MENU'}
              </span>
              <div className={styles.hamburgerLines}>
                <motion.div 
                  className={styles.line} 
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 1 : 0,
                    width: isMenuOpen ? '24px' : '20px'
                  }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div 
                  className={styles.line} 
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -1 : 0,
                    width: isMenuOpen ? '24px' : '24px'
                  }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </motion.nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          className={styles.mobileOverlay}
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className={styles.overlayBackground} />
          
          <div className={styles.mobileMenuContent}>
            <motion.div 
              className={styles.mobileNavLinks}
              variants={linkWrapperVariants}
            >
              {[...navLinks, { name: t.nav.contact, href: '/contact' }].map((link, i) => (
                <div key={link.name} className={styles.linkWrapper}>
                  <motion.div variants={linkItemVariants}>
                    <Link href={link.href} className={styles.mobileNavLink}>
                      <span className={styles.linkIndex}>0{i + 1}</span>
                      <span className={styles.linkText}>{link.name}</span>
                      <ArrowRight className={styles.linkArrow} size={32} />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className={styles.mobileNavFooter}
              variants={footerVariants}
            >
              <div className={styles.footerDivider} />
              <div className={styles.footerActions}>
                <div className={styles.mobileLang}>
                  <Globe size={14} color="var(--mint-gold)" />
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`${styles.mobileLangBtn} ${language === 'en' ? styles.mobileLangBtnActive : ''}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('fr')}
                    className={`${styles.mobileLangBtn} ${language === 'fr' ? styles.mobileLangBtnActive : ''}`}
                  >
                    FR
                  </button>
                </div>
                <button className={styles.mobilePrivateAccess}>
                  {t.nav.privateAccess}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}
