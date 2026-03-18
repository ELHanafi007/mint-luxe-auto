'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/primitives/Layout';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
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
      </Container>
    </footer>
  );
}
