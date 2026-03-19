'use client';

import { motion } from 'framer-motion';
import styles from './Services.module.css';

const services = [
  {
    number: '01',
    title: 'Bespoke Acquisition',
    description: 'We source the unobtainable. Leveraging a global network of private collectors and exclusive dealers to find your exact specification with surgical precision.',
  },
  {
    number: '02',
    title: 'Global Logistics',
    description: 'Seamless white-glove delivery to any corner of the globe. Our concierge handles every detail, from climate-controlled transport to discreet final handover.',
  },
  {
    number: '03',
    title: 'Heritage Restoration',
    description: 'Preserving automotive history through our partner ateliers. From concours-level restoration to sympathetic preservation for the most discerning collectors.',
  },
  {
    number: '04',
    title: 'Private Portfolio',
    description: 'Discreet management for significant automotive assets. We provide strategic valuation, conservation advice, and curated disposition services.',
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <header className={styles.header}>
          <span className="text-muted" style={{ letterSpacing: '0.4em', fontSize: '0.7rem' }}>Concierge Services</span>
          <h2 className={styles.title}>The Standard of Excellence</h2>
        </header>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={service.number}
              className={styles.serviceItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className={styles.serviceNumber}>{service.number}</div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.serviceLine} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
