import { Metadata } from 'next';
import { Section, Container } from '@/components/primitives/Layout';
import styles from './AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Our Heritage | Mint0lux',
  description: 'Discover the philosophy and heritage behind the world’s most exclusive automotive curator.',
};

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <Section className={styles.hero}>
        <Container>
          <span className={styles.metadata}>Philosophy</span>
          <h1 className={styles.title}>The Art of the<br />Automobile.</h1>
        </Container>
      </Section>

      <Section className={styles.content}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.textBlock}>
              <h2 className={styles.subTitle}>Excellence as Standard.</h2>
              <p className={styles.paragraph}>
                Founded on the principles of absolute discretion and surgical precision, Mint0lux has emerged as the definitive destination for the world&apos;s most discerning collectors. We believe that a truly exceptional vehicle is not merely a machine, but a masterpiece of engineering and an enduring asset.
              </p>
              <p className={styles.paragraph}>
                Our curation process is exhaustive. Every acquisition in our portfolio has been vetted against a rigorous set of criteria&mdash;provenance, condition, and rarity&mdash;ensuring that we only represent the pinnacle of automotive achievement.
              </p>
            </div>
            <div className={styles.statGrid}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>$2.5B+</span>
                <span className={styles.statLabel}>Assets Managed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>40+</span>
                <span className={styles.statLabel}>Global Partners</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>12</span>
                <span className={styles.statLabel}>Years of Excellence</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.vision}>
        <Container>
          <div className={styles.visionInner}>
            <h2 className={styles.visionTitle}>&quot;We do not just sell cars. We secure legacies.&quot;</h2>
            <span className={styles.visionAuthor}>&mdash; Julian Vance, Founder</span>
          </div>
        </Container>
      </Section>
    </main>
  );
}
