import { Metadata } from 'next';
import { Section, Container } from '@/components/primitives/Layout';
import styles from './ServicesPage.module.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Capabilities | Mint0lux',
  description: 'Explore the ecosystem of luxury automotive services, from bespoke acquisition to global white-glove logistics.',
};

const services = [
  {
    id: 'acquisition',
    title: 'Bespoke Acquisition',
    description: 'We specialize in sourcing what others cannot. From off-market hypercars to private collections, our global network ensures your vision becomes your reality with surgical precision and absolute discretion.',
    details: [
      'Off-Market Sourcing',
      'Pre-Purchase Inspection',
      'Title & Provenance Verification',
      'Negotiation & Settlement'
    ],
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'logistics',
    title: 'Global White-Glove Logistics',
    description: 'Climate-controlled transport by air, sea, or land. We manage the entire lifecycle of delivery, ensuring your masterpiece arrives in showroom condition, no matter the coordinate.',
    details: [
      'Climate-Controlled Transport',
      'Customs & Duty Management',
      'Comprehensive Transit Insurance',
      'Final Detail & Handover'
    ],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'portfolio',
    title: 'Private Portfolio Strategy',
    description: 'Automotive assets are more than just machines—they are investments. We provide strategic valuation, conservation advice, and curated disposition services to maximize your collection’s value.',
    details: [
      'Asset Valuation & Trends',
      'Collection Planning',
      'Disposition Strategy',
      'Conservation Management'
    ],
    image: 'https://images.unsplash.com/photo-1493238555221-d2aa9f574678?auto=format&fit=crop&q=80&w=2070'
  }
];

export default function ServicesPage() {
  return (
    <main className={styles.servicesPage}>
      <Section className={styles.hero}>
        <Container>
          <span className={styles.metadata}>Capabilities</span>
          <h1 className={styles.title}>The Ecosystem of<br />Excellence.</h1>
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
