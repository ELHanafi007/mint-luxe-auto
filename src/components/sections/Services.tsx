'use client';

import { motion } from 'framer-motion';
import { Section, Container, Grid } from '@/components/primitives/Layout';
import styles from './Services.module.css';

const services = [
  {
    title: 'Bespoke Acquisition',
    description: 'We source the unobtainable. Leveraging a global network of private collectors and exclusive dealers to find your exact specification.',
  },
  {
    title: 'Global Logistics',
    description: 'Seamless white-glove delivery to any corner of the globe. Fully insured, climate-controlled, and discreetly handled.',
  },
  {
    title: 'Heritage Restoration',
    description: 'Preserving automotive history through our partner ateliers. From concours-level restoration to sympathetic preservation.',
  },
];

export default function Services() {
  return (
    <Section id="services" className={styles.services}>
      <Container>
        <Grid>
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              className={`${styles.serviceCard} col4`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <span className={styles.serviceIndex}>0{index + 1}</span>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
