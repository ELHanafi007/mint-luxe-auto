'use client';

import { Section, Container } from '@/components/primitives/Layout';
import { useLanguage } from '@/context/LanguageContext';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className={styles.aboutPage}>
      <Section className={styles.hero}>
        <Container>
          <span className={styles.metadata}>{t.about.metadata}</span>
          <h1 className={styles.title}>{t.about.title}</h1>
        </Container>
      </Section>

      <Section className={styles.content}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.textBlock}>
              <h2 className={styles.subTitle}>{t.about.subTitle}</h2>
              <p className={styles.paragraph}>
                {t.about.p1}
              </p>
              <p className={styles.paragraph}>
                {t.about.p2}
              </p>
            </div>
            <div className={styles.statGrid}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>$2.5B+</span>
                <span className={styles.statLabel}>{t.about.assetsManaged}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>40+</span>
                <span className={styles.statLabel}>{t.about.globalPartners}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>12</span>
                <span className={styles.statLabel}>{t.about.yearsExcellence}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.vision}>
        <Container>
          <div className={styles.visionInner}>
            <h2 className={styles.visionTitle}>{t.about.quote}</h2>
            <span className={styles.visionAuthor}>&mdash; {t.about.author}</span>
          </div>
        </Container>
      </Section>
    </main>
  );
}
