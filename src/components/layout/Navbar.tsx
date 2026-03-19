'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Collection', href: '#collection' },
  { name: 'Services', href: '#services' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Inquiry', href: '#inquiry' },
];

export default function Navbar() {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
    >
      <div className={styles.logo}>
        <Link href="/">MINT.LUXE</Link>
      </div>
      
      <div className={styles.navLinks}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={styles.navLink}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className={styles.menuIcon}>
        {/* Mobile menu trigger would go here */}
      </div>
    </motion.nav>
  );
}
