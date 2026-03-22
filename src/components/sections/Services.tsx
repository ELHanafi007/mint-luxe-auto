'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Services.module.css';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'acquisition',
      title: t.services.acquisitionTitle,
      subtitle: t.services.acquisitionSubtitle,
      description: t.services.acquisitionDesc,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070'
    },
    {
      id: 'logistics',
      title: t.services.logisticsTitle,
      subtitle: t.services.logisticsSubtitle,
      description: t.services.logisticsDesc,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070'
    },
    {
      id: 'portfolio',
      title: t.services.portfolioTitle,
      subtitle: t.services.portfolioSubtitle,
      description: t.services.portfolioDesc,
      image: 'https://images.unsplash.com/photo-1493238555221-d2aa9f574678?auto=format&fit=crop&q=80&w=2070'
    }
  ];

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
            {t.services.luxuryEcosystem}
          </motion.span>
          <motion.h2 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.services.superiorStandard}
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

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
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
          <button className={styles.cta}>{t.services.exploreCapabilities}</button>
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
