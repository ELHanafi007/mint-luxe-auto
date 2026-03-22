'use client';

import { Section, Container } from '@/components/primitives/Layout';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ServicesPage.module.css';
import Image from 'next/image';

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
          <span className={styles.metadata}>{t.nav.services}</span>
          <h1 className={styles.title}>{t.services.superiorStandard}</h1>
        </Container>
      </Section>

      <div className={styles.serviceStack}>
        {services.map((service, i) => (
          <Section key={service.id} className={styles.serviceItem}>
            <Container>
              <div className={`${styles.grid} ${i % 2 !== 0 ? styles.reversed : ''}`}>
                <div className={styles.content}>
                  <span className={styles.step}>0{i + 1}</span>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.description}>{service.description}</p>
                  <ul className={styles.details}>
                    {service.details.map((detail) => (
                      <li key={detail} className={styles.detailItem}>{detail}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.imageContainer}>
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className={styles.image}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className={styles.overlay} />
                </div>
              </div>
            </Container>
          </Section>
        ))}
      </div>
    </main>
  );
}
