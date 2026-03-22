'use client';

import { Section, Container } from '@/components/primitives/Layout';
import Inquiry from '@/components/sections/Inquiry';
import styles from './ContactPage.module.css';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const offices = [
    {
      city: 'London',
      address: '12-14 Mayfair Square\nLondon, W1J 8AJ\nUnited Kingdom',
      phone: '+44 20 7946 0123',
      email: 'london@mint0lux.com'
    },
    {
      city: 'Dubai',
      address: 'Gate Village 5, DIFC\nDubai, UAE\nPO Box 50650',
      phone: '+971 4 321 4567',
      email: 'dubai@mint0lux.com'
    },
    {
      city: 'New York',
      address: '450 Park Avenue\nNew York, NY 10022\nUnited States',
      phone: '+1 212 555 0198',
      email: 'ny@mint0lux.com'
    }
  ];

  return (
    <main className={styles.contactPage}>
      <Section className={styles.hero}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className={styles.metadata}>Connect</span>
            <h1 className={styles.title}>Global Presence.<br />Personal Touch.</h1>
          </motion.div>
        </Container>
      </Section>

      <Section className={styles.offices}>
        <Container>
          <div className={styles.officeGrid}>
            {offices.map((office, i) => (
              <motion.div 
                key={office.city}
                className={styles.officeCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <span className={styles.officeCity}>{office.city}</span>
                <p className={styles.officeDetails}>
                  {office.address.split('\n').map((line, idx) => (
                    <span key={idx}>{line}<br /></span>
                  ))}
                </p>
                <div className={styles.contactLinks}>
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className={styles.contactLink}>
                    {office.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <div className={styles.inquirySection}>
        <Inquiry />
      </div>
    </main>
  );
}
