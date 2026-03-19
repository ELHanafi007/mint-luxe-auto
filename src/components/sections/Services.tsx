'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Services.module.css';

const services = [
  {
    id: 'acquisition',
    title: 'The Unobtainable, Obtained.',
    subtitle: 'Bespoke Acquisition',
    description: 'We specialize in sourcing what others cannot. From off-market hypercars to private collections, our global network ensures your vision becomes your reality with surgical precision and absolute discretion.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'logistics',
    title: 'Precision in Motion.',
    subtitle: 'Global White-Glove Logistics',
    description: 'Climate-controlled transport by air, sea, or land. We manage the entire lifecycle of delivery, ensuring your masterpiece arrives in showroom condition, no matter the coordinate.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'portfolio',
    title: 'Legacy Managed.',
    subtitle: 'Private Portfolio Strategy',
    description: 'Automotive assets are more than just machines—they are investments. We provide strategic valuation, conservation advice, and curated disposition services to maximize your collection’s value and heritage.',
    image: 'https://images.unsplash.com/photo-1493238555221-d2aa9f574678?auto=format&fit=crop&q=80&w=2070'
  }
];

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <header className={styles.header}>
          <motion.span 
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Ecosystem of Luxury
          </motion.span>
          <motion.h2 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A Higher Standard of Service.
          </motion.h2>
        </header>

        <div className={styles.stack}>
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div 
      ref={cardRef} 
      className={styles.card}
      style={{ opacity }}
    >
      <div className={`${styles.cardGrid} ${index % 2 !== 0 ? styles.reversed : ''}`}>
        <div className={styles.content}>
          <span className={styles.step}>0{index + 1}</span>
          <h3 className={styles.cardSubtitle}>{service.subtitle}</h3>
          <h4 className={styles.cardTitle}>{service.title}</h4>
          <p className={styles.description}>{service.description}</p>
          <button className={styles.cta}>Explore Capability</button>
        </div>
        
        <div className={styles.imageContainer}>
          <motion.div style={{ y }} className={styles.parallaxWrapper}>
            <Image 
              src={service.image}
              alt={service.title}
              fill
              className={styles.image}
              unoptimized
            />
          </motion.div>
          <div className={styles.overlay} />
        </div>
      </div>
    </motion.div>
  );
}
