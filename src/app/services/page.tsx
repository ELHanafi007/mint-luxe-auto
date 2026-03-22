'use client';

import { Section, Container } from '@/components/primitives/Layout';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ServicesPage.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const { language, t } = useLanguage();

  const services = [
    {
      id: 'acquisition',
      title: t.services.acquisitionSubtitle,
      description: t.services.acquisitionDesc,
      details: [
        language === 'fr' ? 'Sourcing Hors-Marché' : 'Off-Market Sourcing',
        language === 'fr' ? 'Inspection Avant-Achat' : 'Pre-Purchase Inspection',
        language === 'fr' ? 'Vérification de Titre & Provenance' : 'Title & Provenance Verification',
        language === 'fr' ? 'Négociation & Règlement' : 'Negotiation & Settlement'
      ],
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070'
    },
    {
      id: 'logistics',
      title: t.services.logisticsSubtitle,
      description: t.services.logisticsDesc,
      details: [
        language === 'fr' ? 'Transport Climatisé' : 'Climate-Controlled Transport',
        language === 'fr' ? 'Gestion des Douanes' : 'Customs & Duty Management',
        language === 'fr' ? 'Assurance Transit Complète' : 'Comprehensive Transit Insurance',
        language === 'fr' ? 'Détail Final & Remise' : 'Final Detail & Handover'
      ],
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070'
    },
    {
      id: 'portfolio',
      title: t.services.portfolioSubtitle,
      description: t.services.portfolioDesc,
      details: [
        language === 'fr' ? 'Estimation d\'Actifs & Tendances' : 'Asset Valuation & Trends',
        language === 'fr' ? 'Planification de Collection' : 'Collection Planning',
        language === 'fr' ? 'Stratégie de Disposition' : 'Disposition Strategy',
        language === 'fr' ? 'Gestion de Conservation' : 'Conservation Management'
      ],
      image: 'https://images.unsplash.com/photo-1493238555221-d2aa9f574678?auto=format&fit=crop&q=80&w=2070'
    }
  ];

  return (
    <main className={styles.servicesPage}>
      <Section className={styles.hero}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className={styles.metadata}>{t.services.luxuryEcosystem}</span>
            <h1 className={styles.title}>{t.services.superiorStandard}</h1>
          </motion.div>
        </Container>
      </Section>

      <div className={styles.serviceStack}>
        {services.map((service, i) => (
          <Section key={service.id} className={styles.serviceItem}>
            <Container>
              <div className={`${styles.grid} ${i % 2 !== 0 ? styles.reversed : ''}`}>
                <motion.div 
                  className={styles.content}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span className={styles.step}>0{i + 1}</span>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.description}>{service.description}</p>
                  <ul className={styles.details}>
                    {service.details.map((detail, idx) => (
                      <motion.li 
                        key={detail} 
                        className={styles.detailItem}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className={styles.imageContainer}
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className={styles.image}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className={styles.overlay} />
                </motion.div>
              </div>
            </Container>
          </Section>
        ))}
      </div>
    </main>
  );
}
