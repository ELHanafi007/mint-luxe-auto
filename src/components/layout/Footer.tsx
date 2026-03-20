'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            Request<br />Private<br />Viewing
          </motion.h2>
          
          <Link href="mailto:inquiry@mintluxe.auto" className={styles.inquiryLink}>
            Contact Our Concierge
          </Link>
        </div>

        <div className={styles.middle}>
          <div className={styles.navGroup}>
            <span className={styles.navTitle}>Archive</span>
            <Link href="/inventory" className={styles.navLink}>Full Collection</Link>
            <Link href="/inventory?brand=Ferrari" className={styles.navLink}>Ferrari</Link>
            <Link href="/inventory?brand=Lamborghini" className={styles.navLink}>Lamborghini</Link>
            <Link href="/inventory?brand=Porsche" className={styles.navLink}>Porsche</Link>
          </div>
          <div className={styles.navGroup}>
            <span className={styles.navTitle}>Expertise</span>
            <Link href="/services" className={styles.navLink}>Acquisition</Link>
            <Link href="/services" className={styles.navLink}>Logistics</Link>
            <Link href="/services" className={styles.navLink}>Portfolio Management</Link>
            <Link href="/services" className={styles.navLink}>Private Sales</Link>
          </div>
          <div className={styles.navGroup}>
            <span className={styles.navTitle}>Heritage</span>
            <Link href="/about" className={styles.navLink}>Philosophy</Link>
            <Link href="/about" className={styles.navLink}>Our Story</Link>
            <Link href="/contact" className={styles.navLink}>Contact Us</Link>
            <Link href="/contact" className={styles.navLink}>Careers</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} Mint Luxe Auto. All rights reserved.
          </div>
          
          <div className={styles.links}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/instagram">Instagram</Link>
            <Link href="/linkedin">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
