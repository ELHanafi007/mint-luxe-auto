'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer id="inquiry" className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            {t.footer.requestViewing.split(' ').map((word, i) => (
              <span key={i}>{word}<br /></span>
            ))}
          </motion.h2>
          
          <Link href="mailto:inquiry@mintluxe.auto" className={styles.inquiryLink}>
            {t.footer.contactConcierge}
          </Link>
        </div>

        <div className={styles.middle}>
          <div className={styles.navGroup}>
            <span className={styles.navTitle}>{t.footer.archive}</span>
            <Link href="/inventory" className={styles.navLink}>{t.footer.fullCollection}</Link>
            <Link href="/inventory?brand=Ferrari" className={styles.navLink}>Ferrari</Link>
            <Link href="/inventory?brand=Lamborghini" className={styles.navLink}>Lamborghini</Link>
            <Link href="/inventory?brand=Porsche" className={styles.navLink}>Porsche</Link>
          </div>
          <div className={styles.navGroup}>
            <span className={styles.navTitle}>{t.footer.expertise}</span>
            <Link href="/services" className={styles.navLink}>{t.footer.acquisition}</Link>
            <Link href="/services" className={styles.navLink}>{t.footer.logistics}</Link>
            <Link href="/services" className={styles.navLink}>{t.footer.portfolio}</Link>
            <Link href="/services" className={styles.navLink}>{t.footer.privateSales}</Link>
          </div>
          <div className={styles.navGroup}>
            <span className={styles.navTitle}>{t.footer.heritage}</span>
            <Link href="/about" className={styles.navLink}>{t.footer.philosophy}</Link>
            <Link href="/about" className={styles.navLink}>{t.footer.story}</Link>
            <Link href="/contact" className={styles.navLink}>{t.footer.contactUs}</Link>
            <Link href="/contact" className={styles.navLink}>{t.footer.careers}</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} Mint Luxe Auto. {t.footer.allRights}
          </div>
          
          <div className={styles.links}>
            <Link href="#">{t.footer.privacy}</Link>
            <Link href="#">{t.footer.terms}</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
