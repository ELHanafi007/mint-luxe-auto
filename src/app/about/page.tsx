'use client';

import { Section, Container } from '@/components/primitives/Layout';
import { useLanguage } from '@/context/LanguageContext';
import styles from './AboutPage.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className={styles.aboutPage}>
      <Section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"
            alt="Heritage Background"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className={styles.heroContent}
          >
            <span className={styles.metadata}>{t.about.metadata}</span>
            <h1 className={styles.title}>{t.about.title}</h1>
          </motion.div>
        </Container>
      </Section>

      <Section className={styles.philosophy}>
        <Container>
          <div className={styles.philosophyGrid}>
            <motion.div 
              className={styles.textBlock}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2 className={styles.subTitle}>{t.about.subTitle}</h2>
              <p className={styles.paragraph}>
                {t.about.p1}
              </p>
              <p className={styles.paragraph}>
                {t.about.p2}
              </p>
            </motion.div>
            
            <div className={styles.statGrid}>
              {[
                { value: '$2.5B+', label: t.about.assetsManaged },
                { value: '40+', label: t.about.globalPartners },
                { value: '12', label: t.about.yearsExcellence }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className={styles.statItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                >
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.vision}>
        <div className={styles.visionBg}>
          <Image 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
            alt="Vision Background"
            fill
            className={styles.visionImage}
          />
          <div className={styles.visionOverlay} />
        </div>
        <Container>
          <motion.div 
            className={styles.visionInner}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className={styles.visionTitle}>{t.about.quote}</h2>
            <span className={styles.visionAuthor}>&mdash; {t.about.author}</span>
          </motion.div>
        </Container>
      </Section>

      <Section className={styles.legacy}>
        <Container>
          <div className={styles.legacyHeader}>
            <span className={styles.metadata}>Timeline</span>
            <h2 className={styles.legacyTitle}>A Legacy of Excellence</h2>
          </div>
          
          <div className={styles.timeline}>
            {[
              { year: '2014', event: 'Founding in London' },
              { year: '2017', event: 'Global Expansion to Dubai' },
              { year: '2020', event: 'Digital Transformation' },
              { year: '2024', event: 'The New Era of Luxury' }
            ].map((item, i) => (
              <motion.div 
                key={item.year}
                className={styles.timelineItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <span className={styles.timelineYear}>{item.year}</span>
                <p className={styles.timelineEvent}>{item.event}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
